function mostrarCargando() {
  document.getElementById("cargando").style.display = "flex";
}

function ocultarCargando() {
  document.getElementById("cargando").style.display = "none";
}

function regresarInicio() {
  document.getElementById("pagina-buscador").style.display = "none";
  document.getElementById("pagina-inicio").style.display = "block";
}

function nuevaBusqueda() {
  window.location.reload();
}

function buscarDesdeInicio() {
  const dni = document.getElementById("dni-inicio").value.trim();
  if (!dni) return alert("Ingrese DNI");

  document.getElementById("pagina-inicio").style.display = "none";
  document.getElementById("pagina-buscador").style.display = "block";
  document.getElementById("buscar-dni").value = dni;
  document.getElementById("btn-buscar").click();
}
