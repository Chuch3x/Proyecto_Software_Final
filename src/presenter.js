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
  productos_lista.innerHTML = "";
  PRODUCTOS.forEach((producto) => {
    console.log(producto.nombre + ": " + producto.categoria);
    if(producto.categoria=='snacks')
    {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

    const agregarButton = createButton("Reservar", () => {
      cliente.agregarReserva(producto);
      mostrarProductos();
    });
    
    li.appendChild(agregarButton);
    productos_lista.appendChild(li);
    }
    
  });
}

function mostrarSegundos() {
  productos_lista.innerHTML = "";
  PRODUCTOS.forEach((producto) => {
    
    if(producto.categoria=='segundo')
    {
      const li = document.createElement("li");
      li.innerHTML = `${producto.nombre}: ${producto.descripcion} - Precio: $${producto.precio} - Stock: ${producto.stock}`;

    const agregarButton = createButton("Reservar", () => {
      cliente.agregarReserva(producto);
      mostrarProductos();
    });

    li.appendChild(agregarButton);
    productos_lista.appendChild(li);
    }
    
  });
}

function mostrarProductos() {
  mostrarSegundos();
  mostrarSnacks();
}



mostrarProductos();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const reservasCliente = cliente.reservas;
  div.innerHTML = "";

  reservasCliente.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Precio: $${item.precio}`;
    div.appendChild(li);

    const eliminarButton = createButton("Eliminar", () => {
      cliente.eliminarReserva(item);
      div.removeChild(li);
      div.removeChild(eliminarButton);
      mostrarProductos();
    });

    div.appendChild(eliminarButton);
  });
});
