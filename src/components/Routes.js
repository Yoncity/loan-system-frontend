import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import SignInPage from "../pages/SignInPage";
import UpdateLoanPage from "../pages/UpdateLoanPage";
import BorrowerPage from "../pages/BorrowerPage";
import DashBoardPage from "../pages/DashboardPage";

import * as routes from "../constants/routes";

const Routes = ({ isAuth }) => (
  <Router>
    <Switch>
      <Route
        exact
        path={routes.UPDATE_LOAN}
        render={props =>
          isAuth ? (
            <UpdateLoanPage {...props} />
          ) : (
            <Redirect to={routes.SIGN_IN} />
          )
        }
      />

      <Route
        exact
        path={routes.BORROWER}
        render={props =>
          isAuth ? (
            <BorrowerPage {...props} />
          ) : (
            <Redirect to={routes.SIGN_IN} />
          )
        }
      />

      <Route
        exact
        path={routes.HOME}
        render={props =>
          isAuth ? (
            <DashBoardPage {...props} />
          ) : (
            <Redirect to={routes.SIGN_IN} />
          )
        }
      />

      <Route
        exact
        path={routes.SIGN_IN}
        render={props =>
          isAuth ? <Redirect to={routes.HOME} /> : <SignInPage {...props} />
        }
      />
    </Switch>
  </Router>
);

const mapState = ({ authenticate: { isAuth } }) => ({
  isAuth
});

export default connect(
  mapState,
  null
)(Routes);
