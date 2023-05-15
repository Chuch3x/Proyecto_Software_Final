import Cliente from "./cliente.js";
import Item from "./item.js";
import mostrar_items from "./items.js";
var items = ["hamburguesa", "pique", "panini"]

describe("Mostrar items", () => {
  var item=new Item("Pique Macho",15,20,"Carne y chorizo con papas.");
  var cliente=new Cliente("contrasena1","dayan");
  it("deberia mostrar los items del menu", () => {
    expect(mostrar_items(items)).toEqual(["hamburguesa", "pique", "panini"]);
  });
  it("deberia mostrar el nombre del item", () => {
    expect(item.nombre).toEqual("Pique Macho");
  });
  it("deberia mostrar la descripcion del item", () => {
    expect(item.descripcion).toEqual("Carne y chorizo con papas.");
  });
  it("deberia mostrar el stock del item", () => {
    expect(item.stock).toEqual(20);
  });
  it("deberia agregar una reserva a la lista", () => {
    cliente.agregarReserva(item);
    expect(cliente.reservas).toEqual([{"descripcion": "Carne y chorizo con papas.", "nombre": "Pique Macho", "precio": 15, "stock": 20}]);
  });
});
