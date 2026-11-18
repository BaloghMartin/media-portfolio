# Balogh Martin — Független Média Portfólió

> Személyes médiaalkotói portfólió és archívum weboldal.
> Független újságíró és tartalomgyártó (HVG, YouTube, Kommcast) munkái.

## Tartalom

Az oldal három egyenrangú kategóriában mutatja be a médiatartalmakat:

| Kategória | Darabszám | Leírás |
|-----------|-----------|--------|
| 📰 HVG Cikkek | 14 | Külsős szerzői publikációk a hvg.hu-n (Tech, hvg360, Pulzus, Gazdaság rovatok) |
| 🎬 YouTube Videók | 5 | Saját műsorok, hardverteszt, 24.hu Ziccer vendégszereplés, FPL Harry nemzetközi elemzés |
| 🎙️ Podcastok | 24 | 1 Fantasy Besztlíg vendégadás, 7 Kommcast riporteri munka, 16 Kommcast vágói adás |

**Összesen: 43 ellenőrzött médiatartalom.**

## Funkciók

- **Kiemelt szekció:** mindhárom platform legfrissebb tartalma kiemelt kártyaként az oldal tetején
- **Időrendi sorrend:** legújabbtól a legrégebbi felé (2026 → 2024)
- **Kategóriaszűrés & Alszűrők:** Összes / HVG (HVG360, Tech, Pulzus, Gazdaság) / YouTube (Saját, Vendég) / Podcast (Vendég, Riporter, Vágó) bontásban
- **Szerkesztőségi lista nézet:** teljes szélességű, részletes tartalomkártyák a fő listában
- **Élő keresés:** cím, bevezető, rovat és címkék alapján
- **Közvetlen megnyitás:** kattintásra azonnal megnyílik a tartalom új lapon

## Technikai felépítés

```
index.html    – az oldal HTML struktúrája és SEO metaadatai
style.css     – megjelenés és reszponzív elrendezés
data.js       – MEDIA_DATABASE tömb (43 elem, kézzel ellenőrzött adatok)
app.js        – kliensoldali logika (szűrés, keresés, renderelés)
assets/       – borítóképek és ikonok (hvg/, youtube/, podcasts/, author.jpg, favicon.svg, apple-touch-icon.png)
favicon.ico   – többméretű (16x16, 32x32, 48x48) böngésző ikon
robots.txt    – keresőmotorok indexelési útmutatója
sitemap.xml   – oldaltérkép a keresőmotorokhoz
```

**Külső függőségek:** nincs (tiszta Vanilla JS + CSS).
**Betűtípusok:** IBM Plex Serif, Inter, JetBrains Mono (Google Fonts CDN).

## Megtekintés

Élő oldal: [baloghmartin.com](https://baloghmartin.com)

Helyi megtekintéshez nyisd meg az `index.html` fájlt böngészőben, vagy indíts helyi statikus szervert a projekt mappájában (`python3 -m http.server`).

## Elérhetőségek

- **E-mail:** baloghmartin@icloud.com
- **X (Twitter):** [@NotMartinBalogh](https://x.com/NotMartinBalogh)
- **LinkedIn:** [Martin Balogh](https://www.linkedin.com/in/martin-balogh-068176300/)
- **Instagram:** [@notmartinbalogh](https://www.instagram.com/notmartinbalogh/)
- **Facebook:** [notmartinbalogh](https://www.facebook.com/notmartinbalogh)
