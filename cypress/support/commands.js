// cypress/support/commands.js
import LoginPage from '../pages/LoginPage';

Cypress.Commands.add('loginUI', (u = 'john', p = 'demo') => {
  LoginPage.visit();
  LoginPage.login(u, p);
});

Cypress.Commands.add('logoutUI', () => {
  cy.contains('Log Out').click({ force: true });
});
