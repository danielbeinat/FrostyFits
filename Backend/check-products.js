import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const count = await Product.countDocuments();
    console.log(`📊 Total de productos en la base de datos: ${count}`);

    if (count > 0) {
      const products = await Product.find().limit(5).select('name price category');
      console.log('\n📦 Primeros productos encontrados:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price} (${product.category})`);
      });
    } else {
      console.log('\n⚠️  No hay productos en la base de datos.');
      console.log('💡 Necesitas agregar productos primero.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkProducts();