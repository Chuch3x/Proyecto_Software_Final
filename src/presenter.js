import Cliente from "./cliente";
import Item from "./item";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#items_div");
const productos_lista =document.querySelector('#lista_productos');

var productos = [new Item("Salchipapa",10,15,"Papas con salchicha."), new Item("Panini",5,15,"Masa rellena de jamon con tomate.")];

var cliente=new Cliente("contrasena1","dayan");
var item=new Item("Pique Macho",15,20,"Carne y chorizo con papas.");


cliente.agregarReserva(item);

var reservasCliente = cliente.reservas;

form.addEventListener("submit", (event) => {
    event.preventDefault();
 
    reservasCliente.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.nombre}: ${item.descripcion} - Precio: $${item.precio} - Stock: ${item.stock}`;
        productos_lista.appendChild(li);
      });
   
});