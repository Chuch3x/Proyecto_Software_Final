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
  it("deberia mostrar la descripcion del item", () => {
    expect(new Item("Pique Macho",15,20,"Carne y chorizo con papas.").descripcion).toEqual("Carne y chorizo con papas.");
  });
  it("deberia mostrar el stock del item", () => {
    expect(new Item("Pique Macho",15,20,"Carne y chorizo con papas.").stock).toEqual(20);
  });
});
