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
        }
        
    }

}
export default Cliente;