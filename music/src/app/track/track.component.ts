import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SpotifyService} from '../search/spotify.service';

@Component({
  selector: 'track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  id:string;
  track:Object;

  constructor(private spotify: SpotifyService, private route:ActivatedRoute, private location:Location) {
    route.params.subscribe(params => {this.id = params['id'];});
  }

  ngOnInit(): void {
    this.spotify.getTrack(this.id).subscribe((res:any) => this.renderTrack(res));
  }

  back():void{
    this.location.back;
  }

  renderTrack(res: any): void{
    this.track = res;
  }

}
