const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'blog_db';

let db;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectDB();

app.use(express.json());

// GET all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.collection('posts').find({}).toArray();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// GET single post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await db.collection('posts').findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// POST - Create new post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        
        const post = {
            title,
            content,
            createdAt: new Date()
        };
        
        const result = await db.collection('posts').insertOne(post);
        res.status(201).json({ ...post, _id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


