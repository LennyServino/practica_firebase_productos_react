
# Sistema de productos Firebase + React

Este proyecto es una aplicación de gestión de productos utilizando React y Firebase, creada con Vite.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Usuarios](#usuarios-para-acceder)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración de Firebase](#configuración-de-firebase)
- [Dependencias](#dependencias)
- [DevDependencies](#devdependencies)
- [Licencia](#licencia)

## Instalación

1. Clona el repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd practica_firebase_productos
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Usuarios para acceder
```sh
USER: lenny@prueba.com
PASSWORD: prueba123
```

## Scripts Disponibles

En el archivo `package.json`, se definen los siguientes scripts:

- `dev`: Inicia el servidor de desarrollo.
    ```sh
    npm run dev
    ```
- `build`: Construye la aplicación para producción.
    ```sh
    npm run build
    ```

## Configuración de Firebase

Asegúrate de configurar las variables de entorno en un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREABASE_STORAGE=your_storage_bucket
VITE_FIREBASE_MESSAGEID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
## dependencias
* @hookform/resolvers: ^3.9.0
* bootstrap: ^5.3.3
* firebase: ^10.14.0
* react: ^18.3.1
* react-dom: ^18.3.1
* react-hook-form: ^7.53.0
* react-icons: ^5.3.0
* react-router-dom: ^6.26.2
* sweetalert2: ^11.14.3
* yup: ^1.4.0
