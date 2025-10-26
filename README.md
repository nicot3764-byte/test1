# Note Taking App (Modern Dark Theme)

A lightweight, client-side note-taking app built with HTML, CSS, and JavaScript. Features a modern dark theme, autosave to localStorage, tagging, search, pinning, and keyboard shortcuts.

## Features
- Create, edit, and delete notes
- Pin/unpin important notes
- Tag notes with #hashtags and filter by tag
- Instant search across titles and content
- Autosave to browser localStorage (no server required)
- Responsive layout and accessible controls
- Keyboard shortcuts: N (new), / (search), Ctrl+S (save)

## Project Structure
- index.html — App layout and containers
- styles.css — Modern dark theme and responsive styles
- script.js — App logic: CRUD, search, tags, persistence
- README.md — This documentation

## Getting Started
1. Clone the repo
   git clone https://github.com/nicot3764-byte/test1.git
   cd test1
2. Open index.html in your browser to use locally
   Or run a simple server for best results:
   - Python 3: python -m http.server 8000
   - Node (serve): npx serve .

## Enable GitHub Pages (to get a live URL)
1. Go to Settings > Pages in this repository
2. Under "Build and deployment", choose "Deploy from a branch"
3. Select Branch: main, Folder: /root, then click Save
4. After a minute, your site will be live at:
   https://nicot3764-byte.github.io/test1/

## Deployment Notes
- This app is fully static; no backend needed
- Data is stored in localStorage per browser/device
- Clearing site data or using private mode will reset notes

## Privacy
All notes stay on your device. No data leaves your browser.

## License
MIT License
