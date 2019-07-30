import React, { Component } from "react";
import { Header, Modal, Button } from "semantic-ui-react";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import MovieService from "../services/MoviesService";

class HeaderNewMovie extends Component {
  state = {
    open: false,
    startDate: null,
    endDate: null,
    name: "",
    description: "",
    posterURL: ""
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleDateChange = (startDate, endDate) => {
    console.log(startDate, endDate);
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCreate = () => {
    // Missing Handle Validation
    let { startDate, endDate, name, description, posterURL } = this.state;

    let body = {
      name,
      description,
      poster_url: posterURL,
      init_presentation: moment(startDate).format("YYYY-MM-DD"),
      end_presentation: moment(endDate).format("YYYY-MM-DD")
    };

    MovieService.createMovie(body)
      .then(response => {
        if (response.data.success) {
          this.setState({
            open: false
          });
          this.props.onNewMovieCreated();
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    let {
      open,
      dimmer,
      startDate,
      endDate,
      name,
      description,
      posterURL
    } = this.state;

    return (
      <div className="ui grid">
        <div className="left floated five wide column">
          <Header as="h2">Peliculas</Header>
        </div>
        <div className="right floated five wide column">
          <button
            className="ui large primary button right floated"
            onClick={this.show("blurring")}
          >
            <i aria-hidden="true" className="plus icon" />
            Crear Nueva Pelicula
          </button>
        </div>

        <Modal
          size="small"
          dimmer={dimmer}
          open={open}
          centered={false}
          onClose={this.close}
        >
          <Modal.Header>Crear Pelicula</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <form className="ui form">
                <div className="field">
                  <label>Titulo</label>
                  <input
                    placeholder="Titulo"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Sinopsis</label>
                  <input
                    placeholder="Sinopsis"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Poster URL</label>
                  <input
                    placeholder="Poster URL"
                    name="posterURL"
                    value={posterURL}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="field">
                  <label>Fechas</label>
                  <DateRangePicker
                    startDatePlaceholderText="Fecha Inicio"
                    endDatePlaceholderText="Fecha Fin"
                    startDate={startDate}
                    startDateId="startDateRange"
                    isOutsideRange={() => false}
                    minimumNights={0}
                    endDate={endDate}
                    endDateId="endDateRange"
                    onDatesChange={({ startDate, endDate }) =>
                      this.handleDateChange(startDate, endDate)
                    }
                    showClearDates
                    focusedInput={this.state.focused}
                    onFocusChange={focused => this.setState({ focused })}
                  />
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
              content="Crear Pelicula"
              onClick={this.handleCreate}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default HeaderNewMovie;
