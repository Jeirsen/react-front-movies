import React, { Component } from "react";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import MovieService from "../services/MoviesService";
import HeaderNewMovie from "./HeaderNewMovie";
import MovieDetail from "./MovieDetail";

class ListMovies extends Component {
  state = {
    movieList: [],
    startDate: null,
    endDate: null
  };

  componentDidMount() {
    this.getMovieList();
  }

  handleList = () => {
    this.getMovieList();
  };

  handleBooking = () => {
    const { history } = this.props;
    if (history) history.push("/booking");
  };

  getMovieList() {
    MovieService.getMovieList()
      .then(response => {
        this.setState({
          movieList: response.data
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
      MovieService.getMoviesByDate(init_date, end_date).then(response => {
        this.setState({
          movieList: response.data
        });
      });
    }
  };

  render() {
    let { movieList, startDate, endDate } = this.state;
    return (
      <React.Fragment>
        <HeaderNewMovie onNewMovieCreated={this.handleList} />
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
        <div className="ui four cards">
          {movieList.map(movie => {
            return (
              <MovieDetail
                movie={movie}
                key={movie.id}
                onNewBookingCreated={this.handleBooking}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ListMovies;
