import { ADD_FILTER, REMOVE_FILTER, CLEAR_FILTERS } from './../types';
import {
  addElementToArray,
  removeElementFromArray,
} from './../../utils/Helper';

const initialState = {
  createdFilters: [],
  historyFilters: [],
};
const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FILTER:
      return {
        ...state,
        createdFilters: addElementToArray(state.createdFilters, payload),
        historyFilters: addElementToArray(state.createdFilters, payload),
      };
    case REMOVE_FILTER:
      return {
        ...state,
        createdFilters: removeElementFromArray(state.createdFilters, payload),
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        createdFilters: [],
      };
    default:
      return state;
  }
};

export default mainReducer;
