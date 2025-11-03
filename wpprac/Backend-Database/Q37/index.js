const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory store (in production, use a database)
let products = [
    { id: 1, title: 'Book 1', author: 'Author 1', price: 19.99 },
    { id: 2, title: 'Book 2', author: 'Author 2', price: 24.99 }
];

let nextId = 3;

// GET all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// POST - Create new product
app.post('/api/products', (req, res) => {
    const { title, author, price } = req.body;
    
    if (!title || !author || !price) {
        return res.status(400).json({ error: 'Title, author, and price are required' });
    }
    
    const newProduct = {
        id: nextId++,
        title,
        author,
        price: parseFloat(price)
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT - Update product
app.put('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const { title, author, price } = req.body;
    products[productIndex] = {
        ...products[productIndex],
        title: title || products[productIndex].title,
        author: author || products[productIndex].author,
        price: price ? parseFloat(price) : products[productIndex].price
    };
    
    res.json(products[productIndex]);
});

// DELETE - Delete product
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    products.splice(productIndex, 1);
    res.json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


