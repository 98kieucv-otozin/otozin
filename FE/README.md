# Next.js + Tailwind CSS Project

A modern, responsive web application built with Next.js 15, TypeScript, and Tailwind CSS. Features a sophisticated mega menu navigation system with mobile responsiveness and comprehensive performance optimizations.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive mega menu
- **Component-Based Architecture**: Well-organized, reusable components
- **Custom Hooks**: Reusable logic for complex interactions
- **Type Safety**: Full TypeScript support with proper type definitions
- **Performance Optimized**: Built with Next.js App Router for optimal performance
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Accessibility**: WCAG compliant with skip links and focus management
- **PWA Ready**: Progressive Web App support with manifest
- **Error Handling**: Error boundaries and graceful error recovery
- **Analytics**: Built-in performance monitoring and user analytics
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Optimization**: Code splitting and tree shaking

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with optimizations
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header with mega menu
│   │   └── Footer.tsx    # Site footer
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Features.tsx  # Features section
│   │   └── Stats.tsx     # Statistics section
│   └── ui/               # UI components
│       ├── OptimizedImage.tsx    # Image optimization component
│       ├── Skeleton.tsx          # Loading skeleton components
│       ├── ErrorBoundary.tsx     # Error handling component
│       ├── SEO.tsx               # SEO meta tags component
│       └── Accessibility.tsx     # Accessibility components
├── hooks/                # Custom React hooks
│   ├── useMegaMenu.ts    # Mega menu state management
│   ├── usePerformance.ts # Performance monitoring
│   └── useAnalytics.ts   # Analytics tracking
├── constants/            # Application constants
│   └── menuData.ts       # Mega menu data
├── types/                # TypeScript type definitions
│   └── index.ts          # Global types and interfaces
└── utils/                # Utility functions
    └── index.ts          # Common utility functions
public/
├── manifest.json         # PWA manifest
├── favicon.ico          # Site favicon
└── icons/               # PWA icons
```

## 🎯 Key Components

### Header Component (`src/components/layout/Header.tsx`)
- Responsive navigation with mega menu
- Mobile hamburger menu
- Click outside to close functionality
- Hover and click interactions
- Analytics tracking for menu interactions

### Mega Menu Features
- 6-column layout on desktop
- 2-column layout on mobile
- Smooth transitions and animations
- Organized by categories:
  - HÃNG XE (Car Makes)
  - KIỂU XE (Car Types)
  - GIÁ XE (Price Ranges)
  - NHIÊN LIỆU (Fuel Types)
  - NĂM SẢN XUẤT (Manufacturing Years)
  - GIẢM GIÁ (Discounts)

### Performance Components
- **OptimizedImage**: Next.js Image with lazy loading and blur effects
- **Skeleton**: Loading states for better UX
- **ErrorBoundary**: Graceful error handling
- **SEO**: Comprehensive meta tags management
- **Accessibility**: Skip links and focus management

### Custom Hooks
- **useMegaMenu**: Manages mega menu state and interactions
- **usePerformance**: Monitors app performance metrics
- **useAnalytics**: Tracks user interactions and events

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-tailwind-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Performance Optimizations

### Build Optimizations
```bash
# Analyze bundle size
npm run analyze

# Type checking
npm run type-check

# Format code
npm run format

# Run tests
npm run test
```

### Performance Features
- **Image Optimization**: WebP/AVIF formats with lazy loading
- **Code Splitting**: Automatic bundle splitting for optimal loading
- **Tree Shaking**: Unused code elimination
- **Caching**: Optimized cache headers for static assets
- **Compression**: Gzip compression enabled
- **PWA Support**: Service worker and manifest for offline support

### Monitoring
- Performance metrics tracking (TTFB, DOM load, etc.)
- User interaction analytics
- Error tracking and reporting
- Bundle size analysis

## 🎨 Customization

### Colors
The project uses a custom red color scheme:
- Primary: `#FF2400` (Scarlet Red)
- Applied to header background and hover states

### Mega Menu Data
Edit `src/constants/menuData.ts` to modify menu items:
```typescript
export const MEGA_MENU_DATA = {
  carMakes: ['VinFast', 'Toyota', ...],
  carBodyTypes: ['Sedan', 'SUV', ...],
  // ... other categories
};
```

### Styling
- Uses Tailwind CSS for styling
- Custom CSS classes in `src/app/globals.css`
- Responsive design with mobile-first approach

## 📱 Responsive Design

- **Desktop**: Full mega menu with 6 columns
- **Mobile**: Collapsible hamburger menu with 2-column mega menu
- **Tablet**: Responsive breakpoints for optimal viewing
- **PWA**: Installable app experience

## 🔧 Development

### Adding New Components
1. Create component in appropriate directory under `src/components/`
2. Export as default function
3. Import and use in pages

### Adding New Hooks
1. Create hook in `src/hooks/` directory
2. Follow naming convention: `use[FeatureName].ts`
3. Export hook function

### Type Definitions
- Add new types in `src/types/index.ts`
- Use TypeScript interfaces for better type safety

### Testing
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically with optimizations

### Other Platforms
- Build: `npm run build`
- Start: `npm start`

### Performance Checklist
- [ ] Bundle analysis completed
- [ ] Images optimized
- [ ] SEO meta tags configured
- [ ] PWA manifest updated
- [ ] Error boundaries implemented
- [ ] Analytics configured
- [ ] Accessibility tested

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

## 🔍 Performance Monitoring

The app includes built-in performance monitoring:
- Page load times
- User interaction tracking
- Error reporting
- Bundle size analysis

Monitor performance in the browser console or integrate with external analytics services.
