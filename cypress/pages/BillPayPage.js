// cypress/pages/BillPayPage.js
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
    confirm:   () => cy.contains(/Bill Payment Complete|Successful/i),
  };

  open() {
    // Always ensure session first
    cy.ensureLoggedIn();
    // Then go directly to Bill Pay
    cy.visit('/parabank/billpay.htm', { failOnStatusCode: false });

    // Confirm we’re really there (and not bounced)
    cy.location('pathname', { timeout: 15000 }).should('match', /billpay/i);
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

    // pick the first real option by value (skip placeholder)
    this.elements.from().find('option').then($opts => {
      const firstValue = [...$opts].map(o => o.value).find(v => v);
      this.elements.from().select(firstValue);
    });
  }

  submit() {
    this.elements.sendBtn().click();
  }
}
export default new BillPayPage();
