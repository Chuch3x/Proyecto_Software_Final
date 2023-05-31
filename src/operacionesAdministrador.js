import PRODUCTOS from "./productos";
function editarProducto(producto,productos_lista) {
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
function eliminarProducto(producto,productos_lista) {
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

function mostrarProductosPor(categoria, productos_lista) {
  const productosContainer = document.createElement("div");
  productosContainer.innerHTML = `<b>${categoria.toUpperCase()}</b>`;
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria === categoria) {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;
      const editarButton = crearBoton("Editar", () => {
        editarProducto(producto,productos_lista);
      });
      const eliminarButton = crearBoton("Eliminar", () => {
        eliminarProducto(producto,productos_lista);
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

export { mostrarProductos };
