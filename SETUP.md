# button'd Website Setup

## Adding Your Images

To complete the website, you need to add your actual images:

1. **Logo Image** (`public/logo.png`)
   - Replace the placeholder file with your button'd logo (the one with the stylized text and button character)
   - Recommended size: 400x400px or larger (square format)
   - Format: PNG with transparent background preferred

2. **Mascot Image** (`public/mascot.png`)
   - Replace the placeholder file with your button character mascot (the one holding a briefcase)
   - Recommended size: 256x256px or larger (square format)
   - Format: PNG with transparent background preferred

## Running the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Features

- ✨ Modern, responsive design
- 🎨 Purple/pink gradient theme matching your brand
- 📱 Mobile-friendly navigation
- 🔗 Smooth scrolling to sections
- 💼 Services showcase
- 📧 Contact information
- 🎯 SEO optimized

## Sections

1. **Hero** - Main landing with logo and call-to-action
2. **Mascot** - Features your button character
3. **Services** - Graphic Design, Brand Strategy, Digital Design, UX/UI
4. **About** - Your story and background
5. **Gallery** - Portfolio showcase
6. **Contact** - Email and phone contact options

## Customization

You can customize colors, content, and styling in:
- `app/page.tsx` - Main page content
- `app/globals.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration

