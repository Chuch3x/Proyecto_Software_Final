import Item from "./item";
class Cliente {
  constructor(password, email) {
    this.password = password;
    this.email = email;
    this.reservas = [];
  }
  agregarReserva(item, cantidad) {
    if (item.stock > 0 && cantidad > 0) {
      const itemReserva = {
        ...item,
        cantidad: cantidad
      };
      this.reservas.push(itemReserva);
      item.stock -= cantidad;
    }
  }
  
  eliminarReserva(item) {
    this.reservas = this.reservas.filter(
      (elemento) => elemento.nombre !== item.nombre
    );
    item.stock++;
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
