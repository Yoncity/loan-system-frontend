import { combineReducers } from "redux";
import authenticate from "./auth";
import addBorrower from "./borrower/addBorrower";
import getBorrowers from "./borrower/getBorrowers";
import updateBorrower from "./borrower/updateBorrower";
import profile from "./profile/profile";
import updateProfile from "./profile/updateProfile";

const reducers = combineReducers({
  authenticate,
  addBorrower,
  getBorrowers,
  updateBorrower,
  profile,
  updateProfile
});

export default reducers;
