// cypress/e2e/auth/login.cy.js
import LoginPage from '../../pages/LoginPage';

describe('Login', () => {
  it('logs in with valid creds', () => {
    LoginPage.visit();
    LoginPage.login('john', 'demo');
    cy.contains('Accounts Overview').should('be.visible');
    cy.url().should('include', '/overview.htm');
  });

  it('shows error on invalid password', () => {
    LoginPage.visit();
    LoginPage.login('john', 'wrongpass');
    LoginPage.elements.error().should('contain', 'could not be verified');
  });
});
