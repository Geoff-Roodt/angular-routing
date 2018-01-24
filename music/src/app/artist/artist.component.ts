import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SpotifyService} from '../search/spotify.service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id:string;
  artist:Object;

  constructor(private spotify:SpotifyService, private route:ActivatedRoute, private location:Location) {
    route.params.subscribe(params => {this.id = params['id'];});
  }

  ngOnInit(): void {
    this.spotify.getArtist(this.id).subscribe((res: any) => this.renderArtist(res));
  }

  back():void{
    this.location.back();
  }

  renderArtist(res:any): void{
    this.artist = res;
  }

}
