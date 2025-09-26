class LoginPage {
  visit() {
    cy.visit('/', { failOnStatusCode: false });
  }
  login(user = Cypress.env('USER_NAME') || 'john', pass = Cypress.env('USER_PASS') || 'demo') {
    cy.get('input[name="username"]').clear().type(user);
    cy.get('input[name="password"]').clear().type(pass);
    cy.get('input[value="Log In"]').click();
  }
}
export default new LoginPage();
