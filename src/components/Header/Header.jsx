import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

class Header extends Component {
  activePage = currentPage => {
    const page = this.props.location.pathname;
    switch (page) {
      case currentPage:
        return "header-link active";
      default:
        return "header-link";
    }
  };

  render() {
    return (
      <div id="header">
        <Link to={routes.HOME}>
          <div className={this.activePage(routes.HOME)}>Home</div>
        </Link>

        <Link to={routes.BORROWER}>
          <div className={this.activePage(routes.BORROWER)}>Borrower</div>
        </Link>

        <Link to={routes.UPDATE_LOAN}>
          <div className={this.activePage(routes.UPDATE_LOAN)}>Pay Loan</div>
        </Link>
      </div>
    );
  }
}

export default Header;
