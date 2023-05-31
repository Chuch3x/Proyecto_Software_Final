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

function mostrarProductoPor(categoria) {
  const snacksContainer = document.createElement("div");
  snacksContainer.innerHTML = `<b>${categoria.toUpperCase()}</b>`;
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria == categoria) {
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
          localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
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
  productos_lista.appendChild(snacksContainer);
}

function mostrarProductos() {
  productos_lista.innerHTML = "";
  mostrarProductoPor("snacks");
  mostrarProductoPor("segundo");
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
  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}`;
    const eliminarButton = document.createElement("input");
    eliminarButton.type = "button";
    eliminarButton.value = "Eliminar";
    eliminarButton.addEventListener("click", () => {
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