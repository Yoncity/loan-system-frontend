import * as types from "../actionTypes/authTypes";

const authStarted = () => ({
  type: types.AUTH_STARTED
});

const setNotAuth = () => ({
  type: types.SET_NOT_AUTH
});

const setAuthUser = (user, token) => ({
  type: types.SET_AUTH_USER,
  payload: { user, token }
});

const authFailed = error => ({
  type: types.AUTH_FAILED,
  payload: { error }
});

export const signOut = () => async dispatch => {
  localStorage.removeItem("loan-system-token");
  dispatch(setNotAuth());
};

export const authenticate = ({ username, password }) => async dispatch => {
  dispatch(authStarted());
  try {
    dispatch(setAuthUser(null, null));
  } catch (error) {
    dispatch(authFailed(error));
  }
};
