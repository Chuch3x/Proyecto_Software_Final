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

      const agregarButton = crearBoton("Reservar", () => {
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

function mostrarProductos(productos_lista) {
  productos_lista.innerHTML = "";
  mostrarProductoPor("snacks", productos_lista);
  mostrarProductoPor("segundo", productos_lista);
}

export { mostrarProductos };
