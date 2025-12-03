import classNames from 'classnames';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
=======
import { DropdownMenuItemContent } from 'mastodon/components/dropdown_menu';
>>>>>>> v4.5.0
import type { MenuItem } from 'mastodon/models/dropdown_menu';
import {
  isActionItem,
  isExternalLinkItem,
} from 'mastodon/models/dropdown_menu';

export const ActionsModal: React.FC<{
  actions: MenuItem[];
  onClick: React.MouseEventHandler;
}> = ({ actions, onClick }) => (
  <div className='modal-root__modal actions-modal'>
    <ul>
      {actions.map((option, i: number) => {
        if (option === null) {
          return <li key={`sep-${i}`} className='dropdown-menu__separator' />;
        }

<<<<<<< HEAD
        const { text, dangerous } = option;
=======
        const { text, highlighted, disabled, dangerous } = option;
>>>>>>> v4.5.0

        let element: React.ReactElement;

        if (isActionItem(option)) {
          element = (
<<<<<<< HEAD
            <button onClick={onClick} data-index={i}>
              {text}
=======
            <button onClick={onClick} data-index={i} disabled={disabled}>
              <DropdownMenuItemContent item={option} />
>>>>>>> v4.5.0
            </button>
          );
        } else if (isExternalLinkItem(option)) {
          element = (
            <a
              href={option.href}
              target={option.target ?? '_target'}
              data-method={option.method}
              rel='noopener'
              onClick={onClick}
              data-index={i}
            >
<<<<<<< HEAD
              {text}
=======
              <DropdownMenuItemContent item={option} />
>>>>>>> v4.5.0
            </a>
          );
        } else {
          element = (
            <Link to={option.to} onClick={onClick} data-index={i}>
<<<<<<< HEAD
              {text}
=======
              <DropdownMenuItemContent item={option} />
>>>>>>> v4.5.0
            </Link>
          );
        }

        return (
          <li
<<<<<<< HEAD
            className={classNames({
              'dropdown-menu__item--dangerous': dangerous,
=======
            className={classNames('dropdown-menu__item', {
              'dropdown-menu__item--dangerous': dangerous,
              'dropdown-menu__item--highlighted': highlighted,
>>>>>>> v4.5.0
            })}
            key={`${text}-${i}`}
          >
            {element}
          </li>
        );
      })}
    </ul>
  </div>
);
