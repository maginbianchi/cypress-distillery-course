/// <reference types="cypress" />

describe('Login to testProject', () => {
  beforeEach(() => {
    cy.login2('maginbianchi@gmail.com', '');
  })


  it('Login MultiDomain and Verify username', () => {
    cy.visit('https://accounts.lambdatest.com/detail/profile');
    cy.get('.col-5').should('contain', 'kartmcad');
  });


  it('Login MultiDomain and verify preference', function () {
    cy.visit('https://accounts.lambdatest.com/detail/profile');
    cy.get('#preferences-panel-tab').click();
    cy.get('.profileArea > :nth-child(1)').should('contain', 'Email');
  });
});