import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero-service/hero';
import { HeroService } from '../hero-service/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() hero: Hero;

  constructor(public heroSerivce: HeroService) { }

  ngOnInit() {
  }

}
