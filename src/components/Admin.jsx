import React, { useMemo, useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminLogin } from '@/components/AdminLogin';

export default function Admin() {
  const { movies, addMovie, editMovie, deleteMovie, validate } = useMovies();
  const { isAdmin, logout } = useAdmin();

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', genre: '', year: '', rating: '', image: '', description: '' });
  const [errors, setErrors] = useState({});

  const sorted = useMemo(() => [...movies].sort((a, b) => b.id - a.id), [movies]);

  const startAdd = () => {
    setEditingId('new');
    setForm({ title: '', genre: '', year: '', rating: '', image: '', description: '' });
    setErrors({});
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setForm({ title: m.title, genre: m.genre, year: String(m.year), rating: String(m.rating), image: m.image, description: m.description });
    setErrors({});
  };

  const cancel = () => {
    setEditingId(null);
    setErrors({});
  };

  const onChange = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const onSave = () => {
    const v = validate({ ...form });
    setErrors(v);
    if (Object.keys(v).length) return;
    if (editingId === 'new') {
      const res = addMovie({ ...form, year: Number(form.year), rating: Number(form.rating) });
      if (res.ok) cancel();
    } else {
      const res = editMovie(editingId, { ...form, year: Number(form.year), rating: Number(form.rating) });
      if (res.ok) cancel();
    }
  };

  const onDelete = (id) => {
    if (window.confirm('Delete this movie?')) deleteMovie(id);
  };

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Manage Movies</h2>
        <div className="flex gap-2">
          {editingId !== 'new' && (
            <Button onClick={startAdd}>Add Movie</Button>
          )}
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </div>

      {(editingId !== null) && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3 bg-black/10 p-4 rounded-lg border border-white/10 text-black">
          <Input placeholder="Title" value={form.title} onChange={onChange('title')} className="text-black placeholder-black" />
          <Input placeholder="Genre" value={form.genre} onChange={onChange('genre')} className="text-black placeholder-black" />
          <Input placeholder="Year" type="number" value={form.year} onChange={onChange('year')} className="text-black placeholder-black" />
          <Input placeholder="Rating (0-10)" type="number" step="0.1" value={form.rating} onChange={onChange('rating')} className="text-black placeholder-black" />
          <Input placeholder="Image URL" value={form.image} onChange={onChange('image')} className="md:col-span-2 text-black placeholder-black" />
          <Input placeholder="Description" value={form.description} onChange={onChange('description')} className="md:col-span-2 text-black placeholder-black" />
          <div className="md:col-span-2 text-sm text-red-400 space-y-1">
            {Object.values(errors).map((e, i) => (<div key={i}>{e}</div>))}
          </div>
          <div className="md:col-span-2 flex gap-2 justify-end">
            <Button variant="ghost" type="button" onClick={cancel}>Cancel</Button>
            <Button type="button" onClick={onSave}>Save</Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Genre</th>
              <th className="py-2 pr-4">Year</th>
              <th className="py-2 pr-4">Rating</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(m => (
              <tr key={m.id} className="border-b border-white/5">
                <td className="py-2 pr-4">{m.title}</td>
                <td className="py-2 pr-4">{m.genre}</td>
                <td className="py-2 pr-4">{m.year}</td>
                <td className="py-2 pr-4">{m.rating}</td>
                <td className="py-2 pr-4 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(m)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(m.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


