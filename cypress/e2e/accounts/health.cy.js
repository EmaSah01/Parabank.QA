describe('API health check', () => {
  it('responds for customer accounts endpoint', () => {
    // demo endpoint; nekad vraća 200/302/401/403 zavisno od sesije
    cy.request({
      url: '/parabank/services/bank/customers/12212/accounts',
      failOnStatusCode: false
    }).its('status').should('be.oneOf', [200, 302, 401, 403]);
  });
});
