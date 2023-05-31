import Cliente from "./cliente";
import { crearProducto, mostrarPedidos, mostrarProductos } from "./operacionesAdministrador";
import PRODUCTOS from "./productos";

const form_pedidos = document.querySelector("#menu_form");
const div_pedidos = document.querySelector("#lista_reservas");
const productos_lista = document.querySelector("#items_menu");
const crear_producto_form = document.querySelector("#crear_producto_form");
const nombre_producto = document.querySelector("#nombre_producto");
const precio_producto = document.querySelector("#precio_producto");
const stock_producto = document.querySelector("#stock_producto");
const descripcion_producto = document.querySelector("#descripcion_producto");
const categoria_producto = document.querySelector("#categoria_producto");



mostrarProductos(productos_lista);
crearProducto(crear_producto_form,productos_lista);
mostrarPedidos(form_pedidos,div_pedidos,productos_lista);






