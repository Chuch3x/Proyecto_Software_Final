import Cliente from "./cliente";
const formulario = document.querySelector("#login");
const usuario = document.querySelector("#usuario");
const contrasenia = document.querySelector("#contrasenia");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  var admin = new Cliente(contrasenia.value, usuario.value);
  if (admin.esAdmin()) {
    window.location.href = "index.html";
    alert("Bienvenido Administrador");
  }
  if(!admin.validarDatos()){
    alert("Datos Invalidos");
    window.location.reload();
  }
});
