document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DEL BLOG (Diario)
    // ==========================================
    const blogForm = document.getElementById('blogForm');
    const postsContainer = document.getElementById('postsContainer');

    if (postsContainer) loadPosts();

    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            // Si no hay url, usa defecto.png
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
        // Decide qué datos usar según la página HTML
        let currentData = (pageType === 'rutinas') ? rutinasData : recetasData;

        // Renderizado inicial
        renderCards(currentData, pageType);

        // Lógica de los botones de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.type = "button";
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Quitar clase active a todos y ponerla al pulsado
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                // Filtrar datos
                const filtered = (filter === 'todos') ? currentData : currentData.filter(i => i.tipo === filter);
                renderCards(filtered, pageType);
            });
        });
    }

    // Función para pintar las tarjetas en la rejilla
    function renderCards(items, type) {
        const container = document.getElementById('dynamic-container');
        if (!container) return;
        
        container.innerHTML = ''; 

        if (items.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100%; color:#666;">No hay resultados para esta categoría.</p>'; 
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-interactive';
            
            // Título diferente según sea rutina o receta
            const title = (type === 'rutinas') ? item.nombre : item.nombre_receta;
            
            let cardContentHtml = '';
            
            if (type === 'recetas') {
                // RECETAS: Sacamos los nombres de los ingredientes del objeto
                const ingredientesNombres = Object.keys(item.ingredientes);
                
                // Mostramos solo los 3 primeros
                const preview = ingredientesNombres.slice(0, 3).map(nombre => `<li>• ${nombre}</li>`).join('');
                const sobra = ingredientesNombres.length - 3;
                const masItems = sobra > 0 ? `<li style="opacity:0.6; font-style:italic;">+ ${sobra} más...</li>` : '';
                
                cardContentHtml = `<ul style="font-size:0.85rem; color:#666; list-style:none; margin-top:10px; line-height:1.4;">${preview}${masItems}</ul>`;
            
            } else {
                // RUTINAS: Mostramos la descripción corta
                cardContentHtml = `<p style="margin-top:10px; font-size:0.9rem; color:#555;">${item.descr_corta}</p>`;
            }

            // Al hacer click, ir al detalle
            card.onclick = () => {
                window.location.href = `detalle.html?type=${type}&name=${encodeURIComponent(title)}`;
            };

            card.innerHTML = `
                <img src="${item.imagen}" alt="${title}" class="card-img-top" onerror="this.onerror=null;this.src='defecto.png';">
                <div class="card-body">
                    <span class="card-meta">${item.tipo.toUpperCase()} • ${item.duracion_estimada}</span>
                    <h3 style="font-size:1.2rem; margin: 10px 0; color:var(--text-main);">${title}</h3>
                    ${cardContentHtml}
                    <span style="display:block; margin-top:20px; font-size:0.85rem; font-weight:700; color:var(--accent-color); text-transform:uppercase; letter-spacing:1px;">
                        Ver paso a paso →
                    </span>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // ==========================================
    // 4. LÓGICA DE PÁGINA DETALLE (detalle.html)
    // ==========================================
    const detailView = document.getElementById('detail-view');

    if (detailView) {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        const name = params.get('name');

        if (!type || !name) {
            detailView.innerHTML = '<p>Error: No se ha especificado contenido.</p>';
            return;
        }

        // Buscar el elemento en la base de datos correspondiente
        let dataSet = (type === 'rutinas') ? rutinasData : recetasData;
        
        // Decodificamos el nombre de la URL para compararlo bien
        const decodedName = decodeURIComponent(name); 

        const item = dataSet.find(i => {
            const itemName = (type === 'rutinas') ? i.nombre : i.nombre_receta;
            return itemName === decodedName;
        });

        if (!item) {
            detailView.innerHTML = '<p>Lo sentimos, no hemos encontrado este contenido.</p>';
            return;
        }

        // Pintar el detalle según el tipo
        if (type === 'rutinas') {
            renderRutinaDetail(item);
        } else {
            renderRecetaDetail(item);
        }
    }

    function renderRutinaDetail(item) {
        const ejerciciosHtml = item.ejercicios.map(ej => `
            <li class="exercise-item">
                <div class="exercise-header">
                    <strong>${ej.nombre_ejercicio}</strong>
                    <span class="exercise-meta">${ej.repeticiones} ${ej.peso ? `| ${ej.peso}` : ''}</span>
                </div>
                <p class="exercise-desc" style="font-size:0.85rem; color:#666; margin-top:4px;">${ej.descripcion}</p>
            </li>
        `).join('');

        detailView.innerHTML = `
            <div class="detail-header">
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
        // 1. Generar HTML de los pasos
        const pasosHtml = item.pasos.map(paso => `
            <li class="step-item">
                <div class="step-number">${paso.numero_paso}</div>
                <div class="step-content">
                    <strong>${paso.nombre_paso}</strong>
                    <p>${paso.descripcion}</p>
                </div>
            </li>
        `).join('');

        // 2. Generar HTML de los ingredientes (Diccionario -> Lista)
        const ingredientesHtml = Object.entries(item.ingredientes).map(([nombre, cantidad]) => {
            return `<li><strong>${cantidad}</strong> ${nombre}</li>`;
        }).join('');

        // 3. Generar HTML de los MACROS (Nuevo)
        let macrosHtml = '';
        if (item.macros) {
            macrosHtml = `
                <div class="macros-grid">
                    <div class="macro-item">
                        <span class="macro-val">${item.macros.calorias}</span>
                        <span class="macro-label">Calorías</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-val">${item.macros.proteina}</span>
                        <span class="macro-label">Proteína</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-val">${item.macros.carbs}</span>
                        <span class="macro-label">Carbs</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-val">${item.macros.grasas}</span>
                        <span class="macro-label">Grasas</span>
                    </div>
                </div>
            `;
        }

        // 4. Inyectar todo en el HTML
        detailView.innerHTML = `
            <div class="detail-header">
                <h1>${item.nombre_receta}</h1>
                <p class="detail-meta">⏱ ${item.duracion_estimada}</p>
            </div>
            
            <img src="${item.imagen}" class="detail-hero-img" onerror="this.onerror=null;this.src='defecto.png';">
            
            <div class="detail-body">
                ${macrosHtml}

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

// Función global para borrar posts (fuera del DOMContentLoaded para que el HTML la encuentre)
window.deletePost = function(id) {
    if(confirm("¿Estás segura de borrar esta entrada?")) {
        let posts = JSON.parse(localStorage.getItem('glowyPosts')) || [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('glowyPosts', JSON.stringify(posts));
        location.reload(); 
    }
};