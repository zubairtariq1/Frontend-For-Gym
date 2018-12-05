import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SkyLight from "react-skylight";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import "../App.css";

class addcustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    }
    this.addModal = React.createRef();
  }

  // To Get input values
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  
  saveCustomers = event => {
    event.preventDefault();
    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    
    this.props.saveCustomers(customer);

    // This clears the previously inputted values from the textfields
    this.setState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
    this.addModal.current.hide();
  }

  render() {

    var modalStyle = {
        backgroundColor: 'yellow',
        color: 'blue'
       };
    
    return (
      <div>
        <Button id="addcustomer" variant="contained" className= "text-right" color="secondary" padding-bottom="2px" onClick={() => this.addModal.current.show()}><AddIcon style={{color: 'yellow'}}></AddIcon><p style={{color: 'yellow'}}>Add Customer</p></Button>
        <SkyLight dialogStyles={modalStyle} hideOnOverlayClicked ref={this.addModal} title="Add a new customer">
        <form onSubmit={this.saveCustomers}>
        <TextField
            placeholder="First name"
            name="firstname"
            onChange={this.handleChange}
            value={this.state.firstname}
          />
          <br />
          <TextField
            placeholder="Last name"
            name="lastname"
            onChange={this.handleChange}
            value={this.state.lastname}
          />
          <br />
          <TextField
            placeholder="Street address"
            name="streetaddress"
            onChange={this.handleChange}
            value={this.state.streetaddress}
          />
          <br />
          <TextField
            placeholder="Postal code"
            name="postcode"
            onChange={this.handleChange}
            value={this.state.postcode}
          />
          <br />
          <TextField
            placeholder="City"
            name="city"
            onChange={this.handleChange}
            value={this.state.city}
          />
          <br />
          <TextField
            placeholder="Email address"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br />
          <TextField
            placeholder="Phone number"
            name="phone"
            onChange={this.handleChange}
            value={this.state.phone}
          />
          <br />
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={this.saveCustomers}
          >
            <SaveIcon />
            Add
          </Button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default addcustomer;