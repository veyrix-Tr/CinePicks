# CinePicks

A modern, responsive movie discovery web application built with React and Vite. CinePicks provides an immersive cinematic experience for browsing and exploring movies with detailed information, genre filtering, and streaming service integration.

## Features

### Core Functionality
- **Movie Discovery**: Browse a curated collection of critically acclaimed and popular movies
- **Genre Filtering**: Filter movies by genre including Action, Crime, Drama, Sci-Fi, Thriller, Fantasy, and Mystery
- **Detailed Movie Information**: View comprehensive movie details including synopsis, year, and genre
- **Streaming Service Integration**: Direct links to major streaming platforms (Netflix, Prime Video, Disney+, Hulu)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Interface
- **Cinematic Theme**: Dark, immersive design with gradient effects and smooth animations
- **Live Background**: Dynamic animated background for enhanced visual appeal
- **Interactive Movie Cards**: Hover effects and detailed information display
- **Modal Detail View**: Full-screen overlay with comprehensive movie information
- **Smooth Transitions**: Professional animations and micro-interactions

### Technical Features
- **Component-Based Architecture**: Modular React components for maintainability
- **State Management**: Efficient React state handling for user interactions
- **CSS Grid & Flexbox**: Modern layout techniques for responsive design
- **Cross-Browser Compatibility**: Optimized for modern web browsers
- **Performance Optimized**: Fast loading and smooth interactions

## Technology Stack

### Frontend Framework
- **React 19.2.0**: Modern React with latest features and optimizations
- **Vite 7.2.4**: Fast build tool and development server
- **JavaScript ES6+**: Modern JavaScript features and syntax

### Styling
- **CSS3**: Advanced CSS with animations, gradients, and transitions
- **CSS Grid & Flexbox**: Modern layout systems
- **Custom Properties**: CSS variables for consistent theming
- **Responsive Design**: Mobile-first approach with media queries

### Development Tools
- **ESLint**: Code quality and consistency enforcement
- **React Icons**: Professional icon library
- **Vite Plugin React**: Optimized React development experience

## Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/veyrix-Tr/cinepicks.git
   cd cinepicks
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   Navigate to `http://localhost:5173` in your web browser

## Usage

### Browsing Movies
- The homepage displays a grid of movie posters with basic information
- Scroll through the collection to discover new movies
- Each movie card shows the title, genre, year, and a brief description

### Filtering by Genre
- Use the genre filter buttons at the top of the page
- Select a genre to view only movies from that category
- Click "All" to reset the filter and show all movies

### Viewing Movie Details
- Click on any movie card to open the detailed view
- The detail view displays:
  - High-resolution movie poster
  - Full movie title and year
  - Genre badges
  - Extended movie description
  - Streaming service links
  - Watch Now button with direct streaming access

### Navigation
- **Close Detail View**: Click the X button, click outside the modal, or press Escape key
- **Scrolling**: Use mouse wheel or touch gestures to navigate through movie collections
- **Responsive**: Interface adapts to different screen sizes automatically

## Project Structure

```
cinepicks/
├── public/                 # Static assets and movie posters
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx     # Application header with title
│   │   ├── GenreFilter.jsx # Genre filtering functionality
│   │   ├── MovieList.jsx  # Movie grid display
│   │   ├── MovieCard.jsx  # Individual movie card component
│   │   ├── MovieDetail.jsx # Movie detail modal
│   │   ├── Footer.jsx     # Application footer
│   │   └── LiveBackground.jsx # Animated background
│   ├── styles/            # CSS stylesheets
│   │   ├── Header.css     # Header styling
│   │   ├── GenreFilter.css # Filter button styles
│   │   ├── MovieList.css  # Movie grid layout
│   │   ├── MovieCard.css  # Movie card styling
│   │   ├── MovieDetail.css # Detail modal styles
│   │   └── Footer.css     # Footer styling
│   ├── data/              # Application data
│   │   └── movies.js      # Movie database and genres
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── dist/                  # Build output directory
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Data Management

### Movie Database
- Movies are stored in `src/data/movies.js` as a JavaScript array
- Each movie entry includes:
  - Unique identifier (id)
  - Title and release year
  - Genre classification
  - Detailed description
  - Poster image reference

### Genre System
- Genres are defined as an array for filtering functionality
- Currently supports: All, Action, Crime, Drama, Sci-Fi, Thriller, Fantasy, Mystery
- Easily extensible for additional genres

## Customization

### Adding New Movies
1. Open `src/data/movies.js`
2. Add new movie objects to the movies array
3. Include poster images in the `public/` directory
4. Update genres array if adding new categories

### Styling Customization
- Modify CSS files in `src/styles/` directory
- Use CSS custom properties for consistent theming
- Responsive breakpoints defined in each component stylesheet

### Component Modification
- React components are modular and independently maintainable
- Props-based data passing for component communication
- State management handled at appropriate component levels

## Build and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Optimized Images**: Movie posters are compressed for fast loading
- **Lazy Loading**: Components load as needed for better performance
- **Efficient Rendering**: React optimization techniques implemented
- **Minimal Dependencies**: Lightweight dependency footprint
- **CSS Optimization**: Efficient styling with minimal reflows

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Movie poster images and data are used for demonstration purposes
- Streaming service links redirect to official platforms
- Icons provided by React Icons library
- Built with modern web technologies and best practices

## Contact

For questions, suggestions, or contributions, please contact the project maintainer.

---

CinePicks - Your gateway to cinematic discovery.
