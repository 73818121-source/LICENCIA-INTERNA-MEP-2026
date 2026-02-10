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