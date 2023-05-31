import Cliente from "./cliente";
import Item from "./item";
import { ingresar, mostrarProductos, mostrarReservas } from "./operacionesPresenter";
import PRODUCTOS from "./productos";

const form = document.querySelector("#menu_form");
const div = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector("#items_menu");


mostrarProductos(productos_lista)
mostrarReservas(form,div,productos_lista);