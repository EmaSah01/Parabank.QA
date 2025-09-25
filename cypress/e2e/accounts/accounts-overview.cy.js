import AccountsPage from '../../pages/AccountsPage';

describe('Accounts Overview', () => {
  beforeEach(() => cy.loginUI());
  afterEach(() => cy.logoutUI());

  it('shows accounts table and links', () => {
    // loginUI vodi na overview
    AccountsPage.assertLoaded();

    // ima bar jedan link ka detaljima računa
    AccountsPage.elements.accountLinks().first().should('be.visible');
  });

  it('navigates to account activity from overview', () => {
    AccountsPage.assertLoaded();
    AccountsPage.openFirstAccount();

    // očekujemo detalje/aktivnosti računa
    cy.url().should('include', 'activity.htm');
    cy.contains(/Account|Activity|Details/i).should('be.visible');
  });
});
