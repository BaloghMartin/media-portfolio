/**
 * Balogh Martin — Média Adatbázis (data.js)
 *
 * Az oldal teljes tartalomjegyzéke egyetlen MEDIA_DATABASE tömbben.
 * Minden bejegyzés kézzel ellenőrzött, valós forrásokkal.
 *
 * Tartalom (38 elem összesen):
 *   - 11 db HVG cikk (Tech, hvg360, Gazdaság) — működő hvg.hu linkekkel, helyi borítóképekkel
 *   - 5 db YouTube videó — saját műsorok, nemzetközi vendégszereplés, 24.hu Ziccer kiemelt vendég
 *   - 22 db podcast — 1 Fantasy Besztlíg vendégadás, 7 Kommcast riporteri, 14 Kommcast vágói munka
 *
 * Sorrend: szigorú időrendi (legfrissebb elöl, legrégebbi hátul).
 *
 * Bejegyzés mezők:
 *   id            – egyedi azonosító (pl. 'hvg-01', 'pod-rep-karotta')
 *   platform      – 'hvg' | 'youtube' | 'podcast'
 *   subCategory   – csak podcastnál: 'guest' | 'reporter' | 'editor'
 *   platformLabel – megjelenítési címke (pl. 'HVG Tech', 'Kommcast • Riporter')
 *   column        – rovat vagy sorozat neve
 *   roleBadge     – podcastoknál: emoji + szerepkör felirat
 *   isPremium     – igaz, ha HVG prémium (hvg360) tartalom
 *   isSpotlight   – igaz, ha különösen kiemelt megjelenés
 *   title         – cím
 *   lead          – bevezető/leírás szöveg
 *   date          – megjelenés dátuma magyar formátumban
 *   isoDate       – megjelenés dátuma ISO 8601 formátumban (rendezéshez)
 *   readTime      – olvasási/megtekintési idő
 *   thumbnail     – borítókép elérési útja (helyi assets/ mappa)
 *   url           – elsődleges hivatkozás
 *   youtubeId     – YouTube videó azonosító (opcionális)
 *   applePodcastUrl – Apple Podcasts link (opcionális)
 *   spotifyUrl    – Spotify link (opcionális)
 *   tags          – címkék tömbje
 *   chapters      – videó fejezetek tömbje (opcionális)
 */

const MEDIA_DATABASE = [
    {
        "id": "hvg-01",
        "platform": "hvg",
        "platformLabel": "HVG Tech",
        "column": "Tech",
        "isPremium": false,
        "title": "Az Ügyészség nevében egy majdnem tökéletes támadás indult, aztán jött a tökéletes is",
        "lead": "Legutóbb a magukat Magyarország Ügyészségének kiadó támadók tevékenysége világított rá, hogy a legkisebb hazai vállalatok is valódi veszélyben érezhetik az adataikat. Főleg mert azóta újabb, még profibb hullám is indult.",
        "date": "2026. szeptember 28.",
        "isoDate": "2026-09-28",
        "readTime": "7 perc olvasás",
        "thumbnail": "assets/hvg/hvg-01.jpg",
        "url": "https://hvg.hu/tudomany/20260928_zsarolovirus-tamadas-ugyeszseg-vadirat-visszafejto-program",
        "tags": [
            "Kiberbiztonság",
            "Ügyészség",
            "Zsarolóvírus",
            "Tech"
        ]
    },
    {
        "id": "hvg-02",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Mi ez a felfordulás most a matematikában? Már miért döntené romba az AI?",
        "lead": "Lelkes fogadtatás helyett plagizálással és a matematika létének veszélyeztetésével vádolja a tudományterület elitje a ChatGPT mögött álló OpenAI-t, miután az újabb áttörést ért. A vita egyre inkább elmérgesedik.",
        "date": "2026. szeptember 27.",
        "isoDate": "2026-09-27",
        "readTime": "6 perc olvasás",
        "thumbnail": "assets/hvg/hvg-02.jpg",
        "url": "https://hvg.hu/360/20260927_hvg-mesterseges-intelligencia-matematika-openai-vita",
        "tags": [
            "Mesterséges Intelligencia",
            "Matematika",
            "OpenAI",
            "ChatGPT",
            "hvg360"
        ]
    },
    {
        "id": "hvg-03",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Nem az a csoda, hogy feltörték az Államkincstár rendszerét, inkább az, hogy csak most",
        "lead": "Profi orosz támadókra gyanakodnak a Magyar Államkincstárnál, külsős szakértők szerint inkább arra utalnak a jelek, hogy egy ügyesebb egyetemista vagy kezdő hacker egymagában is könnyűszerrel feltörhette az intézmény rendszerét. Az is kiderült, milyen jelszavakat használtak a dolgozók.",
        "date": "2026. augusztus 17.",
        "isoDate": "2026-08-17",
        "readTime": "7 perc olvasás",
        "thumbnail": "assets/hvg/hvg-03.jpg",
        "url": "https://hvg.hu/360/20260817_magyar-allamkincstar-elleni-kibertamadas-elemzes-hvg-ebx",
        "tags": [
            "Államkincstár",
            "Kiberbiztonság",
            "Hackertámadás",
            "hvg360"
        ]
    },
    {
        "id": "yt-01",
        "platform": "youtube",
        "platformLabel": "YouTube Műsor & Mestermunka",
        "column": "SZTE BA Mestermunka • Tech",
        "isPremium": false,
        "title": "MI, a számítógép – Műsor a mesterséges intelligenciáról",
        "lead": "Csupán egy számítógép a mesterséges intelligencia, vagy valami annál sokkal több? Közel egyórás kerekasztal-műsor és mélyfúrás a technológiai, jogi és társadalmi határokról Dr. Rab Árpád társadalomkutatóval, Dr. Mezei Péter jogásszal, Dr. Berend Gábor informatikussal, Kiss Donáttal és magával a ChatGPT-vel. Egyben az SZTE Kommunikáció- és médiatudomány BA szakán készített szakdolgozat mestermunkája.",
        "date": "2026. augusztus 10.",
        "isoDate": "2026-08-10",
        "readTime": "55:59 perc adás",
        "thumbnail": "assets/youtube/yt-01.jpg",
        "youtubeId": "8Z3wvY1Ghh0",
        "url": "https://www.youtube.com/watch?v=8Z3wvY1Ghh0",
        "tags": [
            "SZTE Mestermunka",
            "Mesterséges Intelligencia",
            "Dr. Rab Árpád",
            "Dr. Mezei Péter",
            "ChatGPT",
            "Tech Műsor"
        ],
        "chapters": [
            {
                "time": "00:00",
                "title": "Bevezetés"
            },
            {
                "time": "02:53",
                "title": "Dr. Rab Árpád: Társadalmi megközelítés (és szegedi járókelők véleménye)"
            },
            {
                "time": "21:16",
                "title": "Dr. Mezei Péter: Jogi kérdések & szerzői jogok"
            },
            {
                "time": "30:06",
                "title": "Dr. Berend Gábor: Informatikai háttér"
            },
            {
                "time": "40:17",
                "title": "ChatGPT: Interjú a nyelvi modellel"
            },
            {
                "time": "43:57",
                "title": "Kiss Donát: Médiatörténeti párhuzam"
            },
            {
                "time": "54:23",
                "title": "Zárás & Összegzés"
            },
            {
                "time": "55:39",
                "title": "Data Transmission (Waver Protocol / Easter Egg)"
            }
        ]
    },
    {
        "id": "hvg-04",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Megveszel egy drága játékot, ami nem is lesz a tiéd, és másnak sem adhatod el soha",
        "lead": "Most éppen videójátékok vannak terítéken, de az e-könyvek és a digitálisan beszerzett filmek „tulajdonosai” is elgondolkodhatnak azon, milyen kockázatokat rejt az, hogy egyre indokoltabb a birtokosi mivoltukat relativizáló idézőjel.",
        "date": "2026. július 18.",
        "isoDate": "2026-07-18",
        "readTime": "9 perc olvasás",
        "thumbnail": "assets/hvg/hvg-04.jpg",
        "url": "https://hvg.hu/360/20260718_hvg-gaming-sony-playstation-lemezek-fizikai-adathordozok-jatekok-konyvek-filmek-digitalis-tulajdonjog",
        "tags": [
            "Digitális Tulajdonjog",
            "Gaming",
            "PlayStation",
            "hvg360"
        ]
    },
    {
        "id": "hvg-05",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Zsírabb KRÉTA kellene a közoktatásban, és vannak is már rá ötletek",
        "lead": "Sosem számított igazán modernnek, mára pedig végképp elavult a közoktatás digitális vérkeringését biztosító KRÉTA. A rendszer megújításában kiemelkedő potenciál rejlik, valódi segítséget is nyújthatna a diákoknak. Ennek megvalósítása túlmutat az informatikai buktatók kiküszöbölésén.",
        "date": "2026. július 04.",
        "isoDate": "2026-07-04",
        "readTime": "7 perc olvasás",
        "thumbnail": "assets/hvg/hvg-05.jpg",
        "url": "https://hvg.hu/360/20260704_hvg-kreta-2-0-koncepcio-zalehy-kozoktatasi-rendszer-e-naplo",
        "tags": [
            "KRÉTA",
            "Oktatás",
            "EdTech",
            "hvg360"
        ]
    },
    {
        "id": "pod-edit-1000774171278",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2026. június – Bisztriczki Sára és Szloboda Erna, Hajdú B István, Kerpel-Fronius Balázs, Szalma Antónia, Árvai Natália és Csízik Boglárka, Kinyó Pál",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:24) Bisztriczki Sára és Szloboda Erna, a DUE médiapályázat díjazottjai – Kiss Benedek interjúja (15:16) Hajdú B István, az ország egyik legismertebb sportkommentátora – Rádai László beszélgetése (22:36) Kerpel-Fronius Balázs, a szegedi férfi kos...",
        "date": "2026. június 25.",
        "isoDate": "2026-06-25",
        "readTime": "54 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2026-06.jpg",
        "youtubeId": "5ll4FrBUMwU",
        "url": "https://www.youtube.com/watch?v=5ll4FrBUMwU",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2026-j%C3%BAnius-bisztriczki-s%C3%A1ra-%C3%A9s-szloboda-erna/id1539053555?i=1000774171278&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-edit-1000770314946",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2026. május - Szabados Ágnes, Nagy Benjámin, Fercsák Norbert, Apró Stefánia, Mess Attila",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:22) Szabados Ágnes újságíró, tévé szereplő – Hajas Nikolett interjúja (13:08) Nagy Benjámin az Eurosport kommentátora – Vid Luca beszélgetése (24:11) Fercsák Norbert pszichológus, a KortársAID csoport vezetője – Rádi Krisztián interjúja (35:46) ...",
        "date": "2026. május 30.",
        "isoDate": "2026-05-30",
        "readTime": "54 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2026-05.jpg",
        "youtubeId": "WfwgqOX8kks",
        "url": "https://www.youtube.com/watch?v=WfwgqOX8kks",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2026-m%C3%A1jus-szabados-%C3%A1gnes-nagy-benj%C3%A1min-fercs%C3%A1k/id1539053555?i=1000770314946&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "hvg-06",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Áttörésként emlegetik, hogy Erdős Pál „végtelen kockás füzetét” megcáfolta az AI",
        "lead": "Nyolcvan év után a mesterséges intelligenciának sikerült megcáfolnia Erdős Pál végtelen kockás füzetre emlékeztető sejtését. A felfedezés mérföldkő lehet nemcsak a technológia, hanem a matematika számára is.",
        "date": "2026. május 28.",
        "isoDate": "2026-05-28",
        "readTime": "4 perc olvasás",
        "thumbnail": "assets/hvg/hvg-06.png",
        "url": "https://hvg.hu/360/20260528_hvg-erdos-pal-sejtes-vegtelen-kockas-fuzet-cafolat-openai-mesterseges-intelligencia",
        "tags": [
            "Erdős Pál",
            "Matematika",
            "Mesterséges Intelligencia",
            "hvg360"
        ]
    },
    {
        "id": "pod-edit-1000764688471",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2026. április – F. Takács István, Kovács Tamás, Dr. Lénárt András, Bercsényi Kaorin, Csehi Tamás",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:12) F. Takács István pszichológus, az SZTE bölcsészkar oktatója – Kiss Benedek interjúja (13:57) Kovács Tamás vajdasági színész – Vajda Noa beszélgetése (24:47) Dr. Lénárt András, az SZTE-BTK docense – Lajos Léna interjúja (35:50) Bercsényi Kaor...",
        "date": "2026. április 30.",
        "isoDate": "2026-04-30",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2026-04.jpg",
        "youtubeId": "vOkN6sm-oQE",
        "url": "https://www.youtube.com/watch?v=vOkN6sm-oQE",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2026-%C3%A1prilis-f-tak%C3%A1cs-istv%C3%A1n-kov%C3%A1cs-tam%C3%A1s/id1539053555?i=1000764688471&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-edit-1000757486458",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2026. március - Égi Blanka, Nagy Borbála, Nagy Mariann, Sándor Péter, Serfőző Dániel",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:13) Égi Blanka, az Örökké Haza Egyesület egyik alapítója – Gyüre Eliot interjúja (12:35) Nagy Borbála filmrendező – Vona Viktória beszélgetése (23:13) Nagy Mariann jeges úszó, triatlon edző – Laczkó Enikő interjúja (34:11) Sándor Péter kecskemét...",
        "date": "2026. március 26.",
        "isoDate": "2026-03-26",
        "readTime": "52 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2026-03.jpg",
        "youtubeId": "VP9YJay3W7k",
        "url": "https://www.youtube.com/watch?v=VP9YJay3W7k",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2026-m%C3%A1rcius-%C3%A9gi-blanka-nagy-borb%C3%A1la-nagy/id1539053555?i=1000757486458&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "hvg-07",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Félmilliárd forintot temet a föld alá Szeged, hogy ne száradjon ki a belváros",
        "lead": "A világ nagyvárosainak gondjai kicsiben: a klímaváltozás elleni harc egyik eszközeként gyakran emlegetett szivacsvárosok koncepciójába nyújt gyakorlati betekintést Szeged félmilliárd forintos pilotprojektje.",
        "date": "2026. március 16.",
        "isoDate": "2026-03-16",
        "readTime": "5 perc olvasás",
        "thumbnail": "assets/hvg/hvg-07.jpg",
        "url": "https://hvg.hu/360/20260316_hvg-szeged-gogol-utca-szivacsvaros-klimavaltozas-hoszigethatas",
        "tags": [
            "Szeged",
            "Klímaadaptáció",
            "Szivacsváros",
            "hvg360"
        ]
    },
    {
        "id": "pod-edit-1000752076968",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2026. február – Beck Zoli, Kádár L. Gellért, Unger Anett, Gellérfi Bence, Stummer Nikolett, Rácz Tamás Attila és Ivanics Tamás",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:28) Beck Zoli, a 30Y frontembere – Szloboda Erna interjúja (12:11) Kádár L. Gellért, a Hunyadi c. sorozat főszereplője – Kozma Kinga Kamilla beszélgetése (21: 20) Unger Anett, gyógypedagógus és lovasterapeuta – Barányi Rebeka interjúja (31:07) G...",
        "date": "2026. február 28.",
        "isoDate": "2026-02-28",
        "readTime": "54 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2026-02.jpg",
        "youtubeId": "2SRrERG-QZY",
        "url": "https://www.youtube.com/watch?v=2SRrERG-QZY",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2026-febru%C3%A1r-beck-zoli-k%C3%A1d%C3%A1r-l-gell%C3%A9rt/id1539053555?i=1000752076968&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "hvg-08",
        "platform": "hvg",
        "platformLabel": "HVG Cikk",
        "column": "hvg360",
        "isPremium": true,
        "title": "Miért indulnak a magyarok már a rajtnál hátrányból a téli olimpián?",
        "lead": "„A rosszul beállított korcsolyapenge olyan, mintha lapos lenne a kerék az autón” – állítja Knoch Viktor, az olimpiai bajnokból lett technikus. De hol húzódik a határ a profi háttér és a tisztességtelen előny között? Mennyit számít a technikai háttér, és miért indulnak a magyar sízők már a rajtnál hátrányból a nagy nemzetek versenyzőivel szemben? Ismerkedjen meg a technológiai dopping fogalmával.",
        "date": "2026. február 09.",
        "isoDate": "2026-02-09",
        "readTime": "6 perc olvasás",
        "thumbnail": "assets/hvg/hvg-08.jpg",
        "url": "https://hvg.hu/360/20260209_hvg-pengeelmunkasok-milano-cortina-teli-olimpia-sportok-technologiai-dopping",
        "tags": [
            "Téli Olimpia",
            "Knoch Viktor",
            "Technológiai Dopping",
            "Sport",
            "hvg360"
        ]
    },
    {
        "id": "pod-edit-1000747457046",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2026. január - Vada Gergely, Vörös Zsolt, Hermann Lilla, Hegedűs László, Merkovity Filip és Kovács Kristóf",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:15) Vada Gergely, a pihentető alvás specialistája – Harmati Helga interjúja (14:13) Vörös Zsolt főállású jelnyelvi tolmács – Bodor Dóri beszélgetése (25:28) Hermann Lilla hivatásos szinkronszínész – Balla Nadin interjúja (35:19) Hegedűs László, ...",
        "date": "2026. január 31.",
        "isoDate": "2026-01-31",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2026-01.jpg",
        "youtubeId": "5MD7LsBmiAI",
        "url": "https://www.youtube.com/watch?v=5MD7LsBmiAI",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2026-janu%C3%A1r-vada-gergely-v%C3%B6r%C3%B6s-zsolt-hermann/id1539053555?i=1000747457046&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-edit-1000743425860",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. december - Várkonyi Attila, Istenes Márkó, Bíró Csongor Vitéz, Kovácsovics Fruzsina, Mándity Blanka, Gerzsán Béla",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:28) Várkonyi Attila, rádiós műsorvezető, DJ Dominique –Rádai László interjúja (15:54) Istenes Márkó, a 2025-ös X-Faktor ötödik helyezettje –Zsiga Gréta beszélgetése (27:15) Bíró Csongor Vitéz, a 2025-ös Megasztár ötödikhelyezettje – Balla Nadin ...",
        "date": "2026. január 01.",
        "isoDate": "2026-01-01",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-12.jpg",
        "youtubeId": "CGpui9samuY",
        "url": "https://www.youtube.com/watch?v=CGpui9samuY",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-december-v%C3%A1rkonyi-attila-istenes-m%C3%A1rk%C3%B3/id1539053555?i=1000743425860&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "hvg-09",
        "platform": "hvg",
        "platformLabel": "HVG Gazdaság",
        "column": "Gazdaság",
        "isPremium": false,
        "title": "„Magasabb a belépési küszöb” – nem állnak jól a magyarok az e-sportban, de lenne megoldás a helyzetre",
        "lead": "Nem a lakosság számának kérdése, hanem a hozzáállás, sőt még inkább a hozzáférés kérdése, hogy miért nincs globálisan sikeres magyar e-sport-csapat – véli Varga Tibor Szabolcs e-sport-kutató arról, hogy hazánkban mi tartja vissza játékos oldalon az e-sportot a sporttá válástól.",
        "date": "2025. december 12.",
        "isoDate": "2025-12-12",
        "readTime": "5 perc olvasás",
        "thumbnail": "assets/hvg/hvg-09.jpg",
        "url": "https://hvg.hu/gazdasag/20251212_e-sport-Magyarorszag-csapat-siker-verseny",
        "tags": [
            "E-sport",
            "Gaming",
            "Gazdaság",
            "Magyarország"
        ]
    },
    {
        "id": "pod-edit-1000739027849",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. november - Gundel Takács Gábor, Bakonyi Alexa, Kádár Kolos, Vidiczki Zsombor, Székely Zsuzsanna",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:08) Gundel Takács Gábor, a magyar média egyik legnagyobb ikonja – Rádai László beszélgetése (17:25) Bakonyi Alexa színésznő és az Egykutya produkció – Gyüre Eliot interjúja (27:02) Kádár Kolos, a „Szeress azért, aki én vagyok” előadója – Harmati...",
        "date": "2025. november 30.",
        "isoDate": "2025-11-30",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-11.jpg",
        "youtubeId": "WoQw2_iINrs",
        "url": "https://www.youtube.com/watch?v=WoQw2_iINrs",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-november-gundel-tak%C3%A1cs-g%C3%A1bor-bakonyi/id1539053555?i=1000739027849&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "hvg-10",
        "platform": "hvg",
        "platformLabel": "HVG Gazdaság",
        "column": "Gazdaság",
        "isPremium": false,
        "title": "A bátorság, a türelem vagy a pesszimizmus a sikeres befektetés kulcsa?",
        "lead": "Hosszú távon az egyéni habitusunk határozhatja meg, hogy mennyi profitot realizálunk a tőzsdén – derült ki a Fidelity International eseményén a viselkedési közgazdaságtan és az érzelmi alapú befektetői döntések tükrében.",
        "date": "2025. november 04.",
        "isoDate": "2025-11-04",
        "readTime": "3 perc olvasás",
        "thumbnail": "assets/hvg/hvg-10.jpg",
        "url": "https://hvg.hu/gazdasag/20251104_fidelity-befektetes-reszveny-befekteto",
        "tags": [
            "Tőzsde",
            "Befektetés",
            "Fidelity",
            "Gazdaság",
            "Pszichológia"
        ]
    },
    {
        "id": "pod-edit-1000733858629",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. október - Szabó Gábor, Szegő János, Kapu Tibor, Cserényi Gyula, Vojter Kitti, Bolyki János",
        "lead": "(0:00) Bevezető – Kozma Kinga Kamilla (02:22) Szabó Gábor irodalomkutató – Tóth Eszter interjúja (12:36) Szegő János, a Magvető Kiadó szerkesztője – ZsigaGréta beszélgetése (22:11) Kapu Tibor és Cserényi Gyula űrhajósok – Bodor Dóri összeállítása (34:23) Vojter Kitti, az SZTE finnugrisz...",
        "date": "2025. október 28.",
        "isoDate": "2025-10-28",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-10.jpg",
        "youtubeId": "1w39M_zclFs",
        "url": "https://www.youtube.com/watch?v=1w39M_zclFs",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-okt%C3%B3ber-szab%C3%B3-g%C3%A1bor-szeg%C5%91-j%C3%A1nos-kapu/id1539053555?i=1000733858629&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "hvg-11",
        "platform": "hvg",
        "platformLabel": "HVG Gazdaság",
        "column": "Gazdaság",
        "isPremium": false,
        "title": "Mától ingyen dolgoznak a nők idén – mit kezdjünk a bérszakadékkal?",
        "lead": "Az egyenlő díjazás napja idén október 27-re esik, mivel Magyarországon a nők átlagosan 17,8 százalékkal kevesebbet keresnek, mint a férfiak, és arányosan ennyi idő van még hátra az évből. Csernus Fannival, az Amnesty International szakértőjével jártuk körül a bérszakadék tabuit és az új EU-s irányelv hatásait.",
        "date": "2025. október 27.",
        "isoDate": "2025-10-27",
        "readTime": "5 perc olvasás",
        "thumbnail": "assets/hvg/hvg-11.jpg",
        "url": "https://hvg.hu/gazdasag/20251027_fizetes-kereset-no-ferfi-egyenlo-berezes-amnesty-berszakadek",
        "tags": [
            "Bérszakadék",
            "Egyenlő Díjazás",
            "Amnesty International",
            "Gazdaság"
        ]
    },
    {
        "id": "yt-24hu-ziccer",
        "platform": "youtube",
        "platformLabel": "24.hu Ziccer • Kiemelt Vendég",
        "column": "24.hu Ziccer • Szakértői Vendég",
        "roleBadge": "★ 24.hu Kiemelt Vendég",
        "isSpotlight": true,
        "isPremium": false,
        "title": "24.hu Ziccer: Szoboszlait is elrontja Slot? – Balogh Martin a fantasy futballról és a gamifikációról",
        "lead": "Meghívott szakértő vendégként szerepeltem az ország egyik vezető független hírportálja, a 24.hu hivatalos futballműsorában, a Ziccerben. A 18:44-es blokkban (1124 mp) részletesen beszélgetünk a Fantasy Premier League robbanásáról, a digitális sportfogyasztásról, a gamifikáció mechanizmusairól és a modern szurkolói stratégiákról.",
        "date": "2025. október 20.",
        "isoDate": "2025-10-20",
        "readTime": "1:07:13 adás • 18:44-nél",
        "thumbnail": "assets/youtube/yt-24hu-ziccer.jpg",
        "youtubeId": "pG5gYTitEPw",
        "url": "https://www.youtube.com/watch?v=pG5gYTitEPw&t=1124s",
        "tags": [
            "24.hu",
            "Ziccer",
            "Vendégszereplés",
            "Fantasy Football",
            "Gamifikáció",
            "Szoboszlai",
            "Podcast"
        ]
    },
    {
        "id": "pod-guest-fantasybesztlig-206",
        "platform": "podcast",
        "subCategory": "guest",
        "platformLabel": "Fantasy Besztlíg • Vendég",
        "column": "Szakértői Vendégszereplés",
        "roleBadge": "★ Szakértői Vendég",
        "isPremium": false,
        "title": "Gameweek 8 előzetes kibeszélő: Wildcard 2024/25 legjobb magyar menedzserével (vendég: Balogh Martin) – 206. adás",
        "lead": "A 2024/25-ös szezon hivatalosan legjobb magyar Fantasy Premier League menedzserével (világranglista 12. helyezett Balogh Martin) elemzik a Gameweek 8-as szabadkártya (Wildcard) stratégiákat, a keretátalakítás kulcspontjait, a prémium játékosok és differenciálok egyensúlyát, valamint a bajnokság hosszú távú taktikai tervezését a Fantasy Besztlíg stúdiójában.",
        "date": "2025. október 16.",
        "isoDate": "2025-10-16",
        "readTime": "113 perc adás",
        "thumbnail": "assets/podcasts/fantasy-besztlig-206.jpg",
        "url": "https://open.spotify.com/episode/0tIb8QsrhWbxVlddB5pZ1p",
        "spotifyUrl": "https://open.spotify.com/episode/0tIb8QsrhWbxVlddB5pZ1p",
        "tags": [
            "Fantasy Besztlíg",
            "FPL",
            "Wildcard",
            "Vendégszereplés",
            "Fantasy Foci",
            "Premier League",
            "Szakértő"
        ]
    },
    {
        "id": "pod-edit-1000728578704",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. szeptember - Zsabej Edit Dominika, Kónya Zsófia, Abdulrahman Abdulrab Mohamed, Várnai Virág, Gombos Dániel, Koliger Zoltán",
        "lead": "(0:00) Bevezető – Bisztriczki Sára (2:31) Zsabej Edit Dominika, kárpátaljai pszichológus – KopaszHelga Nóra interjúja (14:16) Kónya Zsófia, gyorskorcsolyázó – Buchholcz Barnabásbeszélgetése (22:20) Abdulrahman Abdulrab Mohamed, a Pándy Kálmán Kórház gyermekorvosa – Örkényi Zoé Fanni int...",
        "date": "2025. szeptember 26.",
        "isoDate": "2025-09-26",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-09.jpg",
        "youtubeId": "3QE2CnJbOQ4",
        "url": "https://www.youtube.com/watch?v=3QE2CnJbOQ4",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-szeptember-zsabej-edit-dominika-k%C3%B3nya/id1539053555?i=1000728578704&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "yt-fpl",
        "platform": "youtube",
        "platformLabel": "YouTube Vendégszereplés",
        "column": "Nemzetközi Elemzés • FPL Világ #12",
        "isPremium": false,
        "title": "20x TOP 100 FPL GW1 Teams – Balogh Martin a világ 12. helyezettjeként (FPL Harry)",
        "lead": "A világ egyik legnagyobb elérésű Fantasy Premier League elemzője, FPL Harry videójában szerepeltem mint az előző szezon világ 12. legjobb menedzsere (több mint 11 millió játékosból). A videó 13:19-es blokkjában („World No.12 BB Team!”) Harry részletesen kielemzi a rendhagyó Gameweek 1-es Bench Boost draftomat, az egyensúlyi keretépítést és a korai chip-stratégiámat.",
        "date": "2025. augusztus 10.",
        "isoDate": "2025-08-10",
        "readTime": "21:41 perc adás • 13:19-nél",
        "thumbnail": "assets/youtube/yt-fpl-top12.jpg",
        "youtubeId": "sxOs0SkHmEo",
        "url": "https://www.youtube.com/watch?v=sxOs0SkHmEo&t=799s",
        "tags": [
            "Fantasy Premier League",
            "FPL Harry",
            "Világ 12. helyezett",
            "Stratégia",
            "Adatelemzés",
            "Futball"
        ]
    },
    {
        "id": "pod-edit-1000714712974",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. június - Az űr program kutatói, Német László bíboros, Bánhidi Bence válogatott kézilabdázó",
        "lead": "(0:00) Bevezető – Bisztriczki Sára(2:48) Tombácz Dóra docens és Prazsák István egyetemi adjunktus – Bodor Dóra interjúja(14:41) Német László, Szerbia első bíborosa – Bodor Dóra összeállítása(27:48) Bánhidi Bence, a Pick Szeged kézilabdázó csapat kapitánya – Bisztriczki Sára beszélgetése...",
        "date": "2025. június 26.",
        "isoDate": "2025-06-26",
        "readTime": "54 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-06.jpg",
        "youtubeId": "qObJQesbPi0",
        "url": "https://www.youtube.com/watch?v=qObJQesbPi0",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-j%C3%BAnius-az-%C5%B1r-program-kutat%C3%B3i-n%C3%A9met-l%C3%A1szl%C3%B3/id1539053555?i=1000714712974&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-edit-1000711694584",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. május - Penke Bence szinkronszínész, Olasz Anna hosszútávúszó, Tódor Marina kommunikációs tréner, Losonc Orsolya énekes, Mészáros Péter a Slam Poetry Magyarország elnökségi tagja, DUE",
        "lead": "(0:00) Bevezető – Bisztriczki Sára (2:28) Penke Bence szinkronszínész – Zsiga Gréta összeállítása (11:03) Olasz Anna ezüstérmes hosszútávúszó – Buchholcz Barnabás interjúja (20:36) Tódor Marina Gordon-kommunikációs tréner – Kopasz Helga Nóra beszélgetése (32:41) A vajdasági Act együttes...",
        "date": "2025. június 05.",
        "isoDate": "2025-06-05",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-05.jpg",
        "youtubeId": "imO1MI5AE88",
        "url": "https://www.youtube.com/watch?v=imO1MI5AE88",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-m%C3%A1jus-penke-bence-szinkronsz%C3%ADn%C3%A9sz-olasz/id1539053555?i=1000711694584&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-edit-1000707974480",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. április - Sulyán Alexa sprinter, Kenderessy-Szabó Áron Botond hallgató, Száz Krisztina és Kohlmann Péter SZTE Énekkar karnagyai, Gulyás Judit dentálhigiénikus, Törtei László zumbaedző",
        "lead": "(0:00) Bevezető – Bisztriczki Sára (2:05) Sulyán Alexa az ország leggyorsabb női sprintere - Buchholcz Barnabás beszélgetése (11:46) Kenderessy-Szabó Áron Botond, a szegedi bölcsészkar hallgatója - Borda Károly interjúja. (24:29) Száz Krisztina és Kohlmann Péter a Szegedi Egyetemi Énekk...",
        "date": "2025. május 11.",
        "isoDate": "2025-05-11",
        "readTime": "55 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-04.jpg",
        "youtubeId": "ipKNIBNKFbQ",
        "url": "https://www.youtube.com/watch?v=ipKNIBNKFbQ",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-%C3%A1prilis-suly%C3%A1n-alexa-sprinter-kenderessy/id1539053555?i=1000707974480&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-edit-1000701725629",
        "platform": "podcast",
        "subCategory": "editor",
        "platformLabel": "Kommcast • Vágó",
        "column": "Kommcast Magazin",
        "roleBadge": "✂️ Vágó & Utómunka",
        "isPremium": false,
        "title": "Kommcast 2025. március - Ács Dániel újságíró, Pintér Norbert festő, zenész, Vörös Valentin segélyhívó operátor és Róka László pszichoterapeuta",
        "lead": "(0:00) Bevezető - Bisztriczki Sára (2:25) Ács Dániel, a 444 újságírója - Kancz Mónika interjúja (12:43) Pintér Norbert, festő, zenész - Juhász Nikoletta beszélgetése (24:07) Vörös Valentin, segélyhívó operátor - Győri Viktória interjúja (32:46) Róka László, pszichoterapeuta - Tóth Viktó...",
        "date": "2025. április 01.",
        "isoDate": "2025-04-01",
        "readTime": "54 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2025-03.jpg",
        "youtubeId": "EuDpSV1ehBg",
        "url": "https://www.youtube.com/watch?v=EuDpSV1ehBg",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2025-m%C3%A1rcius-%C3%A1cs-d%C3%A1niel-%C3%BAjs%C3%A1g%C3%ADr%C3%B3-pint%C3%A9r-norbert/id1539053555?i=1000701725629&uo=4",
        "tags": [
            "Kommcast",
            "Vágás",
            "Utómunka",
            "SZTE",
            "Rádió"
        ]
    },
    {
        "id": "pod-rep-pelle-loffler",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Magazin",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "20 éve az Európai Unióban – Dr. Pelle Anita és Dr. Löffler Tibor docensek interjúja",
        "lead": "Magyarország uniós csatlakozásának 20. évfordulójára készült mélyfúrás: gazdasági integráció, politikai intézményrendszer és társadalmi mérleg az SZTE GTK és ÁJTK oktatóival. Elhangzott a Kommcast 2024. decemberi adásában [02:25]. Riporter: Balogh Martin.",
        "date": "2024. december 30.",
        "isoDate": "2024-12-30",
        "readTime": "15 perc blokk",
        "thumbnail": "assets/podcasts/kommcast-pelle-loffler.jpg",
        "youtubeId": "oYN7en4FbeQ",
        "url": "https://www.youtube.com/watch?v=oYN7en4FbeQ",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/kommcast-2024-december-h%C3%BAsz-%C3%A9ve-csatlakoztunk-az-eu/id1539053555?i=1000682113810",
        "tags": [
            "EU20",
            "Pelle Anita",
            "Löffler Tibor",
            "Gazdaságpolitika",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "pod-rep-csak-csajok",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Magazin",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "Biztonságos bulik és női közösségépítés – Zsidákovits Fanni, a Csak Csajok főszervezője",
        "lead": "Hogyan lehet biztonságos, felszabadult éjszakai szórakozást és támogató női közösséget teremteni? Zsidákovits Fannival beszélgettünk a mozgalom indulásáról és jövőjéről a Kommcast 2024. decemberi műsorában [17:41]. Riporterek: Balogh Martin és Zajcsek Odett.",
        "date": "2024. december 30.",
        "isoDate": "2024-12-30",
        "readTime": "12 perc blokk",
        "thumbnail": "assets/podcasts/kommcast-csak-csajok.jpg",
        "url": "https://podcasts.apple.com/us/podcast/kommcast-2024-december-h%C3%BAsz-%C3%A9ve-csatlakoztunk-az-eu/id1539053555?i=1000682113810",
        "tags": [
            "Csak Csajok",
            "Zsidákovits Fanni",
            "Közösség",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "pod-rep-bkk",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Különkiadás",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "A bliccelés lélektana és a közösségi közlekedés – Kovács Bendegúz, a BKK szóvivője",
        "lead": "Mélyinterjú a Budapesti Közlekedési Központ szóvivőjével: miért bliccelnek az utasok, milyen kísérleti jegyrendszerek jöhetnek, hogyan kezelik a pótdíjakat és milyen a korszerű közösségi közlekedés kommunikációja? Riporter: Balogh Martin.",
        "date": "2024. november 12.",
        "isoDate": "2024-11-12",
        "readTime": "15 perc adás",
        "thumbnail": "assets/podcasts/kommcast-bkk-yt.jpg",
        "youtubeId": "dyraHz9U8iU",
        "url": "https://www.youtube.com/watch?v=dyraHz9U8iU",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/vend%C3%A9g%C3%BCnk-kov%C3%A1cs-bendeg%C3%BAz-a-budapesti-k%C3%B6zleked%C3%A9si/id1539053555?i=1000676604619",
        "tags": [
            "BKK",
            "Kovács Bendegúz",
            "Közlekedés",
            "Budapest",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "pod-rep-2024-09",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Magazin",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "Kommcast 2024. szeptember – Évadnyitó magazin (Dénes Dorka, Tanyaszínház, Szuperbaktériumok)",
        "lead": "A 2024-es őszi évadnyitó nagyműsor: Dénes Dorka világbajnoki mérkőzése, legyőzhetetlen szuperbaktériumok elleni kutatások, a vándorló Vajdasági Tanyaszínház és a tanszék legendás operatőr-tanárának emléke. Műsorkészítő riporteri stáb: Berecz Blanka, Erdődi Csenge, Koszó Vivien, Balogh Martin.",
        "date": "2024. október 18.",
        "isoDate": "2024-10-18",
        "readTime": "53 perc adás",
        "thumbnail": "assets/podcasts/kommcast-2024-09.jpg",
        "url": "https://podcasts.apple.com/us/podcast/kommcast-2024-szeptember-d%C3%A9nes-dorka-a/id1539053555?i=1000673542295",
        "tags": [
            "Kommcast",
            "Tanyaszínház",
            "Dénes Dorka",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "pod-rep-2024-jun",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Magazin",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "Kommcast 2024. június – Nászút görkorival, Szendrői Csaba és az új KRESZ",
        "lead": "Nyárindító rádiós magazin rendhagyó történetekkel: nászút görkorcsolyával és kerékpárral, Szendrői Csaba (Elefánt), az új KRESZ-szabályozás dilemmái, valamint az Év Diákrádiósa díj ünneplése. Műsorkészítésben közreműködött: Balogh Martin.",
        "date": "2024. június 30.",
        "isoDate": "2024-06-30",
        "readTime": "54 perc adás",
        "thumbnail": "assets/podcasts/kommcast-main.jpg",
        "url": "https://podcasts.apple.com/us/podcast/kommcast-2024-j%C3%BAnius-n%C3%A1sz%C3%BAt-g%C3%B6rkorcsoly%C3%A1val-%C3%A9s-biciklivel/id1539053555?i=1000660691915",
        "tags": [
            "Kommcast",
            "Szendrői Csaba",
            "KRESZ",
            "DUE",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "pod-rep-2024-maj",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Magazin",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "Kommcast 2024. május – Új-Kaledóniában rekedt kutató, Vidu Pál és Tik-Tok Fanni néni",
        "lead": "Rádiós összeállítás egzotikus és megható témákkal: a szigetvilági polgárháborús zavargásokban rekedt magyar kutató drámája, Vidu Pál sportriporteri kulisszái és az autista gyerekeket segítő Fanni néni története. Műsorkészítésben közreműködött: Balogh Martin.",
        "date": "2024. május 30.",
        "isoDate": "2024-05-30",
        "readTime": "53 perc adás",
        "thumbnail": "assets/podcasts/kommcast-main.jpg",
        "url": "https://podcasts.apple.com/us/podcast/kommcast-2024-m%C3%A1jus-benne-%C3%BAj-kaled%C3%B3ni%C3%A1ban-rekedt-magyar/id1539053555?i=1000657273669",
        "tags": [
            "Kommcast",
            "Vidu Pál",
            "Új-Kaledónia",
            "TikTok",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "pod-rep-karotta",
        "platform": "podcast",
        "subCategory": "reporter",
        "platformLabel": "Kommcast • Riporter",
        "column": "Kommcast Különkiadás",
        "roleBadge": "🎙️ Riporter / Saját Anyag",
        "isPremium": false,
        "title": "Közveszélyes néma száguldozás vagy a jövő mobilitása? – Bazsó Gábor Karotta az elektromos autókról",
        "lead": "Exkluzív mélyinterjú a Totalcar főmunkatársával, Bazsó Gábor Karottával. Milyen jövő előtt állnak a villanyautók, milyen gyárat épít a BYD Szegeden, hiányozni fog-e a belsőégésű motorok hangja, és mit gondol az akkumulátorgyártásról? Riporter: Balogh Martin.",
        "date": "2024. május 29.",
        "isoDate": "2024-05-29",
        "readTime": "24 perc adás",
        "thumbnail": "assets/podcasts/kommcast-karotta-yt.jpg",
        "youtubeId": "9GD0oSlTzak",
        "url": "https://www.youtube.com/watch?v=9GD0oSlTzak",
        "applePodcastUrl": "https://podcasts.apple.com/us/podcast/k%C3%B6zvesz%C3%A9lyes-n%C3%A9ma-sz%C3%A1guldoz%C3%A1s-vagy-a-j%C3%B6v%C5%91/id1539053555?i=1000657191077",
        "tags": [
            "Karotta",
            "Totalcar",
            "BYD",
            "Elektromos Autó",
            "SZTE",
            "Riporter"
        ]
    },
    {
        "id": "yt-03",
        "platform": "youtube",
        "platformLabel": "YouTube Szakértői Interjú",
        "column": "Politika & EU",
        "isPremium": false,
        "title": "20 Éve Az Európai Unióban - Beszélgetés Pelle Anita és Löffler Tibor Szakértőkkel",
        "lead": "Szakértői mélyinterjú és kerekasztal-beszélgetés Magyarország 20 éves Európai Uniós tagságának (2004–2024) gazdasági és politikai mérlegéről. Vendégek: Dr. Pelle Anita (SZTE Gazdaságtudományi Kar docense) és Dr. Löffler Tibor (SZTE Állam- és Jogtudományi Kar docense).",
        "date": "2024. tavasz",
        "isoDate": "2024-05-01",
        "readTime": "15:00 perc • 100+ megtekintés",
        "thumbnail": "assets/youtube/yt-03.jpg",
        "youtubeId": "oYN7en4FbeQ",
        "url": "https://www.youtube.com/watch?v=oYN7en4FbeQ",
        "tags": [
            "Európai Unió",
            "Dr. Pelle Anita",
            "Dr. Löffler Tibor",
            "SZTE",
            "Gazdaságpolitika",
            "Interjú"
        ]
    },
    {
        "id": "yt-02",
        "platform": "youtube",
        "platformLabel": "YouTube Hardverteszt",
        "column": "Hardver & Stúdiótechnika",
        "isPremium": false,
        "title": "Stúdió minőség töredék áron? - Maono PD400X mikrofon teszt",
        "lead": "Részletes, gyakorlati teszt a Maono PD400X dinamikus XLR/USB mikrofonról. Hangminta-összehasonlítás, podcastereknek és tartalomgyártóknak szóló beállítások, beépített DSP szoftveres EQ és ár-érték arány elemzés.",
        "date": "2024. február 15.",
        "isoDate": "2024-02-15",
        "readTime": "15:18 perc • 260+ megtekintés",
        "thumbnail": "assets/youtube/yt-02.jpg",
        "youtubeId": "IvXxUCY1-Ro",
        "url": "https://www.youtube.com/watch?v=IvXxUCY1-Ro",
        "tags": [
            "Mikrofon Teszt",
            "Maono PD400X",
            "Audió",
            "Hardver",
            "Podcasting"
        ]
    }
];

