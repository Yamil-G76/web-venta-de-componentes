const producto = JSON.parse(sessionStorage.getItem('productoSeleccionado'));

if (producto) {
  document.querySelector('.info h2').textContent = producto.nombre;
  document.querySelector('.info .precio').textContent = `$${producto.precio} USD`;
  document.querySelector('.galeria img').src = producto.imagen;
} else {
  document.body.innerHTML = '<p>No se encontró el producto seleccionado.</p>';
}
