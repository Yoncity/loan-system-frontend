import React, { Component } from "react";
import "./Borrower.scss";
import AddBorrower from "./AddBorrower/AddBorrower";
import EditBorrower from "./EditBorrower/EditBorrower";
import ViewBorrowers from "./ViewBorrowers/ViewBorrowers";
class Borrower extends Component {
  state = {
    editBorrower: false,
    slug: null
  };

  editBorrower = slug => {
    this.setState({ editBorrower: true, slug });
  };

  addBorrower = () => {
    this.setState({ editBorrower: false });
  };

  render() {
    return (
      <div id="borrower">
        <div id="add-borrower">
          {this.state.editBorrower ? (
            <EditBorrower
              addBorrower={this.addBorrower}
              slug={this.state.slug}
            />
          ) : (
            <AddBorrower />
          )}
        </div>
        <div id="view-borrowers">
          <ViewBorrowers editBorrower={this.editBorrower} />
        </div>
      </div>
    );
  }
}

export default Borrower;
