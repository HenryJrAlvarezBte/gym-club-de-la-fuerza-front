# 🏋️ El Club de la Fuerza - Gym App

Aplicación móvil desarrollada con React Native y Expo.

## 📱 Características actuales

- **Rutina personalizada:**  
  Cada usuario puede ver su rutina de ejercicios en un Google Sheet embebido dentro de la app, accesible tras iniciar sesión.
- **Autenticación básica:**  
  Registro y login de usuario.
- **Bienvenida:**  
  Mensaje de bienvenida al gimnasio al iniciar sesión.

## 🚀 Instalación y ejecución

### Prerrequisitos

- Node.js (v16+)
- npm o yarn
- Git
- Expo CLI

### Instalación

```bash
git clone https://github.com/tu-usuario/el-club-de-la-fuerza.git
cd el-club-de-la-fuerza
npm install
```

### Ejecución

```bash
npx expo start
```

Escanea el QR con Expo Go en tu dispositivo móvil.

## 📁 Estructura del Proyecto

```
el-club-de-la-fuerza/
├── src/
│   ├── navigation/      # Navegación
│   ├── screens/         # Pantallas principales (Onboarding, Routine)
│   └── context/         # Contexto de autenticación
├── App.tsx              # Componente principal
├── package.json         # Dependencias
└── README.md            # Este archivo
```

## 🎨 Tecnologías Utilizadas

- React Native
- Expo
- React Navigation
- TypeScript

## 🛠️ Scripts útiles

```bash
npm start         # Iniciar en modo desarrollo
npm run android   # Ejecutar en Android
npm run ios       # Ejecutar en iOS
```

## 🚨 Solución de Problemas

- Si tienes problemas con el caché:
  ```bash
  npx expo start --clear
  ```
- Si el puerto 8081 está ocupado:
  ```bash
  npx expo start --port 8082
  ```

## 📄 Licencia

MIT

---

**Actualmente la app permite ver la rutina personalizada de cada usuario en un Google Sheet embebido tras iniciar