import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './hero-list';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Hero[]  {
    return HEROES;
  }

  getHeroByName(name: string): Hero {
    return HEROES.find(x => x.name == name);
  }

  getHeroById(id: number): Hero {
    return HEROES.find(x => x.id == id);
  }
}
