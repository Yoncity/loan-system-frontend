const initialState = {
  auth: {
    isAuth: localStorage.getItem("loan-system-token"),
    currentUser: {}
  }
};

export default initialState;
