import Cliente from "./cliente";
import Item from "./item";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#items_div");
const productos_lista =document.querySelector('#lista_productos');


var cliente=new Cliente("contrasena1","dayan");
var item=new Item("Pique Macho",15,20,"Carne y chorizo con papas.");
cliente.agregarReserva(item);
var productos_menu = ["hamburguesa", "pique", "panini"]
var reservasCliente = cliente.reservas;

form.addEventListener("submit", (event) => {
    event.preventDefault();
 
    reservasCliente.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.nombre}: ${item.descripcion} - Precio: $${item.precio} - Stock: ${item.stock}`;
        productos_lista.appendChild(li);
      });
   
});