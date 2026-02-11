document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DEL BLOG (Diario) - Mantenemos igual
    // ==========================================
    const blogForm = document.getElementById('blogForm');
    const postsContainer = document.getElementById('postsContainer');

    if (postsContainer) loadPosts();

    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            let image = document.getElementById('postImage').value || 'defecto.png';

            const newPost = {
                id: Date.now(),
                title, content, image, date: new Date().toLocaleDateString()
            };
            savePostToLocal(newPost);
            blogForm.reset();
            loadPosts();
        });
    }

    function savePostToLocal(post) {
        let posts = JSON.parse(localStorage.getItem('glowyPosts')) || [];
        posts.unshift(post);
        localStorage.setItem('glowyPosts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('glowyPosts')) || [];
        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p style="text-align:center; color:#999;">Tu diario está vacío.</p>';
            return;
        }
        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'blog-post-card';
            div.innerHTML = `
                <img src="${post.image}" class="blog-img-preview" onerror="this.onerror=null;this.src='defecto.png'">
                <div class="blog-content">
                    <span class="blog-date">${post.date}</span>
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button type="button" onclick="deletePost(${post.id})" class="delete-btn">Borrar</button>
                </div>`;
            postsContainer.appendChild(div);
        });
    }

    // ==========================================
    // 2. LÓGICA DEL HOME (Cita Aleatoria)
    // ==========================================
    const quoteDisplay = document.getElementById('quote-display');
    if (quoteDisplay && typeof citasMotivacion !== 'undefined') {
        const rand = Math.floor(Math.random() * citasMotivacion.length);
        quoteDisplay.innerHTML = `<p class="quote-text">"${citasMotivacion[rand].texto}"</p><span class="quote-author">— ${citasMotivacion[rand].autor}</span>`;
    }

    // ==========================================
    // 3. LÓGICA DE TARJETAS (Rutinas/Recetas)
    // ==========================================
    const dynamicContainer = document.getElementById('dynamic-container');
    
    if (dynamicContainer) {
        const pageType = dynamicContainer.dataset.page; 
        let currentData = (pageType === 'rutinas') ? rutinasData : recetasData;

        // Renderizado inicial
        renderCards(currentData, pageType);

        // Filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.type = "button";
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                const filtered = (filter === 'todos') ? currentData : currentData.filter(i => i.tipo === filter);
                renderCards(filtered, pageType);
            });
        });
    }

    function renderCards(items, type) {
        if (!dynamicContainer) return;
        dynamicContainer.innerHTML = ''; 

        if (items.length === 0) {
            dynamicContainer.innerHTML = '<p>No hay resultados.</p>'; return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-interactive';
            
            const title = (type === 'rutinas') ? item.nombre : item.nombre_receta;
            
            // LÓGICA DE VISUALIZACIÓN DIFERENCIADA
            let cardContentHtml = '';
            
            if (type === 'recetas') {
                // Para Recetas: Mostramos lista de ingredientes (máximo 3)
                const ingPreview = item.ingredientes.slice(0, 3).map(i => `<li>• ${i}</li>`).join('');
                const moreIng = item.ingredientes.length > 3 ? '<li>...</li>' : '';
                cardContentHtml = `<ul style="font-size:0.85rem; color:#666; list-style:none; margin-top:10px;">${ingPreview}${moreIng}</ul>`;
            } else {
                // Para Rutinas: Mostramos la descripción corta
                cardContentHtml = `<p style="margin-top:10px; font-size:0.9rem;">${item.descr_corta}</p>`;
            }

            // Al hacer click, vamos a detalle.html pasando el nombre por URL
            // Usamos encodeURIComponent para evitar errores con espacios o tildes
            card.onclick = () => {
                window.location.href = `detalle.html?type=${type}&name=${encodeURIComponent(title)}`;
            };

            card.innerHTML = `
                <img src="${item.imagen}" alt="${title}" class="card-img-top" onerror="this.onerror=null;this.src='defecto.png';">
                <div class="card-body">
                    <span class="card-meta">${item.tipo.toUpperCase()} • ${item.duracion_estimada}</span>
                    <h3>${title}</h3>
                    ${cardContentHtml}
                    <span style="display:block; margin-top:15px; font-size:0.8rem; font-weight:bold; color:var(--text-brown);">Ver paso a paso →</span>
                </div>
            `;
            dynamicContainer.appendChild(card);
        });
    }

    // ==========================================
    // 4. LÓGICA DE PÁGINA DETALLE (detalle.html)
    // ==========================================
    const detailView = document.getElementById('detail-view');

    if (detailView) {
        // 1. Leer parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type'); // 'rutinas' o 'recetas'
        const name = params.get('name');

        if (!type || !name) {
            detailView.innerHTML = '<p>Error: No se ha especificado contenido.</p>';
            return;
        }

        // 2. Buscar el objeto en los datos
        let dataSet = (type === 'rutinas') ? rutinasData : recetasData;
        const item = dataSet.find(i => {
            const itemName = (type === 'rutinas') ? i.nombre : i.nombre_receta;
            return itemName === name;
        });

        if (!item) {
            detailView.innerHTML = '<p>Lo sentimos, no hemos encontrado este contenido.</p>';
            return;
        }

        // 3. Renderizar el HTML del detalle
        if (type === 'rutinas') {
            renderRutinaDetail(item);
        } else {
            renderRecetaDetail(item);
        }
    }

    function renderRutinaDetail(item) {
        // Generar lista de ejercicios con número correcto
        const ejerciciosHtml = item.ejercicios.map((ej, index) => `
            <li class="step-item">
                <div class="step-number">${index + 1}</div> 
                <div class="step-content">
                    <strong>${ej.nombre_ejercicio}</strong>
                    <p>Repeticiones: ${ej.repeticiones} ${ej.peso ? '| Peso: ' + ej.peso : ''}</p>
                </div>
            </li>
        `).join('');

        detailView.innerHTML = `
            <div class="detail-header">
                <span class="tag">${item.tipo}</span>
                <h1>${item.nombre}</h1>
                <p class="detail-meta">⏱ ${item.duracion_estimada}</p>
            </div>
            <img src="${item.imagen}" class="detail-hero-img" onerror="this.onerror=null;this.src='defecto.png';">
            <div class="detail-body">
                <h3>Objetivo</h3>
                <p>${item.descr_corta}</p>
                <hr style="margin: 30px 0; border:0; border-top:1px solid #eee;">
                <h3>Tabla de Ejercicios</h3>
                <ul class="steps-list">
                    ${ejerciciosHtml}
                </ul>
            </div>
        `;
    }

    function renderRecetaDetail(item) {
        // Generar lista de pasos
        const pasosHtml = item.pasos.map(paso => `
            <li class="step-item">
                <div class="step-number">${paso.numero_paso}</div>
                <div class="step-content">
                    <strong>${paso.nombre_paso}</strong>
                    <p>${paso.descripcion}</p>
                </div>
            </li>
        `).join('');

        const ingredientesHtml = item.ingredientes.map(ing => `<li>${ing}</li>`).join('');

        detailView.innerHTML = `
            <div class="detail-header">
                <span class="tag">${item.tipo}</span>
                <h1>${item.nombre_receta}</h1>
                <p class="detail-meta">⏱ ${item.duracion_estimada}</p>
            </div>
            <img src="${item.imagen}" class="detail-hero-img" onerror="this.onerror=null;this.src='defecto.png';">
            <div class="detail-body">
                <div class="ingredients-box">
                    <h3>Ingredientes</h3>
                    <ul>${ingredientesHtml}</ul>
                </div>
                <h3>Preparación Paso a Paso</h3>
                <ul class="steps-list">
                    ${pasosHtml}
                </ul>
            </div>
        `;
    }
});

// Función global borrar post
window.deletePost = function(id) {
    if(confirm("¿Borrar?")) {
        let posts = JSON.parse(localStorage.getItem('glowyPosts')) || [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('glowyPosts', JSON.stringify(posts));
        location.reload(); 
    }
};