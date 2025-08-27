# Clase 04 - Ejemplos de implementación de formularios en React con validaciones

Esta es una aplicación de ejemplo construida con **React 19**, **Material UI v6 (MUI)**, **Formik/Yup** para validación de formularios, y empaquetada con **Vite**.  
Incluye distintos formularios de demostración:

- **CardFormA**: Formulario de tarjeta de crédito con validación manual.
- **CardFormB**: Formulario de tarjeta de crédito con validación basada en **Formik + Yup**.
- **UserDetailsForm**: Formulario de datos de usuario con **DatePicker** de `@mui/x-date-pickers`.
- **FileUploadForm**: Formulario para subir una fotografía con validación de tipo/tamaño.

La aplicación monta un `Drawer` de navegación lateral con enlaces a cada formulario.

---

## 🚀 Requisitos

- Node.js **>=18** (se recomienda la versión LTS).
- Yarn **>=1.22** (o `npm` si prefieres, aunque el proyecto está configurado con Yarn).
- Navegador moderno compatible con React 19.

---

## 📦 Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
yarn install
```

## ▶️ Ejecución en desarrollo

Levanta el servidor de desarrollo con Vite:

```bash
yarn dev
```

## Estructura del proyecto

```bash
src/
├── App.jsx                # Componente principal con Drawer + rutas
├── theme.js               # Tema MUI (colores, tipografía, etc.)
├── components/
│   ├── CardFormA.jsx      # Formulario tarjeta c/ validación manual
│   ├── CardFormB.jsx      # Formulario tarjeta c/ Formik + Yup
│   ├── UserDetailsForm.jsx# Formulario datos usuario + DatePicker
│   └── FileUploadForm.jsx # Formulario subida de fotografía
└── main.jsx               # Punto de entrada (ReactDOM.createRoot)
```

## 🧩 Dependencias clave

* React 19 y React DOM 19
* MUI v6 (@mui/material, @mui/icons-material, @mui/x-date-pickers)
* Formik + Yup para validación
* Axios (para llamadas HTTP simuladas)
* Vite (empaquetador y servidor de desarrollo)
