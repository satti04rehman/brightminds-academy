# BrightMinds Academy

A four-page coaching and skills academy site with program/fee listings and an admission enquiry form.

**Live:** https://brightminds-academy-green.vercel.app

Source code is in this repo — hand-written HTML/CSS/vanilla JS, no build step. Serve the folder locally (see below).

## About

BrightMinds Academy is a demo education site: a four-page build for a Lahore coaching and skills hub covering academic coaching, modern skills and language programs. Pages cover the homepage, the full program and fee list, the teaching approach and facilities, and an admissions page whose enquiry form composes an email. There is no backend — the form hands its content to the visitor's mail client.

## Tech stack

| | |
|---|---|
| Markup | HTML5, four pages |
| Styling | `css/style.css`, CSS custom properties, `clamp()` type scale |
| Script | `js/main.js` — vanilla JS (ES6+ arrow functions, `IntersectionObserver`, `requestAnimationFrame`), no dependencies |
| Fonts | Google Fonts |
| Images | **None.** Text and CSS-only design with an SVG favicon — no photography by design |
| Build | None. No `package.json`, no dependencies |
| Hosting | Vercel, static hosting |

## Features

Everything below is implemented in the repo.

- **Four pages** — `index.html`, `programs.html`, `why-us.html`, `apply.html` — sharing one stylesheet and one script.
- **Program and fee listings** — programs broken down with schedules and monthly fees in Rs.
- **Admission enquiry form** (`#applyForm`) — collects student, grade, program, parent/guardian, phone and notes, then opens a pre-filled email with the enquiry formatted as labelled lines. The form is `novalidate` with `required` fields, so submission is handled entirely in the script.
- **Count-up statistics** — figures animate from 0 to their `data-count` target with an ease-out cubic curve when scrolled into view.
- **Scroll progress bar** and **reveal-on-scroll** via `IntersectionObserver`.
- **Staggered reveals** — grid children are given an incremental `transition-delay`, so cards animate in sequence rather than all at once.
- **Hero parallax** — a decorative layer translates on scroll, throttled through `requestAnimationFrame`.
- **Cursor spotlight** — cards track the pointer and expose `--mx` / `--my` custom properties for a radial highlight.
- **Mobile navigation** — body-level `nav-open` class with `aria-expanded` kept in sync.
- **Accordion FAQ** on the admissions page, built with native `<details>` / `<summary>` — no JavaScript needed.
- **Accessibility / motion** — `prefers-reduced-motion: reduce` disables parallax, spotlight and count-up animation and renders the final numbers immediately.
- **Responsive** — breakpoints at 960px and 600px.

## Project structure

```
.
├── index.html        # homepage
├── programs.html     # programs + fees
├── why-us.html       # approach, mentors, facilities
├── apply.html        # admissions + enquiry form
├── css/
│   └── style.css
├── js/
│   └── main.js
├── favicon.svg
├── .gitignore        # ignores .vercel
└── .vercel/          # Vercel project link (projectName: brightminds-academy)
```

## Local preview

No install step. The pages cross-link each other and load `css/` and `js/` by relative path, so serve them over HTTP:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- **Practice build.** The academy, its programs, fees, mentors, results and testimonials are sample content written for the demo — not a real institution and not a delivered client project.
- The site uses no photographs. Every visual is type, colour and CSS; the only asset is the favicon.
- The enquiry form has no backend; delivery is via `mailto:`. Swapping it for a real endpoint means replacing the `window.open("mailto:...")` call in `js/main.js`.
