describe("Mostrar Menu", () => {
    it("Se debería poder ver el menu", () => {
      cy.visit("index.html");
      cy.get("#items_menu").should("contain", "Salchipapa");
    });
  });
  