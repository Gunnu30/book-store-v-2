import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
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
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>
            Book Inventory
          </h1>
        </div>

        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading books...</p>
        ) : error ? (
          <p style={{ color: '#ef4444' }}>{error}</p>
        ) : books.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No books found.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            }}
          >
            {books.map((book) => (
              <Link
                key={book.id}
                style={{
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Thumbnail box */}
                <div
                  style={{
                    height: '200px',
                    width: '100%',
                    backgroundColor: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>

                {/* Book details */}
                <div style={{ padding: '1rem', flexGrow: 1 }}>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                    {book.title}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{book.author}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
                    {book.description}
                  </p>

                  {/* Price & Stock */}
                  <div
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 'bold', color: '#D4AF37' }}>₹{book.price}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Stock: {book.stock_count ?? 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
