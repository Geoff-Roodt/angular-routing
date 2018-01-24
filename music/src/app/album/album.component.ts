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

  constructor(private spotify: SpotifyService, private route:ActivatedRoute, private location: Location) {
    route.params.subscribe(params => {this.id = params['id'];});
  }

  ngOnInit(): void {
    this.spotify.getAlbum(this.id).subscribe((res: any) => this.renderAlbum(res));
  }

  renderAlbum(res:any):void{
    this.album = res;
  }

  back(): void{
    this.location.back();
  }

}
