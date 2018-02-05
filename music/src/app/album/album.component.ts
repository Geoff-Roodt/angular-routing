
// Import core Angular components
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SpotifyService} from '../search/spotify.service';

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id:string;
  album:Object;

  // Set our ID to the parameter that was passed in through the HTML when the component was created
  constructor(private spotify: SpotifyService, private route:ActivatedRoute, private location: Location) {
    route.params.subscribe(params => {this.id = params['id'];});
  }

  // By deafault, if the URL contains an album identity lets query the API and show the results
  ngOnInit(): void {
    this.spotify.getAlbum(this.id).subscribe((res: any) => this.renderAlbum(res));
  }

  // Update our album to have a current reference to the correct object
  renderAlbum(res:any):void{
    this.album = res;
  }

  // Navigate back to the last location (url reference)
  back(): void{
    this.location.back();
  }

}
