import gaster from '../fixtures/gaster.json';
import spamton from '../fixtures/spamton.json';

describe('Authentication subsystem', () => {
  it('shows signin and signup links to unauthenticated user', () => {
    cy.visit('/courses');

    cy.findByText('Sign In').should('exist');
    cy.findByText('Sign Up').should('exist');
  });

  it('displays error when user attempts to sign in with incorrect credentials', () => {
    cy.visit('/signin');
    cy.findByRole('alert').should('not.exist');

    // Input credentials for non-existent user
    cy.findByLabelText('Email Address').type(gaster.emailAddress);
    cy.findByLabelText('Password').type(gaster.password);
    cy.findByText('Submit').click();

    cy.findByRole('alert').should('exist');
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
    cy.findByText(/^Welcome /).should('exist');
    cy.findByText('Sign Out').should('exist');
  });

  it('reverts to unauthenticated state after signout', () => {
    cy.login(spamton.emailAddress, spamton.password);

    cy.findByText('Sign Out').click();

    cy.findByText('Sign In').should('exist');
    cy.findByText('Sign Up').should('exist');
  });

  it('ensures fields on signup page are filled');

  it('ensures uniqueness of user emails on signup page');

  it('ensures password is confirmed on signup page');

  it('signs in the newly created user after successful signup');
});
