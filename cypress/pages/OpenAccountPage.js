class OpenAccountPage {
  elements = {
    menu:        () => cy.contains('Open New Account'),
    type:        () => cy.get('select#type, select[name="type"]'),
    from:        () => cy.get('select#fromAccountId, select[name="fromAccountId"]'),
    openBtn:     () => cy.get('input[value="Open New Account"]'),
    panel:       () => cy.get('#rightPanel'),
    // potvrde se na ParaBanku znaju razlikovati po tekstu – uzmi tolerantno
    confirmAny:  () => cy.contains(/Account Opened|Congratulations|Account Opened!/i),
    accountLink: () => cy.get('a[href*="activity.htm"]').first()
  };

  open() {
    this.elements.menu().click();
    cy.location('pathname', { timeout: 10000 }).should('include', 'openaccount');
    this.elements.panel().should('contain', 'What type of Account');
  }

  create(typeIndex = 0) {
    this.elements.type().should('be.visible').select(typeIndex); // 0: CHECKING, 1: SAVINGS
    this.elements.from().select(0);
    this.elements.openBtn().click();
  }
}
export default new OpenAccountPage();
