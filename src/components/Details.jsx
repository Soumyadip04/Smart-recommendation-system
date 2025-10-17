import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useMovies } from '@/hooks/useMovies';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Details() {
  const { id } = useParams();
  const { findById, movies } = useMovies();
  const movie = findById(id);

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <p>Try returning to the home page.</p>
      </div>
    );
  }

  const similar = movies.filter(m => m.genre === movie.genre && m.id !== movie.id).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{movie.title} - Details</title>
        <meta name="description" content={movie.description} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.description} />
        <meta property="og:image" content={movie.image ? movie.image : PLACEHOLDER_IMAGE} />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="relative">
          <img
            src={movie.image || PLACEHOLDER_IMAGE}
            alt={movie.title}
            className="w-full rounded-xl shadow-lg object-cover"
            loading="lazy"
            decoding="async"
            srcSet={movie.image && movie.image.includes('picsum.photos') ? `${movie.image} 400w, ${movie.image.replace('/400/600', '/800/1200')} 800w` : movie.image ? `${movie.image.split('?')[0]}?w=400&h=600&fit=crop&auto=format&q=80 400w, ${movie.image.split('?')[0]}?w=800&h=1200&fit=crop&auto=format&q=80 800w` : undefined}
            sizes="(max-width: 1024px) 100vw, 33vw"
            onError={(e) => { const el=e.currentTarget; if(!el.dataset.fallback){ el.dataset.fallback='1'; el.src=PLACEHOLDER_IMAGE; el.removeAttribute('srcset'); }}}
          />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <div className="flex gap-2">
              <Button asChild variant="outline"><a href={movie.image} target="_blank" rel="noreferrer">Open Poster</a></Button>
              <Button variant="ghost" onClick={() => navigator.clipboard.writeText(window.location.href)}>Share</Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">{movie.genre}</span>
            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">{movie.year}</span>
            <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">⭐ {movie.rating}</span>
          </div>
          <p className="leading-relaxed opacity-90">{movie.description}</p>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Similar in {movie.genre}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similar.map(s => (
              <Link key={s.id} to={`/movie/${s.id}`} className="block group">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-40 object-cover rounded transition-transform group-hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e)=>{ const el=e.currentTarget; if(!el.dataset.fallback){ el.dataset.fallback='1'; el.src='https://via.placeholder.com/400x600?text=No+Image'; }}}
                />
                <p className="mt-2 text-sm font-medium truncate">{s.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


