# FrostyFits — Monorepo (Frontend + Backend)

Proyecto de e-commerce con Frontend en React (Vite) y Backend en Express + MongoDB. Incluye autenticación, gestión de productos, subida de imágenes y páginas informativas.

## Tecnologías

- **Frontend:** React 18, Vite, React Router, Tailwind/SCSS
- **Backend:** Node 20, Express, MongoDB (Atlas o local)
- **Servicios:** Cloudinary (imágenes), Nodemailer (emails)

## Estructura

- `Frontend/` — SPA de la tienda
- `backend/` — API REST y servicios

### Backend

1. `cd backend`
2. `npm install`
3. Crear `.env` con las variables necesarias.
4. `npm run dev`

### Frontend

1. `cd Frontend`
2. `npm install`
3. `npm run dev` (Usa localhost:5000 por defecto para la API).

## Endpoints principales

- **Auth:** `/api/auth/login`, `/api/auth/signup`
- **Productos:** `/api/products`
- **Upload:** `POST /api/upload` (Imágenes a Cloudinary)
