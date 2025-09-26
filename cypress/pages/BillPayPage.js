import LoginPage from './LoginPage';

class BillPayPage {
  elements = {
    payeeName: () => cy.get('input[name="payee.name"]'),
    address:   () => cy.get('input[name="payee.address.street"]'),
    city:      () => cy.get('input[name="payee.address.city"]'),
    state:     () => cy.get('input[name="payee.address.state"]'),
    zip:       () => cy.get('input[name="payee.address.zipCode"]'),
    phone:     () => cy.get('input[name="payee.phoneNumber"]'),
    account:   () => cy.get('input[name="payee.accountNumber"]'),
    verify:    () => cy.get('input[name="verifyAccount"]'),
    amount:    () => cy.get('input[name="amount"]'),
    from:      () => cy.get('select[name="fromAccountId"]'),
    sendBtn:   () => cy.get('input[value="Send Payment"]'),
    panel:     () => cy.get('#rightPanel'),
    // potvrda (ako je rezultat panel vidljiv)
    confirm:   () => cy.contains(/Bill Payment Complete/i),
  };

  ensureLogged(username='john', password='demo') {
    // ako smo na loginu – uloguj se
    cy.get('body').then($b => {
      const bodyText = $b.text();
      const onLogin =
        bodyText.includes('Username') &&
        ($b.find('input[name="username"]').length > 0 || $b.find('input#username').length > 0);

      if (onLogin) {
        LoginPage.login(username, password);
      }
    });
  }

  open() {
    // idi direktno na billpay rutu (tolerantno na 5xx)
    cy.visit('/parabank/billpay.htm', { failOnStatusCode: false });

    // ako smo preusmjereni na login, uloguj se i opet idi na billpay
    this.ensureLogged();
    cy.location('pathname', { timeout: 10000 }).then((path) => {
      if (!/billpay/i.test(path)) {
        cy.visit('/parabank/billpay.htm', { failOnStatusCode: false });
      }
    });

    // čekaj da forma bude spremna
    this.elements.panel().should('contain', 'Payee Name');
  }

  fillPayee({ name, address, city, state, zip, phone, account, amount }) {
    this.elements.payeeName().clear().type(name);
    this.elements.address().clear().type(address);
    this.elements.city().clear().type(city);
    this.elements.state().clear().type(state);
    this.elements.zip().clear().type(zip);
    this.elements.phone().clear().type(phone);
    this.elements.account().clear().type(account);
    this.elements.verify().clear().type(account);
    this.elements.amount().clear().type(amount);
    this.elements.from().select(0);
  }

  submit() {
    this.elements.sendBtn().click();
  }
}
export default new BillPayPage();
