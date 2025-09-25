import TransferPage from '../../pages/TransferPage';

describe('Transfer Funds', () => {
  beforeEach(() => cy.loginUI());
  afterEach(() => cy.logoutUI());

  it('transfers a small amount between two accounts', () => {
  TransferPage.open();
  TransferPage.transfer('25');

  // 🔎 DEBUG: pokaži URL i tekst panela u logu
  cy.location('href').then(h => cy.log('HREF:', h));
  TransferPage.elements.panel().invoke('text').then(t => {
    cy.log('PANEL TEXT:', t.slice(0, 300));
  });

  // onda ide normalna provjera
  TransferPage.elements.done().should('be.visible');
  TransferPage.assertAmountShown(25);
});


  it('accepts a negative amount (current app behavior - likely a bug)', () => {
    // Napomena: App trenutno NE validira negativan iznos i prikazuje "Transfer Complete".
    // Ovaj test dokumentuje postojeće ponašanje (umjesto da očekuje odbijanje).
    TransferPage.open();
    TransferPage.transfer('-50');

    TransferPage.elements.done().should('be.visible');
    TransferPage.assertNegativeShown(50); // npr. "-$50.00"
  });
});
