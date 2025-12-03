<<<<<<< HEAD
import { apiGetContext } from 'mastodon/api/statuses';
import { createDataLoadingThunk } from 'mastodon/store/typed_functions';

=======
import { createAction } from '@reduxjs/toolkit';

import { apiGetContext, apiSetQuotePolicy } from 'mastodon/api/statuses';
import { createDataLoadingThunk } from 'mastodon/store/typed_functions';

import type { ApiQuotePolicy } from '../api_types/quotes';

>>>>>>> v4.5.0
import { importFetchedStatuses } from './importer';

export const fetchContext = createDataLoadingThunk(
  'status/context',
<<<<<<< HEAD
  ({ statusId }: { statusId: string }) => apiGetContext(statusId),
  (context, { dispatch }) => {
=======
  ({ statusId }: { statusId: string; prefetchOnly?: boolean }) =>
    apiGetContext(statusId),
  ({ context, refresh }, { dispatch, actionArg: { prefetchOnly = false } }) => {
>>>>>>> v4.5.0
    const statuses = context.ancestors.concat(context.descendants);

    dispatch(importFetchedStatuses(statuses));

    return {
      context,
<<<<<<< HEAD
    };
  },
);
=======
      refresh,
      prefetchOnly,
    };
  },
);

export const completeContextRefresh = createAction<{ statusId: string }>(
  'status/context/complete',
);

export const showPendingReplies = createAction<{ statusId: string }>(
  'status/context/showPendingReplies',
);

export const clearPendingReplies = createAction<{ statusId: string }>(
  'status/context/clearPendingReplies',
);

export const setStatusQuotePolicy = createDataLoadingThunk(
  'status/setQuotePolicy',
  ({ statusId, policy }: { statusId: string; policy: ApiQuotePolicy }) => {
    return apiSetQuotePolicy(statusId, policy);
  },
);
>>>>>>> v4.5.0
