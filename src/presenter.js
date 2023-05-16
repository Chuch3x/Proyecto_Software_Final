import Cliente from "./cliente";
import Item from "./item";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector('#items_menu');
const crear_producto_form = document.querySelector('#crear_producto_form');
const nombre_producto = document.querySelector('#nombre_producto');
const precio_producto = document.querySelector('#precio_producto');
const stock_producto = document.querySelector('#stock_producto');
const descripcion_producto = document.querySelector('#descripcion_producto');

var productos = [new Item("Salchipapa", 10, 15, "Papas con salchicha."), new Item("Panini", 5, 15, "Masa rellena de jamon con tomate.")];

var cliente = new Cliente("contrasena1", "dayan");

function mostrarProductos() {
  productos_lista.innerHTML = "";

  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

    const agregarButton = document.createElement('button');
    agregarButton.textContent = "Agregar";
    agregarButton.addEventListener('click', () => {
      cliente.agregarReserva(producto);
    });

    const editarButton = document.createElement('button');
    editarButton.textContent = "Editar";
    editarButton.addEventListener('click', () => {
      editarProducto(producto);
    });

    li.appendChild(agregarButton);
    li.appendChild(editarButton);

    productos_lista.appendChild(li);
  });
}
  

function editarProducto(producto) {
    // Rellenar los campos del formulario con los valores del producto existente
    nombre_producto.value = producto.nombre;
    precio_producto.value = producto.precio;
    stock_producto.value = producto.stock;
    descripcion_producto.value = producto.descripcion;
  
    // Eliminar el producto existente de la lista de productos
    const index = productos.indexOf(producto);
    if (index > -1) {
      productos.splice(index, 1);
    }
  
    // Actualizar la lista de productos en el HTML
    mostrarProductos();
  }
  


mostrarProductos();

crear_producto_form.addEventListener("submit", (event) => {
  event.preventDefault();
  var productoCreado = new Item(nombre_producto.value, parseFloat(precio_producto.value), parseInt(stock_producto.value), descripcion_producto.value);
  productos.push(productoCreado);

  const li = document.createElement("li");
  li.innerHTML = `${productoCreado.nombre}: ${productoCreado.descripcion} - Precio: $${productoCreado.precio} - Stock: ${productoCreado.stock}`;
  productos_lista.appendChild(li);

  const agregarButton = document.createElement('button');
  agregarButton.textContent = "Agregar";
  agregarButton.addEventListener('click', () => {
    cliente.agregarReserva(productoCreado);
  });

  const editarButton = document.createElement('button');
  editarButton.textContent = "Editar";
  editarButton.addEventListener('click', () => {
    editarProducto(producto);
  });
 
 productos_lista.appendChild(agregarButton);
 productos_lista.appendChild(editarButton);
  crear_producto_form.reset();

});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const reservasCliente = cliente.reservas;

  // Vaciar el contenido del div antes de agregar los elementos actualizados
  div.innerHTML = "";

  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Precio: $${item.precio}`;
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