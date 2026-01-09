import React, { useState } from 'react';
import axios from 'axios';

const productAdd = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, price, description, category, image };
        try {
            await axios.post('/api/products', newProduct);
            alert('Product added successfully!');
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
            />
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                required
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Product Category"
                required
            />
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Product Image URL"
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default productAdd;
