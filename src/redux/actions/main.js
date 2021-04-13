import { ADD_FILTER, REMOVE_FILTER, CLEAR_FILTERS } from './../types';

export const addFilter = (payload) => ({
  type: ADD_FILTER,
  payload,
});

export const removeFilter = (payload) => ({
  type: REMOVE_FILTER,
  payload,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});
