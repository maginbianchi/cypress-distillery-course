context('Test API from a fake JSON server', () => {
    it('Test GET functionality', ()=> {
        cy.request('https://pokeapi.co/api/v2/pokemon/pikachu').its('body').should('have.a.property', 'id')
    })

    it.skip('Test POST functionality', ()=> {
        cy.request({ 
            method: 'POST', 
            url: 'https://pokeapi.co/api/v2/pokemon/pikachu', 
            body: { "id": 25, "name": "Pikachu"} 
        }).then(res => {
            expect(res.body).has.property("id", 25)
        })
    })

    it.skip('Test DELETE functionality', ()=> {
        cy.request({ 
            method: 'DELETE', 
            url: 'https://pokeapi.co/api/v2/pokemon/pikachu', 
            failOnStatusCode: false
        }).then(res => {
            expect(res.body).to.be.empty
        })
    })
    it('API testing', () => {

        cy.request({
            method:'POST',
            url:'http://eaapp.somee.com/Account/Login',
            body: {
                "__RequestVerificationToken":"jJ27CGSB6SHC24F0oV5nGIcKmDPqG2WfwOCDZxTUIhJ8Tk9TiSYlzhrzuhP5Ct2rHTiOY46WawRVGy6qanY18HsdbKEeK0TqWjgOY9b6RZE1",
                "UserName": "admin",
                "Password": "password",
                "RememberMe": "false"
                },
                failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(500);
            expect(res.body).to.contain('<i>The required anti-forgery cookie &quot;__RequestVerificationToken&quot; is not present.</i>')
        })
    });
})