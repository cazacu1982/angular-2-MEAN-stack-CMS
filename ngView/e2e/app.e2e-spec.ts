import { NgViewPage } from './app.po';

describe('ng-view App', function() {
  let page: NgViewPage;

  beforeEach(() => {
    page = new NgViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
