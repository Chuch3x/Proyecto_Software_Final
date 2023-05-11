import mostrar_items from "./items.js";
var items = ["hamburguesa", "pique", "panini"]

describe("Mostrar items", () => {
  it("deberia mostrar los items del menu", () => {
    expect(mostrar_items(items)).toEqual(["hamburguesa", "pique", "panini"]);
  });
});
