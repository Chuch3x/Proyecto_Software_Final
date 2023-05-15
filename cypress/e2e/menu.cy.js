describe("Mostrar Menu", () => {
    it("Muestra un item en el menu", () => {
      cy.visit("/");
      cy.get("#lista_productos").should("contain", "hamburguesa");
    });
  });
  