import Item from "./item";
class Cliente{
    constructor( password, email)
    {
        this.password=password;
        this.email=email;
        this.reservas=[];
    }
    agregarReserva(item)
    {
        if(item.stock>0)
        {
            this.reservas.push(item);
            item.stock--;
            //return console.log("se agrego");
        }
        
    }
    eliminarReserva(item)
    {
        this.reservas = this.reservas.filter
        (
            (elemento) => elemento.nombre !== item.nombre
    
        );
        item.stock++;
    }
    crearProducto(nombre,precio,stock,descripcion)
    {
        const producto=new Item(nombre,precio,stock,descripcion);
        return producto;
    }
   

}
export default Cliente;