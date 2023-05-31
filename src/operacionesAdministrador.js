import PRODUCTOS from "./productos";
import Item from "./item";

function editarProducto(producto, productos_lista) {
  nombre_producto.value = producto.nombre;
  precio_producto.value = producto.precio;
  stock_producto.value = producto.stock;
  descripcion_producto.value = producto.descripcion;
  categoria_producto.value = producto.categoria;
  const index = PRODUCTOS.indexOf(producto);
  if (index > -1) {
    PRODUCTOS.splice(index, 1);
  }
  mostrarProductos(productos_lista);
}
function eliminarProducto(producto, productos_lista) {
  const index = PRODUCTOS.indexOf(producto);
  if (index > -1) {
    PRODUCTOS.splice(index, 1);
    mostrarProductos(productos_lista);
    alert("Producto eliminado");
  }
}
function crearBoton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

function crearProducto(crear_producto_form, productos_lista) {
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
    mostrarProductos(productos_lista);
    crear_producto_form.reset();
  });
}
function mostrarProductosPor(categoria, productos_lista) {
  const productosContainer = document.createElement("div");
  productosContainer.innerHTML = `<b>${categoria.toUpperCase()}</b>`;
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria === categoria) {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;
      const editarButton = crearBoton("Editar", () => {
        editarProducto(producto, productos_lista);
      });
      const eliminarButton = crearBoton("Eliminar", () => {
        eliminarProducto(producto, productos_lista);
      });
      const container = document.createElement("div");
      container.setAttribute("class", "item_menu");
      container.appendChild(li);
      container.appendChild(editarButton);
      container.appendChild(eliminarButton);
      productosContainer.appendChild(container);
    }
  });

  productos_lista.appendChild(productosContainer);
}

function mostrarProductos(productos_lista) {
  productos_lista.innerHTML = "";
  mostrarProductosPor("snacks", productos_lista);
  mostrarProductosPor("segundo", productos_lista);
}

function disminuirStockPorNombre(nombre, cantidad) {
  for (var i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].nombre === nombre) {
      PRODUCTOS[i].stock -= cantidad;
      break;
    }
  }
}

function mostrarPedidos(form_pedidos,div_pedidos,productos_lista) {
    form_pedidos.addEventListener("submit", (event) => {
    event.preventDefault();
    div_pedidos.innerHTML = "";
    const pedidos = JSON.parse(localStorage.getItem("reservas"));
    pedidos.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.nombre} - Precio: $${item.precio} - Reservas: ${item.cantidad}`;
      div_pedidos.appendChild(li);
      const entregarButton = crearBoton("Entregar", () => {
        cliente.eliminarReserva(item, item.cantidad);
        localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
        disminuirStockPorNombre(item.nombre, item.cantidad);
        div_pedidos.removeChild(li);
        div_pedidos.removeChild(entregarButton);
        mostrarProductos(productos_lista);
      });
      div_pedidos.appendChild(entregarButton);
    });
  });
}

export { mostrarProductos, crearProducto,mostrarPedidos };
