import React, { Component } from "react";
import "./Borrower.scss";
import AddBorrower from "./AddBorrower/AddBorrower";
import ViewBorrowers from "./ViewBorrowers/ViewBorrowers";
class Borrower extends Component {
  state = {
    editBorrower: false
  };

  render() {
    return (
      <div id="borrower">
        <div id="add-borrower">
          <AddBorrower />
        </div>
        <div id="view-borrowers">
          <ViewBorrowers />
        </div>
      </div>
    );
  }
}

export default Borrower;
