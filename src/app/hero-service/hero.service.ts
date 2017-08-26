import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './hero-list';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }

  getHeroByName(name: string): Hero {
    return HEROES.find(x => x.name == name);
  }

  getHeroById(id: number): Hero {
    return HEROES.find(x => x.id == id);
  }

  getHeroesByTag(tag: string): Hero[] {
    return HEROES.filter(x => x.tags.indexOf(tag) !== -1);
  }

  getGoodTeamComp(): Hero[] {
    var team = [];
    var healers = this.getHeroesByTag("Support");
    var tanks = this.getHeroesByTag("Tank");

    var others = this.getHeroesByTag("Offense")
      .concat(this.getHeroesByTag("Defense"))
      .concat(this.getHeroesByTag("Support"))
      .concat(this.getHeroesByTag("Tank"));

    this.removeHeroFromArray(healers, this.getHeroByName("Symmetra"));

    var healer = healers[Math.floor(Math.random() * healers.length)];
    var tank = tanks[Math.floor(Math.random() * tanks.length)]
    team.push(healer);
    team.push(tank);

    this.removeHeroFromArray(others, healer);
    this.removeHeroFromArray(others, tank);

    for (var i = 0; i < 4; i++) {
      var nextHero = others[Math.floor(Math.random() * others.length)];
      team.push(nextHero);
      this.removeHeroFromArray(others, nextHero);
    }

    var teamHealerCount = team.filter(hero => hero.tags.indexOf("Support") !== -1).length;
    var teamTankCount = team.filter(hero => hero.tags.indexOf("Tank") !== -1).length;

    if (teamHealerCount > 2 || teamTankCount > 2) {
      console.log('doin it again' + teamHealerCount + " " + teamTankCount);
      return this.getGoodTeamComp();
    }

    console.log(teamHealerCount, teamTankCount);

    return this.shuffle(team);
  }

  getRandomHeroesByTag(tag: string, count: number): Hero[] {
    var randomedHeroes = [];
    var heroChoices = this.getHeroesByTag(tag);

    for (var i = 0; i < count; i++) {
      var hero = heroChoices[Math.floor(Math.random() * heroChoices.length)];
      randomedHeroes.push(hero);
      this.removeHeroFromArray(heroChoices, hero);
    }

    return this.shuffle(randomedHeroes);
  }

  getRandomHeroesByGender(gender: string, count: number): Hero[] {
    var randomedHeroes = [];
    var heroChoices = this.getHeroes().filter(x => x.gender == gender);

    for (var i = 0; i < count; i++) {
      if (heroChoices.length == 0) continue;
      var hero = heroChoices[Math.floor(Math.random() * heroChoices.length)];
      randomedHeroes.push(hero);
      this.removeHeroFromArray(heroChoices, hero);
    }

    return this.shuffle(randomedHeroes);
  }

  getHealers(count: number): Hero[] {
    var randomedHeroes = [];
    var healers = this.getHeroesByTag("Support");

    for (var i = 0; i < count; i++) {

      if (healers.length == 0) continue;

      var healer = healers[Math.floor(Math.random() * healers.length)];
      randomedHeroes.push(healer);
      this.removeHeroFromArray(healers, healer);
    }
    if (randomedHeroes.length > 5) {
      return this.shuffle(randomedHeroes);
    } else {
      return randomedHeroes;
    }
  }

  getAnyRandomHero(count: number): Hero[] {
    var randomedHeroes = [];
    var heroes = Array.from(HEROES);

    for (var i = 0; i < count; i++) {
      var hero = heroes[Math.floor(Math.random() * heroes.length)];
      randomedHeroes.push(hero);
      this.removeHeroFromArray(heroes, hero);
    }

    return this.shuffle(randomedHeroes);
  }

  private removeHeroFromArray(array: Hero[], hero: Hero) {
    var index = array.indexOf(hero);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  private shuffle(array: Hero[]): Hero[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
