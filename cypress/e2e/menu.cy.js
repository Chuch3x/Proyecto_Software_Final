describe("Mostrar Menu", () => {
    it("Muestra un item en el menu", () => {
      cy.visit("/");
      cy.get("#menu_div").should("contain", "hamburguesa");
    });
  });
  