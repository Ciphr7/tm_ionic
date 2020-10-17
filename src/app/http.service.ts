import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText';
  apikey = 'bU03MSs2UjZIS21HMG5QSlIxUTB4QT090';

  constructor(private http: HttpClient) { }

  getPSDCLocs(locSearch : string): Observable<any>{
    // return this.http.get(`${this.url}&apikey={this.apiKey}`)
    //return this.http.get(encodeURI(`${this.url}=${searchLoc}&apikey=${this.apikey}`))
    return this.http.get(encodeURI(`${this.url}=${locSearch}&apikey=${this.apikey}`))
    .pipe(
      map (results => {
        //console.log('RAW', results);
        return results})
    );
  }
}
