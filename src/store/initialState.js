const initialState = {
  auth: {
    isAuth: localStorage.getItem("loan-system-token") || null,
    currentUser: {}
  }
};

export default initialState;
