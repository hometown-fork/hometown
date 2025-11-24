import { useState, useCallback, useRef } from 'react';

import { FormattedMessage } from 'react-intl';

import Overlay from 'react-overlays/Overlay';
import type {
  OffsetValue,
  UsePopperOptions,
} from 'react-overlays/esm/usePopper';

import WarningIcon from '@/material-icons/400-24px/warning.svg?react';
import { Icon } from 'mastodon/components/icon';

const offset = [0, 4] as OffsetValue;
const popperConfig = { strategy: 'fixed' } as UsePopperOptions;

export const NoAltTextBadge: React.FC = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
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
      >
        <Icon id='warning' icon={WarningIcon} />
      </button>

      <Overlay
        rootClose
        onHide={handleClose}
        show={open}
        target={anchorRef.current}
        placement='top-end'
        flip
        offset={offset}
        popperConfig={popperConfig}
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
      </Overlay>
    </>
  );
};
