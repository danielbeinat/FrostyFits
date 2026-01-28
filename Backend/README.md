# FrostyFits — Backend API

API REST para la gestión de ecommerce de indumentaria.

## 🛠️ Tecnologías

- Node.js & Express
- MongoDB Atlas & Mongoose
- JWT para autenticación
- Cloudinary para gestión de imágenes
- Winston para logging y Helmet para seguridad

## ⚙️ Variables de Entorno

Crear un archivo `.env` en esta carpeta:

```env
PORT=5000
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_secreto_jwt
CLOUDINARY_NAME=tu_nombre_cloudinary
CLOUDINARY_KEY=tu_key_cloudinary
CLOUDINARY_SECRET=tu_secreto_cloudinary
EMAIL_USER=tu_email_para_notificaciones
EMAIL_PASS=tu_password_de_aplicacion
```

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo (con nodemon)
npm run dev

# Iniciar en producción
npm start
```

## 🌐 Endpoints Principales

- `POST /api/auth/signup` - Registro de usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/products/allproducts` - Listar productos
- `POST /api/products/add` - Agregar producto (Admin)
- `POST /api/users/addtocart` - Gestionar carrito
