# PastPerfect - AI Image & Video Enhancement

A free, open-source web app for AI-powered image and video upscaling and restoration. Built with modern web technologies and designed to be accessible to everyone.

## What it does

- **Upscales** low-resolution images and videos up to 4x
- **Restores** old, damaged photos and videos
- **Enhances** quality using state-of-the-art AI models
- **Completely free** - no watermarks, no limits, no catch

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Sliders**: Swiper.js
- **File Upload**: React Dropzone

## Quick Start

```bash
# Clone and install
git clone <your-repo>
cd frontend
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Layout.tsx      # Main layout wrapper
│   ├── BeforeAfterSlider.tsx  # Image comparison slider
│   └── TestimonialsSlider.tsx # Customer testimonials
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   └── UpscalerPage.tsx # Main upscaling interface
├── lib/                # Utilities
│   └── utils.ts        # Helper functions
└── App.tsx             # Main app with routing
```

## Features

### Homepage
- Hero section with before/after slider
- Interactive image comparison examples
- How it works guide
- Feature highlights
- Customer testimonials
- FAQ section
- Donation links

### Upscaler Interface
- Drag & drop file upload
- Real-time preview
- Customizable enhancement settings
- Advanced options (collapsible)
- Progress tracking
- Download enhanced files

## Customization

### Colors & Theme
The app uses a dark theme with orange accents. Main colors:
- Primary: `orange-500` to `red-500` gradient
- Background: `slate-900` to `slate-800` gradient
- Cards: `slate-800` with `slate-700` borders

### Content
Update text content in:
- `src/pages/HomePage.tsx` - Landing page copy
- `src/components/TestimonialsSlider.tsx` - Customer reviews
- `src/components/Header.tsx` & `Footer.tsx` - Site info

### Images
Replace placeholder images in `public/`:
- `sample-before-1.jpg` / `sample-after-1.jpg`
- `sample-before-2.jpg` / `sample-after-2.jpg`

## API Integration

The frontend is ready for backend integration. Update `handleProcess()` in `UpscalerPage.tsx`:

```typescript
const handleProcess = async () => {
  const formData = new FormData()
  formData.append('file', uploadedFile.file)
  formData.append('settings', JSON.stringify(settings))
  
  const response = await fetch('/api/enhance', {
    method: 'POST',
    body: formData
  })
  
  const result = await response.json()
  setProcessedFile(result.downloadUrl)
}
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repo
2. Vercel auto-detects Vite config
3. Deploy with one click

### Other Platforms
The `dist/` folder contains static files ready for any hosting service.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a PR

## License

MIT License - feel free to use this for your own projects.

## Support

- **Issues**: Create a GitHub issue
- **Email**: contact@pastperfect.ai
- **Donations**: Help keep the servers running

---

Built by a solo developer who believes AI should be accessible to everyone. If this helps you, consider supporting the project! 🚀
