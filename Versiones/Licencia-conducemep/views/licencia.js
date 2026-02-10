const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZpw_QTHGDcwxuL92y36UCZANRRr6f2Aa6CmYHL0MwL0c_NIsmjboDaMhje79DZABM/exec";

// FOTO
document.getElementById('foto-input')?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = document.getElementById('foto-preview');
    img.src = ev.target.result;
    img.style.display = 'block';
    document.querySelector('.foto span').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// MOSTRAR TABLA
function mostrarTabla(datos, titulo) {
  const cont = document.getElementById("resultado-busqueda");
  cont.innerHTML = `<h4>${titulo}</h4>`;
  if (datos.length === 0) {
    cont.innerHTML += "<p>No se encontraron registros.</p>";
    return;
  }
  const tabla = document.createElement("table");
  tabla.border = "1";
  tabla.style.borderCollapse = "collapse";
  tabla.innerHTML = `
    <tr>
      <th>Fecha</th><th>DNI</th><th>Nombre</th>
      <th>Categoría</th><th>Equipo</th>
      <th>Marca</th><th>Modelo</th><th>Acciones</th>
    </tr>`;
  datos.forEach(r => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${new Date(r.fecha).toLocaleDateString()}</td>
      <td><input value="${r.dni}"></td>
      <td><input value="${r.nombre}"></td>
      <td><input value="${r.categoria}"></td>
      <td><input value="${r.equipo}"></td>
      <td><input value="${r.marca}"></td>
      <td><input value="${r.modelo}"></td>
      <td><button onclick="guardarEdicion(${r.row}, this)">💾</button></td>`;
    tabla.appendChild(fila);
  });
  cont.appendChild(tabla);
}

// BUSCAR
document.getElementById("btn-buscar")?.addEventListener("click", async () => {
  const dni = document.getElementById("buscar-dni").value.trim();
  if (!dni) return alert("Ingrese un DNI");
  mostrarCargando();

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
});

// UTILIDADES
function buscarDesdeInicio() {
  const dni = document.getElementById("dni-inicio").value.trim();
  if (!dni) return alert("Ingrese un DNI");
  document.getElementById("pagina-inicio").style.display = "none";
  document.getElementById("pagina-buscador").style.display = "block";
  document.getElementById("buscar-dni").value = dni;
  document.getElementById("btn-buscar").click();
}

function mostrarCargando() {
  document.getElementById("cargando").style.display = "flex";
}
function ocultarCargando() {
  document.getElementById("cargando").style.display = "none";
}
function nuevaBusqueda() {
  window.location.reload();
}
function regresarInicio() {
  document.getElementById("pagina-buscador").style.display = "none";
  document.getElementById("pagina-inicio").style.display = "block";
}

// IMPRIMIR
document.getElementById("btn-imprimir")?.addEventListener("click", () => {
  window.print();
});

// SOLO LECTURA
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('input:not([type="file"])');
  inputs.forEach(i => {
    if (i.id !== "buscar-dni" && i.id !== "dni-inicio") {
      i.readOnly = true;
      i.style.pointerEvents = "none";
    }
  });
});