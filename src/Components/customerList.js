import React, { Component } from "react";
import ReactTable from "react-table";
import SkyLight from "react-skylight";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import CalendarToday from "@material-ui/icons/CalendarToday";
import ListAlt from "@material-ui/icons/ListAlt";
import "react-table/react-table.css";
import '../App.css';

class Customerlist extends Component {
  constructor(params) {
    super(params);
    this.state = {
      customers: [],
      trainings: [],
      alltrainings: []
    };
    this.addModal1 = React.createRef();
    this.addModal2 = React.createRef();
  }

  componentDidMount() {
    this.listCustomers();
  }

  // To list all the customers
  listCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ customers: responseData.content });
      });
  };

  // To list all the trainings
  listAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ alltrainings: responseData });
      });
    this.addModal1.current.show();
  };

  // Get trainings of a specific customer
  getTrainings = link => {
    fetch(link)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData.content
        });
      });

    this.addModal2.current.show();
  };

  render() {

    var modalStyle = {
      backgroundColor: 'yellow',
      color: 'blue'
     };
     var modalStyle2 = {
      backgroundColor: 'red',
      color: 'yellow'
     };

    const customerColumns = [
      {
        Header: "Firstname",
        accessor: "firstname"
      },
      {
        Header: "Lastname",
        accessor: "lastname"
      },
      {
        Header: "Street address",
        accessor: "streetaddress"
      },
      {
        Header: "Postal code",
        accessor: "postcode"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Training sessions",
        accessor: "links[2].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Button
            variant="contained"
            size="small"
            onClick={() => this.getTrainings(value)}
          ><CalendarToday style={{color: 'blue'}}></CalendarToday>
          </Button>
        )
      }
    ];

    const trainingColumns = [
      {
        Header: "Firstname",
        accessor: "customer.firstname"
      },
      {
        Header: "Lastname",
        accessor: "customer.lastname"
      },
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("MMM Do YYYY, h:mm a")
      },
      {
        Header: "Duration (in minutes)",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      }
    ];

    const individualTrainingColumns = [
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("MMM Do YYYY, h:mm a")
      },
      {
        Header: "Duration (in minutes)",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      }
    ];

    return (
      <div>
        <Button id="showallbutton" variant="contained" color="secondary" padding-bottom="2px" onClick={this.listAllTrainings}><ListAlt style={{color: 'yellow'}}></ListAlt><p style={{color: 'yellow'}}>List all trainings</p></Button>
        <ReactTable
          filterable={true}
          defaultPageSize={10}
          className="maintable -striped -highlight"
          data={this.state.customers}
          columns={customerColumns}
        />
        <SkyLight hideOnOverlayClicked ref={this.addModal2} dialogStyles={modalStyle}>
          <h3>Personalized Trainings Sessions</h3>
          <ReactTable
            filterable={true}
            defaultPageSize={10}
            className="-striped -condensed - highlight -bordered"
            data={this.state.trainings}
            columns={individualTrainingColumns}
          />
        </SkyLight>
        <SkyLight hideOnOverlayClicked ref={this.addModal1} dialogStyles={modalStyle2}>
          <h3>All trainings</h3>
          <ReactTable
            filterable={true}
            defaultPageSize={10}
            className="-striped -highlight"
            data={this.state.alltrainings}
            columns={trainingColumns}
          />
        </SkyLight>
      </div>
    );
  }
}

export default Customerlist;