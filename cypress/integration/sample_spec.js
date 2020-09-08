describe('E to E Test', () => {
    it('visiting Movie mix application diplay all shows based on popularity and genres', () => {
        cy.server()
        cy.route('/shows').as('getAllShows')
        cy.visit('/')
        // check the logo name
        cy.contains('Movie Mix')

        cy.wait('@getAllShows').then(() => {
            // check the popular section displayed
            cy.contains('Popular Movies')
            // check the first show details 
            cy.get('.show-name').should(($lis) => {
                expect($lis.eq(0), 'first item').to.contain('Breaking Bad')
            })
            cy.get('.show-average').should(($lis) => {
                expect($lis.eq(0), 'first item').to.contain('9.3')
            })
            cy.get('.show-premiered').should(($lis) => {
                expect($lis.eq(0), 'first item').to.contain('2008-01-20')
            })
            cy.get('.show-genres').should(($lis) => {
                expect($lis.eq(0), 'first item').to.contain('Drama, Crime, Thriller')
            })

            // check all available genre categories displayed
            cy.get('.genre-category').should(($lis) => {
                expect($lis.eq(0), 'first item').to.contain('Drama')
                expect($lis.eq(1), 'second item').to.contain('Science-Fiction')
                expect($lis.eq(2), 'third item').to.contain('Thriller')
                expect($lis.eq(3), 'fourth item').to.contain('Action')
                expect($lis.eq(4), 'fifth item').to.contain('Crime')
                expect($lis.eq(5), 'sixth item').to.contain('Horror')
                expect($lis.eq(6), 'seven item').to.contain('Romance')
                expect($lis.eq(7), 'eight item').to.contain('Adventure')
                expect($lis.eq(8), 'nine item').to.contain('Espionage')
                expect($lis.eq(9), 'ten item').to.contain('Music')
                expect($lis.eq(10), 'eleven item').to.contain('Mystery')
                expect($lis.eq(11), 'twelve item').to.contain('Supernatural')
                expect($lis.eq(12), 'thirteen item').to.contain('Fantasy')
                expect($lis.eq(13), 'fourteen item').to.contain('Family')
                expect($lis.eq(14), 'fifteen item').to.contain('Anime')
                expect($lis.eq(15), 'sixteen item').to.contain('Comedy')
                expect($lis.eq(16), 'seventeen item').to.contain('History')
                expect($lis.eq(17), 'eighteen item').to.contain('Medical')
                expect($lis.eq(18), 'nineteen item').to.contain('Legal')
                expect($lis.eq(19), 'twenty item').to.contain('Western')
                expect($lis.eq(20), 'twentyone item').to.contain('War')
                expect($lis.eq(21), 'twentytwo item').to.contain('Sports')
            })
        })
    })

    it('pressing / focuses the searchbox', () => {
        cy.document().trigger('keydown', {
            'keyCode': 191
        })
        cy.focused().type('breaking')
            .should('have.value', 'breaking')
    })

    it('searching a term will list the matched shows based on rating, can click on a list item to navigate to details and clicking outside search list hides the list', () => {
        cy.server()
        cy.visit('/')
        cy.route('/search/shows?q=breaking').as('searchShow')

        cy.get('.search-box')
            .type('breaking')
            .should('have.value', 'breaking')
        cy.wait(500)
        cy.wait('@searchShow').then(() => {
            cy.get('ul.show-list').should('be.visible')
            cy.get('ul.show-list')
                .should('contain', 'Breaking Bad')
        })

        cy.get('ul.show-list > li:first-child')
            .click()

        cy.url().should('include', '/shows/169')

        cy.get('.show-premiered').click({
            force: true
        })
    })

    it('navigating to deatails page, display show details', () => {
        cy.server()
        cy.route('/shows/169').as('getShowDetails')
        cy.visit('/shows/169')

        cy.wait('@getShowDetails').then(() => {
            cy.get('.show-name').should('contain', 'Breaking Bad')
            cy.get('.show-summary').should('contain', `Breaking Bad follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.`)
            cy.get('.show-average').should('contain', '9.3')
            cy.get('.show-premiered').should('contain', '2008-01-20')
            cy.get('.show-genres').should('contain', 'Drama, Crime, Thriller')

            cy.contains('Cast')
            cy.contains('Images')
        })
    })

    it('clicking back button returns to previous page in history', () => {
        cy.visit('/')
        cy.visit('/shows/169')
        cy.visit('/shows/170')

        cy.get('.back-button').click()
        cy.contains('Breaking Bad')

        cy.get('.back-button').click()
        cy.contains('Popular Movies')
        cy.get('.genre-category').should(($lis) => {
            expect($lis.eq(0), 'first item').to.contain('Drama')
            expect($lis.eq(1), 'second item').to.contain('Science-Fiction')
            expect($lis.eq(2), 'third item').to.contain('Thriller')
            expect($lis.eq(3), 'fourth item').to.contain('Action')
            expect($lis.eq(4), 'fifth item').to.contain('Crime')
            expect($lis.eq(5), 'sixth item').to.contain('Horror')
            expect($lis.eq(6), 'seven item').to.contain('Romance')
            expect($lis.eq(7), 'eight item').to.contain('Adventure')
            expect($lis.eq(8), 'nine item').to.contain('Espionage')
            expect($lis.eq(9), 'ten item').to.contain('Music')
            expect($lis.eq(10), 'eleven item').to.contain('Mystery')
            expect($lis.eq(11), 'twelve item').to.contain('Supernatural')
            expect($lis.eq(12), 'thirteen item').to.contain('Fantasy')
            expect($lis.eq(13), 'fourteen item').to.contain('Family')
            expect($lis.eq(14), 'fifteen item').to.contain('Anime')
            expect($lis.eq(15), 'sixteen item').to.contain('Comedy')
            expect($lis.eq(16), 'seventeen item').to.contain('History')
            expect($lis.eq(17), 'eighteen item').to.contain('Medical')
            expect($lis.eq(18), 'nineteen item').to.contain('Legal')
            expect($lis.eq(19), 'twenty item').to.contain('Western')
            expect($lis.eq(20), 'twentyone item').to.contain('War')
            expect($lis.eq(21), 'twentytwo item').to.contain('Sports')
        })
    })
})