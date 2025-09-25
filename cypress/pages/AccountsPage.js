class AccountsPage {
  elements = {
    heading:       () => cy.contains('Accounts Overview'),
    table:         () => cy.get('#accountTable, table').first(),
    accountLinks:  () => cy.get('a[href*="activity.htm"]'),
    balanceCells:  () => cy.contains('Balance').parents('table').find('td'),
    logout:        () => cy.contains('Log Out'),
  };

  assertLoaded() {
    this.heading().should('be.visible');
    this.table().should('be.visible');
    this.accountLinks().its('length').should('be.greaterThan', 0);
  }

  openFirstAccount() {
    this.accountLinks().first().click();
  }
}
export default new AccountsPage();
