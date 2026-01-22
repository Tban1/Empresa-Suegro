// Objeto con las categorías y sus nombres descriptivos
const categorias = {
    'compresoresaire': {
        nombre: 'Mantenimiento Compresores de Aire',
        carpeta: 'img/compresoresaire'
    },
    'botellas': {
        nombre: 'Mantenimiento Llenadoras de Botella',
        carpeta: 'img/botellas'
    },
    'gruas': {
        nombre: 'Mantenimiento Grúas Horquillas',
        carpeta: 'img/gruas'
    },
    'etibotellas': {
        nombre: 'Mantenimiento Etiquetadoras Botellas',
        carpeta: 'img/etibotellas'
    },
    'prensas': {
        nombre: 'Mantenimiento Prensas Della Toffola / Enoveneta',
        carpeta: 'img/prensas'
    },
    'vendimia': {
        nombre: 'Mantenimiento Equipos Vendimia',
        carpeta: 'img/vendimia'
    },
    'electrico': {
        nombre: 'Mantenimiento Generadores Eléctricos',
        carpeta: 'img/electrico'
    },
    'electricobombas': {
        nombre: 'Mantenimiento Mecánico Eléctrico Bombas',
        carpeta: 'img/electricobombas'
    },
    'motoreselectricos': {
        nombre: 'Mantenimiento Motores Eléctricos',
        carpeta: 'img/motoreselectricos'
    }
};

// Obtener parámetro de URL
function obtenerParametro(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Cargar galería basada en categoría
function cargarGaleria() {
    const categoria = obtenerParametro('categoria');
    
    if (!categoria || !categorias[categoria]) {
        document.getElementById('galeria-titulo').textContent = 'Categoría no encontrada';
        return;
    }

    const info = categorias[categoria];
    document.getElementById('galeria-titulo').textContent = info.nombre;
    document.title = info.nombre + ' - STI';

    // Cargar imágenes (buscando hasta 20 imágenes)
    const imagenesEstimadas = [];
    for (let i = 1; i <= 20; i++) {
        imagenesEstimadas.push(info.carpeta + '/Imagen' + i + '.jpg');
    }

    const galeria = document.getElementById('galeria-grid');
    galeria.innerHTML = '';
    let imagenessCargadas = 0;

    // Crear elementos de imagen con manejo de errores
    imagenesEstimadas.forEach((ruta, index) => {
        const img = new Image();
        img.src = ruta;
        img.alt = `${info.nombre} - Imagen ${index + 1}`;
        
        // Si la imagen carga exitosamente, mostrarla
        img.onload = function() {
            const wrapper = document.createElement('div');
            wrapper.className = 'galeria-item';
            const imgDisplay = document.createElement('img');
            imgDisplay.src = this.src;
            imgDisplay.alt = this.alt;
            imgDisplay.className = 'galeria-image';
            wrapper.appendChild(imgDisplay);
            wrapper.addEventListener('click', () => abrirModal(this.src, this.alt));
            galeria.appendChild(wrapper);
            imagenessCargadas++;
        };
        
        // No hacer nada si la imagen no carga
        img.onerror = function() {
            // Silenciosamente ignorar imágenes que no existen
        };
        
        // NO agregar al DOM, solo verificar si carga
    });
}

// Modal para ver imagen ampliada
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');

function abrirModal(src, alt) {
    modal.style.display = 'block';
    modalImage.src = src;
    modalImage.alt = alt;
    document.getElementById('modal-caption').textContent = alt;
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', cerrarModal);

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con tecla Esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Cargar galería cuando se carga la página
window.addEventListener('load', cargarGaleria);
