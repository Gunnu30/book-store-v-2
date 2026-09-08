import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/books.css';
import '../global.css';

const Books = () => {
    const api_url = import.meta.env.VITE_API_URL;
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`${api_url}/books`, { 
                    method: 'GET', 
                    credentials: "include" 
                });
                const data = await res.json();
                setBooksList(data.listBooks || []);
            } catch (e) {
                console.error("GET method Error in books list:", e.message);
            }
        };
        fetchBooks();
    }, [api_url]);

    const renderBookItem = (book) => {
        const { id, title, cover_url, description, price } = book;

        return (
            <li className="books-card" key={id}>
                <Link 
                    to={`/${encodeURIComponent(title)}`} 
                    state={{ fullBookData: book }} 
                    className="flex flex-row h-[200px] border rounded-lg shadow-sm hover:shadow-md transition-shadow shadow-[#B8860B]"
                >
                        <img 
                            className="w-auto object-cover h-full" 
                            src={cover_url} 
                            alt={title} 
                        />

                    <div className="h-full" style={{ padding: "5px" }}>
                        <h1 className="text-[18px] font-bold">{title}</h1>
                        <p className="flex-wrap text-sm">
                            {description.length > 50 
                                ? `${description.substring(0, 50)}...` 
                                : description}
                        </p>
                        <button className="text-[#B8860B] font-bold">
                            Price: ₹{price}
                        </button>
                    </div>
                </Link>
            </li>
        );
    };

    return (
        <div className=" main-container-Books  w-full min-h-[calc(100vh-70px)]">
            <div className="search-filter-container flex flex-row justify-around w-full">
                <div className="search-bar-container">
                    <input type="text" placeholder="Search titles , authors..."  />
                </div>
                <div className="filter-container">
                    <input type="search" placeholder="filter here" />
                </div>
            </div>
            {booksList.length > 0 ? (
                <ul className="books-card-container flex flex-wrap w-full items-center">
                    {booksList.map((book) => renderBookItem(book))}
                </ul>
            ) : (
                <div className="flex w-full justify-center items-center">
                    <p>Loading books...</p>
                </div>
            )}
        </div>
    );
};

export default Books;
