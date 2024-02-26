type Spamton = typeof import('../fixtures/spamton.json');

beforeEach(() => {
  cy.fixture('spamton.json').as('spamton');
});

describe('Course list page', () => {
  it('presents a list of course links and a link to course creation');
});

describe('Course detail page', () => {
  it('presents course information and a link to return to course listing');

  it('only also presents update and deletion links if course author is logged in');
});

describe('Course creation page', () => {
  it('redirects to authentication page if no user is signed in', () => {
    cy.visit('/courses/new');
    cy.url().should('not.contain', '/courses/new');
  });

  it('properly handles invalid form input', function () {
    // Login to access page
    const user: Spamton = this.spamton;
    cy.login(user.emailAddress, user.password);

    cy.visit('/courses/new');

    // Attempt to submit form without any input
    cy.findByText('Create Course').click();

    // Expect two errors, both of a required field
    cy.findAllByRole('alert')
      .should('have.length', 2)
      .should(($alerts) => {
        $alerts.each(function () {
          expect($(this).text()).to.match(/required/i);
        });
      });
  });

  it('redirects to page of newly created course');
});
