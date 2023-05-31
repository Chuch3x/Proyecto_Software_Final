import Cliente from "./cliente";
import Item from "./item";
import PRODUCTOS from "./productos";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector("#items_menu");

const cliente = new Cliente("contrasena1", "dayan");

function createButton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

function createContainer(className, elements) {
  const container = document.createElement("div");
  container.setAttribute("class", className);
  elements.forEach((element) => container.appendChild(element));
  return container;
}

function mostrarProducto(producto) {
  const li = document.createElement("li");
  li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.min = "0";
  inputCantidad.value = "1";

  const agregarButton = createButton("Reservar", () => {
    const cantidad = parseInt(inputCantidad.value);
    if (cantidad > 0) {
      cliente.agregarReserva(producto, cantidad);
      localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
      console.log(PRODUCTOS);
      mostrarProductos();
    }
  });

  return createContainer("item_menu", [li, inputCantidad, agregarButton]);
}

function mostrarProductos() {
  productos_lista.innerHTML = "";

  const snacksContainer = document.createElement("div");
  snacksContainer.innerHTML = "<b>SNACKS</b>";

  const segundosContainer = document.createElement("div");
  segundosContainer.innerHTML = "<b>SEGUNDOS</b>";

  PRODUCTOS.forEach((producto) => {
    const container = mostrarProducto(producto);
    if (producto.categoria === "snacks") {
      snacksContainer.appendChild(container);
    } else if (producto.categoria === "segundo") {
      segundosContainer.appendChild(container);
    }
  });

  productos_lista.appendChild(snacksContainer);
  productos_lista.appendChild(segundosContainer);
}

mostrarProductos();

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