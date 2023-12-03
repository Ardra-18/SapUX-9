// app.js
const express = require('express');
const productsModule = require('./products');

const app = express();
const port = 3000;

app.use(express.json());

// Add a simple route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Products API!');
});

app.get('/api/products', async (req, res) => {
  try {
    const { productId, category, brand } = req.query;

    // Fetch all products
    let products = await productsModule.fetchProducts();

    // Apply filters based on query parameters
    if (productId) {
      products = products.filter(product => product.id === productId);
    }

    if (category) {
      products = products.filter(product => product.category === category);
    }

    if (brand) {
      products = products.filter(product => product.brand === brand);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
