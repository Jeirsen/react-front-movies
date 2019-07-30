import axios from "axios";

class MovieService {
  constructor() {
    this.getMovieList = this.getMovieList.bind(this);
    this.getMoviesByDate = this.getMoviesByDate.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  getMovieList() {
    return axios
      .get("http://localhost:3000/list-movies")
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(`An error occurred trying to get the movies, ${error}.`);
        return Promise.reject(error);
      });
  }

  getMoviesByDate(startDate, endDate) {
    return axios
      .get("http://localhost:3000/list-movies", {
        params: {
          init_presentation: startDate,
          end_presentation: endDate
        }
      })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(`An error occurred trying to get the movies, ${error}.`);
        return Promise.reject(error);
      });
  }

  createMovie(body) {
    return axios
      .post("http://localhost:3000/movie", body)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(
          `An error occurred on the creation on the new movie, ${error}.`
        );
        return Promise.reject(error);
      });
  }
}

export default new MovieService();
