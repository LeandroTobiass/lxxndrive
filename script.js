async function cargarDatos() {
    try {
        const response = await fetch('games.json');
        const datos = await response.json();
        
        // Función para generar los botones de descarga
        const generarBotonesDescarga = (descargas) => {
            return Object.entries(descargas).map(([plataforma, enlace]) => `
                <a href="${enlace}" class="download-btn" target="_blank">${plataforma.toUpperCase()}</a>
            `).join('');
        };

        // Cargar juegos
        const juegosGrid = document.querySelector('#juegos .grid');
        juegosGrid.innerHTML = datos.juegos.map(juego => `
            <div class="card">
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <h3>${juego.titulo}</h3>
                <div class="downloads">
                    ${generarBotonesDescarga(juego.descargas)}
                </div>
            </div>
        `).join('');

        // Cargar programas
        const programasGrid = document.querySelector('#programas .grid');
        programasGrid.innerHTML = datos.programas.map(programa => `
            <div class="card">
                <img src="${programa.imagen}" alt="${programa.titulo}">
                <h3>${programa.titulo}</h3>
                <div class="downloads">
                    ${generarBotonesDescarga(programa.descargas)}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();

    // Navigation
    const navLinks = document.querySelectorAll('.sidebar a');
    const categories = document.querySelectorAll('.category');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active state
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Show/hide categories
            categories.forEach(category => {
                if (category.id === targetId) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});