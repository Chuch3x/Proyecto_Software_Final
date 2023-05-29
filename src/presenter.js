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

function mostrarSnacks() {
  const snacksContainer = document.createElement("div");
  snacksContainer.innerHTML = "<b>SNACKS</b>";
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria == "snacks") {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

      const inputCantidad = document.createElement("input");
      inputCantidad.type = "number";
      inputCantidad.min = "0";
      inputCantidad.value = "1";

      const agregarButton = document.createElement("input");
      agregarButton.type = "button";
      agregarButton.value = "Reservar";
      agregarButton.addEventListener("click", () => {
        const cantidad = parseInt(inputCantidad.value);
        if (cantidad > 0) {
          cliente.agregarReserva(producto, cantidad);
          console.log(PRODUCTOS);
          mostrarProductos();
        }
      });

      const container = document.createElement("div");
      container.setAttribute("class", "item_menu");
      container.appendChild(li);
      container.appendChild(inputCantidad);
      container.appendChild(agregarButton);

      snacksContainer.appendChild(container);
    }
  });

  productos_lista.innerHTML = "";
  productos_lista.appendChild(snacksContainer);
}

function mostrarSegundos() {
  const segundosContainer = document.createElement("div");
  segundosContainer.innerHTML = "<b>SEGUNDOS</b>";
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria == "segundo") {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

      const inputCantidad = document.createElement("input");
      inputCantidad.type = "number";
      inputCantidad.min = "0";
      inputCantidad.value = "1";

      const reservarButton = document.createElement("input");
      reservarButton.type = "button";
      reservarButton.value = "Reservar";
      reservarButton.addEventListener("click", () => {
        const cantidad = parseInt(inputCantidad.value);
        if (cantidad > 0) {
          cliente.agregarReserva(producto, cantidad);
          mostrarProductos();
        }
      });

      const container = document.createElement("div");
      container.setAttribute("class", "item_menu");
      container.appendChild(li);
      container.appendChild(inputCantidad);
      container.appendChild(reservarButton);
      segundosContainer.appendChild(container);
    }
  });

  productos_lista.appendChild(segundosContainer);
}

function mostrarProductos() {
  productos_lista.innerHTML = "";
  mostrarSnacks();
  mostrarSegundos();
}

mostrarProductos();
function actualizarItem(lista, producto) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nombre === producto.nombre) {
      lista[i].stock += producto.cantidad;
      break;
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const reservasCliente = cliente.reservas;
  div.innerHTML = "";
  localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}`;

    const eliminarButton = document.createElement("input");
    eliminarButton.type = "button";
    eliminarButton.value = "Eliminar";
    eliminarButton.addEventListener("click", () => {
      cliente.eliminarReserva(item, item.cantidad);
      actualizarItem(PRODUCTOS, item);
      div.removeChild(li);
      div.removeChild(eliminarButton);
      mostrarProductos();
    });

    div.appendChild(li);
    div.appendChild(eliminarButton);
  });
});