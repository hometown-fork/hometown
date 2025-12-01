import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { injectIntl, defineMessages } from 'react-intl';

import classNames from 'classnames';

import Overlay from 'react-overlays/Overlay';

import Link from '@/material-icons/400-24px/link.svg?react';
import LinkOff from '@/material-icons/400-24px/link_off.svg?react';
import { DropdownSelector } from 'mastodon/components/dropdown_selector';
import { Icon } from 'mastodon/components/icon';

const messages = defineMessages({
  federate_short: { id: 'federation.federated.short', defaultMessage: 'Federated' },
  federate_long: { id: 'federation.federated.long', defaultMessage: 'Allow post to reach other instances' },
  local_only_short: { id: 'federation.local_only.short', defaultMessage: 'Local-only' },
  local_only_long: { id: 'federation.local_only.long', defaultMessage: 'Restrict this post only to my instance' },
  change_federation: { id: 'federation.change', defaultMessage: 'Adjust status federation' },
});

class FederationDropdown extends PureComponent {

  static propTypes = {
    isUserTouching: PropTypes.func,
    onModalOpen: PropTypes.func,
    onModalClose: PropTypes.func,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    noDirect: PropTypes.bool,
    container: PropTypes.func,
    disabled: PropTypes.bool,
    intl: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    placement: 'bottom',
  };

  handleToggle = () => {
    if (this.state.open && this.activeElement) {
      this.activeElement.focus({ preventScroll: true });
    }

    this.setState({ open: !this.state.open });
  };

  handleKeyDown = e => {
    switch (e.key) {
    case 'Escape':
      this.handleClose();
      break;
    }
  };

  handleMouseDown = () => {
    if (!this.state.open) {
      this.activeElement = document.activeElement;
    }
  };

  handleButtonKeyDown = (e) => {
    switch (e.key) {
    case ' ':
    case 'Enter':
      this.handleMouseDown();
      break;
    }
  };

  handleClose = () => {
    if (this.state.open && this.activeElement) {
      this.activeElement.focus({ preventScroll: true });
    }
    this.setState({ open: false });
  };

  handleChange = value => {
    // because handleChange always receives string values from DropdownSelector we need to convert them back to boolean
    // since the strings "true" and "false" get stored on the "data-index" attribute in the dropdown, we need to
    // check for the string 'true' and convert that to boolean true, everything else is false
    // (this way a failure to pass a value will result in false, or local-only, which is a safer default)
    this.props.onChange(value === 'true');
  };

  UNSAFE_componentWillMount() {
    const { intl: { formatMessage } } = this.props;

    this.options = [
      { icon: 'link', iconComponent: Link, value: true, text: formatMessage(messages.federate_short), meta: formatMessage(messages.federate_long) },
      { icon: 'chain-broken', iconComponent: LinkOff, value: false, text: formatMessage(messages.local_only_short), meta: formatMessage(messages.local_only_long) },
    ];
  }

  setTargetRef = c => {
    this.target = c;
  };

  findTarget = () => {
    return this.target;
  };

  handleOverlayEnter = (state) => {
    this.setState({ placement: state.placement });
  };

  render() {
    const { value, container, disabled } = this.props;
    const { open, placement } = this.state;

    const valueOption = this.options.find(item => item.value === value);

    return (
      <div ref={this.setTargetRef} onKeyDown={this.handleKeyDown}>
        <button
          type='button'
          title={valueOption.text}
          aria-expanded={open}
          onClick={this.handleToggle}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleButtonKeyDown}
          disabled={disabled}
          className={classNames('dropdown-button', { active: open })}
        >
          <Icon id={valueOption.icon} icon={valueOption.iconComponent} />
          <span className='dropdown-button__label'>{valueOption.text}</span>
        </button>

        <Overlay show={open} offset={[5, 5]} placement={placement} flip target={this.findTarget} container={container} popperConfig={{ strategy: 'fixed', onFirstUpdate: this.handleOverlayEnter }}>
          {({ props, placement }) => (
            <div {...props}>
              <div className={`dropdown-animation privacy-dropdown__dropdown ${placement}`}>
                <DropdownSelector
                  items={this.options}
                  value={value}
                  onClose={this.handleClose}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          )}
        </Overlay>
      </div>
    );
  }

}

export default injectIntl(FederationDropdown);
