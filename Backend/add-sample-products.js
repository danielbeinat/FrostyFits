import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  // Productos para hombres
  {
    name: "Camiseta Básica Blanca",
    price: 23390,
    description: "Camiseta de algodón 100% cómoda y versátil para uso diario",
    category: "men",
    image: "/src/assets/product_1.png",
    aviable: true,
    type: "camiseta",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Camiseta Negra Oversize",
    price: 29690,
    description: "Camiseta oversize de algodón con cuello redondo",
    category: "men",
    image: "/src/assets/product_2.png",
    aviable: true,
    type: "camiseta",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    name: "Pantalón Jeans Azul",
    price: 59390,
    description: "Pantalón jeans clásico de alta calidad con ajuste perfecto",
    category: "men",
    image: "/src/assets/product_3.png",
    aviable: true,
    type: "pantalon",
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    name: "Pantalón Cargo Negro",
    price: 50390,
    description: "Pantalón cargo con múltiples bolsillos y ajuste cómodo",
    category: "men",
    image: "/src/assets/product_4.png",
    aviable: true,
    type: "pantalon",
    sizes: ["30", "32", "34", "36"]
  },
  {
    name: "Chaqueta Jeans Azul",
    price: 80990,
    description: "Chaqueta jeans vintage con lavado especial",
    category: "men",
    image: "/src/assets/product_5.png",
    aviable: true,
    type: "chaqueta",
    sizes: ["S", "M", "L", "XL"]
  },

  // Productos para mujeres
  {
    name: "Vestido Elegante Negro",
    price: 71990,
    description: "Vestido elegante perfecto para ocasiones especiales",
    category: "women",
    image: "/src/assets/product_6.png",
    aviable: true,
    type: "vestido",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Blusa Blanca de Seda",
    price: 41390,
    description: "Blusa de seda con detalles delicados y elegante",
    category: "women",
    image: "/src/assets/product_7.png",
    aviable: true,
    type: "blusa",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Falda Plisada Beige",
    price: 47690,
    description: "Falda plisada con caída elegante y cómoda",
    category: "women",
    image: "/src/assets/product_8.png",
    aviable: true,
    type: "falda",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Cardigan Gris Claro",
    price: 62090,
    description: "Cardigan suave de lana merino perfecto para capas",
    category: "women",
    image: "/src/assets/product_9.png",
    aviable: true,
    type: "cardigan",
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  // Productos para niños
  {
    name: "Camiseta Kids Azul Marino",
    price: 20690,
    description: "Camiseta cómoda para niños con estampado divertido",
    category: "kid",
    image: "/src/assets/product_10.png",
    aviable: true,
    type: "camiseta",
    sizes: ["4", "6", "8", "10", "12"]
  },
  {
    name: "Pantalón Kids Jeans",
    price: 32390,
    description: "Pantalón jeans resistente para aventuras infantiles",
    category: "kid",
    image: "/src/assets/product_11.png",
    aviable: true,
    type: "pantalon",
    sizes: ["4", "6", "8", "10", "12"]
  },
  {
    name: "Sudadera Kids Rosa",
    price: 38690,
    description: "Sudadera suave y calentita para días frescos",
    category: "kid",
    image: "/src/assets/product_12.png",
    aviable: true,
    type: "sudadera",
    sizes: ["4", "6", "8", "10", "12"]
  },

  // Productos para zapatos
  {
    name: "Zapatillas Blancas Clásicas",
    price: 68390,
    description: "Zapatillas blancas clásicas con suela antideslizante",
    category: "shoes",
    image: "/src/assets/product_13.png",
    aviable: true,
    type: "zapatillas",
    sizes: ["36", "37", "38", "39", "40", "41", "42"]
  },
  {
    name: "Botines Negros Elegantes",
    price: 86390,
    description: "Botines negros elegantes perfectos para ocasiones formales",
    category: "shoes",
    image: "/src/assets/product_14.png",
    aviable: true,
    type: "botines",
    sizes: ["36", "37", "38", "39", "40", "41", "42"]
  },
  {
    name: "Sandalias Veraniegas",
    price: 41390,
    description: "Sandalias cómodas perfectas para el verano",
    category: "shoes",
    image: "/src/assets/product_15.png",
    aviable: true,
    type: "sandalias",
    sizes: ["36", "37", "38", "39", "40", "41", "42"]
  }
];

const addSampleProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar productos existentes primero
    await Product.deleteMany({});
    console.log('🧹 Base de datos limpiada');

    // Agregar productos de muestra
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} productos de muestra agregados exitosamente`);

    // Mostrar resumen
    const count = await Product.countDocuments();
    console.log(`📊 Total de productos en la base de datos: ${count}`);

    // Mostrar productos por categoría
    const categories = ['men', 'women', 'kid', 'shoes'];
    for (const category of categories) {
      const categoryCount = await Product.countDocuments({ category });
      console.log(`  ${category}: ${categoryCount} productos`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

addSampleProducts();