document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DEL BLOG (Diario)
    // ==========================================
    const blogForm = document.getElementById('blogForm');
    const postsContainer = document.getElementById('postsContainer');

    if (postsContainer) {
        loadPosts();
    }

    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita recarga al enviar

            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            let image = document.getElementById('postImage').value;

            // Si no pone imagen, usamos una cadena vacía para controlar el error luego
            if (!image) image = 'defecto.png';

            const newPost = {
                id: Date.now(),
                title: title,
                content: content,
                image: image,
                date: new Date().toLocaleDateString()
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
            postsContainer.innerHTML = '<p style="text-align:center; color:#999;">Tu diario está vacío. Escribe tu primera entrada.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post-card');
            
            // PROTECCIÓN DE IMAGEN AQUÍ TAMBIÉN
            postElement.innerHTML = `
                <img src="${post.image}" alt="Post" class="blog-img-preview" onerror="this.onerror=null;this.src='defecto.png';">
                <div class="blog-content">
                    <span class="blog-date">${post.date}</span>
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button type="button" onclick="deletePost(${post.id})" class="delete-btn">Borrar entrada</button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // ==========================================
    // 2. LÓGICA DE RUTINAS Y RECETAS (Estática)
    // ==========================================
    
    const dynamicContainer = document.getElementById('dynamic-container');
    const modal = document.getElementById('infoModal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (dynamicContainer) {
        const pageType = dynamicContainer.dataset.page; 
        let currentData = [];

        // Carga los datos UNA SOLA VEZ al inicio
        if (typeof rutinasData !== 'undefined' && pageType === 'rutinas') {
            currentData = rutinasData;
        } else if (typeof recetasData !== 'undefined' && pageType === 'recetas') {
            currentData = recetasData;
        }

        // Renderizar inicial
        renderCards(currentData, pageType);

        // Configuración de Filtros
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            // Aseguramos que el botón no envíe formularios
            btn.type = "button"; 
            
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Doble seguridad contra recargas

                // Estilos visuales
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Lógica de filtrado
                const filterValue = btn.dataset.filter;
                if (filterValue === 'todos') {
                    renderCards(currentData, pageType);
                } else {
                    const filtered = currentData.filter(item => item.tipo === filterValue);
                    renderCards(filtered, pageType);
                }
            });
        });
    }

    function renderCards(items, type) {
        if (!dynamicContainer) return;
        dynamicContainer.innerHTML = ''; 

        if (items.length === 0) {
            dynamicContainer.innerHTML = '<p>No hay elementos disponibles.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card-interactive');
            
            const title = type === 'rutinas' ? item.nombre : item.nombre_receta;
            
            // Evento click para abrir el modal
            card.onclick = () => openModal(item, type);

            // AQUÍ ESTABA EL PROBLEMA: Añadido this.onerror=null
            card.innerHTML = `
                <img src="${item.imagen}" alt="${title}" class="card-img-top" onerror="this.onerror=null;this.src='defecto.png';">
                <div class="card-body">
                    <span class="card-meta">${item.tipo ? item.tipo.toUpperCase() : ''} • ${item.duracion_estimada}</span>
                    <h3>${title}</h3>
                    <p>${item.descr_corta}</p>
                </div>
            `;
            dynamicContainer.appendChild(card);
        });
    }

    // ==========================================
    // 3. LÓGICA DEL MODAL
    // ==========================================

    function openModal(item, type) {
        if (!modal) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalList = document.getElementById('modalList');

        modalList.innerHTML = ''; // Limpiar lista anterior

        if (type === 'rutinas') {
            modalTitle.textContent = item.nombre;
            modalDesc.textContent = item.descr_corta;

            if (item.ejercicios) {
                item.ejercicios.forEach(ej => {
                    const li = document.createElement('li');
                    const pesoText = ej.peso ? ` - Peso: ${ej.peso}` : '';
                    li.innerHTML = `<strong>${ej.nombre_ejercicio}</strong> <span>${ej.repeticiones}${pesoText}</span>`;
                    modalList.appendChild(li);
                });
            }

        } else if (type === 'recetas') {
            modalTitle.textContent = item.nombre_receta;
            const ingredientesStr = Array.isArray(item.ingredientes) 
                ? item.ingredientes.join(', ') 
                : item.ingredientes;
            
            modalDesc.innerHTML = `<strong>Ingredientes:</strong> ${ingredientesStr}`;

            if (item.pasos) {
                item.pasos.forEach(paso => {
                    const li = document.createElement('li');
                    li.style.flexDirection = 'column';
                    li.style.alignItems = 'flex-start';
                    li.innerHTML = `
                        <strong style="color:var(--hover-pink)">Paso ${paso.numero_paso}: ${paso.nombre_paso}</strong>
                        <p style="font-size:0.9rem; margin-top:5px;">${paso.descripcion}</p>
                    `;
                    modalList.appendChild(li);
                });
            }
        }
        modal.classList.add('open');
    }

    if (closeModalBtn) {
        closeModalBtn.onclick = () => modal.classList.remove('open');
    }

    window.onclick = (event) => {
        if (event.target === modal) modal.classList.remove('open');
    };

    // ==========================================
    // 4. LÓGICA DEL HOME (Cita Aleatoria)
    // ==========================================
    const quoteDisplay = document.getElementById('quote-display');
    
    // Solo ejecutamos esto si estamos en el index (si existe el contenedor)
    if (quoteDisplay && typeof citasMotivacion !== 'undefined') {
        
        // Elegir un índice aleatorio
        const randomIndex = Math.floor(Math.random() * citasMotivacion.length);
        const cita = citasMotivacion[randomIndex];

        // Inyectar HTML con estilo
        quoteDisplay.innerHTML = `
            <p class="quote-text">"${cita.texto}"</p>
            <span class="quote-author">— ${cita.autor}</span>
        `;
    }
});

// 4. FUNCIÓN GLOBAL BORRAR
window.deletePost = function(id) {
    if(confirm("¿Seguro que quieres borrar este recuerdo?")) {
        let posts = JSON.parse(localStorage.getItem('glowyPosts')) || [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('glowyPosts', JSON.stringify(posts));
        location.reload(); 
    }
};