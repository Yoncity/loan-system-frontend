import * as types from "../../actionTypes/profile/updateProfileTypes";

const updateProfile = (state = {}, { payload, type }) => {
  switch (type) {
    case types.UPDATE_PROFILE_STARTED:
      return { loading: true, error: null };

    case types.UPDATE_PROFILE_SUCCESS:
      return { loading: false };

    case types.UPDATE_PROFILE_ERROR:
      return { loading: false, error: payload.error };

    default:
      return state;
  }
};

export default updateProfile;
