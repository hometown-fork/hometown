import { useState, useCallback, useRef } from 'react';

import { FormattedMessage } from 'react-intl';

import WarningIcon from '@/material-icons/400-24px/warning.svg?react';
import { Icon } from 'mastodon/components/icon';

import { Popover } from './popover';

export const NoAltTextBadge: React.FC = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [buttonElement, _] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((v) => !v);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <button
        ref={anchorRef}
        className='media-gallery__no-alt__label'
        onClick={handleClick}
        type='button'
      >
        <Icon id='warning' icon={WarningIcon} />
      </button>

      <Popover
        onClose={handleClose}
        isOpen={open}
        reference={buttonElement}
        placement='top-end'
        flip
        offset={4}
        strategy='fixed'
      >
        {({ props }) => (
          <div {...props} className='hover-card-controller'>
            <div
              className='media-gallery__alt__popover dropdown-animation'
              role='tooltip'
            >
              <h4>
                <FormattedMessage
                  id='no_alt_text_badge.title'
                  defaultMessage='No alt text provided'
                />
              </h4>
            </div>
          </div>
        )}
      </Popover>
    </>
  );
};
