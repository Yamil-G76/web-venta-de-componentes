
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-productos');
  const paginacion = document.querySelector('.paginacion');
  const productosPorPagina = 5;

  let productos = [];
  let paginaActual = 1;

  function mostrarProductos(pagina) {
    contenedor.innerHTML = '';

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);

    productosPagina.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('producto');
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio} USD</p>
        <a class="btn-producto" href="Productos.html?id=${producto.id}">Ver más</a>
      `;
      contenedor.appendChild(div);
    });

    actualizarPaginacion(pagina);
  }

  function actualizarPaginacion(pagina) {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    paginacion.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add(i === pagina ? 'activo' : '');
      button.addEventListener('click', () => {
        paginaActual = i;
        mostrarProductos(paginaActual);
      });
      paginacion.appendChild(button);
    }
  }

  // Cargar desde sessionStorage o desde archivo
  const datosGuardados = sessionStorage.getItem('productos');
  if (datosGuardados) {
    try {
      productos = JSON.parse(datosGuardados);
      mostrarProductos(paginaActual);
    } catch (e) {
      console.error('Error al leer productos desde sessionStorage:', e);
      contenedor.innerHTML = '<p>Error cargando productos almacenados.</p>';
    }
  } else {
    fetch('/productos.JSON')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
    return response.json();
  })
  .then(data => {
    sessionStorage.setItem('productos', JSON.stringify(data));
    productos = data;
    mostrarProductos(paginaActual);
  })
  .catch(error => {
    console.error('Error al cargar productos desde JSON:', error);
    contenedor.innerHTML = '<p>Error al cargar productos del archivo.</p>';
  });
  }
});