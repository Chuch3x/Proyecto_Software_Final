import Item from "./item.js";
import mostrar_items from "./items.js";
var items = ["hamburguesa", "pique", "panini"]

describe("Mostrar items", () => {
  it("deberia mostrar los items del menu", () => {
    expect(mostrar_items(items)).toEqual(["hamburguesa", "pique", "panini"]);
  });
  it("deberia mostrar el nombre del item", () => {
    expect(new Item("Pique Macho",15,20,"Carne y chorizo con papas.").nombre).toEqual("Pique Macho");
  });
});
