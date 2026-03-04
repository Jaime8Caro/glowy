document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // UTILIDAD: Escapa HTML para prevenir XSS
    // ==========================================
    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    // ==========================================
    // 0. PAGE TRANSITION
    // ==========================================
    const pageTransition = document.querySelector('.page-transition');

    if (pageTransition) {
        // Reveal the page on load
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                pageTransition.classList.add('pt-reveal');
            });
        });

        // Intercept internal links
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('javascript')) {
                link.addEventListener('click', (e) => {
                    // Don't intercept if modifier keys pressed (open in new tab etc)
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    pageTransition.classList.remove('pt-reveal');
                    pageTransition.classList.add('pt-cover');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 620);
                });
            }
        });
    }

    // ==========================================
    // 1. CUSTOM CURSOR
    // ==========================================
    const cursorDot  = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        let ringX = 0, ringY = 0;
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top  = mouseY + 'px';
        });

        // Smooth ring follow with lerp
        function lerpRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(lerpRing);
        }
        lerpRing();

        // Hover state on interactive elements
        const hoverTargets = 'a, button, .card-interactive, .filter-btn, .close-modal, .delete-btn';

        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
        });

        // Click state
        document.addEventListener('mousedown', () => cursorDot.classList.add('is-clicking'));
        document.addEventListener('mouseup',   () => cursorDot.classList.remove('is-clicking'));

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity  = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity  = '1';
            cursorRing.style.opacity = '';
        });
    }

    // ==========================================
    // 2. SCROLL REVEAL (IntersectionObserver)
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal-hidden').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 3. BLOG (Diario)
    // ==========================================
    const blogForm       = document.getElementById('blogForm');
    const postsContainer = document.getElementById('postsContainer');

    if (postsContainer) loadPosts();

    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title   = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            const image   = document.getElementById('postImage').value || 'assets/defecto.png';

            const newPost = {
                id: Date.now(),
                title,
                content,
                image,
                date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
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
            postsContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted); grid-column:1/-1; padding: 40px 0; font-size:0.9rem; letter-spacing:1px;">Tu diario está vacío. Escribe tu primera entrada.</p>';
            return;
        }

        posts.forEach((post, index) => {
            const div = document.createElement('div');
            div.className = 'blog-post-card reveal-hidden';
            div.style.transitionDelay = `${index * 80}ms`;

            const img = document.createElement('img');
            img.src       = post.image;
            img.className = 'blog-img-preview';
            img.alt       = post.title;
            img.onerror   = function() { this.onerror = null; this.src = 'assets/defecto.png'; };

            const contentDiv = document.createElement('div');
            contentDiv.className = 'blog-content';

            const dateSpan      = document.createElement('span');
            dateSpan.className  = 'blog-date';
            dateSpan.textContent = post.date;

            const h3       = document.createElement('h3');
            h3.textContent = post.title;

            const p       = document.createElement('p');
            p.textContent = post.content;

            const deleteBtn      = document.createElement('button');
            deleteBtn.type       = 'button';
            deleteBtn.className  = 'delete-btn';
            deleteBtn.textContent = 'Eliminar entrada';
            deleteBtn.addEventListener('click', () => deletePost(post.id));

            contentDiv.appendChild(dateSpan);
            contentDiv.appendChild(h3);
            contentDiv.appendChild(p);
            contentDiv.appendChild(deleteBtn);

            div.appendChild(img);
            div.appendChild(contentDiv);
            postsContainer.appendChild(div);

            // Observe new cards for scroll reveal
            revealObserver.observe(div);

            // Apply hover cursor to new cards
            if (cursorRing) {
                div.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
                div.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
            }
        });
    }

    // ==========================================
    // 4. HOME — Cita aleatoria
    // ==========================================
    const quoteDisplay = document.getElementById('quote-display');
    if (quoteDisplay && typeof citasMotivacion !== 'undefined') {
        const rand = Math.floor(Math.random() * citasMotivacion.length);
        const cita = citasMotivacion[rand];

        const pText = document.createElement('p');
        pText.className  = 'quote-text';
        pText.textContent = `"${cita.texto}"`;

        const spanAuthor = document.createElement('span');
        spanAuthor.className  = 'quote-author';
        spanAuthor.textContent = `— ${cita.autor}`;

        quoteDisplay.appendChild(pText);
        quoteDisplay.appendChild(spanAuthor);
    }

    // ==========================================
    // 5. TARJETAS (Rutinas / Recetas)
    // ==========================================
    const dynamicContainer = document.getElementById('dynamic-container');

    if (dynamicContainer) {
        const pageType  = dynamicContainer.dataset.page;
        let currentData = (pageType === 'rutinas') ? rutinasData : recetasData;

        renderCards(currentData, pageType);

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.type = 'button';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter   = btn.dataset.filter;
                const filtered = (filter === 'todos') ? currentData : currentData.filter(i => i.tipo === filter);
                renderCards(filtered, pageType);
            });
        });
    }

    function renderCards(items, type) {
        const container = document.getElementById('dynamic-container');
        if (!container) return;

        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100%; color:var(--text-muted); grid-column:1/-1; padding:40px 0; font-size:0.9rem; letter-spacing:1px;">No hay resultados para esta categoría.</p>';
            return;
        }

        items.forEach((item, index) => {
            const card      = document.createElement('div');
            card.className  = 'card-interactive reveal-hidden';
            card.style.transitionDelay = `${index * 70}ms`;

            const title = item.nombre || item.nombre_receta;

            const img    = document.createElement('img');
            img.src      = item.imagen;
            img.alt      = title;
            img.className = 'card-img-top';
            img.onerror  = function() { this.onerror = null; this.src = 'assets/defecto.png'; };

            const body = document.createElement('div');
            body.className = 'card-body';

            const meta      = document.createElement('span');
            meta.className  = 'card-meta';
            meta.textContent = `${item.tipo.toUpperCase()} · ${item.duracion_estimada}`;

            const h3 = document.createElement('h3');
            h3.textContent = title;

            let extraContent;
            if (type === 'recetas') {
                const ingredientesNombres = Object.keys(item.ingredientes);
                const preview = ingredientesNombres.slice(0, 3);
                const sobra   = ingredientesNombres.length - 3;

                const ul = document.createElement('ul');
                preview.forEach(nombre => {
                    const li      = document.createElement('li');
                    li.textContent = nombre;
                    ul.appendChild(li);
                });
                if (sobra > 0) {
                    const li       = document.createElement('li');
                    li.style.fontStyle = 'italic';
                    li.style.opacity   = '0.7';
                    li.textContent     = `+ ${sobra} ingredientes más`;
                    ul.appendChild(li);
                }
                extraContent = ul;
            } else {
                const p      = document.createElement('p');
                p.textContent = item.descr_corta;
                extraContent = p;
            }

            const cta       = document.createElement('span');
            cta.className   = 'card-cta';
            cta.textContent = 'Ver completo →';

            body.appendChild(meta);
            body.appendChild(h3);
            body.appendChild(extraContent);
            body.appendChild(cta);

            card.appendChild(img);
            card.appendChild(body);

            card.addEventListener('click', () => {
                window.location.href = `detalle.html?type=${type}&name=${encodeURIComponent(title)}`;
            });

            container.appendChild(card);

            // Observe for scroll reveal
            revealObserver.observe(card);

            // Cursor hover state for dynamically added cards
            if (cursorRing) {
                card.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
                card.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
            }
        });
    }

    // ==========================================
    // 6. DETALLE PAGE
    // ==========================================
    const detailView = document.getElementById('detail-view');

    if (detailView) {
        const params = new URLSearchParams(window.location.search);
        const type   = params.get('type');
        const name   = params.get('name');

        if (!type || !name) {
            detailView.innerHTML = '<p>Error: No se ha especificado contenido.</p>';
            return;
        }

        const dataSet     = (type === 'rutinas') ? rutinasData : recetasData;
        const decodedName = decodeURIComponent(name);
        const item        = dataSet.find(i => {
            const itemName = i.nombre || i.nombre_receta;
            return itemName === decodedName;
        });

        if (!item) {
            detailView.innerHTML = '<p>Lo sentimos, no hemos encontrado este contenido.</p>';
            return;
        }

        if (type === 'rutinas') renderRutinaDetail(item);
        else                     renderRecetaDetail(item);
    }

    function renderRutinaDetail(item) {
        const ejerciciosHtml = item.ejercicios.map(ej => `
            <li class="exercise-item">
                <div class="exercise-header">
                    <strong>${escapeHTML(ej.nombre_ejercicio)}</strong>
                    <span class="exercise-meta">${escapeHTML(ej.repeticiones)}${ej.peso ? ' · ' + escapeHTML(ej.peso) : ''}</span>
                </div>
                <p class="exercise-desc">${escapeHTML(ej.descripcion)}</p>
            </li>
        `).join('');

        detailView.innerHTML = `
            <div class="detail-header reveal-hidden">
                <h1>${escapeHTML(item.nombre)}</h1>
                <span class="detail-meta">⏱ ${escapeHTML(item.duracion_estimada)}</span>
            </div>
            <img src="${escapeHTML(item.imagen)}" class="detail-hero-img reveal-hidden" onerror="this.onerror=null;this.src='assets/defecto.png';">
            <div class="detail-body reveal-hidden">
                <h3>Objetivo</h3>
                <p>${escapeHTML(item.descr_corta)}</p>
                <h3>Tabla de Ejercicios</h3>
                <ul class="steps-list">${ejerciciosHtml}</ul>
            </div>
        `;

        // Observe newly added reveal elements
        detailView.querySelectorAll('.reveal-hidden').forEach(el => revealObserver.observe(el));
    }

    function renderRecetaDetail(item) {
        const nombre = item.nombre || item.nombre_receta;

        const pasosHtml = item.pasos.map(paso => `
            <li class="step-item">
                <div class="step-number">${escapeHTML(String(paso.numero_paso))}</div>
                <div class="step-content">
                    <strong>${escapeHTML(paso.nombre_paso)}</strong>
                    <p>${escapeHTML(paso.descripcion)}</p>
                </div>
            </li>
        `).join('');

        const ingredientesHtml = Object.entries(item.ingredientes).map(([nombre, cantidad]) =>
            `<li><strong>${escapeHTML(String(cantidad))}</strong>${escapeHTML(nombre)}</li>`
        ).join('');

        let macrosHtml = '';
        if (item.macros) {
            macrosHtml = `
                <div class="macros-grid">
                    <div class="macro-item">
                        <span class="macro-val">${escapeHTML(String(item.macros.calorias))}</span>
                        <span class="macro-label">Calorías</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-val">${escapeHTML(String(item.macros.proteina))}</span>
                        <span class="macro-label">Proteína</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-val">${escapeHTML(String(item.macros.carbs))}</span>
                        <span class="macro-label">Carbs</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-val">${escapeHTML(String(item.macros.grasas))}</span>
                        <span class="macro-label">Grasas</span>
                    </div>
                </div>
            `;
        }

        detailView.innerHTML = `
            <div class="detail-header reveal-hidden">
                <h1>${escapeHTML(nombre)}</h1>
                <span class="detail-meta">⏱ ${escapeHTML(item.duracion_estimada)}</span>
            </div>
            <img src="${escapeHTML(item.imagen)}" class="detail-hero-img reveal-hidden" onerror="this.onerror=null;this.src='assets/defecto.png';">
            <div class="detail-body reveal-hidden">
                ${macrosHtml}
                <div class="ingredients-box">
                    <h3>Ingredientes</h3>
                    <ul>${ingredientesHtml}</ul>
                </div>
                <h3>Preparación Paso a Paso</h3>
                <ul class="steps-list">${pasosHtml}</ul>
            </div>
        `;

        detailView.querySelectorAll('.reveal-hidden').forEach(el => revealObserver.observe(el));
    }

    // ==========================================
    // 7. MODAL (Rutinas)
    // ==========================================
    const infoModal   = document.getElementById('infoModal');
    const closeModal  = document.querySelector('.close-modal');

    if (closeModal && infoModal) {
        closeModal.addEventListener('click', () => infoModal.classList.remove('open'));
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) infoModal.classList.remove('open');
        });
    }

});

// ==========================================
// FUNCIÓN GLOBAL: Borrar post del blog
// ==========================================
window.deletePost = function(id) {
    if (confirm('¿Borrar esta entrada del diario?')) {
        let posts = JSON.parse(localStorage.getItem('glowyPosts')) || [];
        posts     = posts.filter(post => post.id !== id);
        localStorage.setItem('glowyPosts', JSON.stringify(posts));

        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;

        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted); grid-column:1/-1; padding:40px 0;">Tu diario está vacío.</p>';
            return;
        }
        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'blog-post-card';

            const img     = document.createElement('img');
            img.src       = post.image;
            img.className = 'blog-img-preview';
            img.onerror   = function() { this.onerror = null; this.src = 'assets/defecto.png'; };

            const contentDiv       = document.createElement('div');
            contentDiv.className   = 'blog-content';

            const dateSpan       = document.createElement('span');
            dateSpan.className   = 'blog-date';
            dateSpan.textContent = post.date;

            const h3       = document.createElement('h3');
            h3.textContent = post.title;

            const p       = document.createElement('p');
            p.textContent = post.content;

            const deleteBtn      = document.createElement('button');
            deleteBtn.type       = 'button';
            deleteBtn.className  = 'delete-btn';
            deleteBtn.textContent = 'Eliminar entrada';
            deleteBtn.addEventListener('click', () => window.deletePost(post.id));

            contentDiv.appendChild(dateSpan);
            contentDiv.appendChild(h3);
            contentDiv.appendChild(p);
            contentDiv.appendChild(deleteBtn);
            div.appendChild(img);
            div.appendChild(contentDiv);
            postsContainer.appendChild(div);
        });
    }
};