# Estetica Chatbot Aimy

El presente código contiene los estilos para modificar el estilo propio de la ventana de chat de Aimylogic

## Instalación

Instrucciones para su uso:

# Documentación de Configuración de Estilos para el Chat

## Introducción
Este documento describe los pasos necesarios para implementar la funcionalidad de estilos personalizados en el chat, asegurando que los cambios se apliquen de manera efectiva en todas las páginas donde se encuentra disponible.

## Requisitos Importantes
- **Apertura del Chat**: Asegúrate de que el chat esté abierto al momento de elegir los estilos. Esto garantiza que los cambios realizados impacten directamente sobre las clases asociadas.
- **Inclusión de Scripts**: Incluye el script del chat Aimylogic junto con el script `chatestetic.js` en todas las páginas donde se desee habilitar la funcionalidad del chat.

## Implementación de la Página de Configuración
Se ha implementado una página de configuración que permite al administrador del sitio elegir los estilos del chat. Esta configuración está diseñada para que los estilos seleccionados se repliquen automáticamente en todas las demás páginas donde el chat esté activo.

En esta página de configuración es donde el botón que acciona el modal estará presente para realizar la personalización de estilos. Al hacer clic en este botón, se ejecutará el modal correspondiente.

### Parte del código donde se determina la página de configuración
En el código, se ha establecido una página para asegurar que el botón que acciona el modal solo se muestre ahí, En el ejemplo la misma es `index.html`. Esto se realiza mediante la siguiente línea de código en la función `createOpenModalButton`:

```javascript
if (window.location.pathname.endsWith('index.html')) {
    // Código para crear el botón que abre el modal
}
```

# Opciones de Personalización

En el modal de selección de estilos, se ofrecen las siguientes opciones organizadas en pestañas:

- **Colores de Letra:** Selección del color del texto.
- **Colores de Fondo:** Selección del color de fondo del chat.
- **Fuentes:** Elección de diferentes tipos de fuentes.
- **Dimensiones:** Ajustes en las dimensiones del chat (ancho y alto).
- **Imágenes:** Carga o selección de imágenes para personalizar el aspecto del chat.

## Pasos para la Configuración de Estilos

### 1. Decidir cuál será la Página de Configuración

Una vez confirmada, esta será la única ubicación donde aparecerá el botón para configurar los estilos. Esta página debe estar especificada en el código. Actualmente, se está usando `index.html` en la función `createOpenModalButton`:

```javascript
function createOpenModalButton() { 
    if (window.location.pathname.endsWith('index.html')) {
```

## 2. Activar el Script chatestetic.js
Asegúrate de que el script `chatestetic.js` esté activado en todas las páginas donde se va a utilizar el chat Aimylogic.

## 3. Acceder a la Página de Configuración
Ve a la página de configuración elegida, asegúrate de que el chat esté abierto y haz clic en el botón para abrir el modal que permitirá elegir los estilos.

## Conclusión
Siguiendo estos pasos, se ha logrado implementar y gestionar de manera eficiente los estilos del chat, asegurando una experiencia de usuario coherente en todo el sitio.
