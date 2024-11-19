/// <reference types="Cypress" />

//const cypress = require("cypress");

beforeEach(() => {
    cy.visit('./src/index.html');
});

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {
        cy.title().should('include', 'Central de Atendimento ao Cliente TATy');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').should('be.visible').type('Guilherme').should('have.value', 'Guilherme')
        cy.get('#lastName').should('be.visible').type('Freire').should('have.value', 'Freire')
        cy.get('#email').should('be.visible').type('guifreire@gmail.com').should('have.value', 'guifreire@gmail.com')
        cy.get('#open-text-area').should('be.visible').type('gostaria de uma ajudinha, por favor... gostaria de uma ajudinha, por favor...gostaria de uma ajudinha, por favor...', { delay: 0 })

        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').should('be.visible').type('Guilherme').should('have.value', 'Guilherme')
        cy.get('#lastName').should('be.visible').type('Freire').should('have.value', 'Freire')
        cy.get('#email').should('be.visible').type('guifreire.gmail.com')
        cy.get('#open-text-area').should('be.visible').type('gostaria de uma ajudinha, por favor', { delay: 0 })

        cy.contains('button', 'Enviar').should('be.visible').click()
        
        cy.get('.error').should('be.visible');
    });

    it('campo de telefone só aceite números', () => {
        cy.get('#phone').type('abc def').should('be.empty')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').should('be.visible').type('Guilherme').should('have.value', 'Guilherme')
        cy.get('#lastName').should('be.visible').type('Freire').should('have.value', 'Freire')
        cy.get('#email').should('be.visible').type('guifreire@gmail.com').should('have.value', 'guifreire@gmail.com')
        cy.get('#open-text-area').should('be.visible').type('gostaria de uma ajudinha, por favor', { delay: 0 })

        cy.get('#phone-checkbox').check().should('be.checked');

        cy.contains('button', 'Enviar').should('be.visible').click();

        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Guilherme').should('have.value', 'Guilherme').clear().should('have.value', '')
        cy.get('#lastName').type('Freire').should('have.value', 'Freire').clear().should('have.value', '')
        cy.get('#email').type('guifreire@gmail.com').should('have.value', 'guifreire@gmail.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('gostaria de uma ajudinha, por favor', { delay: 0 }).should('have.value', 'gostaria de uma ajudinha, por favor').clear().should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').should('be.visible').click();

        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('select').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each((radio) => {
            cy.wrap(radio).check().should('be.checked')
          })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .as('checkboxes')
          .check()
          .should('be.checked');

        cy.get('@checkboxes')
          .last()
          .uncheck()
          .should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.txt')
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.txt')
          })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.txt', { action: 'drag-drop' })
          .then(input => {
            expect(input[0].files[0].name).to.equal('example.txt')
          })
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a[href="privacy.html"]')
          .should('have.attr', 'target', '_blank');
    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('a[href="privacy.html"]')
          .invoke('removeAttr', 'target')
          .click();
        
        cy.title()
          .should('include','Central de Atendimento ao Cliente TAT - Política de privacidade');
    });
})
