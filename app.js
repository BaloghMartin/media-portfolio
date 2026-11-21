/**
 * Balogh Martin — Független Média Portfólió (app.js)
 *
 * Kliensoldali alkalmazáslogika – tiszta Vanilla JavaScript, külső függőség nélkül.
 * A média adatbázist a data.js MEDIA_DATABASE tömbje szolgáltatja.
 */

let currentFilter = "all";
let currentSubFilter = "all";
let currentSearch = "";
let mediaItems = [];
let refreshSectionNav = () => {};

const MONTHS = [
    "január", "február", "március", "április", "május", "június",
    "július", "augusztus", "szeptember", "október", "november", "december"
];

const FEATURED_CONFIG = [
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

const PODCAST_BADGES = {
    guest: ["podcast-guest", "★ Vendégszereplés"],
    editor: ["podcast-editor", "Kommcast • Vágó"],
    reporter: ["podcast", "🎙️ Kommcast • Riporter"]
};

const PODCAST_ACTIONS = {
    editor: "Teljes adás a YouTube-on (vágó) ↗",
    guest: "Adás meghallgatása a Spotify-on 🎧 ↗",
    reporter: "Adás meghallgatása (riporter) 🎙️ ↗"
};

document.addEventListener("DOMContentLoaded", () => {
    const db = typeof MEDIA_DATABASE !== "undefined" ? MEDIA_DATABASE : [];

    // Szigorú időrendi rendezés: legfrissebb elöl
    mediaItems = [...db].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    renderFeaturedRow();
    initFilters();
    renderSubfilterBar();
    renderContent();
    initSearch();
    initEmailCopy();
    initSectionNav();
});

function renderFeaturedRow() {
    const featuredGrid = document.getElementById("featuredGrid");
    if (!featuredGrid) return;

    const featured = FEATURED_CONFIG
        .map(cfg => ({ ...cfg, item: mediaItems.find(entry => entry.platform === cfg.platform) }))
        .filter(entry => entry.item);

    const existing = [...featuredGrid.querySelectorAll(".featured-card")];
    if (existing.length === featured.length && existing.every((el, i) => el.getAttribute("href") === featured[i].item.url)) {
        return;
    }

    featuredGrid.innerHTML = featured.map(({ platform, pillText, actionLabel, item }) => {
        const isPulzus = platform === "hvg" && item.subCategory === "pulzus";
        const pillClass = isPulzus ? "hvg-pulzus" : platform;
        const resolvedPillText = isPulzus ? "Legfrissebb HVG Pulzus Cikk" : pillText;
        const resolvedActionLabel = isPulzus ? "Cikk olvasása a HVG Pulzuson ↗" : actionLabel;

        return `
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="featured-card" title="${escapeHtml(item.title)} — Megnyitás új lapon">
                <div class="featured-thumb-wrap">
                    <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" decoding="async">
                    <div class="featured-badge-top">
                        <span class="platform-pill ${pillClass}">★ ${resolvedPillText}</span>
                    </div>
                    <div class="featured-metric-top">${escapeHtml(item.readTime)}</div>
                </div>
                <div class="featured-body">
                    <div class="featured-meta-line">
                        <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date))}</time>
                        <span>${escapeHtml(item.column)}</span>
                    </div>
                    <h3 class="featured-headline">${escapeHtml(item.title)}</h3>
                    <p class="featured-lead">${escapeHtml(item.lead)}</p>
                    <div class="featured-footer">
                        <span class="platform-source-label">${escapeHtml(item.platformLabel)}</span>
                        <span class="action-trigger-text">${resolvedActionLabel}</span>
                    </div>
                </div>
            </a>
        `;
    }).join("");
}

function renderContent() {
    const container = document.getElementById("mediaContainer");
    if (!container) return;

    const query = normalizeText(currentSearch.trim());
    const filtered = mediaItems.filter(item => {
        if (currentFilter !== "all" && item.platform !== currentFilter) return false;
        if (currentFilter !== "all" && currentSubFilter !== "all" && item.subCategory !== currentSubFilter) return false;
        if (!query) return true;

        const haystack = [item.title, item.lead, item.column, ...(item.tags || [])].join("\n");
        return normalizeText(haystack).includes(query);
    });

    container.innerHTML = filtered.length
        ? filtered.map(renderCard).join("")
        : `
            <div class="empty-state">
                <p class="empty-state-title">Nincs találat a megadott feltételekkel</p>
                <p class="empty-state-desc">Próbálj másik keresőszót vagy állítsd vissza az 'Összes' fülre.</p>
            </div>
        `;
    refreshSectionNav();
}

function getPlatformBadge(item) {
    if (item.isSpotlight) {
        return `<span class="platform-pill spotlight">★ ${escapeHtml(item.platformLabel || item.column)}</span>`;
    }
    if (item.platform === "podcast") {
        const [cls, label] = PODCAST_BADGES[item.subCategory] || ["podcast", `🎙️ Podcast • ${escapeHtml(item.column)}`];
        return `<span class="platform-pill ${cls}">${label}</span>`;
    }

    const isPulzus = item.platform === "hvg" && item.subCategory === "pulzus";
    const cls = isPulzus ? "hvg-pulzus" : item.platform;
    const prefix = item.platform === "youtube" ? "YouTube • " : isPulzus ? "HVG " : "HVG • ";
    return `<span class="platform-pill ${cls}">${prefix}${escapeHtml(item.column)}</span>`;
}

function getActionLabel(item) {
    if (item.actionLabel) return escapeHtml(item.actionLabel);
    if (item.platform === "youtube") return "Videó megtekintése a YouTube-on ↗";
    if (item.platform === "podcast") return PODCAST_ACTIONS[item.subCategory] || PODCAST_ACTIONS.reporter;
    return item.subCategory === "pulzus"
        ? "Cikk elolvasása a HVG Pulzuson ↗"
        : "Cikk elolvasása a hvg.hu-n ↗";
}

function renderCard(item) {
    const spotlightClass = item.isSpotlight ? " spotlight-card" : "";
    return `
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="horizontal-card${spotlightClass}" title="${escapeHtml(item.title)} — Megnyitás új lapon">
            <div class="h-thumb-box">
                <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" loading="lazy">
            </div>
            <div class="h-content">
                <div class="h-meta-row">
                    ${getPlatformBadge(item)}
                    <span class="h-date"><time datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date))}</time> • ${escapeHtml(item.readTime)}</span>
                </div>
                <h3 class="h-headline">${escapeHtml(item.title)}</h3>
                <p class="h-lead">${escapeHtml(item.lead)}</p>
                <div class="h-footer">
                    <span class="platform-source-label">${escapeHtml(item.platformLabel)}</span>
                    <span class="action-trigger-text">${getActionLabel(item)}</span>
                </div>
            </div>
        </a>
    `;
}

function renderSubfilterBar() {
    const bar = document.getElementById("subfilterBar");
    if (!bar) return;

    const config = SUBFILTER_CONFIG[currentFilter];
    if (!config) {
        bar.innerHTML = "";
        bar.removeAttribute("data-platform");
        return;
    }

    const platformItems = mediaItems.filter(item => item.platform === currentFilter);
    const buttonsHtml = config.options.map(({ key, text }) => {
        const count = key === "all"
            ? platformItems.length
            : platformItems.filter(item => item.subCategory === key).length;
        const isActive = key === currentSubFilter;
        const activeClass = isActive ? " active" : "";
        return `
            <button type="button" class="subfilter-tab${activeClass}" data-subfilter="${key}" aria-pressed="${isActive}">
                <span>${text}</span>
                <span class="tab-count">${count}</span>
            </button>
        `;
    }).join("");

    bar.setAttribute("data-platform", currentFilter);
    bar.innerHTML = `
        <span class="subfilter-label">${config.label}</span>
        <div class="subfilter-buttons" role="group" aria-label="Alszűrők">${buttonsHtml}</div>
    `;
}

function initFilters() {
    const setActiveTab = (root, selector, activeEl) => {
        root.querySelectorAll(selector).forEach(t => {
            const isActive = t === activeEl;
            t.classList.toggle("active", isActive);
            t.setAttribute("aria-pressed", String(isActive));
        });
    };

    const filterGroup = document.querySelector(".filter-group");
    if (filterGroup) {
        filterGroup.querySelectorAll(".filter-tab[data-filter]").forEach(tab => {
            const filter = tab.getAttribute("data-filter");
            const count = filter === "all"
                ? mediaItems.length
                : mediaItems.filter(item => item.platform === filter).length;
            const countEl = tab.querySelector(".tab-count");
            if (countEl) countEl.textContent = count;
        });

        filterGroup.addEventListener("click", e => {
            const tab = e.target.closest(".filter-tab[data-filter]");
            if (!tab) return;
            setActiveTab(filterGroup, ".filter-tab", tab);
            currentFilter = tab.getAttribute("data-filter");
            currentSubFilter = "all";
            renderSubfilterBar();
            renderContent();
        });
    }

    const subfilterBar = document.getElementById("subfilterBar");
    if (subfilterBar) {
        subfilterBar.addEventListener("click", e => {
            const subTab = e.target.closest(".subfilter-tab[data-subfilter]");
            if (!subTab) return;
            setActiveTab(subfilterBar, ".subfilter-tab", subTab);
            currentSubFilter = subTab.getAttribute("data-subfilter");
            renderContent();
        });
    }
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
    document.querySelectorAll(".protected-contact").forEach(contact => {
        const textSpan = contact.querySelector("span") || contact;
        const defaultLabel = textSpan.textContent;

        contact.addEventListener("click", e => {
            e.preventDefault();
            if (contact.disabled) return;

            const u = contact.getAttribute("data-u");
            const d = contact.getAttribute("data-d");
            if (!u || !d) return;

            const email = `${u}@${d}`;
            if (!navigator.clipboard?.writeText) {
                window.location.href = `mailto:${email}`;
                return;
            }

            navigator.clipboard.writeText(email).then(() => {
                textSpan.textContent = "Cím másolva!";
                contact.disabled = true;
                contact.classList.add("is-copied");

                setTimeout(() => {
                    textSpan.textContent = defaultLabel;
                    contact.disabled = false;
                    contact.classList.remove("is-copied");
                }, 2000);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    });
}

function initSectionNav() {
    const nav = document.getElementById("sectionNav");
    if (!nav) return;

    const linksWrap = nav.querySelector(".section-nav-links");
    const items = [...nav.querySelectorAll(".section-nav-link[href^='#']")]
        .map(link => ({ link, section: document.querySelector(link.getAttribute("href")) }))
        .filter(entry => entry.section);
    if (!items.length) return;

    let ticking = false;
    let lastActiveId = null;

    const update = () => {
        ticking = false;
        const isStuck = window.scrollY > 0 && nav.getBoundingClientRect().top <= 1;
        nav.classList.toggle("is-stuck", isStuck);

        let activeId = "";
        if (isStuck) {
            const triggerY = nav.getBoundingClientRect().bottom + 48;
            const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
            if (atBottom) {
                activeId = items[items.length - 1].section.id;
            } else {
                activeId = items[0].section.id;
                for (const { section } of items) {
                    if (section.getBoundingClientRect().top <= triggerY) {
                        activeId = section.id;
                    }
                }
            }
        }

        if (activeId !== lastActiveId) {
            lastActiveId = activeId;
            items.forEach(({ link, section }) => {
                const isActive = section.id === activeId;
                link.classList.toggle("active", isActive);
                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });

            if (linksWrap && linksWrap.scrollWidth > linksWrap.clientWidth) {
                const activeLink = items.find(entry => entry.section.id === activeId)?.link;
                const targetLeft = activeLink
                    ? Math.max(0, activeLink.offsetLeft - (linksWrap.clientWidth - activeLink.offsetWidth) / 2)
                    : 0;
                const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
                linksWrap.scrollTo({ left: targetLeft, behavior });
            }
        }
    };

    const onScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    refreshSectionNav = onScroll;
    update();
}

function formatDate(iso) {
    const [y, m, d] = (iso || "").split("-");
    return m && d && MONTHS[+m - 1] ? `${y}. ${MONTHS[+m - 1]} ${+d}.` : (iso || "");
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
