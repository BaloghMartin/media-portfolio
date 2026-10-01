/**
 * Balogh Martin — Független Média Portfólió (app.js)
 *
 * Kliensoldali alkalmazáslogika – tiszta Vanilla JavaScript, külső függőség nélkül.
 *
 * Funkciók:
 *   1. Kiemelt szekció: mindhárom platform (HVG, YouTube, Podcast) legfrissebb tartalma
 *   2. Időrendi rendezés: legújabbtól a legrégebbi felé
 *   3. Közvetlen megnyitás: kattintásra azonnal megnyílik a tartalom (nincs felugró ablak)
 *   4. Kategóriaszűrés: Összes / HVG / YouTube / Podcast
 *   5. Podcast alszűrő: Vendég / Riporter / Vágó szerep szerinti bontás
 *   6. Kettős nézet: kártya rács (grid) és szerkesztőségi lista (horizontal)
 *   7. Valós idejű keresés: cím, bevezető, rovat és címkék alapján
 *
 * A média adatbázist a data.js MEDIA_DATABASE tömbje szolgáltatja.
 */

let currentFilter = "all";
let currentSubFilter = "all"; // 'all', 'reporter', 'editor' (csak podcast szűrő esetén)
let currentSearch = "";
let currentView = "grid"; // 'grid' vagy 'horizontal'
let mediaItems = [];

document.addEventListener("DOMContentLoaded", () => {
    // Szigorú időrendi rendezés: legfrissebb elöl
    mediaItems = [...MEDIA_DATABASE].sort((a, b) => {
        const dateA = a.isoDate || "";
        const dateB = b.isoDate || "";
        return dateB.localeCompare(dateA);
    });

    renderFeaturedRow();
    updateFilterCounts();
    renderContent();
    initFilters();
    initSearch();
    initViewToggle();
});

/* ==========================================================================
   1. Kiemelt Szekció (Top 3: Legfrissebb HVG Cikk, YouTube Videó, Podcast)
   ========================================================================== */
function renderFeaturedRow() {
    const featuredGrid = document.getElementById("featuredGrid");
    if (!featuredGrid) return;

    featuredGrid.innerHTML = "";

    // Megkeressük mindhárom platform legutóbbi (legfrissebb) darabját
    const latestHvg = mediaItems.find(item => item.platform === "hvg");
    const latestYoutube = mediaItems.find(item => item.platform === "youtube");
    const latestPodcast = mediaItems.find(item => item.platform === "podcast");

    const featuredList = [
        {
            item: latestHvg,
            pillText: "Legfrissebb HVG Cikk",
            pillClass: "hvg",
            actionLabel: "Cikk olvasása a hvg.hu-n ↗"
        },
        {
            item: latestYoutube,
            pillText: "Legfrissebb YouTube Műsor",
            pillClass: "youtube",
            actionLabel: "Megtekintés a YouTube-on ↗"
        },
        {
            item: latestPodcast,
            pillText: "Legfrissebb Podcast Adás",
            pillClass: "podcast",
            actionLabel: "Adás meghallgatása ↗"
        }
    ];

    featuredList.forEach(({ item, pillText, pillClass, actionLabel }) => {
        if (!item) return;

        const card = document.createElement("a");
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = "featured-card";
        card.title = `${item.title} — Megnyitás új lapon`;

        card.innerHTML = `
            <div class="featured-thumb-wrap">
                <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">
                <div class="featured-badge-top">
                    <span class="platform-pill ${pillClass}">★ ${pillText}</span>
                </div>
                <div class="featured-metric-top">${escapeHtml(item.readTime)}</div>
            </div>
            <div class="featured-body">
                <div class="featured-meta-line">
                    <span>${escapeHtml(item.date)}</span>
                    <span>${escapeHtml(item.column)}</span>
                </div>
                <h3 class="featured-headline">${escapeHtml(item.title)}</h3>
                <p class="featured-lead">${escapeHtml(item.lead)}</p>
                <div class="featured-footer">
                    <span style="font-size: 11px; color: var(--text-muted);">${escapeHtml(item.platformLabel)}</span>
                    <span class="action-trigger-text">${actionLabel}</span>
                </div>
            </div>
        `;

        featuredGrid.appendChild(card);
    });
}

/* ==========================================================================
   2. Kategória Számlálók (Egyenrangú platformok)
   ========================================================================== */
function updateFilterCounts() {
    const counts = {
        all: mediaItems.length,
        hvg: 0,
        youtube: 0,
        podcast: 0
    };

    let podcastAll = 0;
    let podcastGuest = 0;
    let podcastReporter = 0;
    let podcastEditor = 0;

    mediaItems.forEach(item => {
        if (counts[item.platform] !== undefined) {
            counts[item.platform]++;
        }
        if (item.platform === "podcast") {
            podcastAll++;
            if (item.subCategory === "guest") podcastGuest++;
            if (item.subCategory === "reporter") podcastReporter++;
            if (item.subCategory === "editor") podcastEditor++;
        }
    });

    Object.keys(counts).forEach(key => {
        const el = document.getElementById(`count-${key}`);
        if (el) el.textContent = counts[key];
    });

    const elSubAll = document.getElementById("subcount-all");
    if (elSubAll) elSubAll.textContent = podcastAll;
    const elSubGuest = document.getElementById("subcount-guest");
    if (elSubGuest) elSubGuest.textContent = podcastGuest;
    const elSubReporter = document.getElementById("subcount-reporter");
    if (elSubReporter) elSubReporter.textContent = podcastReporter;
    const elSubEditor = document.getElementById("subcount-editor");
    if (elSubEditor) elSubEditor.textContent = podcastEditor;
}

/* ==========================================================================
   3. Fő Tartalomjegyzék Renderelő (Időrendi Grid vagy Horizontális Lista)
   ========================================================================== */
function renderContent() {
    const container = document.getElementById("mediaContainer");
    if (!container) return;

    container.innerHTML = "";
    container.className = (currentView === "grid") ? "view-grid" : "view-horizontal";

    const filtered = mediaItems.filter(item => {
        const matchesFilter = (currentFilter === "all" || item.platform === currentFilter);
        const matchesSubFilter = (currentFilter !== "podcast" || currentSubFilter === "all" || item.subCategory === currentSubFilter);
        const query = currentSearch.toLowerCase().trim();
        const matchesSearch = !query ||
            item.title.toLowerCase().includes(query) ||
            item.lead.toLowerCase().includes(query) ||
            (item.column && item.column.toLowerCase().includes(query)) ||
            (item.tags && item.tags.some(t => t.toLowerCase().includes(query)));

        return matchesFilter && matchesSubFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-secondary); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
                <p style="font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 6px;">Nincs találat a megadott feltételekkel</p>
                <p style="font-size: 13px;">Próbálj másik keresőszót vagy állítsd vissza az 'Összes' fülre.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(item => {
        if (currentView === "grid") {
            container.appendChild(createGridCard(item));
        } else {
            container.appendChild(createHorizontalCard(item));
        }
    });
}

function getPlatformBadge(item) {
    if (item.isSpotlight) {
        return `<span class="platform-pill spotlight">★ ${escapeHtml(item.platformLabel || item.column)}</span>`;
    }
    if (item.platform === "hvg") {
        return `<span class="platform-pill hvg">HVG • ${escapeHtml(item.column)}</span>`;
    } else if (item.platform === "youtube") {
        return `<span class="platform-pill youtube">YouTube • ${escapeHtml(item.column)}</span>`;
    } else if (item.platform === "podcast") {
        if (item.subCategory === "guest") {
            return `<span class="platform-pill podcast-guest">★ Vendégszereplés</span>`;
        } else if (item.subCategory === "editor") {
            return `<span class="platform-pill podcast-editor">✂️ Kommcast • Vágó</span>`;
        } else if (item.subCategory === "reporter") {
            return `<span class="platform-pill podcast">🎙️ Kommcast • Riporter</span>`;
        }
        return `<span class="platform-pill podcast">🎙️ Podcast • ${escapeHtml(item.column)}</span>`;
    }
    return `<span class="platform-pill hvg">${escapeHtml(item.column)}</span>`;
}

/* ==========================================================================
   A) Kártya Rács Nézet (Grid View) — Közvetlen Linkkel
   ========================================================================== */
function createGridCard(item) {
    const card = document.createElement("a");
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "grid-card" + (item.isSpotlight ? " spotlight-card" : "");
    card.title = `${item.title} — Megnyitás új lapon`;

    const badgeHtml = getPlatformBadge(item);
    const actionLabel = item.isSpotlight
        ? 'Meghallgatás a 24.hu-n (18:44) ▶ ↗'
        : ((item.platform === 'youtube') 
            ? 'Megtekintés ▶ ↗' 
            : ((item.platform === 'podcast') 
                ? (item.subCategory === 'editor' 
                    ? 'Adás & Vágás ✂️ ↗' 
                    : (item.subCategory === 'guest' 
                        ? 'Meghallgatás Spotify-on 🎧 ↗' 
                        : 'Meghallgatás 🎙️ ↗')) 
                : 'Cikk elolvasása ↗'));

    card.innerHTML = `
        <div class="card-thumb-wrap">
            <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">
            <div class="card-badge-top">${badgeHtml}</div>
            <div class="card-readtime-top">${escapeHtml(item.readTime)}</div>
        </div>
        <div class="card-body">
            <div class="card-meta-line">
                <span>${escapeHtml(item.date)}</span>
                <span>${item.tags && item.tags[0] ? '#' + escapeHtml(item.tags[0]) : ''}</span>
            </div>
            <h2 class="card-headline">${escapeHtml(item.title)}</h2>
            <p class="card-lead">${escapeHtml(item.lead)}</p>
            <div class="card-footer">
                <span style="font-size: 11px; color: var(--text-muted);">${escapeHtml(item.platformLabel)}</span>
                <span class="action-trigger-text">${actionLabel}</span>
            </div>
        </div>
    `;

    return card;
}

/* ==========================================================================
   B) Horizontális Szerkesztőségi Lista Nézet (Horizontal View) — Közvetlen Linkkel
   ========================================================================== */
function createHorizontalCard(item) {
    const card = document.createElement("a");
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "horizontal-card" + (item.isSpotlight ? " spotlight-card" : "");
    card.title = `${item.title} — Megnyitás új lapon`;

    const badgeHtml = getPlatformBadge(item);
    const actionLabel = item.isSpotlight
        ? '24.hu Ziccer vendégadás megtekintése (18:44) ▶ ↗'
        : ((item.platform === 'youtube') 
            ? 'Videó megtekintése a YouTube-on ↗' 
            : ((item.platform === 'podcast') 
                ? (item.subCategory === 'editor' 
                    ? 'Teljes adás a YouTube-on (vágó) ✂️ ↗' 
                    : (item.subCategory === 'guest' 
                        ? 'Adás meghallgatása a Spotify-on 🎧 ↗' 
                        : 'Adás meghallgatása (riporter) 🎙️ ↗')) 
                : 'Cikk elolvasása a hvg.hu-n ↗'));

    card.innerHTML = `
        <div class="h-thumb-box">
            <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>
        <div class="h-content">
            <div class="h-meta-row">
                ${badgeHtml}
                <span class="h-date">${escapeHtml(item.date)} • ${escapeHtml(item.readTime)}</span>
            </div>
            <h2 class="h-headline">${escapeHtml(item.title)}</h2>
            <p class="h-lead">${escapeHtml(item.lead)}</p>
            <div class="h-footer">
                <span style="font-size: 11px; color: var(--text-muted);">${escapeHtml(item.platformLabel)}</span>
                <span class="action-trigger-text">${actionLabel}</span>
            </div>
        </div>
    `;

    return card;
}

/* ==========================================================================
   4. Szűrés, Keresés & Nézetváltás
   ========================================================================== */
function initFilters() {
    const tabs = document.querySelectorAll(".filter-tab[data-filter]");
    const subfilterContainer = document.getElementById("podcastSubfilter");
    const subTabs = document.querySelectorAll(".subfilter-tab[data-subfilter]");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentFilter = tab.getAttribute("data-filter");

            // Podcast alszűrő sáv megjelenítése / elrejtése
            if (currentFilter === "podcast") {
                if (subfilterContainer) subfilterContainer.style.display = "flex";
            } else {
                if (subfilterContainer) subfilterContainer.style.display = "none";
                currentSubFilter = "all";
                subTabs.forEach(st => {
                    st.classList.toggle("active", st.getAttribute("data-subfilter") === "all");
                });
            }

            renderContent();
        });
    });

    // Podcast alszűrő (szerepkörök) eseménykezelése
    subTabs.forEach(subTab => {
        subTab.addEventListener("click", () => {
            subTabs.forEach(t => t.classList.remove("active"));
            subTab.classList.add("active");
            currentSubFilter = subTab.getAttribute("data-subfilter");
            renderContent();
        });
    });
}

function initSearch() {
    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("input", (e) => {
            currentSearch = e.target.value;
            renderContent();
        });
    }
}

function initViewToggle() {
    const gridBtn = document.getElementById("viewGridBtn");
    const listBtn = document.getElementById("viewListBtn");

    if (gridBtn && listBtn) {
        gridBtn.addEventListener("click", () => {
            gridBtn.classList.add("active");
            listBtn.classList.remove("active");
            currentView = "grid";
            renderContent();
        });

        listBtn.addEventListener("click", () => {
            listBtn.classList.add("active");
            gridBtn.classList.remove("active");
            currentView = "horizontal";
            renderContent();
        });
    }
}

function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ==========================================================================
   E-mail cím védelem és Vágólapra másolás
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const protectedContacts = document.querySelectorAll(".protected-contact");
    protectedContacts.forEach(contact => {
        contact.addEventListener("click", (e) => {
            e.preventDefault();
            const u = contact.getAttribute("data-u");
            const d = contact.getAttribute("data-d");
            if (u && d) {
                const email = `${u}@${d}`;
                navigator.clipboard.writeText(email).then(() => {
                    const textSpan = contact.querySelector(".protected-email-text") || contact;
                    const originalText = textSpan.innerText;
                    textSpan.innerText = "Cím másolva!";
                    
                    // Add a tiny success animation class if desired, or just fallback text
                    contact.style.pointerEvents = "none";
                    contact.style.color = "#4ade80"; // nice green color
                    
                    setTimeout(() => {
                        textSpan.innerText = originalText;
                        contact.style.pointerEvents = "auto";
                        contact.style.color = "";
                    }, 2000);
                }).catch(err => {
                    console.error("Nem sikerült másolni: ", err);
                });
            }
        });
    });
});
