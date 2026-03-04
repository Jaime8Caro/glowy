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
        // Hide element completely once reveal animation finishes
        pageTransition.addEventListener('animationend', () => {
            if (pageTransition.classList.contains('pt-reveal')) {
                pageTransition.style.display = 'none';
            }
        });

        // Trigger reveal — triple rAF ensures initial paint has happened
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    pageTransition.classList.add('pt-reveal');
                });
            });
        });

        // Failsafe: if animation never fires (e.g. reduced-motion), hide after 1s
        setTimeout(() => {
            if (!pageTransition.style.display) {
                pageTransition.style.display = 'none';
            }
        }, 1200);

        // Intercept internal links for cover animation
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('javascript')) {
                link.addEventListener('click', (e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    pageTransition.style.display = '';
                    pageTransition.classList.remove('pt-reveal');
                    pageTransition.classList.add('pt-cover');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 640);
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
    // 7. DARK MODE TOGGLE
    // ==========================================
    const themeToggle = document.querySelector('.theme-toggle');

    const savedTheme = localStorage.getItem('glowyTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next    = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('glowyTheme', next);
        });
        if (cursorRing) {
            themeToggle.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
            themeToggle.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
        }
    }

    // ==========================================
    // 8. PLANIFICADOR MENSUAL
    // ==========================================
    const plannerGrid = document.getElementById('planner-grid');
    if (plannerGrid) {
        setTimeout(() => initPlanner(), 80);
    }

    function initPlanner() {
        const now        = new Date();
        const currentKey = now.getFullYear() + '-' + now.getMonth();
        const storageKey = 'glowyPlanner';
        const cycleKey   = 'glowyCycle';

        // ── Task storage (resets monthly) ──
        let stored = JSON.parse(localStorage.getItem(storageKey)) || {};
        if (stored.month && stored.month !== currentKey) { stored = {}; }
        stored.month = currentKey;
        stored.tasks = stored.tasks || {};

        // ── Cycle storage (persists) ──
        let cycleData = JSON.parse(localStorage.getItem(cycleKey)) || { periods: [] };

        function save()      { localStorage.setItem(storageKey, JSON.stringify(stored)); }
        function saveCycle() { localStorage.setItem(cycleKey,   JSON.stringify(cycleData)); }

        function getTasksForDay(ds)            { return stored.tasks[ds] || []; }
        function addTask(ds, text, category)   {
            if (!stored.tasks[ds]) stored.tasks[ds] = [];
            stored.tasks[ds].push({ id: Date.now(), text, category, done: false });
            save();
        }
        function toggleTask(ds, id) {
            const t = (stored.tasks[ds] || []).find(t => t.id === id);
            if (t) { t.done = !t.done; save(); }
        }
        function deleteTask(ds, id) {
            stored.tasks[ds] = (stored.tasks[ds] || []).filter(t => t.id !== id);
            save();
        }
        function allStats() {
            let total = 0, done = 0;
            Object.values(stored.tasks).forEach(arr => arr.forEach(t => { total++; if (t.done) done++; }));
            return { total, done };
        }

        // ── Cycle phase definitions ──
        const PHASES = {
            menstrual: {
                name: 'Fase Menstrual', icon: '🌑', color: '#E07080', cssClass: 'menstrual',
                tips: [
                    { icon: '🧘', text: 'Yoga restaurativo o estiramientos suaves — tu cuerpo pide calma.' },
                    { icon: '🥩', text: 'Prioriza alimentos ricos en hierro: espinacas, legumbres, chocolate negro.' },
                    { icon: '🛁', text: 'Un baño caliente o bolsa de calor reduce los cólicos de forma natural.' },
                    { icon: '😴', text: 'Date permiso para ir más despacio y descansar sin culpa.' }
                ]
            },
            folicular: {
                name: 'Fase Folicular', icon: '🌒', color: '#70B8E0', cssClass: 'folicular',
                tips: [
                    { icon: '🏃', text: 'Cardio moderado y ejercicios técnicos — tu cerebro absorbe bien lo nuevo.' },
                    { icon: '💡', text: 'Momento ideal para empezar proyectos o establecer nuevos hábitos.' },
                    { icon: '🥗', text: 'Comidas ricas en proteína y verduras de hoja verde para apoyar el estrógeno.' },
                    { icon: '⚡', text: 'Tu energía sube progresivamente — aprovéchala para planificar el mes.' }
                ]
            },
            ovulacion: {
                name: 'Ovulación', icon: '🌕', color: '#E0C070', cssClass: 'ovulacion',
                tips: [
                    { icon: '🏋️', text: '¡Pico de fuerza máximo! Semana perfecta para levantar más carga de peso.' },
                    { icon: '🔥', text: 'HIIT, sprints o entrenamientos de alta intensidad — tu cuerpo lo aguanta todo.' },
                    { icon: '🤝', text: 'Estás en tu punto más social y comunicativa. Ideal para clases grupales.' },
                    { icon: '🥤', text: 'Batido proteico post-entreno para maximizar la recuperación muscular.' }
                ]
            },
            lutea: {
                name: 'Fase Lútea', icon: '🌖', color: '#A070C0', cssClass: 'lutea',
                tips: [
                    { icon: '🧘', text: 'Pilates, yoga dinámico o natación — ejercicio de bajo impacto es tu aliado.' },
                    { icon: '🥜', text: 'Magnesio y carbohidratos complejos ayudan a reducir el síndrome premenstrual.' },
                    { icon: '☕', text: 'Reduce cafeína y azúcar refinado para evitar bajones de energía e irritabilidad.' },
                    { icon: '📓', text: 'Journaling o meditación para gestionar los cambios de humor con amabilidad.' }
                ]
            }
        };

        function getCyclePhaseForDate(ds) {
            if (!cycleData.periods || !cycleData.periods.length) return null;
            const sorted = [...cycleData.periods].sort((a, b) => new Date(b) - new Date(a));
            const target = new Date(ds + 'T12:00:00');
            for (const p of sorted) {
                const start    = new Date(p + 'T12:00:00');
                const diffDays = Math.floor((target - start) / 864e5) + 1;
                if (diffDays >= 1 && diffDays <= 35) {
                    if (diffDays <=  5) return { phase: PHASES.menstrual, day: diffDays };
                    if (diffDays <= 13) return { phase: PHASES.folicular, day: diffDays };
                    if (diffDays <= 16) return { phase: PHASES.ovulacion, day: diffDays };
                    if (diffDays <= 28) return { phase: PHASES.lutea,     day: diffDays };
                }
            }
            return null;
        }

        function calcAvgCycle() {
            const s = [...cycleData.periods].sort();
            if (s.length < 2) return 28;
            let total = 0;
            for (let i = 1; i < s.length; i++) total += Math.round((new Date(s[i]+'T12:00:00') - new Date(s[i-1]+'T12:00:00')) / 864e5);
            return Math.round(total / (s.length - 1));
        }

        // ── Fill day select ──
        function fillDaySelect() {
            const sel   = document.getElementById('plannerDay');
            if (!sel) return;
            const year  = now.getFullYear(), month = now.getMonth();
            const dim   = new Date(year, month + 1, 0).getDate();
            const dn    = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
            const today = year + '-' + String(month+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
            sel.innerHTML = '';
            for (let d = 1; d <= dim; d++) {
                const ds  = year + '-' + String(month+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
                const opt = document.createElement('option');
                opt.value       = ds;
                opt.textContent = d + ' ' + dn[new Date(year, month, d).getDay()];
                if (ds === today) opt.selected = true;
                sel.appendChild(opt);
            }
        }

        // ── Update static stats UI ──
        function updateStats() {
            const stats = allStats();
            const pct   = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
            const el    = (id) => document.getElementById(id);
            if (el('statTotal'))    el('statTotal').textContent    = stats.total;
            if (el('statDone'))     el('statDone').textContent     = stats.done;
            if (el('statPending'))  el('statPending').textContent  = stats.total - stats.done;
            if (el('progressLabel')) el('progressLabel').textContent = 'Progreso del mes — ' + pct + '%';
            if (el('progressFill'))  el('progressFill').style.width  = pct + '%';
        }

        // ── Update month label ──
        function updateMonthLabel() {
            const el = document.getElementById('plannerMonthLabel');
            if (!el) return;
            const names = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            el.innerHTML = names[now.getMonth()] + ' <em>' + now.getFullYear() + '</em>';
        }

        // ── Build calendar grid ──
        function buildCalendar() {
            const grid   = document.getElementById('planner-grid');
            if (!grid) return;
            const year   = now.getFullYear(), month = now.getMonth();
            const today  = year + '-' + String(month+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
            const lastDay = new Date(year, month+1, 0);

            // Start on Monday
            let start = new Date(year, month, 1);
            start.setDate(start.getDate() - ((start.getDay() + 6) % 7));

            const weeks = [];
            let cur = new Date(start);
            while (cur <= lastDay || weeks.length < 4) {
                const week = [];
                for (let d = 0; d < 7; d++) { week.push(new Date(cur)); cur.setDate(cur.getDate() + 1); }
                weeks.push(week);
                if (cur.getMonth() > month || cur.getFullYear() > year) break;
            }

            grid.innerHTML = weeks.map(function(week, wi) {
                const cells = week.map(function(day) {
                    const ds      = day.getFullYear() + '-' + String(day.getMonth()+1).padStart(2,'0') + '-' + String(day.getDate()).padStart(2,'0');
                    const tasks   = getTasksForDay(ds);
                    const isToday = ds === today;
                    const other   = day.getMonth() !== month;
                    const ci      = getCyclePhaseForDate(ds);
                    const cls     = 'planner-day-col' + (isToday ? ' today' : '') + (other ? ' other-month' : '') + (ci ? ' cycle-' + ci.phase.cssClass : '');
                    const dot     = ci ? '<span class="cycle-day-dot ' + ci.phase.cssClass + '">' + ci.phase.icon + '</span>' : '';
                    const chips   = tasks.map(function(t) {
                        return '<div class="task-chip cat-' + t.category + (t.done ? ' done' : '') + '" data-date="' + ds + '" data-id="' + t.id + '">' +
                            '<button class="task-chip-check" data-action="toggle">' + (t.done ? '✓' : '') + '</button>' +
                            '<span class="task-chip-text">' + escapeHTML(t.text) + '</span>' +
                            '<button class="task-chip-del" data-action="delete">×</button>' +
                        '</div>';
                    }).join('');
                    return '<div class="' + cls + '" data-date="' + ds + '"><span class="planner-day-num">' + day.getDate() + '</span>' + dot + chips + '</div>';
                }).join('');
                return '<div class="planner-week-row"><div class="planner-week-label">S' + (wi+1) + '</div>' + cells + '</div>';
            }).join('');

            // Cursor hover on chips
            if (cursorRing) {
                grid.querySelectorAll('.task-chip, .planner-day-col').forEach(function(el) {
                    el.addEventListener('mouseenter', function() { cursorRing.classList.add('is-hovering'); });
                    el.addEventListener('mouseleave', function() { cursorRing.classList.remove('is-hovering'); });
                });
            }
        }

        // ── Update cycle section (static HTML targets) ──
        function updateCycleUI() {
            const noData  = document.getElementById('cycleNoData');
            const hasData = document.getElementById('cycleDataView');
            if (!noData || !hasData) return;

            const today = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
            const info  = getCyclePhaseForDate(today);

            if (!info || !cycleData.periods.length) {
                noData.style.display  = '';
                hasData.style.display = 'none';
                return;
            }

            noData.style.display  = 'none';
            hasData.style.display = '';

            const ph  = info.phase;
            const avg = cycleData.periods.length > 1 ? calcAvgCycle() : 28;

            // Phase card
            document.getElementById('cycleIcon').textContent      = ph.icon;
            document.getElementById('cyclePhaseName').textContent = ph.name;
            document.getElementById('cyclePhaseDay').textContent  = 'Día ' + info.day + ' de tu ciclo';
            document.getElementById('cycleAvg').textContent       = 'Ciclo medio: ' + avg + ' días';

            // Color variable on card
            const card = document.getElementById('cyclePhaseCard');
            if (card) card.style.setProperty('--cycle-color', ph.color);

            // Active strip phase
            ['menstrual','folicular','ovulacion','lutea'].forEach(function(p) {
                const el = document.getElementById('strip' + p.charAt(0).toUpperCase() + p.slice(1));
                if (el) el.classList.toggle('active-phase', p === ph.cssClass);
            });

            // Tips list
            const list = document.getElementById('cycleTipsList');
            if (list) {
                list.innerHTML = ph.tips.map(function(tip) {
                    return '<li><span class="cycle-tip-icon">' + tip.icon + '</span><span>' + tip.text + '</span></li>';
                }).join('');
                list.style.setProperty('--cycle-color', ph.color);
            }
        }

        // ── Cycle modal ──
        function openCycleModal() {
            const overlay = document.getElementById('cycleModalOverlay');
            if (!overlay) return;

            const todayStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
            const dateInput = document.getElementById('cycleStartDate');
            if (dateInput) dateInput.value = todayStr;

            // Show/hide undo-last-cycle button
            const undoBtn = document.getElementById('btnUndoLastCycle');
            if (undoBtn) {
                if (cycleData.periods.length > 0) {
                    undoBtn.style.display = '';
                    undoBtn.onclick = function() {
                        const removed = cycleData.periods[cycleData.periods.length - 1];
                        cycleData.periods.pop();
                        saveCycle();
                        renderCycleHistory();
                        buildCalendar();
                        updateCycleUI();
                        undoBtn.style.display = cycleData.periods.length > 0 ? '' : 'none';
                        showToast('Ciclo eliminado', function() {
                            cycleData.periods.push(removed);
                            cycleData.periods.sort();
                            saveCycle();
                            buildCalendar();
                            updateCycleUI();
                        });
                    };
                } else {
                    undoBtn.style.display = 'none';
                }
            }

            renderCycleHistory();
            overlay.classList.add('open');

            if (cursorRing) {
                overlay.querySelectorAll('button, input').forEach(function(el) {
                    el.addEventListener('mouseenter', function() { cursorRing.classList.add('is-hovering'); });
                    el.addEventListener('mouseleave', function() { cursorRing.classList.remove('is-hovering'); });
                });
            }
        }

        function closeCycleModal() {
            const overlay = document.getElementById('cycleModalOverlay');
            if (overlay) overlay.classList.remove('open');
        }

        function renderCycleHistory() {
            const historyEl = document.getElementById('cycleHistory');
            const listEl    = document.getElementById('cycleHistoryList');
            if (!historyEl || !listEl) return;

            if (!cycleData.periods.length) { historyEl.style.display = 'none'; return; }
            historyEl.style.display = '';

            const sorted = [...cycleData.periods].sort((a, b) => new Date(b) - new Date(a));
            listEl.innerHTML = sorted.map(function(ds) {
                const d    = new Date(ds + 'T12:00:00');
                const label = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                return '<span class="cycle-history-item">🩸 ' + label +
                    '<button class="cycle-history-del" data-del="' + ds + '" title="Eliminar">×</button></span>';
            }).join('');

            listEl.addEventListener('click', function(e) {
                const btn = e.target.closest('[data-del]');
                if (!btn) return;
                cycleData.periods = cycleData.periods.filter(function(p) { return p !== btn.dataset.del; });
                saveCycle();
                renderCycleHistory();
                buildCalendar();
                updateCycleUI();
            });
        }

        function savePeriodDate() {
            const val = document.getElementById('cycleStartDate').value;
            if (!val) return;
            const wasNew = !cycleData.periods.includes(val);
            if (wasNew) {
                cycleData.periods.push(val);
                cycleData.periods = cycleData.periods.slice(-12);
                saveCycle();
            }
            closeCycleModal();
            buildCalendar();
            updateCycleUI();

            if (wasNew) {
                showToast('Ciclo guardado 🩸', function() {
                    cycleData.periods = cycleData.periods.filter(function(p) { return p !== val; });
                    saveCycle();
                    buildCalendar();
                    updateCycleUI();
                });
            }
        }

        // ── Toast Undo ──
        let toastTimer   = null;
        let toastBarAnim = null;
        let undoAction   = null;

        function showToast(msg, onUndo) {
            const toast   = document.getElementById('toastUndo');
            const msgEl   = document.getElementById('toastMsg');
            const barEl   = document.getElementById('toastBar');
            const undoBtn = document.getElementById('toastUndoBtn');
            if (!toast || !msgEl || !barEl || !undoBtn) return;

            // Clear any running toast
            clearTimeout(toastTimer);
            if (toastBarAnim) { toastBarAnim.cancel(); toastBarAnim = null; }
            toast.classList.remove('visible');

            undoAction = onUndo;
            msgEl.textContent = msg;

            // Reset bar
            barEl.style.animation = 'none';
            barEl.offsetHeight; // reflow
            barEl.style.animation = '';

            requestAnimationFrame(() => {
                toast.classList.add('visible');
            });

            toastTimer = setTimeout(() => {
                toast.classList.remove('visible');
                undoAction = null;
            }, 5000);

            undoBtn.onclick = function() {
                clearTimeout(toastTimer);
                toast.classList.remove('visible');
                if (undoAction) { undoAction(); undoAction = null; }
            };

            if (cursorRing) {
                undoBtn.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
                undoBtn.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
            }
        }

        // ── Wire up events ──

        // Cycle modal buttons
        ['btnOpenCycleModal','btnOpenCycleModal2'].forEach(function(id) {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', openCycleModal);
        });

        const closeBtn = document.getElementById('cycleModalClose');
        if (closeBtn) closeBtn.addEventListener('click', closeCycleModal);

        const overlay = document.getElementById('cycleModalOverlay');
        if (overlay) overlay.addEventListener('click', function(e) { if (e.target === overlay) closeCycleModal(); });

        const saveBtn = document.getElementById('btnSaveCycle');
        if (saveBtn) saveBtn.addEventListener('click', savePeriodDate);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeCycleModal();
        });

        // Add task
        const addBtn = document.getElementById('plannerAddBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                const text = document.getElementById('plannerTaskText').value.trim();
                const day  = document.getElementById('plannerDay').value;
                const cat  = document.getElementById('plannerCat').value;
                if (!text) return;
                addTask(day, text, cat);
                updateStats();
                buildCalendar();
                document.getElementById('plannerTaskText').value = '';
                document.getElementById('plannerTaskText').focus();

                // Toast undo
                const addedId = stored.tasks[day][stored.tasks[day].length - 1].id;
                showToast('Tarea añadida', function() {
                    deleteTask(day, addedId);
                    updateStats();
                    buildCalendar();
                });
            });
        }

        const taskInput = document.getElementById('plannerTaskText');
        if (taskInput) taskInput.addEventListener('keydown', function(e) { if (e.key === 'Enter' && addBtn) addBtn.click(); });

        // Task chip interactions (delegated)
        const grid = document.getElementById('planner-grid');
        if (grid) {
            grid.addEventListener('click', function(e) {
                const btn = e.target.closest('[data-action]');
                if (!btn) return;
                const chip = btn.closest('.task-chip');
                const ds   = chip.dataset.date;
                const id   = Number(chip.dataset.id);
                if (btn.dataset.action === 'toggle') {
                    toggleTask(ds, id);
                    const t = (stored.tasks[ds] || []).find(t => t.id === id);
                    showToast(t && t.done ? 'Tarea completada ✓' : 'Tarea desmarcada', function() {
                        toggleTask(ds, id);
                        updateStats();
                        buildCalendar();
                    });
                }
                if (btn.dataset.action === 'delete') {
                    // Save snapshot before deleting
                    const deleted = (stored.tasks[ds] || []).find(t => t.id === id);
                    deleteTask(ds, id);
                    showToast('Tarea eliminada', function() {
                        if (deleted) {
                            if (!stored.tasks[ds]) stored.tasks[ds] = [];
                            stored.tasks[ds].push(deleted);
                            stored.tasks[ds].sort((a,b) => a.id - b.id);
                            save();
                        }
                        updateStats();
                        buildCalendar();
                    });
                }
                updateStats();
                buildCalendar();
            });
        }

        // ── Init ──
        updateMonthLabel();
        fillDaySelect();
        updateStats();
        buildCalendar();
        updateCycleUI();
    }


    // ==========================================
    // 9. SOCIAL DROPDOWN
    // ==========================================
    const socialToggle = document.querySelector('.social-toggle');
    const socialPanel  = document.querySelector('.social-panel');

    if (socialToggle && socialPanel) {
        socialToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = socialPanel.classList.contains('open');
            if (isOpen) {
                socialPanel.classList.remove('open');
                socialToggle.setAttribute('aria-expanded', 'false');
                socialToggle.blur();
            } else {
                socialPanel.classList.add('open');
                socialToggle.setAttribute('aria-expanded', 'true');
            }
        });

        document.addEventListener('click', (e) => {
            if (!socialToggle.contains(e.target) && !socialPanel.contains(e.target)) {
                socialPanel.classList.remove('open');
                socialToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                socialPanel.classList.remove('open');
                socialToggle.setAttribute('aria-expanded', 'false');
            }
        });

        if (cursorRing) {
            document.querySelectorAll('.social-link, .social-toggle, .footer-social-btn').forEach(el => {
                el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
                el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
            });
        }
    }

    // ==========================================
    // 8. MODAL (Rutinas)
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