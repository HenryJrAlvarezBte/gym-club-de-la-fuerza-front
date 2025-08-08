# 🏋️ El Club de la Fuerza - Gym App

Una aplicación móvil completa para gimnasios desarrollada con React Native y Expo.

## 📱 Características

- **Pantalla de Inicio**: Dashboard con estadísticas y acciones rápidas
- **Horario de Clases**: Gestión de clases con filtros y estado
- **Planes de Membresía**: Diferentes niveles de suscripción
- **Perfil de Usuario**: Estadísticas y configuración personal
- **Configuración**: Ajustes de la aplicación

## 🚀 Instalación y Configuración

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **Git**
- **Expo CLI** (se instalará automáticamente)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/el-club-de-la-fuerza.git
cd el-club-de-la-fuerza
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

O si prefieres usar yarn:

```bash
yarn install
```

### Paso 3: Verificar la Instalación

Asegúrate de que todas las dependencias se instalaron correctamente:

```bash
npm list --depth=0
```

### Paso 4: Configurar el Entorno

#### Para Desarrollo Local

1. **Instalar Expo CLI globalmente** (si no lo tienes):
```bash
npm install -g @expo/cli
```

2. **Verificar la instalación**:
```bash
expo --version
```

#### Para Dispositivo Móvil

1. **Instalar Expo Go** en tu dispositivo móvil:
   - **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Paso 5: Ejecutar el Proyecto

#### Opción A: Desarrollo (Recomendado para desarrollo)

```bash
npx expo start
```

#### Opción B: Producción (Para testing)

```bash
npx expo start --no-dev --minify
```

#### Opción C: Con caché limpio (Si hay problemas)

```bash
npx expo start --clear
```

### Paso 6: Conectar Dispositivo

1. **Escanea el código QR** que aparece en la terminal con:
   - **Android**: Expo Go app
   - **iOS**: Cámara del iPhone

2. **O abre en emulador**:
   - Presiona `a` para abrir en Android
   - Presiona `i` para abrir en iOS (solo en macOS)

## 📁 Estructura del Proyecto

```
el-club-de-la-fuerza/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── navigation/          # Configuración de navegación
│   ├── screens/            # Pantallas de la aplicación
│   ├── utils/              # Utilidades y helpers
│   └── context/            # Contextos de React
├── assets/                 # Imágenes y recursos
├── android/                # Configuración específica de Android
├── App.tsx                 # Componente principal
├── package.json            # Dependencias del proyecto
├── babel.config.js         # Configuración de Babel
├── tailwind.config.js      # Configuración de Tailwind
└── tsconfig.json          # Configuración de TypeScript
```

## 🛠️ Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Iniciar en modo producción
npm run start:prod

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web

# Limpiar caché
npm run clear-cache
```

## 🔧 Configuración Adicional

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_API_URL=tu_url_api
EXPO_PUBLIC_APP_NAME=El Club de la Fuerza
```

### Configuración de Metro

Si necesitas personalizar Metro bundler, crea un archivo `metro.config.js`:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

## 📱 Pantallas de la Aplicación

### 🏠 Inicio
- Dashboard con estadísticas del usuario
- Acciones rápidas para navegación
- Lista de clases del día

### 📅 Clases
- Horario completo de clases
- Filtros por día
- Estado de inscripción
- Información del instructor

### 💳 Planes
- Diferentes niveles de membresía
- Comparación de características
- Precios y beneficios

### 👤 Perfil
- Estadísticas personales
- Progreso de metas
- Configuración de cuenta

### ⚙️ Configuración
- Preferencias de notificaciones
- Configuración de privacidad
- Ajustes de la aplicación

## 🎨 Tecnologías Utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma de desarrollo
- **React Navigation**: Navegación entre pantallas
- **React Native Paper**: Componentes de UI
- **TypeScript**: Tipado estático
- **Expo Vector Icons**: Iconografía

## 🚨 Solución de Problemas

### Error de Metro Cache
```bash
npx expo start --clear --reset-cache
```

### Error de Dependencias
```bash
rm -rf node_modules
npm install
```

### Error de Port
Si el puerto 8081 está ocupado:
```bash
npx expo start --port 8082
```

### Error de Babel
```bash
npm install --save-dev @babel/core
```

### Error de TypeScript
```bash
npx tsc --noEmit
```

## 📋 Checklist de Instalación

- [ ] Node.js instalado (v16+)
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Expo CLI disponible
- [ ] Expo Go instalado en dispositivo móvil
- [ ] Proyecto ejecutándose (`npx expo start`)
- [ ] Aplicación conectada al dispositivo

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

Si tienes problemas con la instalación o el desarrollo:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Busca en los [Issues](https://github.com/tu-usuario/el-club-de-la-fuerza/issues)
3. Crea un nuevo issue con detalles del problema

## 🎯 Próximas Características

- [ ] Autenticación de usuarios
- [ ] Reserva de clases
- [ ] Pago de membresías
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Tema oscuro

---

**¡Disfruta desarrollando con El Club de la Fuerza! 💪**
