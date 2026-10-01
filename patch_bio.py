import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_bio = """Független újságíró, médiaalkotó és az SZTE Kommunikáció- és médiatudomány szakos hallgatója. Portfólióm a prémium gazdasági- és tech-újságírástól a professzionális sportelemzésig, illetve a komplex vágói feladatokig terjed. Külsős szerzőként rendszeresen publikálok a <strong>HVG</strong> és a <strong>hvg360</strong> felületein, saját <strong>YouTube</strong> csatornámon önálló műsorokat készítek, a <strong>Kommcast</strong> podcastnak pedig állandó riportere és vágója vagyok. A 2024/25-ös Premier League fantasy (FPL) szezon legjobb magyarjaként (világranglista 12. hely) futballszakértőként vendégeskedtem a <strong>24.hu Ziccer</strong> műsorában, a <strong>Fantasy Besztlígben</strong>, és nemzetközi videókban is."""

content = re.sub(
    r'<p class="author-bio">\s*.*?\s*</p>',
    f'<p class="author-bio">\n                {new_bio}\n            </p>',
    content,
    flags=re.DOTALL
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
