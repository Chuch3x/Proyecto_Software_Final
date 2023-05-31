describe('Iniciar Sesión', () => {
    it('Debería iniciar sesión como admin exitosamente', () => {
        cy.visit('login.html')
        cy.get('#usuario').type('admin')
        cy.get('#contrasenia').type('password')    
        cy.get('button[type="submit"]').click()
    });
});