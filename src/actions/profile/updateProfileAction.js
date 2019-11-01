import * as types from "../../actionTypes/profile/updateProfileTypes";
import axios from "axios";

export const updateProfileStarted = () => ({
  type: types.UPDATE_PROFILE_STARTED
});

export const updateProfileSuccess = () => ({
  type: types.UPDATE_PROFILE_SUCCESS
});

export const updateProfileError = error => ({
  type: types.UPDATE_PROFILE_ERROR,
  payload: { error }
});

const updateProfile = capital => async dispatch => {
  dispatch(updateProfileStarted());
  try {
    const url = `http://localhost:3000/api/v1/auth/profile`;
    const token = localStorage.getItem("loan-system-token");
    await axios.request({
      method: "PUT",
      url,
      data: {
        capital
      },
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
    dispatch(updateProfileSuccess());
  } catch (error) {
    dispatch(updateProfileError(error.message));
  }
};

export default updateProfile;
