import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, API_PATH } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpclient: HttpClient) { }

  topRatedMovies(){
    return this.httpclient.get(`${API_PATH}/movie/top_rated${API_KEY}`).toPromise();

  }
}
