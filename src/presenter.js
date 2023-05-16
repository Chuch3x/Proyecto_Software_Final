import Cliente from "./cliente";
import Item from "./item";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista =document.querySelector('#items_menu');

var productos = [new Item("Salchipapa",10,15,"Papas con salchicha."), new Item("Panini",5,15,"Masa rellena de jamon con tomate.")];

var cliente=new Cliente("contrasena1","dayan");
var item=new Item("Pique Macho",15,20,"Carne y chorizo con papas.");


//cliente.agregarReserva(item);

productos.forEach((producto) => {
  const li = document.createElement("li");
  li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;
  productos_lista.appendChild(li);

  const agregarButton = document.createElement('button');
  agregarButton.textContent = "Agregar";
  agregarButton.addEventListener('click', () => {
    cliente.agregarReserva(producto);
  });

  productos_lista.appendChild(agregarButton);
});


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const reservasCliente = cliente.reservas;

  // Vaciar el contenido del div antes de agregar los elementos actualizados
  div.innerHTML = "";

  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre}: ${item.descripcion} - Precio: $${item.precio} - Stock: ${item.stock}`;
    div.appendChild(li);

    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = "Eliminar";
    eliminarButton.addEventListener('click', () => {
      cliente.eliminarReserva(item);
      div.removeChild(li);
      div.removeChild(eliminarButton);
    });

    div.appendChild(eliminarButton);
  });
});



