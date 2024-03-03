type Spamton = typeof import('../fixtures/spamton.json');
type NewCourse = typeof import('../fixtures/new-course.json');

beforeEach(() => {
  cy.fixture('spamton.json').as('spamton');
});

describe('Course list page', () => {
  it('presents a list of course links and a link to course creation', () => {
    cy.visit('/courses');

    // We should have a list of links to courses
    cy.findAllByTestId('course-link')
      .should('have.length.above', 0)
      .and(($courseLinks) => {
        $courseLinks.each(function () {
          expect(this.getAttribute('href')).to.match(/^\/courses\/\d+$/);
        });
      });

    // And also a link to create more courses
    cy.findByRole('link', { name: 'Create New Course' });
  });
});

describe('Course detail page', () => {
  it('presents course information and a link to return to course listing', () => {
    cy.visit('/courses/1');

    // Page should have title, description, and link to course listing
    cy.findByRole('heading', { level: 1 });
    cy.findByTestId('description');
    cy.findByRole('link', { name: 'Back to list' }).should('have.attr', 'href', '/courses');

    // Course update and delete links should not be there
    cy.findByRole('link', { name: 'Update Course' }).should('not.exist');
    cy.findByRole('link', { name: 'Delete Course' }).should('not.exist');
  });

  it('only also presents update and deletion links if course author is logged in', function () {
    // Login to view auth-only links
    const user: Spamton = this.spamton;
    cy.login(user.emailAddress, user.password);

    cy.visit('/courses/1');

    cy.findByRole('link', { name: 'Back to list' }).should('have.attr', 'href', '/courses');

    // Course update/delete links should be there this time
    cy.findByRole('link', { name: 'Update Course' });
    cy.findByRole('link', { name: 'Delete Course' });
  });
});

describe('Course creation page', () => {
  beforeEach(() => {
    cy.fixture('new-course.json').as('newCourse');
  });

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
          expect(this.textContent).to.match(/required/i);
        });
      });
  });

  it('redirects to page of newly created course', function () {
    // Login to access page
    const user: Spamton = this.spamton;
    cy.login(user.emailAddress, user.password);

    const courseData: NewCourse = this.newCourse;

    // First ensure that a course with this title doesn't exist
    cy.visit('/courses');
    cy.findAllByTestId('course-link')
      .should('have.length.above', 0)
      .should(($courseLink) => {
        $courseLink.each(function () {
          expect(this.textContent).not.to.equal(courseData.title);
        });
      });

    // Actually go to the page to create the new page
    cy.visit('/courses/new');

    cy.findByPlaceholderText('Course title...').type(courseData.title);
    cy.findByPlaceholderText('Course description...').type(courseData.description);

    cy.findByText('Create Course').click();

    // We should be redirected to the new course
    cy.url().should('match', /\/courses\/\d+$/);
    cy.findByRole('heading', { level: 1 }).should('have.text', courseData.title);

    // And it should show up in the course listing as well
    cy.findByText('Back to list').click();
    cy.findAllByTestId('course-link').last().should('have.text', courseData.title);
  });
});

describe('Course delete page', () => {
  it('redirects to authentication page if no user is signed in', () => {
    cy.visit('/courses/1/delete');
    cy.url().should('not.contain', '/courses/1/delete');
  });

  it('should remove course from course listing only after correct title is input', function () {
    // Login to access page
    const user: Spamton = this.spamton;
    cy.login(user.emailAddress, user.password);

    cy.visit('/courses/1/delete');

    // Find the warnings of the irrecoverability of deletion
    const warningPRegex = /"(.+)" course/;
    cy.findByRole('heading', { level: 1, name: 'WARNING!' });
    cy.findByText(warningPRegex)
      .then(($p) => {
        // Extract the course title we must type in
        const result = warningPRegex.exec($p.text());

        expect(result).to.not.be.null;

        return result[1];
      })
      .as('title');

    // First attempt to submit without typing anything in
    cy.findByRole('button', { name: 'DELETE course' }).click();

    // Expect an alert to appear and the URL not to change
    cy.findByRole('alert');
    cy.url().should('contain', '/courses/1/delete');

    // Type in the needed title to actually confirm the deletion
    cy.get('@title').then((title) => {
      cy.findByPlaceholderText('Confirm Title...').type(title.toString());
    });

    cy.findByRole('button', { name: 'DELETE course' }).click();

    // We should be back to the course listing, and the course with the given title should not exist
    cy.url().should('match', /\/courses$/);

    cy.get('@title').then((title) => {
      cy.findByRole('link', { name: title.toString() }).should('not.exist');
    });
  });
});
