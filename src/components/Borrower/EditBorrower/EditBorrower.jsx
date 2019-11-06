import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBorrower } from "../../../actions/updateBorrowerAction";

class EditBorrower extends Component {
  state = {
    borrowerInfo: {}
  };

  getFormFields = ({ target: { name, value } }) => {
    let tmp = this.state;
    if (!(Object.keys(tmp.borrowerInfo).length > 1)) {
      const { slug, borrowers } = this.props;
      const borrower = borrowers.find(b => b.slug === slug);
      tmp.borrowerInfo = borrower.borrowerInfo;
      this.setState(tmp);
    }
    tmp.borrowerInfo[name] = value;
    this.setState(tmp);
  };

  getBorrowerDetails = () => {
    const { slug, borrowers } = this.props;
    const borrower = borrowers.find(b => b.slug === slug);
    if (borrower) {
      return this.renderEditForm(borrower);
    }
  };

  renderEditForm = borrower => {
    const { borrowerInfo } = borrower;
    return (
      <React.Fragment>
        <form onSubmit={e => e.preventDefault()}>
          <div className="container" id="name_container">
            <p className="fields-title">
              Full Name{" "}
              <span style={{ color: "red" }}>
                {">>"} (REQUIRED FIELDS) {"<<"}
              </span>
            </p>
            <input
              type="text"
              name="firstname"
              onChange={this.getFormFields}
              placeholder={borrowerInfo.firstname}
            />
            <input
              type="text"
              name="lastname"
              onChange={this.getFormFields}
              placeholder={borrowerInfo.lastname}
            />
            <input
              type="text"
              name="idNumber"
              onChange={this.getFormFields}
              placeholder={borrowerInfo.idNumber}
            />
          </div>

          <div className="container" id="contact_container">
            <p className="fields-title">
              Contact{" "}
              <span style={{ color: "red" }}>
                {">>"} (REQUIRED FIELDS) {"<<"}
              </span>
            </p>
            <input
              type="text"
              name="phone"
              onChange={this.getFormFields}
              placeholder={borrowerInfo.phone}
            />
            <input
              type="text"
              name="address"
              onChange={this.getFormFields}
              placeholder={borrowerInfo.address}
            />
          </div>

          <input
            type="submit"
            id="edit-borrower-button"
            onClick={this.updateBorrowerInfo}
            value="UPDATE BORROWER DETAILS"
          />
        </form>
      </React.Fragment>
    );
  };

  updateBorrowerInfo = () => {
    const { updateBorrower, slug, addBorrower } = this.props;
    const { borrowerInfo } = this.state;
    updateBorrower({ borrowerInfo }, slug);
    addBorrower();
  };

  render() {
    return (
      <div id="edit-borrower">
        <p>Edit Borrower Info </p>
        {this.getBorrowerDetails()}
      </div>
    );
  }
}

const mapState = ({ getBorrowers: { borrowers } }) => ({
  borrowers
});

const mapDispatch = dispatch => ({
  updateBorrower: (borrower, slug) => dispatch(updateBorrower(borrower, slug))
});

export default connect(
  mapState,
  mapDispatch
)(EditBorrower);
