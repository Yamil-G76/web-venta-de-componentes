document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('productos')) {
    fetch('/productos.JSON')
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem('productos', JSON.stringify(data));
        mostrarDestacados(data);
      })
      .catch(err => console.error('Error cargando productos:', err));
  } else {
    const productos = JSON.parse(sessionStorage.getItem('productos'));
    mostrarDestacados(productos);
  }
});

function mostrarDestacados(productos) {
  const contenedor = document.querySelector('.destacados div');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  productos.slice(0, 4).forEach(p => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" style="max-width: 100%; border-radius: 8px;">
      <h4>${p.nombre}</h4>
      <p>$${p.precio}</p>
      <a class="enlace-producto" href="/Productos.html?id=${p.id}">Ver producto</a>
    `;
    contenedor.appendChild(div);
  });
}

// Guardar producto seleccionado al hacer clic
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('enlace-producto')) {
    const id = new URL(e.target.href).searchParams.get('id');
    const productos = JSON.parse(sessionStorage.getItem('productos'));
    const productoSeleccionado = productos.find(p => p.id == id);
    if (productoSeleccionado) {
      sessionStorage.setItem('productoSeleccionado', JSON.stringify(productoSeleccionado));
    }
  }
});