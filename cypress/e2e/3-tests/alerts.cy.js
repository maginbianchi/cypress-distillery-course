describe('Alerts and popups', () => {
    it('Handle alerts', () => {
        cy.visit('https://demosite.executeautomation.com/Login.html')

        cy.get('[name="UserName"]').type('admin')
        cy.get('[name="Password"]').type('password')
        cy.get(':nth-child(3) > input').click()

        cy.get("[name='generate']").click()

        cy.on('window:confirm', str => {
            expect(str).to.eq('You generated a Javascript alert')
            return true
        })

        cy.on('window:alert', str => {
            expect(str).to.eq('You pressed OK!')
            return true
        })
    });
});