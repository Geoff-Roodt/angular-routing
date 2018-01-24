import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SpotifyService{
  static BASE_URL = 'https://api.spotify.com/v1';
  static API_KEY = 'foobar';

  constructor(private http:Http){}

  query( URL: string, params?: Array<string> ): Observable<any[]> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    const headers = new Headers({ Authorization: `Bearer ${SpotifyService.API_KEY}` });
    const options = new RequestOptions({ headers: headers });

    return this.http.request(queryURL, options).map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query:string){
    return this.search(query, 'track');
  }

}
export const SpotifyInjectable: Array<any> = [
  {provide: SpotifyService, useClass: SpotifyService}
];
