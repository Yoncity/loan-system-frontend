import * as types from "../../actionTypes/profile/profileTypes";
import axios from "axios";

export const getProfileStarted = () => ({
  type: types.GET_PROFILE_STARTED
});

export const getProfileSuccess = profile => ({
  type: types.GET_PROFILE_SUCCESS,
  payload: { profile }
});
export const getProfileError = error => ({
  type: types.GET_PROFILE_ERROR,
  payload: { error }
});

const getProfile = () => async dispatch => {
  dispatch(getProfileStarted());
  try {
    const url = `http://localhost:3000/api/v1/auth/profile/`;
    const token = localStorage.getItem("loan-system-token");
    const res = await axios.request({
      method: "GET",
      url,
      headers: {
        authorization: `Bearer ${token}`
      },
      responseType: "json",
      transformResponse: [
        data => {
          if (data.status !== 200) throw new Error(data.message);
          return data;
        }
      ]
    });
    dispatch(getProfileSuccess(res.data.profile));
  } catch (error) {
    dispatch(getProfileError(error.message));
  }
};

export default getProfile;
