/*
declare var System:any;
System.import('../../../scripts/spotifyKey.js').then(spotifyKey => spotifyKey.getToken());
*/

import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {HttpClient, HttpParams, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SpotifyService{
  static BASE_URL = 'https://api.spotify.com/v1';
  token:string;
  static ID = 'c4b072b092b645caad1bcf769e430734';
  static SECRET = 'b74f19676e864a01959513f307e22d70';

  constructor(private http:Http, private httpClient:HttpClient){
    this.refreshToken();
  }

  query( URL: string, params?: Array<string> ): Observable<any[]> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    const headers = new Headers({ Authorization: `Bearer ${this.token}` });
    const options = new RequestOptions({ headers: headers });

    return this.http.request(queryURL, options).map((res: any) => res.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query:string): Observable<any[]>{
    return this.search(query, 'track');
  }

  getTrack(id:string):Observable<any[]>{
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }

  refreshToken(): void{
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Access-Control-Allow-Origin', 'accounts.spotify.com');
    const body = new HttpParams().set('grant_type', 'client_credentials').set('client_id', SpotifyService.ID).set('client_secret', SpotifyService.SECRET)
    this.httpClient.post('https://accounts.spotify.com/api/token', body, {headers: header}).subscribe(response => this.token = response['access_token']);
  }

}
export const SpotifyInjectable: Array<any> = [
  {provide: SpotifyService, useClass: SpotifyService}
];
