describe("Mostrar Menu", () => {
    it("Se debería poder ver el menu", () => {
      cy.visit("index.html");
      cy.get("#items_menu").should("contain", "Salchipapa");
    });
    it('Se debería reservar un producto', () => {
      cy.visit('index.html')
      cy.xpath('//li[contains(text(),"Salchipapa")]/following-sibling::button').click()
      cy.get('#mostrar_reservas').click()
      cy.get("#lista_reservas").should("contain", "Salchipapa - Precio: $10 - Cantidad: 1");
    });
    it('Se debería reservar un producto con cantidad 3', () => {
      cy.visit('index.html')
      cy.xpath('//li[contains(text(),"Salchipapa")]/following-sibling::input').clear().type(3)
      cy.xpath('//li[contains(text(),"Salchipapa")]/following-sibling::button').click()
      cy.get('#mostrar_reservas').click()
      cy.get("#lista_reservas").should("contain", "Salchipapa - Precio: $10 - Cantidad: 3");
    });
    it('Se debería eliminar una reserva', () => {
      cy.visit('index.html')
      cy.xpath('//li[contains(text(),"Salchipapa")]/following-sibling::input').clear().type(3)
      cy.xpath('//li[contains(text(),"Salchipapa")]/following-sibling::button').click()
      cy.get('#mostrar_reservas').click()
      cy.get("#lista_reservas").should("contain", "Salchipapa - Precio: $10 - Cantidad: 3");
      cy.xpath('id("lista_reservas")//li[contains(text(),"Salchipapa")]/following-sibling::button').click()
      cy.get("#lista_reservas").should("contain", "");
    });
  });