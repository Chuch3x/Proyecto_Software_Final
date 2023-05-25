class Item {
  constructor(nombre, precio, stock, descripcion) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.descripcion = descripcion;
    this.categoria = "";
  }
  setCategoria(categoria){
    this.categoria=categoria;
  }
}
export default Item;