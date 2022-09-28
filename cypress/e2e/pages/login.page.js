require('cypress-xpath');

class LoginPage {

    performLogin(username, password){
        cy.xpath('//*[@id="UserName"]').type(username)
        cy.xpath('//*[@id="Password"]').type(password)
    }
    
    clickLoginButton(){
        cy.xpath('//*[contains(@class,"btn")]').click({ force: true })
    }
}
export default new LoginPage()