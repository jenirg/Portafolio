
async function makeRequest() {
    try {
        const response = await fetch('https://portafolio-backend-swart.vercel.app/api/blogs/');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const contenedorTexto = document.getElementById('blogs');
          
            for (const item of data) {
                
                const nuevoDiv = document.createElement('div');
                nuevoDiv.className = 'mi-div'; // Agrega tus clases CSS aquí
                nuevoDiv.innerHTML = `
                <p>${item._id}</p>
                <p>${item.titulo}</p>
                <p>${item.contenido}</p>
                <p>${item.fecha}</p>
                <p>${item.autor}</p>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" onclick="eliminarBlogs()"  type="button" data-id=${item._id}>Eliminar</button>
                <button class="btn btn-primary" onclick="editarBlogs()" type="button" data-id=${item._id}>Editar</button>
                </div>

                `;
                contenedorTexto.appendChild(nuevoDiv);
            }
            
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }


}

async function crearBlogs() {
    fetch('https://portafolio-backend-swart.vercel.app/api/blogs/crear', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
  },
  
  body: JSON.stringify({
    
    
        "titulo": document.getElementById('titulo').value,
        "contenido": document.getElementById('contenido').value,
        "autor": document.getElementById('autor').value,
        "fecha": document.getElementById('fecha').value,
    
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Nuevo usuario creado:', data);
  })
  .catch(error => {
    console.error('Error al crear el usuario:', error);
  });

}

async function eliminarBlogs() {
    const botonEliminar = event.target; // El botón que se hizo clic
  const idArticulo = botonEliminar.getAttribute('data-id');
    fetch(`https://portafolio-backend-swart.vercel.app/api/blogs/eliminar/${idArticulo}`, {
  method: 'DELETE',
})
  .then(response => {
    if (response.status === 204) {
      console.log('Usuario eliminado correctamente');
    } else {
      console.error('Error al eliminar el usuario');
    }
  })
  .catch(error => {
    console.error('Error al eliminar el usuario:', error);
  });

}
async function editarBlogs() {
    fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'new-email@example.com',
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Usuario actualizado:', data);
  })
  .catch(error => {
    console.error('Error al actualizar el usuario:', error);
  });
}

makeRequest()