class TransferPage {
  elements = {
    menu:   () => cy.contains('Transfer Funds'),
    amount: () => cy.get('input#amount, input[name="amount"]'),
    from:   () => cy.get('select#fromAccountId, select[name="fromAccountId"]'),
    to:     () => cy.get('select#toAccountId, select[name="toAccountId"]'),
    submit: () => cy.get('input[value="Transfer"]'),
    panel:  () => cy.get('#rightPanel'),
    done:   () => cy.contains('Transfer Complete'),
  };

  open() {
    this.elements.menu().click();
    cy.location('pathname', { timeout: 10000 }).should('include', 'transfer.htm');
    this.elements.panel().should('contain', 'Amount'); // potvrda da je forma tu
  }

  selectDifferentAccounts() {
    this.elements.from().find('option').its('length').then(len => {
      if (len >= 2) {
        this.elements.from().select(0);
        this.elements.to().find('option').its('length').then(toLen => {
          this.elements.to().select(Math.max(1, toLen - 1)); // pokušaj drugi račun
        });
      } else {
        this.elements.from().select(0);
        this.elements.to().select(0);
      }
    });
  }

  transfer(amount) {
    this.elements.amount().should('be.visible').and('be.enabled').clear().type(amount);
    this.selectDifferentAccounts();
    this.elements.submit().click();
  }

  // Aserti na cijeli panel, tolerantni na format valute
  assertAmountShown(amountNumber) {
    const rx = new RegExp(`\\$?\\s*${amountNumber}(?:\\.\\d{1,2})?`); // 25, 25.0, 25.00, $25.00
    this.elements.panel().invoke('text').then(t => {
      const normalized = t.replace(/\s+/g, ' ').trim();
      expect(normalized).to.match(rx);
    });
  }

  assertNegativeShown(amountNumber) {
    const rx = new RegExp(`-\\$?\\s*${amountNumber}(?:\\.\\d{1,2})?`); // -25, -$25.00, itd.
    this.elements.panel().invoke('text').then(t => {
      const normalized = t.replace(/\s+/g, ' ').trim();
      expect(normalized).to.match(rx);
    });
  }
}

export default new TransferPage();
