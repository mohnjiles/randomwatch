import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero-service/hero.service';
import { Hero } from './hero-service/hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RandomWatch';
  currentRandomedHeroes: Hero[];
  allHeroes: Hero[];

  private lastRandomType: string;
  private heroCount: number;

  constructor(public heroService: HeroService) { }

  ngOnInit(): void {
    this.heroCount = 1;
    this.currentRandomedHeroes = this.heroService.getAnyRandomHero(this.heroCount);
    this.lastRandomType = "Any";
  }

  updateRandom(): void {
    switch (this.lastRandomType) {
      case "GoodTeamComp":
        this.getGoodTeamComp();
        break;
      case "Tanks":
        this.getTanks();
        break;
      case "Healers":
        this.getHealers();
        break;
      case "Any":
        this.getAnyRandomHero();
        break;
    }
  }

  setHeroCount(heroCount: string): void {
    this.heroCount = +heroCount;
    this.updateRandom();
  }

  isSelected(heroCount: number): boolean {
    return +heroCount == this.heroCount;
  }

  getTanks(): void {
    this.lastRandomType = "Tanks";
    var randomedHeroes = this.heroService.getTanks(this.heroCount);

    this.currentRandomedHeroes = randomedHeroes;
  }

  getGoodTeamComp(): void {
    this.heroCount = 6;
    this.lastRandomType = "GoodTeamComp";
    this.currentRandomedHeroes = this.heroService.getGoodTeamComp();
  }

  getHealers(): void {
    this.lastRandomType = "Healers";
    this.currentRandomedHeroes = this.heroService.getHealers(this.heroCount);
  }

  getAnyRandomHero(): void {
    this.lastRandomType = "Any";
    this.currentRandomedHeroes = this.heroService.getAnyRandomHero(this.heroCount);
  }

}
