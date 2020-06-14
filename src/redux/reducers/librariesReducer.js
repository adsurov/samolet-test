import { LIBRARIES_LOADING, LIBRARIES_DOWNLOADED } from "../actions/librariesActions";

const initialState = {
  libraries: [],
  isLoading: false
};
export const librariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIBRARIES_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case LIBRARIES_DOWNLOADED:
      return {
        ...state,
        libraries: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
