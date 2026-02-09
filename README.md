# Valentine's Day Website 💕

A beautiful, responsive Valentine's Day website with interactive features and romantic imagery. Perfect for celebrating love and creating personalized Valentine cards.

## 🚀 GitHub Pages Deployment

This website is ready for GitHub Pages deployment! Follow these steps:

### Quick Deploy to GitHub Pages

1. **Create a new repository** on GitHub named `username.github.io` (replace `username` with your GitHub username)

2. **Push your files** to the repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click "Save"

4. **Visit your site** at `https://username.github.io`

### Alternative: Project Pages

If you want to deploy to a project repository (not username.github.io):

1. Create a repository named `valentines-day-website`
2. Push files to the repository
3. Enable GitHub Pages as above
4. Visit `https://username.github.io/valentines-day-website`

## Features

- 🎨 **Beautiful Design**: Romantic color scheme with gradient backgrounds and smooth animations
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🖼️ **Image Gallery**: Interactive gallery with lightbox functionality using personal images
- 💝 **Message Creator**: Create personalized Valentine cards with custom messages
- ✨ **Interactive Elements**: Floating hearts, confetti effects, and smooth animations
- 🎯 **No Backend Required**: Pure frontend implementation using HTML, CSS, and JavaScript
- 🖼️ **Personal Images**: Uses your own images (1.png - 9.png) for gallery and backgrounds

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: Interactive features and functionality
- **Google Fonts**: Beautiful typography (Dancing Script & Poppins)

## File Structure

```
valentines-day-website/
├── index.html          # Main HTML file
├── styles.css          # Complete styling with responsive design
├── script.js           # Interactive JavaScript features
├── images/             # Personal images folder
│   ├── 1.png          # Hero background image
│   ├── 2.png          # Gallery image
│   ├── 3.png          # Gallery image
│   ├── 4.png          # Hero background image (user changed)
│   ├── 5.png          # Gallery image
│   ├── 6.png          # Gallery image
│   ├── 7.png          # Footer background image
│   ├── 8.png          # Gallery image
│   └── 9.png          # Gallery image
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Getting Started

1. **Clone or download** the repository
2. **Open `index.html`** in your web browser
3. **Enjoy the website!** No installation or setup required

## Customization

### Changing Images
Replace the images in the `images/` folder:
- **1.png**: Hero section background
- **4.png**: Alternative hero background (currently used)
- **7.png**: Footer background
- **2.png, 3.png, 5.png, 6.png, 8.png, 9.png**: Gallery images

### Modifying Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #ffe0f0;
}
```

### Adding New Messages
Add new message cards in the HTML:
```html
<div class="message-card">
    <div class="message-icon">💕</div>
    <h3>Your Title</h3>
    <p>Your message here...</p>
</div>
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lazy Loading**: Images load as needed
- **Optimized Animations**: CSS transforms for smooth performance
- **Minimal Dependencies**: No external libraries required
- **Fast Loading**: Lightweight and optimized for speed

## Accessibility

- Semantic HTML5 structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast text for readability
- Responsive design for all devices

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

---

Made with ❤️ for Valentine's Day 2026 by ketan
