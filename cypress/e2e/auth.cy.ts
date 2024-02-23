describe('Authentication subsystem', () => {
  it('shows signin and signup links to unauthenticated user', () => {
    cy.visit('/');

    cy.findByText('Sign In').should('exist');
    cy.findByText('Sign Up').should('exist');
  });

  it('displays error when user attempts to sign in with incorrect credentials');

  it('redirects to home page after the user successfully signs in');

  it('shows greeting and signout link to authenticated user');

  it('reverts to unauthenticated state after signout');

  it('ensures fields on signup page are filled');

  it('ensures uniqueness of user emails on signup page');

  it('ensures password is confirmed on signup page');

  it('signs in the newly created user after successful signup');
});
