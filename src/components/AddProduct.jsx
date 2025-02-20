import { useState } from 'react';
import '../styles/addProduct.css'

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        
        const newProduct = {name, price};
        const storageKey = "products";

        // get all products from local storage
        let products = [];
        try {
            let storedData = localStorage.getItem(storageKey);
            products = storedData ? JSON.parse(storedData) : [];
        } catch(error) {
            console.log("Error parsing localStorage data: ", error);
            products = [];
        }

        // store new product on local storage
        localStorage.setItem(storageKey, JSON.stringify([...products, newProduct]));

        // set price & name value
        setName("");
        setPrice("");

        // force ListProducts component to update
        window.dispatchEvent(new Event("storage"));
        
    }

    // clear all products from local storage
    const handleDelete = () => {
        localStorage.clear();
        window.dispatchEvent(new Event("storage"));
    }    


    return (
        <div className="add-product">
            <form onSubmit={handleSubmit} >
                <input 
                    type='text' 
                    name='name' 
                    value={name}
                    placeholder='Enter Product Name'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type='number' 
                    name='price' 
                    value={price}
                    placeholder='Enter Price'
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type='submit' title='Add Product'>
                    <i className="fa-solid fa-circle-plus"></i>
                </button>
                <button onClick={handleDelete} >Delete All Product</button>
            </form>
        </div>
    );
}