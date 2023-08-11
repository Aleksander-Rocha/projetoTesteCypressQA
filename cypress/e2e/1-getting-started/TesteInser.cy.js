/// <reference types="cypress" /> 


context('Dev Finances', () => {



    beforeEach(() => {

        cy.visit('https://devfinance-agilizei.netlify.app/')
        cy.get('#data-table tbody tr').should('have.length', 0)

    });


    it('Cadastrar Entradas', () => {
        

        cy.get('#transaction .button').click()
        cy.get('#description ').type('Capital')
        cy.get('[name=amount]').type(12)
        cy.get('[type=date]').type('2023-08-01')
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1)

    });


    it('Remover Entradas', () => {
        

        cy.get('#transaction .button').click()
        cy.get('#description ').type('Despesas')
        cy.get('[name=amount]').type(-12)
        cy.get('[type=date]').type('2023-08-01')
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1)


    });


        it('Entradas e Saídas', () => {

                const entrada = 'Lucro'
                const saida = 'Despesas'

            cy.get('#transaction .button').click()
            cy.get('#description ').type(entrada)
            cy.get('[name=amount]').type(100)
            cy.get('[type=date]').type('2023-08-01')
            cy.get('button').contains('Salvar').click();

            cy.get('#transaction .button').click()
            cy.get('#description ').type(saida)
            cy.get('[name=amount]').type(-85)
            cy.get('[type=date]').type('2023-08-01')
            cy.get('button').contains('Salvar').click();

             

            /// buscar pelo elemento pai e avançar para um td img attr
            cy.get('td.description')
                .contains(entrada)
                .parent()
                .find('img[onclick*=remove]')
                .click()


                /// buscar os irmãos e buscar qual tem img attr
            
                cy.get('td.description')
                .contains(saida)
                .siblings()
                .children('img[onclick*=remove]')
                .click()
                
                cy.get('#data-table tbody tr').should('have.length', 0)
        });



});