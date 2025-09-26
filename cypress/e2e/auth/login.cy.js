// cypress/e2e/auth/login.cy.js
describe('Login', () => {
  it('logs in with valid creds', () => {
    cy.loginUI(); // uses env defaults
    cy.contains('#leftPanel', 'Accounts').should('be.visible');
    cy.logoutUI();
  });

  it('shows error on invalid password', () => {
    cy.visit('/parabank/index.htm');
    cy.get('input[name="username"]').type(Cypress.env('USER_NAME'));
    cy.get('input[name="password"]').type('NOT_THE_RIGHT_PASS');
    cy.get('input[value="Log In"], input[type="submit"]').click();

    // Parabank typically shows an error in the right panel
    cy.contains('#rightPanel', 'could not be verified').should('be.visible');
  });
});
