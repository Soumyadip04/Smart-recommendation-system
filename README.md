# CineMatch - Smart Movie Recommendations

A modern React application that provides personalized movie recommendations based on user ratings and preferences. Built with Vite, React, Tailwind CSS, Framer Motion, and Radix UI components.

## Features

- 🎬 **Movie Rating System**: Rate movies with an intuitive 5-star rating system
- 🔍 **Advanced Search & Filter**: Search movies by title and filter by genre categories
- 🧠 **Smart AI Recommendations**: Intelligent recommendation engine based on your rating patterns and genre preferences
- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations and transitions
- 💾 **Persistent Storage**: Your ratings and preferences are saved locally in your browser
- ➕ **Add Movies**: Admin functionality to add new movies to the database
- 🌟 **Interactive Components**: Hover effects, loading states, and toast notifications
- 📱 **Mobile Responsive**: Optimized for all device sizes

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Smart-recommend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Rate Movies**: Click on the stars below any movie to rate it (1-5 stars)
2. **Get Recommendations**: After rating a few movies, you'll see personalized recommendations appear
3. **Search & Filter**: Use the search bar to find specific movies or filter by genre categories
4. **Toggle Recommendations**: Show/hide your personalized recommendations section
5. **Add Movies** (Admin): Access admin functionality to add new movies to the database
6. **View Details**: Click on movie cards to view detailed information

## Recommendation Algorithm

The smart recommendation system uses a hybrid approach:

1. **Genre-Based Filtering**: Analyzes your rating patterns across different genres
2. **Rating Weight Calculation**: Calculates average ratings per genre you've rated
3. **Score Computation**: Combines movie's IMDb rating with your genre preferences
4. **Randomization Factor**: Adds slight randomness to ensure variety in recommendations
5. **Top Results**: Returns the top 6 highest-scored unrated movies

The algorithm learns from your preferences and becomes more accurate as you rate more movies.

## Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Production-ready motion library for React
- **Radix UI** - Low-level UI primitives and accessible components
- **Lucide React** - Beautiful, customizable SVG icons
- **React Router DOM** - Client-side routing
- **React Helmet** - Document head management

### Backend Integration
- **Supabase** - Backend-as-a-Service for database and authentication
- **Express.js** - Web application framework for Node.js
- **JSON Web Tokens** - Secure authentication tokens
- **CORS** - Cross-Origin Resource Sharing middleware

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS & Autoprefixer** - CSS post-processing
- **Concurrently** - Run multiple npm commands simultaneously
- **Nodemon** - Development server auto-restart

## Project Structure

```
src/
├── components/                    # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── button.jsx           # Custom button component
│   │   ├── input.jsx            # Form input components
│   │   ├── toast.jsx            # Toast notification system
│   │   ├── toaster.jsx          # Toast container
│   │   └── use-toast.js         # Toast hook functionality
│   ├── Admin.jsx                 # Admin dashboard component
│   ├── AdminLogin.jsx           # Admin authentication
│   ├── AdminSignup.jsx          # Admin registration
│   ├── Details.jsx              # Movie details modal
│   ├── GettingStarted.jsx       # Onboarding component
│   ├── Header.jsx               # Main navigation header
│   ├── MovieCard.jsx            # Individual movie card
│   ├── MoviesGrid.jsx           # Movie grid layout
│   ├── NotFound.jsx             # 404 error page
│   ├── Recommendations.jsx      # Recommendation section
│   └── SearchAndFilter.jsx      # Search and filter controls
├── data/
│   └── movies.js                # Sample movie dataset
├── hooks/
│   ├── useAdmin.js              # Admin authentication hook
│   └── useMovieRatings.js       # Movie rating management hook
├── lib/
│   ├── recommendation.js        # AI recommendation algorithm
│   ├── supabase.js             # Supabase client configuration
│   └── utils.js                # Utility functions
├── App.jsx                      # Main application component
├── index.css                    # Global styles and Tailwind imports
└── main.jsx                     # React application entry point

# Root files
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## Environment Variables

The application supports environment variables for configuration. Create a `.env` file in the root directory:

```env
# Supabase Configuration (Optional)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Other configurations as needed
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Key Features Explained

### Smart Recommendations
- Uses machine learning-inspired algorithms
- Analyzes your rating patterns
- Considers genre preferences and movie popularity
- Provides diverse recommendations to avoid echo chambers

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Smooth animations with Framer Motion
- Accessible components using Radix UI
- Dark gradient theme optimized for movie browsing

### Data Persistence
- Local storage for user ratings
- Persistent movie database
- Admin capabilities for content management

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling consistency
- Ensure components are accessible and responsive
- Add proper error handling and loading states
- Write meaningful commit messages

## Acknowledgments

- Movie data sourced from various public APIs
- UI inspiration from modern streaming platforms
- Icons provided by Lucide React
- Images sourced from Unsplash

## License

This project is open source and available under the [MIT License](LICENSE).

