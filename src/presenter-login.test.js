import Cliente from "./cliente";

describe("Mostrar items", () => {
  var admin = new Cliente("password", "admin");
  it("deberia verificar si es administrado", () => {
    expect(admin.esAdmin()).toEqual(true);
  });
  it("deberia validar los datos", () => {
    expect(new Cliente("", "").validarDatos()).toEqual(false);
  });
});
