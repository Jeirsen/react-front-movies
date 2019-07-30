import React, { Component } from "react";
import moment from "moment";
import { Modal, Button } from "semantic-ui-react";

import BookingService from "../services/BookingService";

class MovieDetail extends Component {
  state = {
    movie: null,
    open: false,
    clientName: "",
    cellPhone: "",
    clientId: "",
    email: ""
  };

  componentWillMount() {
    let { movie } = this.props;
    this.setState({
      movie
    });
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCreate = () => {
    // Missing Handle Validation
    let { movie, clientName, cellPhone, clientId, email } = this.state;

    let body = {
      movie_id: movie.id,
      presentation_date: "2019-08-09",
      client_identification: clientId,
      client_name: clientName,
      email,
      cell_phone: cellPhone
    };

    BookingService.createBooking(body)
      .then(response => {
        if (response.data.success) {
          this.setState({
            open: false
          });
          this.props.onNewBookingCreated();
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    let {
      movie,
      open,
      dimmer,
      clientName,
      cellPhone,
      clientId,
      email
    } = this.state;

    const divStyle = {
      height: "300px"
    };

    return (
      <React.Fragment>
        <div
          className="ui card"
          onClick={this.show("blurring")}
          style={{ cursor: "pointer" }}
        >
          <div className="image" style={divStyle}>
            <img style={divStyle} src={movie.poster_url} alt={movie.name} />
          </div>
          <div className="content">
            <div className="header">
              {movie.name} - {moment(movie.init_presentation).format("MMM D")}
            </div>
          </div>
        </div>
        <Modal
          size="small"
          dimmer={dimmer}
          open={open}
          centered={false}
          onClose={this.close}
        >
          <Modal.Header>Reservar</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <form className="ui form">
                <div className="equal width fields">
                  <div className="field">
                    <label>Nombre Completo</label>
                    <input
                      placeholder="Nombre Completo"
                      name="clientName"
                      value={clientName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>Celular</label>
                    <input
                      placeholder="Celular"
                      name="cellPhone"
                      value={cellPhone}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="equal width fields">
                  <div className="field">
                    <label>Cédula</label>
                    <input
                      placeholder="Identificación"
                      name="clientId"
                      value={clientId}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>Correo Electrónico</label>
                    <input
                      placeholder="Correo Electronico"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.close}>
              Cancelar
            </Button>
            <Button
              primary
              icon="plus"
              labelPosition="right"
              content="Reservar Ahora"
              onClick={this.handleCreate}
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default MovieDetail;
