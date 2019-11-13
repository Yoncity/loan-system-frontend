const initialState = {
  auth: {
    isAuth: localStorage.getItem("loan-system-token") || null,
    currentUser: {}
  },
  profile: {
    profile: {
      username: null,
      capital: null
    }
  }
};

export default initialState;
