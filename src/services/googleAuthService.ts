import { Platform } from 'react-native';

const GOOGLE_CLIENT_ID = '295733106099-htr1psk7thguvdnfjb4a9oljr5shjbal.apps.googleusercontent.com';

export class GoogleAuthService {
  static async signInAsync(): Promise<string | null> {
    // Implementación stub: detectamos plataforma y mostramos advertencia.
    // Aquí puedes integrar `expo-auth-session`, `react-native-google-signin` o
    // el flujo OAuth2 manual usando `WebBrowser.openAuthSessionAsync`.
    console.warn('GoogleAuthService.signInAsync: not implemented. Reemplaza este stub con la librería de Google Sign-In que prefieras.');
    // EJEMPLO (no funcional): retornar un token simulado para pruebas locales
    // return 'SIMULATED_GOOGLE_ACCESS_TOKEN';
    return null;
  }

  static async getUserInfo(accessToken: string): Promise<any> {
    // Si tienes un accessToken válido, puedes obtener información así:
    // return fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`).then(r => r.json());
    console.warn('GoogleAuthService.getUserInfo: not implemented. Usa la API de Google con el access token.');
    return null;
  }
}


