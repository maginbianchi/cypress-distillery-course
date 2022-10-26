/// <reference types="cypress" />

describe.skip('Test with backend', () => {
    beforeEach('login to the app', () => {

    })
    it('verify correct request and response', { browser: '!edge' }, () => {
        cy.server()
        cy.route('POST', '**/articles').as('postArticles')
        cy.login()


        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is a title')
        cy.get('[formcontrolname="description"]').type('This is a description')
        cy.get('[formcontrolname="body"]').type('This is a body')
        cy.contains('Publish Article').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then(xhr => {
            console.log(xhr)
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is a body')
            expect(xhr.response.body.article.description).to.equal('This is a description')
        })
    })
    it('intercepting and modifying the request and response', () => {

        cy.intercept('POST', '**/articles', req => {
            //req.body.article.description = "This is an alternative description"
            req.reply(res => {
                expect(res.body.article.description).to.equal('This is a description')
                res.body.article.description = "This is an alternative description"
            })
        }).as('postArticles')

        cy.login()

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is a title')
        cy.get('[formcontrolname="description"]').type('This is a description')
        cy.get('[formcontrolname="body"]').type('This is a body')
        cy.contains('Publish Article').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then(xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is a body')
            expect(xhr.response.body.article.description).to.equal('This is an alternative description')
        })
    })
    it('mock a response', () => {
        //cy.route('GET', '**/tags', 'fixture:tags.json')
        cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' })

        cy.login()

        cy.get('.tag-list')
            .should('contain', 'Cypress')
            .and('contain', 'Automation')
            .and('contain', 'GOT')

    })

    it('verify global feed likes count', () => {

        cy.server()
        cy.route('GET', '**/api/articles/feed*', '{"articles:[],"articlesCount":0}')
        cy.route('GET', '**/api/articles*', 'fixture:articles.json')
        cy.login()
        cy.contains('Global Feed').click()

        cy.get('app-article-list button').then((listOfButtons) => {
            expect(listOfButtons[0]).to.contain('1')
            expect(listOfButtons[1]).to.contain('5')
        })

        cy.fixture('articles').then(articles => {
            const id = articles.articles[1].slug

            cy.route('POST', '**/articles/' + id + '/favourite', articles)

            cy.get('app-article-list button').eq(1).click()
                .should('contain', '6');
        })
    })
    it('delete a new article in a global feed', () => {
        //Precondiciones
        const userCredentials = {
            "user": {
                "email": "magin.bianchi@naranja.com",
                "password": "admin123"
            }
        }
        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "Title",
                "description": "Description",
                "body": "Body"
            }
        }

        cy.login()

        cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
            .its('body').then((body) => {
                const token = body.user.token
                console.log(token)

                cy.request({
                    url: 'https://conduit.productionready.io/api/articles/',
                    headers: {
                        authorization: 'Token ' + token
                    },
                    method: 'POST',
                    body: bodyRequest
                }).then(response => {
                    expect(response.status).to.equal(200)
                })

                cy.contains('Global Feed').click()
                cy.get('.article-preview').first().click()
                cy.get('.article-actions').contains('Delete Article').click()

                cy.request({
                    url: 'https://conduit.productionready.io/api/articles?limit=10&offset=0',
                    headers: {
                        authorization: 'Token ' + token
                    },
                    method: 'GET'
                }).then(response => {
                    console.log(response)
                    expect(response.body.articles[0].title).not.to.equal('Description')
                })
            })

    })
    it('silent authentication', () => {
        cy.silentLogin()

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('This is a title')
        cy.get('[formcontrolname="description"]').type('This is a description')
        cy.get('[formcontrolname="body"]').type('This is a body')
        cy.contains('Publish Article').click()
    })
})