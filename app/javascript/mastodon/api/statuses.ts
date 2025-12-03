<<<<<<< HEAD
import { apiRequestGet } from 'mastodon/api';
import type { ApiContextJSON } from 'mastodon/api_types/statuses';

export const apiGetContext = (statusId: string) =>
  apiRequestGet<ApiContextJSON>(`v1/statuses/${statusId}/context`);
=======
import api, { apiRequestPut, getAsyncRefreshHeader } from 'mastodon/api';
import type {
  ApiContextJSON,
  ApiStatusJSON,
} from 'mastodon/api_types/statuses';

import type { ApiQuotePolicy } from '../api_types/quotes';

export const apiGetContext = async (statusId: string) => {
  const response = await api().request<ApiContextJSON>({
    method: 'GET',
    url: `/api/v1/statuses/${statusId}/context`,
  });

  return {
    context: response.data,
    refresh: getAsyncRefreshHeader(response),
  };
};

export const apiSetQuotePolicy = async (
  statusId: string,
  policy: ApiQuotePolicy,
) => {
  return apiRequestPut<ApiStatusJSON>(
    `v1/statuses/${statusId}/interaction_policy`,
    {
      quote_approval_policy: policy,
    },
  );
};
>>>>>>> v4.5.0
