import Item from "./item";
class Cliente {
  constructor(password, email) {
    this.password = password;
    this.email = email;
    this.reservas = [];
  }
  agregarReserva(item) {
    if (item.stock > 0) {
      this.reservas.push(item);
      item.stock--;
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
