# Talentos App

## Descripción

Talentos App es una aplicación web desarrollada con Next.js que permite a los usuarios transferir talentos entre ellos y buscar vocaciones disponibles. La aplicación utiliza Firebase para la autenticación y Firestore como backend para almacenar y gestionar los datos de los usuarios y sus talentos.

## Funcionalidades

### 1. Autenticación

- **Registro:** Los usuarios pueden registrarse utilizando su correo electrónico y contraseña.
- **Inicio de sesión:** Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.

### 2. Transferencia de Talentos

- **Transferir Talentos:** Los usuarios pueden transferir sus talentos a otros usuarios ingresando el número de cliente destino y la cantidad de talentos a transferir.
- **Validación de Talentos:** La aplicación valida que el usuario no pueda enviar más talentos de los que posee.

### 3. Búsqueda de Vocaciones

- **Buscar Vocaciones:** Los usuarios pueden buscar y ver las vocaciones disponibles.

## Tecnologías Utilizadas

- **Next.js:** Framework de React para aplicaciones web.
- **Firebase:** Servicio de Google utilizado para la autenticación de usuarios.
- **Firestore:** Base de datos NoSQL en la nube de Firebase para el almacenamiento de datos.

## Configuración

### Requisitos Previos

- Node.js y npm instalados en tu máquina.

### Pasos para Instalar

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu_usuario/talentos-app.git
    ```

2. **Navega hasta el directorio del proyecto:**

    ```bash
    cd talentos-app
    ```

3. **Instala las dependencias:**

    ```bash
    npm install
    ```

4. **Configura Firebase:**

    - Crea un nuevo proyecto en [Firebase Console](https://console.firebase.google.com/).
    - Configura la autenticación con correo electrónico y habilita Firestore como base de datos.
    - Copia la configuración de Firebase (apiKey, authDomain, projectId, etc.) y pégala en el archivo `firebaseConfig.js` en la raíz del proyecto.

    ```javascript
    // firebaseConfig.js
    export const firebaseConfig = {
      apiKey: "TU_API_KEY",
      authDomain: "TU_AUTH_DOMAIN",
      projectId: "TU_PROJECT_ID",
      storageBucket: "TU_STORAGE_BUCKET",
      messagingSenderId: "TU_MESSAGING_SENDER_ID",
      appId: "TU_APP_ID"
    };
    ```

5. **Inicia la aplicación:**

    ```bash
    npm run dev
    ```

## Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o mejoras, por favor abre un issue o una pull request.
