describe('Parabank Smoke', () => {
  it('opens homepage and checks title', () => {
    cy.visit('/parabank/index.htm');
    cy.title().should('include', 'ParaBank');
    cy.contains('Customer Login').should('be.visible');
  });
});
