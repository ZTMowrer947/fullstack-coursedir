import gaster from '../fixtures/gaster.json';
import spamton from '../fixtures/spamton.json';

describe('Authentication subsystem', () => {
  it('shows signin and signup links to unauthenticated user', () => {
    cy.visit('/courses');

    cy.findByText('Sign In');
    cy.findByText('Sign Up');
  });

  it('displays error when user attempts to sign in with incorrect credentials', () => {
    cy.visit('/signin');
    cy.findByRole('alert').should('not.exist');

    // Input credentials for non-existent user
    cy.findByLabelText('Email Address').type(gaster.emailAddress);
    cy.findByLabelText('Password').type(gaster.password);
    cy.findByText('Submit').click();

    cy.findByRole('alert');
    cy.url().should('contain', '/signin');
  });

  it('redirects to home page and shows greeting after the user successfully signs in', () => {
    cy.visit('/signin');

    // Input credentials of an actual user
    cy.findByLabelText('Email Address').type(spamton.emailAddress);
    cy.findByLabelText('Password').type(spamton.password);
    cy.findByText('Submit').click();

    cy.findByRole('alert').should('not.exist');
    cy.url().should('not.contain', '/signin');

    cy.findByText('Sign In').should('not.exist');
    cy.findByText('Sign Up').should('not.exist');
    cy.findByText(/^Welcome /);
    cy.findByText('Sign Out');
  });

  it('should redirect back to homepage from signin/signup pages if a user is already signed in', () => {
    cy.login(spamton.emailAddress, spamton.password);
    cy.visit('/signin');
    cy.url().should('not.contain', '/signin');

    cy.visit('/signup');
    cy.url().should('not.contain', '/signup');
  });

  it('reverts to unauthenticated state after signout', () => {
    cy.login(spamton.emailAddress, spamton.password);
    cy.visit('/courses');

    cy.findByText('Sign Out').click();

    cy.findByText('Sign In');
    cy.findByText('Sign Up');
  });

  it('properly handles invalid signup submissions', () => {
    cy.visit('/signup');

    cy.findByText('Submit').click();

    // Expect required alerts on every field
    cy.findAllByRole('alert')
      .should('have.length', 5)
      .and(($alerts) => {
        $alerts.each(function () {
          expect(this.textContent).to.match(/required/);
        });
      });

    // Fill in mostly existing data but with mismatching passwords
    cy.findByLabelText('First Name').type(spamton.firstName);
    cy.findByLabelText('Last Name').type(spamton.lastName);
    cy.findByLabelText('Email Address').type(spamton.emailAddress);
    cy.findByLabelText('Password').type(spamton.password);
    cy.findByLabelText('Confirm Password').type(gaster.password);

    // Now there should be only 1 alert, relating to the password field
    cy.findAllByRole('alert')
      .should('have.length', 1)
      .and(($p) => {
        expect($p.text()).to.match(/password( fields)? must match/i);
      });

    // Fix this confirmation error
    cy.findByLabelText('Confirm Password').type(`{selectall}{backspace}${spamton.password}`);
    cy.findByText('Submit').click();

    // Now there should be 1 alert, about a user already having this email
    cy.findAllByRole('alert')
      .should('have.length', 1)
      .and(($p) => {
        expect($p.text()).to.match(/email/i);
      });
  });

  it('signs in the newly created user after successful signup', () => {
    cy.visit('/signup');

    // Fill in the fields
    cy.findByLabelText('First Name').type(gaster.firstName);
    cy.findByLabelText('Last Name').type(gaster.lastName);
    cy.findByLabelText('Email Address').type(gaster.emailAddress);
    cy.findByLabelText('Password').type(gaster.password);
    cy.findByLabelText('Confirm Password').type(gaster.password);

    cy.findByText('Submit').click();

    // Verify that signup suceeded
    cy.url().should('not.contain', '/signup');
    cy.findByText(/Welcome /);
    cy.findByText('Sign Out');
  });
});
