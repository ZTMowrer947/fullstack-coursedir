describe('Course list page', () => {
  it('presents a list of course links and a link to course creation');
});

describe('Course detail page', () => {
  it('presents course information and a link to return to course listing');

  it('only also presents update and deletion links if course author is logged in');
});

describe('Course creation page', () => {
  it('redirects to authentication page if no user is signed in');

  it('properly handles invalid form input');

  it('redirects to page of newly created course');
});
