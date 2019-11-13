import * as types from '../../actionTypes/profile/profileTypes';
import initialState from '../../store/initialState';

const profile = (state = initialState.profile, { payload, type }) => {
  switch (type) {
    case types.GET_PROFILE_STARTED:
      return { ...state, loading: true };

    case types.GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: payload.profile };

    case types.GET_PROFILE_ERROR:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};

export default profile;
