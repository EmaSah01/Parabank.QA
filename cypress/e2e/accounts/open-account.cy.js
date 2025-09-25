import OpenAccountPage from '../../pages/OpenAccountPage';

describe('Open New Account', () => {
  beforeEach(() => cy.loginUI());
  afterEach(() => cy.logoutUI());

  it('opens a new checking account', () => {
    OpenAccountPage.open();
    OpenAccountPage.create(0);

    OpenAccountPage.elements.confirm.should('be.visible');
    OpenAccountPage.elements.newAcctLink.should('be.visible').click();

    cy.url().should('include', 'activity.htm');
    cy.contains(/Account|Activity|Details/i).should('be.visible');
  });
});
