import * as types from "../../actionTypes/profile/profileTypes";

const profile = (state = {}, { payload, type }) => {
  switch (type) {
    case types.GET_PROFILE_STARTED:
      return { loading: true, error: null, profile: null };

    case types.GET_PROFILE_SUCCESS:
      return { loading: false, profile: payload.profile };

    case types.GET_PROFILE_ERROR:
      return { loading: false, error: payload.error };

    default:
      return state;
  }
};

export default profile;
