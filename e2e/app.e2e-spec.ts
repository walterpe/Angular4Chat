import { Angular4ChatPage } from './app.po';

describe('angular4-chat App', () => {
  let page: Angular4ChatPage;

  beforeEach(() => {
    page = new Angular4ChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
