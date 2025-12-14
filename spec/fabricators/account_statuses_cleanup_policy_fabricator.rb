# frozen_string_literal: true

Fabricator(:account_statuses_cleanup_policy) do
  account { Fabricate.build(:account) }
  keep_local false
end
