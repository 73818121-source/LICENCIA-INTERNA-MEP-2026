const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZpw_QTHGDcwxuL92y36UCZANRRr6f2Aa6CmYHL0MwL0c_NIsmjboDaMhje79DZABM/exec";

document.getElementById("btn-buscar")?.addEventListener("click", buscarRegistro);

async function buscarRegistro() {
  const dni = document.getElementById("buscar-dni").value.trim();
  if (!dni) return alert("Ingrese un DNI");

  mostrarCargando();

  try {
    const resp = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "buscar", dni, token: "MEP123" })
    });

    const data = await resp.json();
    ocultarCargando();

    if (!data || data.length === 0) {
      alert("No se encontró registro");
      regresarInicio();
      return;
    }

    cargarDatosCarnet(data);
  } catch (e) {
    ocultarCargando();
    alert("Error al buscar");
  }
}