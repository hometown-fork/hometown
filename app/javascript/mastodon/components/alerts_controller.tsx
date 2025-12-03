import { useState, useEffect } from 'react';

import { useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';

<<<<<<< HEAD
import classNames from 'classnames';

import { dismissAlert } from 'mastodon/actions/alerts';
import type {
  Alert,
=======
import { dismissAlert } from 'mastodon/actions/alerts';
import type {
  Alert as AlertType,
>>>>>>> v4.5.0
  TranslatableString,
  TranslatableValues,
} from 'mastodon/models/alert';
import { useAppSelector, useAppDispatch } from 'mastodon/store';

<<<<<<< HEAD
=======
import { Alert } from './alert';

>>>>>>> v4.5.0
const formatIfNeeded = (
  intl: IntlShape,
  message: TranslatableString,
  values?: TranslatableValues,
) => {
  if (typeof message === 'object') {
    return intl.formatMessage(message, values);
  }

  return message;
};

<<<<<<< HEAD
const Alert: React.FC<{
  alert: Alert;
=======
const TimedAlert: React.FC<{
  alert: AlertType;
>>>>>>> v4.5.0
  dismissAfter: number;
}> = ({
  alert: { key, title, message, values, action, onClick },
  dismissAfter,
}) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const setActiveTimeout = setTimeout(() => {
      setActive(true);
    }, 1);

    return () => {
      clearTimeout(setActiveTimeout);
    };
  }, []);

  useEffect(() => {
    const dismissTimeout = setTimeout(() => {
      setActive(false);

      // Allow CSS transition to finish before removing from the DOM
      setTimeout(() => {
        dispatch(dismissAlert({ key }));
      }, 500);
    }, dismissAfter);

    return () => {
      clearTimeout(dismissTimeout);
    };
  }, [dispatch, setActive, key, dismissAfter]);

  return (
<<<<<<< HEAD
    <div
      className={classNames('notification-bar', {
        'notification-bar-active': active,
      })}
    >
      <div className='notification-bar-wrapper'>
        {title && (
          <span className='notification-bar-title'>
            {formatIfNeeded(intl, title, values)}
          </span>
        )}

        <span className='notification-bar-message'>
          {formatIfNeeded(intl, message, values)}
        </span>

        {action && (
          <button className='notification-bar-action' onClick={onClick}>
            {formatIfNeeded(intl, action, values)}
          </button>
        )}
      </div>
    </div>
=======
    <Alert
      isActive={active}
      title={title ? formatIfNeeded(intl, title, values) : undefined}
      message={formatIfNeeded(intl, message, values)}
      action={action ? formatIfNeeded(intl, action, values) : undefined}
      onActionClick={onClick}
    />
>>>>>>> v4.5.0
  );
};

export const AlertsController: React.FC = () => {
  const alerts = useAppSelector((state) => state.alerts);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className='notification-list'>
      {alerts.map((alert, idx) => (
<<<<<<< HEAD
        <Alert key={alert.key} alert={alert} dismissAfter={5000 + idx * 1000} />
=======
        <TimedAlert
          key={alert.key}
          alert={alert}
          dismissAfter={5000 + idx * 1000}
        />
>>>>>>> v4.5.0
      ))}
    </div>
  );
};
