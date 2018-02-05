import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SpotifyService} from './spotify.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  query:string;
  results:Object;

  constructor(public spotify: SpotifyService, private router:Router, private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {this.query = params['query'] || ''; });
  }

  search(): void{
    console.log('this.query', this.query);
    if (!this.query){
      return;
    }

    // Call into the Spotify Service to perform the search, and handle our response by calling into the renderResults method
    this.spotify.searchTrack(this.query).subscribe((res: any) => this.renderResults(res));
  }

  // If the response is valid, update our properties to reflect the search
  renderResults(res: any): void{
    this.results = null;
    if (res && res.tracks && res.tracks.items){
      this.results = res.tracks.items;
    }
  }

  // Navigate to the search endpoint with our search query
  submit(query: string): void{
    this.router.navigate(['search'], {queryParams: {query:query}}).then(_ => this.search());
  }

  // Refresh our spotify token to give us current access to the API
  refreshToken(): void{
    this.spotify.refreshToken();
  }

  // By default fire a search query when the page is initialised
  ngOnInit() {
    this.search();
  }

}
