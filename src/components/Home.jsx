import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProudct from './AddProduct';
import ListProducts from './ListProducts';
import '../styles/home.css';


export default function Home({ setUser }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        // useEffect in App.jsx triggered to remove from localStorage
        setUser(null);
        navigate('/login');
    }

    return (
        <div className="home-container">
            <div className="top-bar">
                <input 
                    type='text'
                    className='search-input'
                    placeholder='Search by Product Name'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="button-group">
                    {searchQuery && (
                    <button className="search-clearBtn" onClick={() => setSearchQuery("")}>Clear Search</button>
                    )}
                    <button 
                    type="button" 
                    className="logout-button" 
                    onClick={handleLogout}
                > 
                Logout
                </button>
                </div>
                
            </div>
            <AddProudct />
            <ListProducts searchQuery={searchQuery} />
        </div>

    );
}