# PAMS_v4-Frontend

Repositorio para almacenar y controlar las versiones de desarrollo del frontend del sistema PAMS_v4

## INSTALACION BASE

- Instalacion inicial de react

```sh
 npx create-react-app nombre-proyecto
```

- Se eliminaron archivos no necesarios, dejando unicamente App.js, index.css e index.js
- Se cambiaron las extenciones de .js a jsx

-Instalacion de dependencias

```sh
 npm i @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/material @emotion/styled @emotion/react
```

```sh
 npm i sweetalert2
```

```sh
 npm i redux @reduxjs/toolkit
```

```sh
 npm i axios
```

```sh
 npm i react-pro-sidebar
```
```sh
 npm i react-router-dom
```
## CONSTRUCCION DEL AMBIENTE

### Creacion de carpetas para cada elemento

- Carpeta api para almacenar todo lo referente a comunicacion con el backend o terceros
- Carpeta app para almacenar funciones del sistema para el manejo de datos y peticiones REST
- Carpeta components para almacenar todos los elementos visuales de forma modulada
- Carpeta routes para almacenar todo lo referente a el flujo y control de navegacion y acceso entre ventanas
- Carpeta tools para almacenar funciones de redux
- Carpeta views para almacenar los apartados visuales principales (Forms, Dashboard, Login, etc)
