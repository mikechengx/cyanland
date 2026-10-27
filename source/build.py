from pathlib import Path
root=Path(__file__).resolve().parent
parts=['geometry.js','environment.js','coast-landmarks.js','cities.js','atmosphere.js','shaders.js','renderers.js','i18n.js','ui.js','app.js']
code='\n'.join((root/name).read_text() for name in parts)
html=(root/'ui.html').read_text().replace('/*CYAN_CODE*/',code)
html=html.replace('content="2026.10.27.v5-preview"','content="2026.10.27.v5"').replace('<span class="preview-badge">本地预览</span>','')
(root.parent/'index.html').write_text(html)
print('Built Cyanland index.html')
