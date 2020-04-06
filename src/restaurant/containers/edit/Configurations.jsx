import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Product from "../../../restaurant/components/edit/Configurations";
import { connect } from "react-redux";
import Configurations from "../../../restaurant/components/edit/Configurations";
const DB = firebase.db;

const mapStateToProps = (state) => {
  return {
    restaurantId: state.user.loginUser.restaurantID,
  };
};

class EditConfigurations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      phone: "",
      logoImage: "",
      backgroundImage: "",
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let doc = DB.collection("restaurants").doc(this.props.restaurantId);
    doc.get().then((restaurantInfo) => {
      this.setState({
        name: restaurantInfo.data().name,
        mail: restaurantInfo.data().mail,
        phone: restaurantInfo.data().phone,
        logoImage: restaurantInfo.data().logoImage,
        backgroundImage: restaurantInfo.data().backgroundImage,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let docRestaurant = DB.collection("restaurants").doc(
      this.props.restaurantId
    );
    docRestaurant.update(this.state);
    firebase.succesfullMsg("Information updated!");
    this.props.history.push(`/configurations`);
  }

  handleInputs(e) {
    let key = e.target.name;
    let input = e.target.value;
    this.setState({
      [key]: input,
    });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Configurations
          inputs={this.handleInputs}
          submit={this.handleSubmit}
          restaurant={this.state}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditConfigurations);