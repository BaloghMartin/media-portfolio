/**
 * Balogh Martin — Független Média Portfólió (app.js)
 *
 * Kliensoldali alkalmazáslogika – tiszta Vanilla JavaScript, külső függőség nélkül.
 *
 * Funkciók:
 *   1. Kiemelt szekció: mindhárom platform (HVG, YouTube, Podcast) legfrissebb tartalma kártyánként
 *   2. Teljes szélességű szerkesztőségi lista: időrendi sorrend (legújabbtól a legrégebbi felé)
 *   3. Közvetlen megnyitás: kattintásra azonnal megnyílik a tartalom új lapon
 *   4. Kategóriaszűrés & Alszűrők: HVG (HVG360, Tech, Pulzus, Gazdaság), YouTube (Saját, Vendég), Podcast (Vendég, Riporter, Vágó)
 *   5. Valós idejű keresés: cím, bevezető, rovat és címkék alapján
 *   6. Spambot-védett e-mail cím vágólapra másolás
 *
 * A média adatbázist a data.js MEDIA_DATABASE tömbje szolgáltatja.
 */

let currentFilter = "all";
let currentSubFilter = "all";
let currentSearch = "";
let mediaItems = [];

const SUBFILTER_CONFIG = {
    hvg: {
        label: "📰 HVG rovat:",
        options: [
            { key: "all", text: "Összes HVG" },
            { key: "hvg360", text: "💎 HVG360" },
            { key: "tech", text: "💻 Tech" },
            { key: "pulzus", text: "💜 Pulzus" },
            { key: "gazdasag", text: "📈 Gazdaság" }
        ]
    },
    youtube: {
        label: "🎬 YouTube típus:",
        options: [
            { key: "all", text: "Összes Videó" },
            { key: "own", text: "🎥 Saját" },
            { key: "guest", text: "★ Vendég" }
        ]
    },
    podcast: {
        label: "🎙️ Podcast típus:",
        options: [
            { key: "all", text: "Összes Podcast" },
            { key: "guest", text: "★ Szakértői Vendég" },
            { key: "reporter", text: "🎙️ Riporter / Saját anyag" },
            { key: "editor", text: "✂️ Vágó & Utómunka" }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const db = typeof MEDIA_DATABASE !== "undefined" ? MEDIA_DATABASE : [];

    // Szigorú időrendi rendezés: legfrissebb elöl
    mediaItems = [...db].sort((a, b) =>
        (b.isoDate || "").localeCompare(a.isoDate || "")
    );

    renderFeaturedRow();
    updateFilterCounts();
    renderSubfilterBar();
    renderContent();
    initFilters();
    initSearch();
    initEmailCopy();
});

/* ==========================================================================
   1. Kiemelt Szekció (Top 3: Legfrissebb HVG Cikk, YouTube Videó, Podcast)
   ========================================================================== */
function renderFeaturedRow() {
    const featuredGrid = document.getElementById("featuredGrid");
    if (!featuredGrid) return;

    featuredGrid.innerHTML = "";

    const featuredConfig = [
        {
            platform: "hvg",
            pillText: "Legfrissebb HVG Cikk",
            actionLabel: "Cikk olvasása a hvg.hu-n ↗"
        },
        {
            platform: "youtube",
            pillText: "Legfrissebb YouTube Műsor",
            actionLabel: "Megtekintés a YouTube-on ↗"
        },
        {
            platform: "podcast",
            pillText: "Legfrissebb Podcast Adás",
            actionLabel: "Adás meghallgatása ↗"
        }
    ];

    featuredConfig.forEach(({ platform, pillText, actionLabel }) => {
        const item = mediaItems.find(entry => entry.platform === platform);
        if (!item) return;

        const isPulzus = item.platform === "hvg" && item.subCategory === "pulzus";
        const pillClass = isPulzus ? "hvg-pulzus" : platform;
        const resolvedPillText = isPulzus ? "Legfrissebb HVG Pulzus Cikk" : pillText;
        const resolvedActionLabel = isPulzus ? "Cikk olvasása a HVG Pulzuson ↗" : actionLabel;

        const card = createLinkCard(item, "featured-card");
        card.innerHTML = `
            <div class="featured-thumb-wrap">
                <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}">
                <div class="featured-badge-top">
                    <span class="platform-pill ${pillClass}">★ ${resolvedPillText}</span>
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
                    <span class="platform-source-label">${escapeHtml(item.platformLabel)}</span>
                    <span class="action-trigger-text">${resolvedActionLabel}</span>
                </div>
            </div>
        `;

        featuredGrid.appendChild(card);
    });
}

/* ==========================================================================
   2. Kategória Számlálók
   ========================================================================== */
function updateFilterCounts() {
    const counts = { all: mediaItems.length, hvg: 0, youtube: 0, podcast: 0 };

    mediaItems.forEach(item => {
        if (counts[item.platform] !== undefined) counts[item.platform]++;
    });

    Object.entries(counts).forEach(([key, value]) => {
        const el = document.getElementById(`count-${key}`);
        if (el) el.textContent = value;
    });
}

/* ==========================================================================
   3. Fő Tartalomjegyzék Renderelő (Teljes szélességű szerkesztőségi lista)
   ========================================================================== */
function renderContent() {
    const container = document.getElementById("mediaContainer");
    if (!container) return;

    container.innerHTML = "";
    const query = normalizeText(currentSearch.trim());

    const filtered = mediaItems.filter(item => {
        const matchesFilter = currentFilter === "all" || item.platform === currentFilter;
        const matchesSubFilter = currentFilter === "all" || currentSubFilter === "all" || item.subCategory === currentSubFilter;
        const matchesSearch = !query ||
            normalizeText(item.title).includes(query) ||
            normalizeText(item.lead).includes(query) ||
            normalizeText(item.column).includes(query) ||
            (item.tags && item.tags.some(t => normalizeText(t).includes(query)));

        return matchesFilter && matchesSubFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p class="empty-state-title">Nincs találat a megadott feltételekkel</p>
                <p class="empty-state-desc">Próbálj másik keresőszót vagy állítsd vissza az 'Összes' fülre.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(item => container.appendChild(createHorizontalCard(item)));
}

function createLinkCard(item, className) {
    const card = document.createElement("a");
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = className;
    card.title = `${item.title} — Megnyitás új lapon`;
    return card;
}

function getPlatformBadge(item) {
    if (item.isSpotlight) {
        return `<span class="platform-pill spotlight">★ ${escapeHtml(item.platformLabel || item.column)}</span>`;
    }
    if (item.platform === "hvg") {
        if (item.subCategory === "pulzus") {
            return `<span class="platform-pill hvg-pulzus">HVG ${escapeHtml(item.column)}</span>`;
        }
        return `<span class="platform-pill hvg">HVG • ${escapeHtml(item.column)}</span>`;
    }
    if (item.platform === "youtube") {
        return `<span class="platform-pill youtube">YouTube • ${escapeHtml(item.column)}</span>`;
    }
    if (item.platform === "podcast") {
        if (item.subCategory === "guest") {
            return `<span class="platform-pill podcast-guest">★ Vendégszereplés</span>`;
        }
        if (item.subCategory === "editor") {
            return `<span class="platform-pill podcast-editor">Kommcast • Vágó</span>`;
        }
        if (item.subCategory === "reporter") {
            return `<span class="platform-pill podcast">🎙️ Kommcast • Riporter</span>`;
        }
        return `<span class="platform-pill podcast">🎙️ Podcast • ${escapeHtml(item.column)}</span>`;
    }
    return `<span class="platform-pill hvg">${escapeHtml(item.column)}</span>`;
}

function getActionLabel(item) {
    if (item.actionLabel) return escapeHtml(item.actionLabel);
    if (item.platform === "youtube") return "Videó megtekintése a YouTube-on ↗";
    if (item.platform === "podcast") {
        if (item.subCategory === "editor") return "Teljes adás a YouTube-on (vágó) ↗";
        if (item.subCategory === "guest") return "Adás meghallgatása a Spotify-on 🎧 ↗";
        return "Adás meghallgatása (riporter) 🎙️ ↗";
    }
    if (item.platform === "hvg" && item.subCategory === "pulzus") {
        return "Cikk elolvasása a HVG Pulzuson ↗";
    }
    return "Cikk elolvasása a hvg.hu-n ↗";
}

function createHorizontalCard(item) {
    const className = "horizontal-card" + (item.isSpotlight ? " spotlight-card" : "");
    const card = createLinkCard(item, className);

    card.innerHTML = `
        <div class="h-thumb-box">
            <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>
        <div class="h-content">
            <div class="h-meta-row">
                ${getPlatformBadge(item)}
                <span class="h-date">${escapeHtml(item.date)} • ${escapeHtml(item.readTime)}</span>
            </div>
            <h2 class="h-headline">${escapeHtml(item.title)}</h2>
            <p class="h-lead">${escapeHtml(item.lead)}</p>
            <div class="h-footer">
                <span class="platform-source-label">${escapeHtml(item.platformLabel)}</span>
                <span class="action-trigger-text">${getActionLabel(item)}</span>
            </div>
        </div>
    `;

    return card;
}

/* ==========================================================================
   4. Szűrés, Alszűrők, Keresés & E-mail Védelem
   ========================================================================== */
function renderSubfilterBar() {
    const bar = document.getElementById("subfilterBar");
    if (!bar) return;

    const config = SUBFILTER_CONFIG[currentFilter];
    if (!config) {
        bar.style.display = "none";
        bar.innerHTML = "";
        bar.removeAttribute("data-platform");
        return;
    }

    const platformItems = mediaItems.filter(item => item.platform === currentFilter);
    const buttonsHtml = config.options.map(({ key, text }) => {
        const count = key === "all"
            ? platformItems.length
            : platformItems.filter(item => item.subCategory === key).length;
        const activeClass = key === currentSubFilter ? " active" : "";
        return `
            <button class="subfilter-tab${activeClass}" data-subfilter="${key}">
                <span>${text}</span>
                <span class="sub-count">${count}</span>
            </button>
        `;
    }).join("");

    bar.setAttribute("data-platform", currentFilter);
    bar.innerHTML = `
        <span class="subfilter-label">${config.label}</span>
        <div class="subfilter-buttons">${buttonsHtml}</div>
    `;
    bar.style.display = "flex";

    const subTabs = bar.querySelectorAll(".subfilter-tab[data-subfilter]");
    subTabs.forEach(subTab => {
        subTab.addEventListener("click", () => {
            subTabs.forEach(t => t.classList.remove("active"));
            subTab.classList.add("active");
            currentSubFilter = subTab.getAttribute("data-subfilter");
            renderContent();
        });
    });
}

function initFilters() {
    const tabs = document.querySelectorAll(".filter-tab[data-filter]");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentFilter = tab.getAttribute("data-filter");
            currentSubFilter = "all";

            renderSubfilterBar();
            renderContent();
        });
    });
}

function initSearch() {
    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("input", e => {
            currentSearch = e.target.value;
            renderContent();
        });
    }
}

function initEmailCopy() {
    const protectedContacts = document.querySelectorAll(".protected-contact");
    protectedContacts.forEach(contact => {
        contact.addEventListener("click", e => {
            e.preventDefault();
            const u = contact.getAttribute("data-u");
            const d = contact.getAttribute("data-d");
            if (!u || !d) return;

            const email = `${u}@${d}`;
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                window.location.href = `mailto:${email}`;
                return;
            }

            navigator.clipboard.writeText(email).then(() => {
                const textSpan = contact.querySelector(".protected-email-text") || contact;
                const originalText = textSpan.innerText;
                textSpan.innerText = "Cím másolva!";
                contact.style.pointerEvents = "none";
                contact.style.color = "#4ade80";

                setTimeout(() => {
                    textSpan.innerText = originalText;
                    contact.style.pointerEvents = "auto";
                    contact.style.color = "";
                }, 2000);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    });
}

function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
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
