import TransferPage from '../../pages/TransferPage';

describe('Transfer Funds – negative scenarios', () => {
  beforeEach(() => cy.loginUI());
  afterEach(() => cy.logoutUI());

  it('does not submit when amount is empty', () => {
    TransferPage.open();
    // ne unosimo amount
    TransferPage.selectDifferentAccounts();
    TransferPage.elements.submit().click();

    // očekujemo da i dalje nismo dobili potvrdu
    cy.contains('Transfer Complete').should('not.exist');
    // ostali tragovi da smo na formi
    TransferPage.elements.panel().should('contain', 'Amount');
  });

  it('rejects non-numeric amount (e.g. "abc")', () => {
    TransferPage.open();
    TransferPage.elements.amount().clear().type('abc');
    TransferPage.selectDifferentAccounts();
    TransferPage.elements.submit().click();

    cy.contains('Transfer Complete').should('not.exist');
    TransferPage.elements.panel().should('contain', 'Amount');
  });

  it('handles same source and target account gracefully', () => {
    TransferPage.open();

    // forsiramo isti račun za from/to
    TransferPage.elements.amount().clear().type('25');
    TransferPage.elements.from().select(0);
    TransferPage.elements.to().select(0);
    TransferPage.elements.submit().click();

    // u idealu: odbiti. U praksi: dokumentujemo trenutno ponašanje.
    // Ako aplikacija prihvati, zabilježi "known issue"; ako odbije, ovaj assert prođe.
    cy.contains('Transfer Complete').should('not.exist');
  });
});
