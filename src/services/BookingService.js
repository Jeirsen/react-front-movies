import axios from "axios";

class BookingService {
  constructor() {
    this.getBookingList = this.getBookingList.bind(this);
    this.getBookingListByDate = this.getBookingListByDate.bind(this);
    this.createBooking = this.createBooking.bind(this);
  }

  getBookingList() {
    return axios
      .get("http://localhost:3000/list-booking")
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(
          `An error occurred trying to get the booking list, ${error}.`
        );
        return Promise.reject(error);
      });
  }

  getBookingListByDate(presentation_date) {
    return axios
      .get("http://localhost:3000/list-booking", {
        params: {
          presentation_date
        }
      })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(
          `An error occurred trying to get the booking list, ${error}.`
        );
        return Promise.reject(error);
      });
  }

  createBooking(body) {
    return axios
      .post("http://localhost:3000/book-movie", body)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(
          `An error occurred on the creation on the new booking, ${error}.`
        );
        return Promise.reject(error);
      });
  }
}

export default new BookingService();
