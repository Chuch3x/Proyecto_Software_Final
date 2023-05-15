class Cliente{
    constructor( password, email)
    {
        this.password=password;
        this.email=email;
        this.reservas=[];
    }
    agregarReserva(item)
    {
        this.reservas.push(item);
    }

}
export default Cliente;