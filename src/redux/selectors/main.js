import { createSelector } from 'reselect';
const selectMain = (store) => store.main;

export const selectCreatedFilters = createSelector(
  [selectMain],
  (main) => main.createdFilters
);

export const selectHistoryFilters = createSelector(
  [selectMain],
  (main) => main.historyFilters
);
