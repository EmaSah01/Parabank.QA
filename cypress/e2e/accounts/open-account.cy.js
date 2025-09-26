import OpenAccountPage from '../../pages/OpenAccountPage';

describe('Open New Account', () => {
  beforeEach(() => cy.loginUI());
  afterEach(() => cy.logoutUI());

  it('opens a new checking account', () => {
    OpenAccountPage.open();
    OpenAccountPage.create(0);

    // Debug (ostavi dok ne prođe jednom stabilno)
    cy.location('href').then(h => cy.log('HREF:', h));
    OpenAccountPage.elements.panel().invoke('text').then(t => cy.log('PANEL:', t.slice(0, 300)));

    OpenAccountPage.elements.confirmAny().should('be.visible');
    OpenAccountPage.elements.accountLink().should('be.visible').click();

    cy.url().should('include', 'activity.htm');
    cy.contains(/Account|Activity|Details/i).should('be.visible');
  });
});
