import Cliente from "./cliente";
import Item from "./item";
import PRODUCTOS from "./productos";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector("#items_menu");
const crear_producto_form = document.querySelector("#crear_producto_form");
const nombre_producto = document.querySelector("#nombre_producto");
const precio_producto = document.querySelector("#precio_producto");
const stock_producto = document.querySelector("#stock_producto");
const descripcion_producto = document.querySelector("#descripcion_producto");

var cliente = new Cliente("password","admin");
cliente.reservas = JSON.parse(localStorage.getItem('reservas'));
console.log(cliente.reservas);
function actualizarItem(lista, producto) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nombre === producto.nombre) {
      lista[i].stock = producto.stock;
      lista[i].nombre = producto.nombre;
      lista[i].precio = producto.precio;
      break;
    }
  }
}
console.log(PRODUCTOS);


function mostrarSnacks() {
  const snacksContainer = document.createElement("div");
  snacksContainer.innerHTML = "<b>SNACKS</b>";
  PRODUCTOS.forEach((producto) => {
    if (producto.categoria == "snacks") {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

      const editarInput = document.createElement("input");
      editarInput.type = "button";
      editarInput.value = "Editar";
      editarInput.addEventListener("click", () => {
        editarProducto(producto);
      });

      const eliminarInput = document.createElement("input");
      eliminarInput.type = "button";
      eliminarInput.value = "Eliminar";
      eliminarInput.addEventListener("click", () => {
        const index = PRODUCTOS.indexOf(producto);
        if (index > -1) {
          PRODUCTOS.splice(index, 1);
          li.remove();
          container.remove();
          alert("Producto eliminado");
        }
      });

      const container = document.createElement("div");
      container.setAttribute("class", "item_menu");
      container.appendChild(li);
      container.appendChild(editarInput);
      container.appendChild(eliminarInput);

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

      const editarInput = document.createElement("input");
      editarInput.type = "button";
      editarInput.value = "Editar";
      editarInput.addEventListener("click", () => {
        editarProducto(producto);
      });

      const eliminarInput = document.createElement("input");
      eliminarInput.type = "button";
      eliminarInput.value = "Eliminar";
      eliminarInput.addEventListener("click", () => {
        const index = PRODUCTOS.indexOf(producto);
        if (index > -1) {
          PRODUCTOS.splice(index, 1);
          li.remove();
          container.remove();
          alert("Producto eliminado");
        }
      });

      const container = document.createElement("div");
      container.setAttribute("class", "item_menu");
      container.appendChild(li);
      container.appendChild(editarInput);
      container.appendChild(eliminarInput);
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

function editarProducto(producto) {
  nombre_producto.value = producto.nombre;
  precio_producto.value = producto.precio;
  stock_producto.value = producto.stock;
  descripcion_producto.value = producto.descripcion;

  const index = PRODUCTOS.indexOf(producto);
  if (index > -1) {
    PRODUCTOS.splice(index, 1);
  }

  mostrarProductos();
}

function createButton(text, clickHandler) {
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
    descripcion_producto.value
  );

  PRODUCTOS.push(productoCreado);

  const li = document.createElement("li");
  li.innerHTML = `${productoCreado.nombre}: ${productoCreado.descripcion} - Precio: $${productoCreado.precio} - Stock: ${productoCreado.stock}`;
  productos_lista.appendChild(li);

  const editarInput = document.createElement("input");
  editarInput.type = "button";
  editarInput.value = "Editar";
  editarInput.addEventListener("click", () => {
    editarProducto(productoCreado);
  });

  const eliminarInput = document.createElement("input");
  eliminarInput.type = "button";
  eliminarInput.value = "Eliminar";
  eliminarInput.addEventListener("click", () => {
    const index = PRODUCTOS.indexOf(productoCreado);
    if (index > -1) {
      PRODUCTOS.splice(index, 1);
      console.log(PRODUCTOS);
      li.remove();
      alert("Producto eliminado");
    }
  });

  li.appendChild(editarInput);
  li.appendChild(eliminarInput);
  productos_lista.appendChild(li);
  crear_producto_form.reset();
});


function disminuirStockPorNombre(nombre,cantidad) {
  for (var i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].nombre === nombre) {
      PRODUCTOS[i].stock -= cantidad;
      break; 
    }
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

    const eliminarButton = createButton("Entregar", () => {
      cliente.eliminarReserva(item,item.cantidad);
      localStorage.setItem("reservas", JSON.stringify(cliente.reservas));
      disminuirStockPorNombre(item.nombre,item.cantidad);
      div.removeChild(li);
      div.removeChild(eliminarButton);
      mostrarProductos();
    });

    div.appendChild(eliminarButton);
  });
});