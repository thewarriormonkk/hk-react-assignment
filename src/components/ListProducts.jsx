import { useState, useEffect } from 'react';
import '../styles/listProducts.css';

export default function ListProducts({ searchQuery }) {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        const storedData = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedData);
    }

    // fetch when component mounts
    useEffect(() => {
        getProducts();

        // listening for storage update events
        window.addEventListener("storage", getProducts);

        return () => {
            window.removeEventListener("storage", getProducts);
        }
    }, []);

    // filter products as per search keyword
    const filteredProducts = searchQuery
        ? products.filter((product) => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        : products;



    // delete product
    const handleDelete = (productName) => {
        const newProducts = products.filter((product) => product.name !== productName);
        setProducts(newProducts);
        localStorage.setItem("products", JSON.stringify(newProducts));
    }


    return (
        <div className="product-list">
            <h2>Product List</h2>
            {
                filteredProducts.length === 0 ? 
                (<p>Product Not Found</p>) :
                (<ul>
                    {filteredProducts.map((product, index) => (
                        <li key={index} >
                            <span><strong>{product.name}</strong></span>
                            <span>&#8377;{product.price}</span>
                            <button type='button' title='Delete Product' onClick={() => handleDelete(product.name)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    ))}
                </ul>)
            }
        </div>
    );
}