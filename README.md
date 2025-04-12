# User Feedback Form

This project is a feedback form application that allows users to submit their comments. It is designed with a modular and scalable architecture, using modern technologies such as React, TypeScript, and advanced tools for testing and code quality.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Running the Project](#running-the-project)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [End-to-End (E2E) Tests](#end-to-end-e2e-tests)
- [Architecture](#architecture)
- [Future Improvements](#future-improvements)
- [Contributions](#contributions)

---

## Features

- **Feedback Form**: Allows users to input their name, email, comments, and accept terms.
- **Data Validation**: Real-time validations to ensure data quality.
- **Global State Management**: Handles form state using React Context.
- **Data Submission**: Simulates data submission to an external API.
- **Error Handling**: Robust error management in validation and API communication.
- **Unit and E2E Testing**: Comprehensive test coverage to ensure code quality.

---

## Technologies Used

- **Frontend**: React, TypeScript
- **Global State**: React Context API
- **Validation**: Custom validations (optional: `yup` or `zod` for advanced validations)
- **Unit Testing**: Vitest
- **E2E Testing**: Playwright
- **Code Quality**: ESLint, Prettier, Husky
- **CI/CD**: GitHub Actions

---

## Project Structure

The project structure follows clean architecture principles and domain-based modularization:

```
src/
├── application/          # Use cases and business logic
│   ├── ports/            # Interfaces for dependency abstraction
│   └── useCases/         # Specific use cases
├── domain/               # Domain entities and validations
├── infrastructure/       # Concrete implementations (APIs, services)
├── ui/                   # User interface components and pages
│   ├── components/       # Reusable components
│   └── pages/            # Main pages
├── context/              # React contexts for global state management
└── hooks/                # Custom hooks
tests/
├── unit/                 # Unit tests
└── e2e/                  # End-to-end tests
```

---

## Installation and Setup

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-feedback-form.git
   cd user-feedback-form
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure environment variables (if applicable):
   - Create a `.env` file in the root directory and define the necessary variables.

---

## Running the Project

### Development Mode

To start the development server:

```bash
yarn dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Production Build

To generate an optimized production build:

```bash
yarn build
```

### Production Server

To run the application in production mode:

```bash
yarn preview
```

---

## Testing

### Unit Tests

Run unit tests with Vitest:

```bash
yarn test
```

Generate a coverage report:

```bash
yarn test:coverage
```

### End-to-End (E2E) Tests

Run E2E tests with Playwright:

```bash
yarn test:e2e
```

---

## Architecture

The project follows **Clean Architecture** principles, separating responsibilities into well-defined layers:

1. **Domain**: Contains entities and business rules.
2. **Application**: Implements use cases and defines interfaces for infrastructure.
3. **Infrastructure**: Concrete implementations of services, such as API calls.
4. **UI**: Handles the user interface and user interactions.

### Flow Diagram

```plaintext
[UI] --> [Application] --> [Domain] <-- [Infrastructure]
```

---

## Future Improvements

- **Internationalization**: Implement support for multiple languages using `react-i18next`.
- **Advanced Validation**: Migrate to `yup` or `zod` for more robust validations.
- **Accessibility**: Improve form accessibility using tools like `axe-core`.
- **Performance**: Optimize performance using React Profiler and memoization techniques.
- **Automatic Deployment**: Set up a CI/CD pipeline for automatic deployment to Vercel or Netlify.

---

## Contributions

Contributions are welcome! If you want to contribute:

1. Fork the repository.
2. Create a branch for your feature:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Make your changes and ensure all tests pass.
4. Submit a pull request.

---

## Author

**[Your Name]**  
Senior Developer | React and TypeScript Specialist  
[LinkedIn](https://www.linkedin.com/in/your-profile) | [GitHub](https://github.com/your-username)

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

# Formulario de Retroalimentación de Usuario

Este proyecto es una aplicación de formulario de retroalimentación que permite a los usuarios enviar comentarios. Está diseñado con una arquitectura modular y escalable, utilizando tecnologías modernas como React, TypeScript y herramientas avanzadas para pruebas y calidad de código.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Pruebas](#pruebas)
  - [Unitarias](#unitarias)
  - [End-to-End (E2E)](#end-to-end-e2e)
- [Arquitectura](#arquitectura)
- [Mejoras Futuras](#mejoras-futuras)
- [Contribuciones](#contribuciones)

---

## Características

- **Formulario de Retroalimentación**: Permite a los usuarios ingresar su nombre, correo electrónico, comentarios y aceptar términos.
- **Validación de Datos**: Validaciones en tiempo real para garantizar la calidad de los datos ingresados.
- **Estado Global**: Manejo del estado del formulario utilizando React Context.
- **Envío de Datos**: Simulación de envío de datos a una API externa.
- **Manejo de Errores**: Gestión robusta de errores en la validación y en la comunicación con la API.
- **Pruebas Unitarias y E2E**: Cobertura completa de pruebas para garantizar la calidad del código.

---

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript
- **Estado Global**: React Context API
- **Validación**: Validaciones personalizadas (opcional: `yup` o `zod` para validaciones avanzadas)
- **Pruebas Unitarias**: Vitest
- **Pruebas E2E**: Playwright
- **Calidad del Código**: ESLint, Prettier, Husky
- **CI/CD**: GitHub Actions

---

## Estructura del Proyecto

La estructura del proyecto sigue principios de arquitectura limpia y modularización por dominios:

```
src/
├── application/          # Casos de uso y lógica de negocio
│   ├── ports/            # Interfaces para abstracción de dependencias
│   └── useCases/         # Casos de uso específicos
├── domain/               # Entidades y validaciones del dominio
├── infrastructure/       # Implementaciones concretas (APIs, servicios)
├── ui/                   # Componentes y páginas de la interfaz de usuario
│   ├── components/       # Componentes reutilizables
│   └── pages/            # Páginas principales
├── context/              # Contextos de React para manejo de estado global
└── hooks/                # Hooks personalizados
tests/
├── unit/                 # Pruebas unitarias
└── e2e/                  # Pruebas end-to-end
```

---

## Instalación y Configuración

### Requisitos Previos

- Node.js (v20 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/user-feedback-form.git
   cd user-feedback-form
   ```

2. Instala las dependencias:

   ```bash
   yarn install
   ```

3. Configura las variables de entorno (si aplica):
   - Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias.

---

## Ejecución del Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
yarn dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

### Build de Producción

Para generar una versión optimizada para producción:

```bash
yarn build
```

### Servidor de Producción

Para ejecutar la aplicación en modo producción:

```bash
yarn preview
```

---

## Pruebas

### Unitarias

Ejecuta las pruebas unitarias con Vitest:

```bash
yarn test
```

Genera un reporte de cobertura:

```bash
yarn test:coverage
```

### End-to-End (E2E)

Ejecuta las pruebas E2E con Playwright:

```bash
yarn test:e2e
```

---

## Arquitectura

El proyecto sigue principios de **Clean Architecture**, separando responsabilidades en capas bien definidas:

1. **Domain**: Contiene las entidades y reglas de negocio.
2. **Application**: Implementa los casos de uso y define interfaces para la infraestructura.
3. **Infrastructure**: Implementaciones concretas de servicios, como llamadas a APIs.
4. **UI**: Maneja la interfaz de usuario y la interacción con el usuario.

### Diagrama de Flujo

```plaintext
[UI] --> [Application] --> [Domain] <-- [Infrastructure]
```

---

## Mejoras Futuras

- **Internacionalización**: Implementar soporte para múltiples idiomas con `react-i18next`.
- **Validación Avanzada**: Migrar a `yup` o `zod` para validaciones más robustas.
- **Accesibilidad**: Mejorar la accesibilidad del formulario utilizando herramientas como `axe-core`.
- **Performance**: Optimizar el rendimiento utilizando React Profiler y técnicas de memoización.
- **Deploy Automático**: Configurar un pipeline de CI/CD para desplegar automáticamente en Vercel o Netlify.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y asegúrate de que pasen todas las pruebas.
4. Envía un pull request.

---

## Autor

**[Tu Nombre]**  
Desarrollador Senior | Especialista en React y TypeScript  
[LinkedIn](https://www.linkedin.com/in/tu-perfil) | [GitHub](https://github.com/tu-usuario)

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](./LICENSE).
