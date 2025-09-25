class LoginPage {
  elements = {
    username: () => cy.get('input[name="username"]'),
    password: () => cy.get('input[name="password"]'),
    loginBtn:  () => cy.get('input[value="Log In"]'),
    error:     () => cy.get('#rightPanel p'),
  };

  visit() {
    cy.visit('/parabank/index.htm');
  }

  login(username, password) {
    this.elements.username().clear().type(username);
    this.elements.password().clear().type(password);
    this.elements.loginBtn().click();
  }
}

// 👇 ES Modules export
export default new LoginPage();
