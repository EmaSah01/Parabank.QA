// cypress/support/commands.js
import LoginPage from '../pages/LoginPage';
// main command
Cypress.Commands.add('ensureLoggedIn', (u = Cypress.env('USER_NAME'), p = Cypress.env('USER_PASS')) => {
  cy.visit('/', { failOnStatusCode: false });

  cy.get('body').then($b => {
    if ($b.text().includes('Log Out')) return;

    LoginPage.visit();
    LoginPage.login(u, p);
  });

  cy.get('body', { timeout: 15000 }).should($b => {
    const txt = $b.text();
    const ok = /Log Out|Accounts Overview|Bill Pay/i.test(txt);
    expect(ok, 'Logged-in marker (Log Out / Accounts Overview / Bill Pay)').to.be.true;
  });
});

// cypress/support/commands.js
Cypress.Commands.add('logoutUI', () => {
  cy.get('body', { timeout: 2000 }).then($b => {
    const hasLogout = /Log Out/i.test($b.text());
    if (hasLogout) {
      // use contains guarded by hasLogout, so it won’t retry/throw
      cy.contains('a', 'Log Out', { matchCase: false }).click({ force: true });
    }
  });
});


// 🔁 alias to keep old specs happy
Cypress.Commands.add('loginUI', (u, p) => cy.ensureLoggedIn(u, p));
