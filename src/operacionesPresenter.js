import PRODUCTOS from "./productos";
import Cliente from "./cliente";
const cliente = new Cliente("password", "user");

function crearBoton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

function mostrarProductoPor(categoria, productos_lista) {
  const productoContainer = document.createElement("div");
  productoContainer.innerHTML = `<b>${categoria.toUpperCase()}</b>`;
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria == categoria) {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

      const inputCantidad = document.createElement("input");
      inputCantidad.type = "number";
      inputCantidad.min = "0";
      inputCantidad.value = "1";

      const agregarButton = crearBoton("Reservar", () => {
        const cantidad = parseInt(inputCantidad.value);
        if (cantidad > 0) {
          cliente.agregarReserva(producto, cantidad);
          localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
          console.log(PRODUCTOS);
          mostrarProductos(productos_lista);
        }
      });
      const container = document.createElement("div");
      container.setAttribute("class", "item_menu");
      container.appendChild(li);
      container.appendChild(inputCantidad);
      container.appendChild(agregarButton);
      productoContainer.appendChild(container);
    }
  });
  productos_lista.appendChild(productoContainer);
}

function mostrarProductos(productos_lista) {
  productos_lista.innerHTML = "";
  mostrarProductoPor("snacks", productos_lista);
  mostrarProductoPor("segundo", productos_lista);
}
function actualizarItem(lista, producto) {
  const foundItem = lista.find((item) => item.nombre === producto.nombre);
  if (foundItem) {
    foundItem.stock += producto.cantidad;
  }
}
function mostrarReservas(form, div, productos_lista) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const reservasCliente = cliente.reservas;
    div.innerHTML = "";

    reservasCliente.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}`;

      const eliminarButton = crearBoton("Eliminar Reserva", () => {
        cliente.eliminarReserva(item, item.cantidad);
        localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
        actualizarItem(PRODUCTOS, item);
        div.removeChild(li);
        div.removeChild(eliminarButton);
        mostrarProductos(productos_lista);
      });

      div.appendChild(li);
      div.appendChild(eliminarButton);
    });
  });
}

export { mostrarProductos, mostrarReservas };