class OpenAccountPage {
  elements = {
    menu:        () => cy.contains('Open New Account'),
    type:        () => cy.get('select#type, select[name="type"]'),
    from:        () => cy.get('select#fromAccountId, select[name="fromAccountId"]'),
    openBtn:     () => cy.get('input[value="Open New Account"]'),
    panel:       () => cy.get('#rightPanel'),
    confirmAny:  () => cy.contains(/Account Opened|Congratulations/i),
    accountLink: () => cy.get('a[href*="activity.htm"]').first()
  };

  open() {
    cy.get('body').then($b => {
      if ($b.text().includes('Open New Account')) {
        this.elements.menu().click();
      } else {
        cy.visit('/parabank/openaccount.htm');
      }
    });
    cy.location('pathname', { timeout: 10000 }).should('include', 'openaccount');
    this.elements.panel().should('contain', 'What type of Account');
  }

  create(typeIndex = 0) {
    this.elements.type().should('be.visible').select(typeIndex);
    this.elements.from().select(0);
    this.elements.openBtn().click();
  }
}
export default new OpenAccountPage();
