import Item from "./item";
class Cliente {
  constructor(password, email) {
    this.password = password;
    this.email = email;
    this.reservas = [];
  }
  agregarReserva(item, cantidad) {
    if (item.stock > 0 && cantidad > 0 && cantidad<=item.stock) {
      item.stock -= cantidad;
      const itemReserva = {
        ...item,
        cantidad: cantidad
      };
      this.reservas.push(itemReserva);
    }
  }
  
  eliminarReserva(item, cantidad) {

    this.reservas = this.reservas.filter(
      (elemento) => elemento.nombre !== item.nombre
    );
    item.stock = item.stock+cantidad;
  }
  
  crearProducto(nombre, precio, stock, descripcion, categoria) {
    const producto = new Item(nombre, precio, stock, descripcion, categoria);
    return producto;
  }
  esAdmin() {
    return this.email == "admin" && this.password == "password";
  }
  validarDatos(){
    return this.email != "" && this.password != "";
  }
}
export default Cliente;