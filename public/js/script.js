let cuenta = 0;
document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const documento = document.getElementById('documento').value;

    const response = await fetch('/estudiantes/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documento }),
    });
    
    const data = await response.json();
    if(data.error) {
        alert(data.error);
        document.getElementById('documento').value = null;
        return;
    }
    const tabla = document.getElementById('tabla-estudiantes');
    const filaExistente = document.getElementById(`fila-${documento}`);
    if (filaExistente) {
        // Si el estudiante ya tiene una fila en la tabla, la removemos.
        tabla.removeChild(filaExistente);
        document.getElementById('documento').value = null;
        cuenta -= 1;
        document.getElementById("cantidad_estudiantes").innerHTML = cuenta
        
    } else {
        // Si el estudiante no tiene una fila en la tabla, la agregamos.
        const nuevaFila = document.createElement('tr');
        nuevaFila.id = `fila-${documento}`;

        const celdaDocumento = document.createElement('td');
        celdaDocumento.textContent = data.documento;
        nuevaFila.appendChild(celdaDocumento);

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = data.nombre;
        nuevaFila.appendChild(celdaNombre);

        const celdaGrupo = document.createElement('td');
        celdaGrupo.textContent = data.grupo;
        nuevaFila.appendChild(celdaGrupo);

        tabla.appendChild(nuevaFila);
        document.getElementById('documento').value = null;
        cuenta += 1;
        document.getElementById("cantidad_estudiantes").innerHTML = cuenta;
    }
});
    
  window.onload = function() {
    const tabla = document.getElementById('tabla-estudiantes');
    fetch('/estudiantes/fuera')
      .then(response => response.json())
      .then(estudiantes => {
        cuenta = Object.keys(estudiantes).length;
        document.getElementById('cantidad_estudiantes').innerHTML = cuenta;
        estudiantes.forEach(estudiante => {
            const nuevaFila = document.createElement('tr');
            nuevaFila.id = `fila-${estudiante.documento}`;
    
            const celdaDocumento = document.createElement('td');
            celdaDocumento.textContent = estudiante.documento;
            nuevaFila.appendChild(celdaDocumento);
    
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = estudiante.nombre;
            nuevaFila.appendChild(celdaNombre);
    
            const celdaGrupo = document.createElement('td');
            celdaGrupo.textContent = estudiante.grupo;
            nuevaFila.appendChild(celdaGrupo);
    
            tabla.appendChild(nuevaFila);

        });
      })
      .catch(error => console.error('Error:', error));
  };


  try {
    document.getElementById('upload-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = document.getElementById('file').files[0];
      
        const formData = new FormData();
        formData.append('file', file);
      
        const response = await fetch('/estudiantes/cargamasiva', {
          method: 'POST',
          body: formData,
        });
      
        const data = await response.text();
        alert(data);
      });
  } catch (error) {
    console.error('En esta página no se encuentra el formulario upload-form');
  }
