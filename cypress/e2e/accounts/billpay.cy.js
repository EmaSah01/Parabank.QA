import BillPayPage from '../../pages/BillPayPage';

describe('Bill Pay', () => {
  beforeEach(() => cy.loginUI());
  afterEach(() => cy.logoutUI());

  it('pays a bill with valid data', () => {
    BillPayPage.open();
    BillPayPage.fillPayee({
      name: 'Utility Co',
      address: '1 Main St',
      city: 'Springfield',
      state: 'CA',
      zip: '90210',
      phone: '5551234567',
      account: '12345678',
      amount: '15'
    });
    BillPayPage.submit();

    BillPayPage.elements.confirm().should('be.visible');
    BillPayPage.elements.panel().invoke('text').then(t => {
      expect(t).to.match(/\$?\s*15(\.00)?/);
    });
  });

  it('accepts mismatched verify account (current app behavior - likely a bug)', () => {
    BillPayPage.open();
    BillPayPage.fillPayee({
      name: 'Wrong Verify',
      address: '2 Elm St',
      city: 'Springfield',
      state: 'CA',
      zip: '90210',
      phone: '5559999999',
      account: '1111',
      amount: '5'
    });
    // namjerno pokvari verify
    BillPayPage.elements.verify().clear().type('2222');
    BillPayPage.submit();

    // dokumentujemo trenutno stanje: i dalje se vidi potvrda
    BillPayPage.elements.confirm().should('be.visible');

    // debug panel
    BillPayPage.elements.panel().invoke('text').then(t => {
      cy.log('BILL PAY PANEL:', t.slice(0, 300));
    });
  });
});
