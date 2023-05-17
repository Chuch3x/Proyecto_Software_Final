describe("Mostrar Menu", () => {
    it("Muestra un item en el menu", () => {
      cy.visit("/");
      cy.get("#items_menu").should("contain", "Salchipapa");
    });
    it("Debe existir un menu", () => {
      cy.visit("/");
      cy.get("#items_menu").should("exist");
    });
  });
  