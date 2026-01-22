
import fetch from 'node-fetch';

async function checkProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products/allproducts');
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

checkProducts();
