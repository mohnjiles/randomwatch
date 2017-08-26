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
      case "Defense":
        this.getDefense();
        break;
      case "Offense":
        this.getOffense();
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

  getButtonClass(type: string): string {
    return type == this.lastRandomType ? "btn-warning" : "btn-jt";
  }

  getTanks(): void {
    this.lastRandomType = "Tanks";
    this.currentRandomedHeroes =
        this.heroService.getRandomHeroesByTag("Tank", this.heroCount);
  }

  getDefense(): void {
    this.lastRandomType = "Defense";
    this.currentRandomedHeroes =
        this.heroService.getRandomHeroesByTag("Defense", this.heroCount);
  }

  getOffense(): void {
    this.lastRandomType = "Offense";
    this.currentRandomedHeroes =
        this.heroService.getRandomHeroesByTag("Offense", this.heroCount);
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
