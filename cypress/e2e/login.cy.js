describe('Inicio de Sesión', () => {
    it('Se debería poder iniciar sesión como admin exitosamente', () => {
        cy.visit('login.html')
        cy.get('#usuario').type('admin')
        cy.get('#contrasenia').type('password')    
        cy.get('button[type="submit"]').click()
        cy.get("#logout_admin").should('be.visible');
    });
    it('No debería iniciar sesión exitosamente', () => {
        cy.visit('login.html')
        cy.get('#usuario').type('sads')
        cy.get('#contrasenia').type('pafdfdssword')    
        cy.get('button[type="submit"]').click()
        cy.get("#logout_admin").should('not.exist');
    });
    it('Debería volver a la pagína de user', () => {
        cy.visit('login.html')
        cy.get("#volver_button").click()
        cy.get("#login_admin").should('be.visible');
    });
});