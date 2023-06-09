import Cliente from "./cliente.js";
import Item from "./item.js";
import mostrar_items from "./items.js";
var items = ["hamburguesa", "pique", "panini"]

describe("Mostrar items", () => {
  var item=new Item("Pique Macho",15,20,"Carne y chorizo con papas.", "snack");
  var item2=new Item("Panini",15,0,"sandwich", "");
  var cliente=new Cliente("contrasena1","dayan");
  var cliente2=new Cliente("contrasena2","cesar");
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
    cliente.agregarReserva(item,1);
    expect(cliente.reservas).toEqual([{"cantidad":1,"categoria": "snack","descripcion": "Carne y chorizo con papas.", "nombre": "Pique Macho", "precio": 15, "stock": 19}]);
  });
  it("No deberia agregarse el item a la lista porque el stock es 0", () => {
    cliente2.agregarReserva(item2,1);
    expect(cliente2.reservas).toEqual([]);
  });
  it("Debería reducir el stock de un item en 1", () => {
    expect(item.stock).toEqual(19);
    
  });
  it("Debería de eliminarse la reserva del cliente", () => {
    cliente.eliminarReserva(item,1);
    expect(cliente.reservas).toEqual([]);
  });
  it("Debería de aumentar el stock del item", () => {
    cliente.eliminarReserva(item,1);
    expect(cliente.reservas).toEqual([]);
  });
  it("Debería crear un producto", () => {
    cliente.crearProducto('pilfrut',1,5,'Jugo de frutas','snack');
    expect(cliente.crearProducto('pilfrut',1,5,'Jugo de frutas', "snack")).toEqual({"categoria": "snack","descripcion": "Jugo de frutas", "nombre": "pilfrut", "precio": 1, "stock": 5});
  });
  it("Debería de poner la categoria sopa", () => {
    item.categoria="sopa";
    expect(item).toEqual({"categoria": "sopa","descripcion": "Carne y chorizo con papas.", "nombre": "Pique Macho", "precio": 15, "stock":21});
  });
  it("No debería reservar si la cantidad es mayor al stock", () => {
    cliente.agregarReserva(item,22);
    expect(item.stock).toEqual(21);
  });
});