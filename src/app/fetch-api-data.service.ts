import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-21197.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
    this.http = http;
  }

  // Making the api call for the user registration endpoint
  /**
   * calls API endpoint to register a new user
   * @param userDetails
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError));
  }
  /**
   * calls API endpoint to login an existing user
   * @param userDetails
   * @returns data of the user in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //Error Handler
  /**
   * handles errors
   * @param error
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  //Get all movies
  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http.get(apiUrl + `movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  //Get one movie
  /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param Title
   * @returns JSON object holding movie data
   */
  public getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get director
  /**
   * calls API endpoint to get data on a director
   * @param name
   * @returns JSON obejct holding director data
   */
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http
      .get(apiUrl + `movies/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get genre
  /**
   * calls API endpoint to get data on a genre
   * @param name
   * @returns JSON object holding genre data
   */
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http
      .get(apiUrl + `genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get list of favorite movies of this user
   * @returns list of the user's favorite movies in JSON format
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Add a movie to favorite Movies
  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */
  public addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Edit user
  /**
   * calls API endpoint to allow user to update their user information
   * @param updateDetails
   * @returns JSON object holding data about the updated user
   */
  public editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Delete a movie from the favorite movies list
  /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */
  public removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to deregister an existing user
   * @returns	A success message indicating that the profile was successfully deleted.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
