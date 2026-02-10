# Setup Glitch para FrostyFits

## Por qué Glitch es perfecto para tu portfolio:
✅ SIEMPRE ACTIVO (con uso regular)
✅ 100% GRATIS sin trucos
✅ Node.js completo
✅ MongoDB Atlas compatible
✅ CDN global incluido
✅ Custom domain gratis
✅ Deploy instantáneo

## Paso 1: Crear Proyecto Glitch
1. Ve a `glitch.com`
2. "New Project" → "Import from GitHub"
3. Pega tu repo: `https://github.com/TU_USER/react-clothing-page`
4. Solo importa la carpeta `/Backend`

## Paso 2: Configurar Variables de Entorno
```bash
# En Glitch: .env file
MONGO_URI=mongodb+srv://...
JWT_SECRET=tu_secreto
CLOUDINARY_NAME=tu_cloud
CLOUDINARY_KEY=tu_key
CLOUDINARY_SECRET=tu_secret
EMAIL_USER=tu_email
EMAIL_PASS=tu_pass
```

## Paso 3: Ajustar package.json
```json
{
  "name": "frostyfits-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

## Paso 4: Mantener Activo (Opcional)
```javascript
// Agregar a index.js
setInterval(() => {
  console.log('Keeping alive...');
}, 300000); // Ping cada 5 minutos
```

## Paso 5: Conectar Frontend
```javascript
// En tu frontend React
const API_URL = 'https://TU_PROYECTO.glitch.me/api';

// O usar custom domain
const API_URL = 'https://api.frostyfits.com/api';
```

## Ventajas para Reclutadores:
- 🚀 **0 segundos de espera**
- 💼 **URL profesional** (.glitch.me o custom domain)
- 🔧 **Código visible** en Glitch
- 📱 **Mobile-friendly**
- 🌍 **CDN global**

## Desventajas:
- ⚠️ **Menos "enterprise"** que Firebase
- ⚠️ **Limites de recursos** (suficiente para portfolio)

## Conclusión:
Perfecto si quieres:
- Rapidez absoluta
- Cero costos
- Setup en 10 minutos
- Portfolio siempre activo
