import Cliente from "./cliente";
import Item from "./item";
import { ingresar, mostrarProductos } from "./operacionesPresenter";
import PRODUCTOS from "./productos";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector("#items_menu");

const cliente = new Cliente("contrasena1", "dayan");

ingresar(cliente);
mostrarProductos(productos_lista)

function actualizarItem(lista, producto) {
  const foundItem = lista.find((item) => item.nombre === producto.nombre);
  if (foundItem) {
    foundItem.stock += producto.cantidad;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const reservasCliente = cliente.reservas;
  div.innerHTML = "";

  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}`;

    const eliminarButton = createButton("Eliminar Reserva", () => {
      cliente.eliminarReserva(item, item.cantidad);
      localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
      actualizarItem(PRODUCTOS, item);
      div.removeChild(li);
      div.removeChild(eliminarButton);
      mostrarProductos();
    });

    div.appendChild(li);
    div.appendChild(eliminarButton);
  });
});