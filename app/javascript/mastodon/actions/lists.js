import api from '../api';

export const LIST_FETCH_REQUEST = 'LIST_FETCH_REQUEST';
export const LIST_FETCH_SUCCESS = 'LIST_FETCH_SUCCESS';
export const LIST_FETCH_FAIL    = 'LIST_FETCH_FAIL';

<<<<<<< HEAD
export const LISTS_FETCH_REQUEST = 'LISTS_FETCH_REQUEST';
export const LISTS_FETCH_SUCCESS = 'LISTS_FETCH_SUCCESS';
export const LISTS_FETCH_FAIL    = 'LISTS_FETCH_FAIL';

export const LIST_EDITOR_TITLE_CHANGE        = 'LIST_EDITOR_TITLE_CHANGE';
export const LIST_EDITOR_IS_EXCLUSIVE_CHANGE = 'LIST_EDITOR_IS_EXCLUSIVE_CHANGE';
export const LIST_EDITOR_RESET               = 'LIST_EDITOR_RESET';
export const LIST_EDITOR_SETUP               = 'LIST_EDITOR_SETUP';

export const LIST_CREATE_REQUEST = 'LIST_CREATE_REQUEST';
export const LIST_CREATE_SUCCESS = 'LIST_CREATE_SUCCESS';
export const LIST_CREATE_FAIL    = 'LIST_CREATE_FAIL';

export const LIST_UPDATE_REQUEST = 'LIST_UPDATE_REQUEST';
export const LIST_UPDATE_SUCCESS = 'LIST_UPDATE_SUCCESS';
export const LIST_UPDATE_FAIL    = 'LIST_UPDATE_FAIL';

=======
>>>>>>> v4.4.0
export const LIST_DELETE_REQUEST = 'LIST_DELETE_REQUEST';
export const LIST_DELETE_SUCCESS = 'LIST_DELETE_SUCCESS';
export const LIST_DELETE_FAIL    = 'LIST_DELETE_FAIL';

export * from './lists_typed';

export const fetchList = id => (dispatch, getState) => {
  if (getState().getIn(['lists', id])) {
    return;
  }

  dispatch(fetchListRequest(id));

  api().get(`/api/v1/lists/${id}`)
    .then(({ data }) => dispatch(fetchListSuccess(data)))
    .catch(err => dispatch(fetchListFail(id, err)));
};

export const fetchListRequest = id => ({
  type: LIST_FETCH_REQUEST,
  id,
});

export const fetchListSuccess = list => ({
  type: LIST_FETCH_SUCCESS,
  list,
});

export const fetchListFail = (id, error) => ({
  type: LIST_FETCH_FAIL,
  id,
  error,
});

<<<<<<< HEAD
export const fetchLists = () => (dispatch) => {
  dispatch(fetchListsRequest());

  api().get('/api/v1/lists')
    .then(({ data }) => dispatch(fetchListsSuccess(data)))
    .catch(err => dispatch(fetchListsFail(err)));
};

export const fetchListsRequest = () => ({
  type: LISTS_FETCH_REQUEST,
});

export const fetchListsSuccess = lists => ({
  type: LISTS_FETCH_SUCCESS,
  lists,
});

export const fetchListsFail = error => ({
  type: LISTS_FETCH_FAIL,
  error,
});

export const submitListEditor = shouldReset => (dispatch, getState) => {
  const listId      = getState().getIn(['listEditor', 'listId']);
  const title       = getState().getIn(['listEditor', 'title']);
  const isExclusive = getState().getIn(['listEditor', 'isExclusive']);

  if (listId === null) {
    dispatch(createList(title, shouldReset));
  } else {
    dispatch(updateList(listId, title, shouldReset, isExclusive));
  }
};

export const setupListEditor = listId => (dispatch, getState) => {
  dispatch({
    type: LIST_EDITOR_SETUP,
    list: getState().getIn(['lists', listId]),
  });

  dispatch(fetchListAccounts(listId));
};

export const changeListEditorTitle = value => ({
  type: LIST_EDITOR_TITLE_CHANGE,
  value,
});

export const changeListEditorIsExclusive = value => ({
  type: LIST_EDITOR_IS_EXCLUSIVE_CHANGE,
  value,
});

export const createList = (title, shouldReset) => (dispatch) => {
  dispatch(createListRequest());

  api().post('/api/v1/lists', { title }).then(({ data }) => {
    dispatch(createListSuccess(data));

    if (shouldReset) {
      dispatch(resetListEditor());
    }
  }).catch(err => dispatch(createListFail(err)));
};

export const createListRequest = () => ({
  type: LIST_CREATE_REQUEST,
});

export const createListSuccess = list => ({
  type: LIST_CREATE_SUCCESS,
  list,
});

export const createListFail = error => ({
  type: LIST_CREATE_FAIL,
  error,
});

export const updateList = (id, title, shouldReset, isExclusive, replies_policy) => (dispatch) => {
  dispatch(updateListRequest(id));

  api().put(`/api/v1/lists/${id}`, { title, replies_policy, exclusive: typeof isExclusive === 'undefined' ? undefined : !!isExclusive }).then(({ data }) => {
    dispatch(updateListSuccess(data));

    if (shouldReset) {
      dispatch(resetListEditor());
    }
  }).catch(err => dispatch(updateListFail(id, err)));
};

export const updateListRequest = id => ({
  type: LIST_UPDATE_REQUEST,
  id,
});

export const updateListSuccess = list => ({
  type: LIST_UPDATE_SUCCESS,
  list,
});

export const updateListFail = (id, error) => ({
  type: LIST_UPDATE_FAIL,
  id,
  error,
});

export const resetListEditor = () => ({
  type: LIST_EDITOR_RESET,
});

=======
>>>>>>> v4.4.0
export const deleteList = id => (dispatch) => {
  dispatch(deleteListRequest(id));

  api().delete(`/api/v1/lists/${id}`)
    .then(() => dispatch(deleteListSuccess(id)))
    .catch(err => dispatch(deleteListFail(id, err)));
};

export const deleteListRequest = id => ({
  type: LIST_DELETE_REQUEST,
  id,
});

export const deleteListSuccess = id => ({
  type: LIST_DELETE_SUCCESS,
  id,
});

export const deleteListFail = (id, error) => ({
  type: LIST_DELETE_FAIL,
  id,
  error,
});
