import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Header link
content = re.sub(
    r'<a href="mailto:baloghmartin@icloud\.com" class="btn-contact">',
    r'<a href="#" class="btn-contact protected-contact" data-u="baloghmartin" data-d="icloud.com">',
    content
)

# Replace Author banner & Footer links
content = re.sub(
    r'<a href="mailto:baloghmartin@icloud\.com" class="social-pill email" title="E-mail küldése">\s*<svg[^>]*>.*?</svg>\s*baloghmartin@icloud\.com\s*</a>',
    r'<a href="#" class="social-pill email protected-contact" data-u="baloghmartin" data-d="icloud.com" title="E-mail küldése">\n                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\n                    <span class="protected-email-text">E-mail</span>\n                </a>',
    content,
    flags=re.DOTALL
)

with open('index.html', 'w') as f:
    f.write(content)
