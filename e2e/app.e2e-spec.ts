import { RandomWatchPage } from './app.po';

describe('random-watch App', () => {
  let page: RandomWatchPage;

  beforeEach(() => {
    page = new RandomWatchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
