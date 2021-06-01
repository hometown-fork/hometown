#syntax=docker/dockerfile:1.2
FROM ubuntu:20.04 as build-dep

# Use bash for the shell
SHELL ["/bin/bash", "-c"]

# Enable super fast apt caches for use with --mount=type=cache
RUN rm -f /etc/apt/apt.conf.d/docker-clean; \
    echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

ENV PATH="/opt/ruby/bin:/opt/node/bin:/opt/mastodon/bin:${PATH}"

# Install Node v12 (LTS)
ENV NODE_VER="12.21.0"
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
  ARCH= && \
    dpkgArch="$(dpkg --print-architecture)" && \
  case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac && \
    echo "Etc/UTC" > /etc/localtime && \
	apt-get update && apt-get install -y --no-install-recommends \
	  ca-certificates wget python && \
	cd ~ && \
	wget -q https://nodejs.org/download/release/v$NODE_VER/node-v$NODE_VER-linux-$ARCH.tar.gz && \
	tar xf node-v$NODE_VER-linux-$ARCH.tar.gz && \
	rm node-v$NODE_VER-linux-$ARCH.tar.gz && \
	mv node-v$NODE_VER-linux-$ARCH /opt/node

# Install Ruby
ENV RUBY_VER="2.7.2"
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
  apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    bison libyaml-dev libgdbm-dev libreadline-dev libjemalloc-dev \
		libncurses5-dev libffi-dev zlib1g-dev libssl-dev && \
	cd ~ && \
	wget https://cache.ruby-lang.org/pub/ruby/${RUBY_VER%.*}/ruby-$RUBY_VER.tar.gz && \
	tar xf ruby-$RUBY_VER.tar.gz && rm ruby-$RUBY_VER.tar.gz && \
	cd ruby-$RUBY_VER && \
	./configure --prefix=/opt/ruby \
	  --with-jemalloc \
	  --with-shared \
	  --disable-install-doc && \
	make -j"$(nproc)" > /dev/null && \
	make install && \
	rm -rf /root/ruby-$RUBY_VER

# Install bundle dependencies
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
	apt-get update && apt-get install -y --no-install-recommends \
	  git libicu-dev libidn11-dev \
	  libpq-dev libprotobuf-dev protobuf-compiler shared-mime-info

RUN npm install -g yarn
RUN gem install bundler --verbose


FROM build-dep as prod-dep

COPY Gemfile* package.json yarn.lock /opt/mastodon/
RUN cd /opt/mastodon && \
	bundle config set deployment 'true' && \
	bundle config set without 'development test' && \
	bundle install -j"$(nproc)" --deployment --without="development test" && \
	yarn install --pure-lockfile

COPY . /opt/mastodon/
RUN cd /opt/mastodon && \
	RAILS_ENV=production OTP_SECRET=precompile_placeholder SECRET_KEY_BASE=precompile_placeholder \
		rails assets:precompile && \
	yarn cache clean && \
	rm -rf tmp && \
	rm -rf .git


FROM ubuntu:20.04 as runtime-base

# Enable super fast apt caches for use with --mount=type=cache
RUN rm -f /etc/apt/apt.conf.d/docker-clean; \
    echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

# Create the mastodon user
ARG UID=991
ARG GID=991
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV PATH="/opt/ruby/bin:/opt/node/bin:/opt/mastodon/bin:${PATH}"

# Install mastodon runtime deps
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
  echo "Etc/UTC" > /etc/localtime && \
  apt-get update && apt-get -y --no-install-recommends install \
    whois wget \
	  libssl1.1 libpq5 imagemagick ffmpeg libjemalloc2 \
	  libicu66 libprotobuf17 libidn11 libyaml-0-2 \
	  file ca-certificates tzdata libreadline8 gcc tini && \
	addgroup --gid $GID mastodon && \
	useradd -m -u $UID -g $GID -d /opt/mastodon mastodon && \
	echo "mastodon:$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 24 | mkpasswd -s -m sha-256)" | chpasswd && \
	ln -s /opt/mastodon /mastodon

# Set the work dir and the container entry point
WORKDIR /opt/mastodon
ENTRYPOINT ["/usr/bin/tini", "--"]
EXPOSE 3000 4000
USER mastodon

# Tell rails to serve static files
ENV RAILS_SERVE_STATIC_FILES="true"
ENV BIND="0.0.0.0"


FROM runtime-base as development
COPY --from=build-dep /opt/node /opt/node
COPY --from=build-dep /opt/ruby /opt/ruby

# Install everything we need to run bundle install
USER root
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
	apt-get update && apt-get install -y --no-install-recommends \
	git libicu-dev libidn11-dev \
	libpq-dev libprotobuf-dev protobuf-compiler shared-mime-info && \
	npm install -g yarn && \
	gem install bundler --verbose
USER mastodon

# Run mastodon services in development mode
ENV RAILS_ENV="development"
ENV NODE_ENV="development"


FROM runtime-base as production
COPY --from=prod-dep /opt/node /opt/node
COPY --from=prod-dep /opt/ruby /opt/ruby

# Run mastodon services in production mode
ENV RAILS_ENV="production"
ENV NODE_ENV="production"

# Copy over mastodon source, and set permissions
COPY --chown=mastodon:mastodon . /opt/mastodon
