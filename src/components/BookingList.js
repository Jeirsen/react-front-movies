import React, { Component } from "react";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import BookingService from "../services/BookingService";

class BookingList extends Component {
  state = {
    booking: [],
    startDate: null,
    endDate: null
  };

  componentDidMount() {
    this.getBookingList();
  }

  getBookingList() {
    BookingService.getBookingList()
      .then(response => {
        this.setState({
          booking: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDateChange = (startDate, endDate) => {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
    let init_date = moment(startDate).format("YYYY-MM-DD");
    let end_date = moment(endDate).format("YYYY-MM-DD");

    if (endDate !== null) {
      BookingService.getBookingListByDate(init_date).then(response => {
        this.setState({
          booking: response.data
        });
      });
    }
  };

  render() {
    let { booking, startDate, endDate } = this.state;
    return (
      <React.Fragment>
        <h1 className="ui header">Reservas Realizadas</h1>

        <div className="ui form">
          <div className="inline fields">
            <label>Selecciona Fecha</label>
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
        </div>
        <table className="ui single line table">
          <thead className="">
            <tr className="">
              <th className="">Película</th>
              <th className="">Nombre reservante</th>
              <th className="">Correo electrónico</th>
              <th className="">Cédula</th>
              <th className="">Celular</th>
            </tr>
          </thead>
          <tbody className="">
            {booking.map(booked => {
              return (
                <tr className="" key={booked.id}>
                  <td className="">{booked.name}</td>
                  <td className="">{booked.client_name}</td>
                  <td className="">{booked.email}</td>
                  <td className="">{booked.client_identification}</td>
                  <td className="">{booked.cell_phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default BookingList;
