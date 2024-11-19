Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('Freire')
    cy.get('#email').type('guifreire@gmail.com')
    cy.get('#open-text-area').type('gostaria de uma ajudinha, por favor... gostaria de uma ajudinha, por favor...gostaria de uma ajudinha, por favor...', { delay: 0 })

    cy.contains('button', 'Enviar').click()
})