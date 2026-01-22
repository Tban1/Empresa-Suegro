// Manejar envío del formulario
document.getElementById('formulario-contacto').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const empresa = document.getElementById('empresa').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validar que los campos requeridos estén llenos
    if (!nombre || !empresa || !telefono || !email || !mensaje) {
        mostrarMensaje('Por favor completa todos los campos requeridos', 'error');
        return;
    }

    // Validar correo
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mostrarMensaje('Por favor ingresa un correo válido', 'error');
        return;
    }

    // Validar teléfono
    if (!telefono.match(/^\d{7,}$/)) {
        mostrarMensaje('Por favor ingresa un teléfono válido', 'error');
        return;
    }

    // En una aplicación real, aquí se enviaría a un servidor
    // Por ahora, simplemente mostraremos un mensaje de éxito
    mostrarMensaje('¡Mensaje enviado exitosamente! Nos contactaremos pronto.', 'exito');

    // Limpiar formulario
    document.getElementById('formulario-contacto').reset();

    // Hacer scroll a la respuesta
    setTimeout(() => {
        document.getElementById('mensaje-respuesta').scrollIntoView({ behavior: 'smooth' });
    }, 300);
});

function mostrarMensaje(texto, tipo) {
    const elemento = document.getElementById('mensaje-respuesta');
    elemento.textContent = texto;
    elemento.className = tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error';
    elemento.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        elemento.style.display = 'none';
    }, 5000);
}

// Agregar estilos para los mensajes dinámicamente
const style = document.createElement('style');
style.textContent = `
    .mensaje-exito {
        padding: 12px;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
        border-radius: 4px;
        text-align: center;
    }

    .mensaje-error {
        padding: 12px;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
        border-radius: 4px;
        text-align: center;
    }
`;
document.head.appendChild(style);

// Smooth scroll para navegación
document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.hostname === window.location.hostname && this.pathname === window.location.pathname) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1];
            // Redirigir a index.html con el anchor
            window.location.href = this.getAttribute('href');
        }
    });
});

console.log('Script de contacto cargado correctamente');
