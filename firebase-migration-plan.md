# Migración a Firebase Blaze - Plan Detallado

## Paso 1: Crear Proyecto Firebase
```bash
# 1. Ir a console.firebase.google.com
# 2. Crear nuevo proyecto "frostyfits"
# 3. Activar Blaze plan (pagar-as-you-go)
```

## Paso 2: Configurar Firestore
```javascript
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "frostyfits.firebaseapp.com",
  projectId: "frostyfits",
  storageBucket: "frostyfits.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## Paso 3: Migrar Models a Firestore
```javascript
// models/Product.js (Firebase version)
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config.js';

export const Product = {
  async create(productData) {
    const docRef = doc(collection(db, 'products'));
    await setDoc(docRef, productData);
    return docRef.id;
  },
  
  async findById(id) {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
  
  async findAll() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
```

## Paso 4: Migrar Auth a Firebase Auth
```javascript
// controllers/authController.js (Firebase version)
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    res.json({
      success: true,
      token,
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

## Paso 5: Convertir a Firebase Functions
```javascript
// functions/index.js
import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Importar tus routes existentes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

export const api = onRequest(app);
```

## Paso 6: Deploy
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login y deploy
firebase login
firebase deploy --only functions
```

## Costo Estimado: $0/mes
- 1M invocaciones = $0.00 (gratis)
- 400k GB-s = $0.00 (gratis)  
- 5GB storage = $0.00 (gratis)
- 50k reads = $0.00 (gratis)
- 20k writes = $0.00 (gratis)

## Total mensual para portfolio: $0.00
