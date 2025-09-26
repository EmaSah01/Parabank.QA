// cypress/e2e/auth/login.cy.js
// Purpose: verify login success + common failure paths WITHOUT using cy.session cache.

import LoginPage from '../../pages/LoginPage';

const VALID_USER = Cypress.env('USER_NAME') || 'john';
const VALID_PASS = Cypress.env('USER_PASS') || 'demo';

describe('Login', () => {
  beforeEach(() => {
    // Start fresh at login page and ensure we’re not already logged in
    cy.visit('/parabank/index.htm', { failOnStatusCode: false });
    cy.logoutUI(); // safe even if not logged in
    cy.visit('/parabank/index.htm', { failOnStatusCode: false });
  });

  it('logs in with valid credentials', () => {
    LoginPage.login(VALID_USER, VALID_PASS);

    // Stable post-login checks
    cy.get('#leftPanel').should('contain.text', 'Accounts');
    cy.location('pathname', { timeout: 15000 })
      .should('match', /overview|activity|accounts/i);

    // logout to leave clean state
    cy.logoutUI();
    cy.get('#leftPanel').should('contain.text', 'Customer Login');
  });

  it('shows error on invalid password', () => {
    LoginPage.login(VALID_USER, 'WRONG_PASS');

    // Parabank’s error text varies; assert broadly in the right panel
    cy.get('#rightPanel')
      .invoke('text')
      .then(t => {
        expect(
          /could not be verified|error|invalid|failed/i.test(t),
          `Expected an error message, got:\n${t.slice(0, 300)}…`
        ).to.be.true;
      });

    // Still on login or no “Log Out” present
    cy.get('body').should($b => {
      expect($b.text()).to.not.include('Log Out');
    });
  });

  it('rejects unknown user', () => {
    LoginPage.login(`unknown_${Date.now()}`, 'whatever');

    cy.get('#rightPanel')
      .invoke('text')
      .then(t => {
        expect(/could not be verified|error|invalid|failed/i.test(t)).to.be.true;
      });
  });

  it('requires both username and password (stays on login)', () => {
    // Try only username
    cy.get('input[name="username"]').clear().type(VALID_USER);
    cy.get('input[value="Log In"]').click();

    // Either an error is visible or we remain on the login panel
    cy.get('#rightPanel')
      .invoke('text')
      .then(t => {
        const stillOnLogin = /Customer Login|Username|Password/i.test(t);
        const sawError = /error|invalid|failed|verify/i.test(t);
        expect(stillOnLogin || sawError).to.be.true;
      });

    // Now try only password
    cy.visit('/parabank/index.htm', { failOnStatusCode: false });
    cy.get('input[name="password"]').clear().type(VALID_PASS);
    cy.get('input[value="Log In"]').click();

    cy.get('#rightPanel')
      .invoke('text')
      .then(t => {
        const stillOnLogin = /Customer Login|Username|Password/i.test(t);
        const sawError = /error|invalid|failed|verify/i.test(t);
        expect(stillOnLogin || sawError).to.be.true;
      });
  });
});
