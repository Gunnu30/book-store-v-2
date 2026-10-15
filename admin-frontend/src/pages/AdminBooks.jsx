import { useEffect, useState } from 'react';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await fetch(`${api}/books`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await res.json();
        setBooks(data.listBooks || []);
      } catch (err) {
        console.error('Error fetching admin books:', err);
        setError('Unable to load books right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="w-full min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#D4AF37]">Book Inventory</h1>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading books...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : books.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="rounded-xl border border-[#D4AF37]/30 bg-white p-4 shadow-sm"
              >
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="h-48 w-full rounded-md object-cover"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">{book.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-[#D4AF37]">₹{book.price}</span>
                    <span className="text-xs text-gray-500">Stock: {book.stock_count ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
