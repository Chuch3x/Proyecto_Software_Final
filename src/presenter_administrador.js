import Cliente from "./cliente";
import Item from "./item";
import { mostrarProductos } from "./operacionesAdministrador";
import PRODUCTOS from "./productos";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector("#items_menu");
const crear_producto_form = document.querySelector("#crear_producto_form");
const nombre_producto = document.querySelector("#nombre_producto");
const precio_producto = document.querySelector("#precio_producto");
const stock_producto = document.querySelector("#stock_producto");
const descripcion_producto = document.querySelector("#descripcion_producto");
const categoria_producto = document.querySelector("#categoria_producto");

var cliente = new Cliente("password", "admin");
cliente.reservas = JSON.parse(localStorage.getItem("reservas"));

mostrarProductos(productos_lista);

function editarProducto(producto) {
  nombre_producto.value = producto.nombre;
  precio_producto.value = producto.precio;
  stock_producto.value = producto.stock;
  descripcion_producto.value = producto.descripcion;
  categoria_producto.value = producto.categoria;
  const index = PRODUCTOS.indexOf(producto);
  if (index > -1) {
    PRODUCTOS.splice(index, 1);
  }
  mostrarProductos();
}

function crearBoton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

crear_producto_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const productoCreado = new Item(
    nombre_producto.value,
    parseFloat(precio_producto.value),
    parseInt(stock_producto.value),
    descripcion_producto.value,
    categoria_producto.value
  );
  PRODUCTOS.push(productoCreado);
  mostrarProductos();
  crear_producto_form.reset();
});

function disminuirStockPorNombre(nombre, cantidad) {
  for (var i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].nombre === nombre) {
      PRODUCTOS[i].stock -= cantidad;
      break;
    }
  }
}

function eliminarProducto(producto) {
  const index = PRODUCTOS.indexOf(producto);
  if (index > -1) {
    PRODUCTOS.splice(index, 1);
    mostrarProductos();
    alert("Producto eliminado");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const reservasCliente = JSON.parse(localStorage.getItem("reservas"));
  div.innerHTML = "";
  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Precio: $${item.precio} - Reservas: ${item.cantidad}`;
    div.appendChild(li);
    const entregarButton = crearBoton("Entregar", () => {
      cliente.eliminarReserva(item, item.cantidad);
      localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
      disminuirStockPorNombre(item.nombre, item.cantidad);
      div.removeChild(li);
      div.removeChild(entregarButton);
      mostrarProductos();
    });
    div.appendChild(entregarButton);
  });
});
