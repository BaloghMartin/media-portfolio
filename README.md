# Balogh Martin — Független Média Portfólió

> Személyes médiaalkotói portfólió és archívum weboldal.
> SZTE Kommunikáció- és médiatudomány BA szakos hallgató munkái.

## Tartalom

Az oldal három egyenrangú kategóriában mutatja be a médiatartalmakat:

| Kategória | Darabszám | Leírás |
|-----------|-----------|--------|
| 📰 HVG Cikkek | 11 | Külsős szerzői publikációk a hvg.hu-n (Tech, hvg360, Gazdaság rovatok) |
| 🎬 YouTube Videók | 5 | Saját műsorok, hardverteszt, 24.hu Ziccer vendégszereplés, FPL Harry nemzetközi elemzés |
| 🎙️ Podcastok | 22 | 1 Fantasy Besztlíg vendégadás, 7 Kommcast riporteri munka, 14 Kommcast vágói adás |

**Összesen: 38 ellenőrzött médiatartalom.**

## Funkciók

- **Kiemelt szekció:** mindhárom platform legfrissebb tartalma kiemelve az oldal tetején
- **Időrendi sorrend:** legújabbtól a legrégebbi felé (2026 → 2024)
- **Kategóriaszűrés:** Összes / HVG / YouTube / Podcast fülekkel
- **Podcast alszűrő:** Vendég / Riporter / Vágó szerepkörök szerinti bontás
- **Kettős nézet:** kártya rács és szerkesztőségi lista nézet
- **Élő keresés:** cím, bevezető, rovat és címkék alapján
- **Közvetlen megnyitás:** kattintásra azonnal megnyílik a tartalom új lapon

## Technikai felépítés

```
index.html    – az oldal HTML struktúrája
style.css     – megjelenés és reszponzív elrendezés
data.js       – MEDIA_DATABASE tömb (38 elem, kézzel ellenőrzött adatok)
app.js        – kliensoldali logika (szűrés, keresés, renderelés)
assets/       – borítóképek (hvg/, youtube/, podcasts/, author.jpg)
```

**Külső függőségek:** nincs (tiszta Vanilla JS + CSS).
**Betűtípusok:** IBM Plex Serif, Inter, JetBrains Mono (Google Fonts CDN).

## Megtekintés

Nyisd meg a böngészőben:
```
file:///Users/baloghmartin/.gemini/antigravity/scratch/szte-jgypk-portfolio/index.html
```

## Elérhetőségek

- **E-mail:** baloghmartin@icloud.com
- **X (Twitter):** [@NotMartinBalogh](https://x.com/NotMartinBalogh)
- **LinkedIn:** [Martin Balogh](https://www.linkedin.com/in/martin-balogh-068176300/)
- **Instagram:** [@notmartinbalogh](https://www.instagram.com/notmartinbalogh/)
- **Facebook:** [notmartinbalogh](https://www.facebook.com/notmartinbalogh)
