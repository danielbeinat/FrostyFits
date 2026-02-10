# AWS EC2 Setup para FrostyFits Backend

## Paso 1: Crear Cuenta AWS
1. Ve a `aws.amazon.com`
2. Click "Create a Free Account"
3. Completa registro (necesitas tarjeta para verificación)
4. **NO te cobrarán** si usas solo free tier

## Paso 2: Lanzar EC2 Instance
1. Dashboard AWS → "Services" → "EC2"
2. Click "Launch instance"
3. Configuración:
   - **Name**: frostyfits-backend
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance type**: t2.micro (FREE)
   - **Key pair**: Crea nueva key pair (.pem)
   - **Security group**: 
     - SSH (port 22) - My IP
     - HTTP (port 80) - Anywhere
     - HTTPS (port 443) - Anywhere
4. Click "Launch instance"

## Paso 3: Conectar al Server
```bash
# Descargar key pair si no lo tienes
chmod 400 tu-key-pair.pem

# Conectar via SSH
ssh -i tu-key-pair.pem ubuntu@TU_PUBLIC_IP

# O usar AWS CloudShell (más fácil)
```

## Paso 4: Instalar Node.js y Dependencies
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node -v  # v20.x.x
npm -v   # 9.x.x

# Instalar PM2 (process manager)
sudo npm install -g pm2
```

## Paso 5: Clonar y Configurar Backend
```bash
# Clonar tu repo
git clone https://github.com/TU_USER/react-clothing-page.git
cd react-clothing-page/Backend

# Instalar dependencies
npm install

# Crear .env
nano .env
```

### **Variables .env:**
```bash
MONGO_URI=mongodb+srv://...
JWT_SECRET=tu_secreto
NODE_ENV=production
PORT=80
CLOUDINARY_NAME=tu_cloud
CLOUDINARY_KEY=tu_key
CLOUDINARY_SECRET=tu_secret
EMAIL_USER=tu_email
EMAIL_PASS=tu_pass
```

## Paso 6: Configurar Firewall
```bash
# Permitir tráfico en puerto 80
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow ssh
sudo ufw enable
```

## Paso 7: Iniciar Backend con PM2
```bash
# Iniciar aplicación
pm2 start index.js --name "frostyfits-backend"

# Guardar configuración PM2
pm2 save

# Configurar PM2 para iniciar con el server
pm2 startup
```

## Paso 8: Configurar Dominio (Opcional)
```bash
# Si tienes dominio, apuntar A record a TU_PUBLIC_IP
# O usar IP directamente: http://TU_PUBLIC_IP
```

## Paso 9: Monitoreo y Logs
```bash
# Ver logs
pm2 logs

# Ver status
pm2 status

# Reiniciar si es necesario
pm2 restart frostyfits-backend
```

## Costo Estimado:
- **EC2 t2.micro**: $0/mes (12 meses)
- **Data transfer**: 15GB/mes gratis
- **Total**: $0/mes primer año

## Ventajas:
✅ SIEMPRE ACTIVO
✅ Control total
✅ Profesional (AWS en CV)
✅ Escalable
✅ 0 cold starts

## Desventajas:
❌ Setup complejo (1-2 horas)
❌ Requiere mantenimiento
❌ Se acaba después de 12 meses
❌ Necesita tarjeta (verificación)

## Para Reclutadores:
🚀 "Backend en AWS EC2" suena muy profesional
🚀 Demuestra conocimiento de cloud
🚀 Muestra habilidades DevOps
