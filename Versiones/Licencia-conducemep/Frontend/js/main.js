document.getElementById("btn-imprimir")?.addEventListener("click", () => {
  window.print();
});

document.addEventListener("DOMContentLoaded", () => {
  activarSoloLectura();

  document.getElementById("dni-inicio")?.addEventListener("keypress", e => {
    if (e.key === "Enter") buscarDesdeInicio();
  });
});
