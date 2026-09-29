# Priya Maurya: Portfolio

A static site (plain HTML, CSS and JavaScript). No build step.

```
priya-portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── favicon.svg
    ├── images/
    │   └── ...              photo, project screenshots, link preview
    └── resume/
        └── Priya_Maurya_Full_Stack_Developer.pdf
```

## Images (all in `assets/images/`)

| File | Source |
|---|---|
| `profile.jpg` | Her photo, cropped square above the ID card |
| `cafe-cold.webp` | CafeCold admin dashboard |
| `og-roti.webp` | OG Roti enterprise dashboard (admin email cropped out) |
| `shiqu.webp` | SHIQU operations dashboard |
| `bandhanguru.webp` | Screenshot of https://bandhanguru.com |
| `job-portal.webp` | Screenshot of https://job-portal.volvrit.org |
| `og-image.png` | Link preview for LinkedIn / WhatsApp |

To replace one, save the new file with the same name. If a file is missing, its slot shows a placeholder with the project name.

## Put it live on GitHub Pages

1. Create a public repository (for example `portfolio`) on the GitHub account the site should live on.
2. Upload everything inside this folder to the repository root.
3. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
4. The site appears at `https://<username>.github.io/<repository>/`.

Live at https://priya-uk04.github.io/myportfolio/ (the link preview and canonical URL already point there).

Run locally: `python -m http.server 8000` in this folder, then open http://localhost:8000.
