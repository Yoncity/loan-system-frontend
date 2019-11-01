import * as types from "../actionTypes/authTypes";
import initialState from "../store/initialState";

const authenticate = (state = initialState.authState, { type, payload }) => {
  switch (type) {
    case types.AUTH_STARTED:
      return { ...state, loading: true, error: null };

    case types.AUTH_FAILED:
      return { ...state, loading: false, error: payload.error };

    case types.SET_NOT_AUTH:
      return { ...state, isAuth: false, currentUser: {} };

    case types.SET_AUTH_USER:
      return {
        ...state,
        loading: false,
        isAuth: payload.token,
        currentUser: payload.user
      };

    default:
      return { ...state };
  }
};

export default authenticate;
