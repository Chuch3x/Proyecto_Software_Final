describe('Menu vista Admin ', () => {
    it("Muestra un item en el menu", () => {
        cy.visit("administrador");
        cy.get("#items_menu").should("contain", "Salchipapa");
    });
    it("Debería existir un menu", () => {
        cy.visit("administrador");
        cy.get("#items_menu").should("exist");
    });
    it('Debería crear producto', () => {
        cy.visit('administrador.html')
        cy.get('#nombre_producto').type('Choripan')
        cy.get('#precio_producto').type('15')    
        cy.get('#stock_producto').type('10')   
        cy.get('#descripcion_producto').type('Chorizo en un pan')   
        cy.get('#categoria_producto').type('snacks')   
        cy.get('input[value="Crear producto"]').click()
        cy.get("#items_menu").should("contain", "Choripan: Chorizo en un pan - Precio: $15 - Stock: 10");
    });
});