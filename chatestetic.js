
function enqueueAimylogicAssets() {
    const head = document.getElementsByTagName('head')[0];

    const scripts = [
        
        { src: '/fonts/MatchaMilkDemo/stylesheet.css', type: 'text/css' },
        { src: '/fonts/MuseoSans/stylesheet.css', type: 'text/css' },
        { src: '/fonts/RobotoBlack/stylesheet.css', type: 'text/css' },
        { src: '/fonts/RobotoRegular/stylesheet.css', type: 'text/css' },
    ];

    scripts.forEach(file => {
        let element;
        if (file.type === 'text/javascript') {
            element = document.createElement('script');
            element.src = file.src;
            element.type = file.type;
        } else {
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = file.src;
        }
        head.appendChild(element);
    });
}
enqueueAimylogicAssets();

const styles = {};

function generateStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = "dynamic-styles";

    styleSheet.innerHTML = ""; // Limpia el contenido previo
    for (const [className, style] of Object.entries(styles)) {
        styleSheet.innerHTML += `${className} { ${style} }\n`; // Agrega los nuevos estilos
    }

    const previousStyle = document.getElementById("dynamic-styles");
    if (previousStyle) {
        previousStyle.remove();
    }
    document.head.appendChild(styleSheet);
}


// funcion para guardar estilos en localStorage
function saveStylesToLocalStorage() {
    localStorage.setItem('chatStyles', JSON.stringify(styles));
}

// funcion para cargar estilos desde localStorage
function loadStylesFromLocalStorage() {
    const savedStyles = localStorage.getItem('chatStyles');
    if (savedStyles) {
        Object.assign(styles, JSON.parse(savedStyles));
        generateStyles();
    }
}


// funcion del color picker
function updateColorPicker(property) {
    const colorPicker = document.getElementById(property);
    if (colorPicker && styles[property]) {
   
        const colorValue = styles[property].match(/color:\s*([^;]+)/);
        if (colorValue) {
            colorPicker.value = colorValue[1];
        }
    }
}

// funcion que sirve el cambio de color
function changeChatColor(property, value) {
    const elementsToChange = {
        ms_color_background_body: '.bx-livechat-body',
        ms_color_letras_body : '.bx-livechat-help-title, .bx-livechat-help-subtitle',
        ms_color_letras_escribir_mensaje: '.bx-im-textarea-input',
        ms_color_textarea: '.bx-im-textarea',
        ms_color_boton_send: '.bx-im-textarea-send-button-bright-arrow',
        ms_color_header: '.bx-livechat-head',
        ms_color_livechat_username: '.bx-livechat-user-name',
    };

    if (elementsToChange[property]) {
        const elements = document.querySelectorAll(elementsToChange[property]);

        elements.forEach(el => {
            if (property === 'ms_color_letras_body' ||
                property === 'ms_color_letras_escribir_mensaje' ||
                property === 'ms_color_livechat_username') {
                el.style.setProperty('color', value, 'important');
                // Agregar al objeto de estilos
                styles[elementsToChange[property]] = `color: ${value} !important;`;
            } else {
                el.style.setProperty('background-color', value, 'important');
                // Agregar al objeto de estilos
                styles[elementsToChange[property]] = `background-color: ${value} !important;`;
            }
        });

        saveStylesToLocalStorage();
        generateStyles();
    }
}

loadStylesFromLocalStorage();


// funcion para cambiar la imagen
function changeChatImage(property, imageUrl) {
    const elementsToChange = {
        ms_background_image_file: '.bx-im-textarea-app-file',
        ms_background_image_smile: '.bx-im-textarea-app-smile',
        ms_background_image_body: '.bx-livechat-body',
        ms_background_image_close: '.bx-livechat-control-btn-close',
        ms_background_image_user_icon: '.bx-livechat-user-icon',
    };

  
    if (!imageUrl) {
        console.error('Invalid image URL');
        return;
    }


    if (elementsToChange[property]) {
        document.querySelectorAll(elementsToChange[property]).forEach(el => {
            el.style.cssText += `
                background-image: url(${imageUrl}) !important;
                background-repeat: no-repeat;
      
            `;

        
            styles[elementsToChange[property]] = `
                background-image: url(${imageUrl}) !important;
                background-repeat: no-repeat !important;
               
            `;
        });

        saveStylesToLocalStorage();
        generateStyles();
    }
}

loadStylesFromLocalStorage();
// funcion para cambiar la fuente
function changeChatFont(fontType, fontValue) {
    const elementsToChange = {
        ms_selected_font: '.bx-livechat-help-title, .bx-livechat-help-subtitle, .bx-livechat-help-title-sm',
        ms_selected_font_1: '.bx-livechat-user-name',
        ms_selected_font_2: '.bx-im-textarea-input::placeholder, .bx-im-textarea-input',
        ms_selected_font_3: '.bx-livechat-title',
    };

    if (elementsToChange[fontType]) {
        document.querySelectorAll(elementsToChange[fontType]).forEach(el => {
            el.style.setProperty('font-family', fontValue, 'important');
          
            styles[elementsToChange[fontType]] = `font-family: ${fontValue} !important;`;
        });

        saveStylesToLocalStorage();
        generateStyles();
    }
}

loadStylesFromLocalStorage();

// funcion para cambiar las dimensiones del chatbot
function changeChatDimension(paramName, value) {
    const chatWrapper = document.querySelector('.bx-livechat-wrapper');

    if (chatWrapper) {
        if (paramName === 'ms_width') {
            chatWrapper.style.setProperty('width', value + 'px', 'important');
           
            styles['.bx-livechat-wrapper'] = `width: ${value}px !important;`;
        } else if (paramName === 'ms_height') {
            chatWrapper.style.setProperty('height', value + 'px', 'important');
          
            styles['.bx-livechat-wrapper'] = `height: ${value}px !important;`;
        }
        saveStylesToLocalStorage();
        generateStyles();
    }
}

// llamo funcion para cargar estilos desde localStorage 
loadStylesFromLocalStorage();

// actualiza el color picker al cargar la pagina
updateColorPicker('ms_color_letras_body');
updateColorPicker('ms_color_background_body');
updateColorPicker('ms_color_letras_escribir_mensaje');
updateColorPicker('ms_color_textarea');
updateColorPicker('ms_color_boton_send');
updateColorPicker('ms_color_header');
updateColorPicker('ms_color_livechat_username');


// lo que se ve dentro del modal
const shortcodeAttributes = [
    { param_name: 'ms_color_header', description: 'Selecciona el color de fondo deseado para el encabezado del chatbot:' },
    { param_name: 'ms_color_background_body', description: 'Selecciona el color de fondo que deseas para el área central del chatbot:' },
    { param_name: 'ms_color_letras_body', description: 'Selecciona el color del texto que se mostrará en el cuerpo del chatbot:' },
    { param_name: 'ms_color_letras_escribir_mensaje', description: 'Selecciona el color del texto que se mostrará al redactar un mensaje:' },
    { param_name: 'ms_color_textarea', description: 'Selecciona el color del área de texto destinada a la redacción del mensaje:' },
    { param_name: 'ms_color_boton_send', description: 'Selecciona el color del botón de envío del mensaje:' },
    { param_name: 'ms_color_livechat_username', description: 'Selecciona el color del texto que se mostrará en el nombre de usuario:' },
    { param_name: 'ms_selected_font', description: 'Seleccione la fuente que desea utilizar para el párrafo central:' },
    { param_name: 'ms_selected_font_1', description: 'Seleccione la fuente que desea utilizar para el párrafo situado debajo del ícono:' },
    { param_name: 'ms_selected_font_2', description: 'Seleccione la fuente que desea utilizar para el texto dentro del área de redacción:' },
    { param_name: 'ms_selected_font_3', description: 'Seleccione la fuente que desea utilizar para el título del chat:' },
    { param_name: 'ms_width', description: 'Configura el ancho del chat según tus necesidades:' },
    { param_name: 'ms_height', description: 'Configura la altura del chat según tus necesidades:' },
    { param_name: 'ms_background_image_file', description: 'Proporciona la URL para personalizar la imagen del ícono de adjuntar archivos: (10x16)' },
    { param_name: 'ms_background_image_smile', description: 'Proporciona la URL para modificar la imagen de acceso a los emoticones: (16x15)' },
    { param_name: 'ms_background_image_body', description: 'Proporciona la URL para cambiar la imagen del área central del chat:' },
    { param_name: 'ms_background_image_close', description: 'Proporciona la URL para personalizar la imagen del ícono de cierre del chat: (12x12)' },
    { param_name: 'ms_background_image_user_icon', description: 'Proporciona la URL para cambiar el ícono de usuario en el centro del chat:' },
];



// funcion para sacar el style important de la clase bx-livechat-head impuesto por bitrix

document.addEventListener("DOMContentLoaded", function () {
    const livechatHeadSelector = '.bx-livechat-head';
    let styleApplied = false; 

 
    function modifyStyle() {
        const livechatHead = document.querySelector(livechatHeadSelector);
        if (livechatHead) {
          
            if (!styleApplied) {
                const currentStyle = livechatHead.getAttribute('style');
                if (currentStyle && currentStyle.includes('/*')) {
                    const newStyle = currentStyle.replace(/\/\*.*?\*\//g, '').trim(); document.addEventListener("DOMContentLoaded", function () {
                        const livechatHeadSelector = '.bx-livechat-head';
                        let styleApplied = false; 

                   
                        function modifyStyle() {
                            const livechatHead = document.querySelector(livechatHeadSelector);
                            if (livechatHead) {
                        
                                if (!styleApplied) {
                                    const currentStyle = livechatHead.getAttribute('style');
                                    if (currentStyle && currentStyle.includes('/*')) {
                                        const newStyle = currentStyle.replace(/\/\*.*?\*\//g, '').trim();
                                        livechatHead.setAttribute('style', newStyle);
                                    }
                                    livechatHead.style.backgroundColor = 'rgb(255, 0, 0)'; 
                                    styleApplied = true;
                                    console.log("Estilo modificado y aplicado.");
                                }
                            } else {
                               
                                styleApplied = false;
                            }
                        }

                 
                        var observer = new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutation) {
                                if (mutation.addedNodes.length > 0 || mutation.type === 'attributes') {
                                    modifyStyle(); 
                                }
                            });
                        });

                       
                        observer.observe(document.body, { childList: true, subtree: true, attributes: true });

                     
                        var chatContainer = document.querySelector('[data-b24-crm-button-pulse]');
                        if (chatContainer) {
                            var chatObserver = new MutationObserver(function (mutations) {
                                mutations.forEach(function (mutation) {
                                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                                        modifyStyle(); 
                                    }
                                });
                            });

                          
                            chatObserver.observe(chatContainer, { attributes: true });
                        }

                        modifyStyle();
                    });

                    livechatHead.setAttribute('style', newStyle);
                }
                livechatHead.style.backgroundColor = 'rgb(255, 0, 0)'; 
                styleApplied = true; 

            }
        } else {
           
            styleApplied = false;
        }
    }

 
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0 || mutation.type === 'attributes') {
                modifyStyle(); 
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

 
    var chatContainer = document.querySelector('[data-b24-crm-button-pulse]');
    if (chatContainer) {
        var chatObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    modifyStyle(); 
                }
            });
        });

      
        chatObserver.observe(chatContainer, { attributes: true });
    }

   
    modifyStyle();
});

// CSS

const style = document.createElement('style');
style.innerHTML = `
.bx-livechat-copyright {
    display: none !important;
}

.bx-livechat-body {
background-size:cover !important;


}

.bx-im-textarea-app-file {
 width:10px !important;
 height:16px !important;
}
.bx-im-textarea-app-smile {
 width:16px !important;
 height:15px !important;
}
.bx-livechat-control-btn-close {
 width:12px !important;
 height:12px !important;
}




.color-texto-inputs {
  margin-top:30px
}

.spacer-color-de-texto {
margin-top:20px
}

.color-fondo-inputs{
margin-top:30px;
}

.fuentes-inputs {
margin-top:30px;
}

.spacer-fuentes {
    margin-bottom: 25px; 
}

#ms_selected_font {
display:flex;
margin:0 auto;
margin-top:15px
}
#ms_selected_font_1 {
display:flex;
margin:0 auto;
margin-top:15px
}
#ms_selected_font_2 {
display:flex;
margin:0 auto;
margin-top:15px
}
#ms_selected_font_3 {
display:flex;
margin:0 auto;
margin-top:15px
}

.imagenes-inputs {
margin-top:30px;
}

.dimensiones-inputs {
margin-top:30px;
}

    ::-webkit-scrollbar {
        display: none;
    }

`;
document.head.appendChild(style);

// funcion para crear modal 
function createTabbedModal(shortcodeAttributes) {
    const modal = document.createElement('div');
    modal.style.width = '90%'; 
    modal.style.maxWidth = '400px'; 
    modal.style.height = '90%'; 
    modal.style.maxHeight = '550px'; 
    modal.style.border = '1px solid #ccc';
    modal.style.borderRadius = '8px';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    modal.style.backgroundColor = '#fff';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '1000';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.overflowY = 'auto'; 

    const title = document.createElement('h3');
    title.innerText = 'Configuración del Chatbot';
    title.style.textAlign = 'center';
    modal.appendChild(title);

    // Creo contenedor de pestañas
    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    const tabs = ['Color de Texto', 'Color de Fondo', 'Fuentes', 'Dimensiones', 'Imágenes'];
    const contentContainer = document.createElement('div');

    // Creo las pestañas
    tabs.forEach((tab, index) => {
        const tabButton = document.createElement('button');
        tabButton.innerText = tab;
        tabButton.style.flex = '1';
        tabButton.style.padding = '10px';
        tabButton.style.border = 'none';
        tabButton.style.backgroundColor = (index === 0) ? '#d0d0d0' : '#f0f0f0';
        tabButton.style.cursor = 'pointer';

        // Mostrar contenido de la pestaña correspondiente
        tabButton.addEventListener('click', () => {
            const contents = contentContainer.children;
            for (let i = 0; i < contents.length; i++) {
                contents[i].style.display = (i === index) ? 'block' : 'none';
            }

            for (let j = 0; j < tabs.length; j++) {
                tabContainer.children[j].style.backgroundColor = (j === index) ? '#d0d0d0' : '#f0f0f0';
            }
        });

        tabContainer.appendChild(tabButton);
    });

    modal.appendChild(tabContainer);
    modal.appendChild(contentContainer);

    // Defino categorías y parámetros
    const categories = {
        'Color de Texto': [
            'ms_color_letras_body',
            'ms_color_letras_escribir_mensaje',
            'ms_color_livechat_username',
        ],
        'Color de Fondo': [
            'ms_color_header',
            'ms_color_background_body',
            'ms_color_textarea',
            'ms_color_boton_send'
        ],
        'Fuentes': [
            'ms_selected_font',
            'ms_selected_font_1',
            'ms_selected_font_2',
            'ms_selected_font_3'
        ],
        'Dimensiones': ['ms_width', 'ms_height'],
        'Imágenes': [
            'ms_background_image_body',
            'ms_background_image_file',
            'ms_background_image_smile',
            'ms_background_image_close',
            'ms_background_image_user_icon'
        ],
    };

    // Clases CSS para cada categoría
    const categoryClasses = {
        'Color de Texto': 'color-texto-inputs',
        'Color de Fondo': 'color-fondo-inputs',
        'Fuentes': 'fuentes-inputs',
        'Dimensiones': 'dimensiones-inputs',
        'Imágenes': 'imagenes-inputs',
    };

  
    for (const [category, attributes] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = categoryClasses[category]; 
        categoryDiv.style.display = 'none';

        if (category === 'Imágenes') {
            const message = document.createElement('p');
            message.innerText = 'Para visualizar los cambios , los inputs donde se ingresan las URL de las imágenes a modificar no deben estar vacíos.';
            message.style.fontWeight = 'bold';
            message.style.color = 'red';
            message.style.marginTop = '-20px';
            message.style.marginBottom = '15px'; 
            categoryDiv.appendChild(message);
        }
    

        attributes.forEach(attr => {
            const attribute = shortcodeAttributes.find(attrObj => attrObj.param_name === attr);
            if (attribute) {
                const label = document.createElement('label');
         
                const description = document.createElement('strong');
                description.innerText = attribute.description;
                description.style.display = 'block';
                description.style.marginBottom = '10px';
    
                label.appendChild(description); 

                const borderBottomDiv = document.createElement('div');
                borderBottomDiv.style.borderBottom = '1px solid #ddd';
                borderBottomDiv.style.paddingBottom = '10px';

          
                const spacerClass = `spacer-${category.replace(/\s+/g, '-').toLowerCase()}`;

                // Crea el espaciador
                const spacerDiv = document.createElement('div');
                spacerDiv.className = spacerClass;
                spacerDiv.style.marginBottom = '10px'; 

                if (category === 'Fuentes' && attr.startsWith('ms_selected_font')) {
                    const select = document.createElement('select');
                    select.id = attr;
                    const fonts = {
                        "Arial": "Arial, sans-serif",
                        "Verdana": "Verdana, sans-serif",
                        "Cursive": "cursive, sans-serif",
                        "Georgia": "Georgia, serif",
                        "Times New Roman": "'Times New Roman', serif",
                        "MatchaMilkDemo": "MatchaMilkDemo",
                        "Museo-Sans": "MuseoSans500",
                        "Roboto-Black": "RobotoBlack",
                        "Roboto-Regular": "RobotoRegular"
                    };

                    for (const [fontName, fontValue] of Object.entries(fonts)) {
                        const option = document.createElement('option');
                        option.value = fontValue;
                        option.innerText = fontName;
                        select.appendChild(option);
                    }

                    const storedFont = localStorage.getItem(attr);
                    if (storedFont) {
                        select.value = storedFont;
                        changeChatFont(attr, storedFont);
                    }

                    select.addEventListener('change', (event) => {
                        const value = event.target.value;
                        changeChatFont(attr, value);
                        localStorage.setItem(attr, value);
                    });

                    borderBottomDiv.appendChild(label);
                    borderBottomDiv.appendChild(select);
                    categoryDiv.appendChild(borderBottomDiv);
                } else if (category === 'Dimensiones' && (attr === 'ms_width' || attr === 'ms_height')) {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.id = attr;
                    input.placeholder = `Ingrese ${attr === 'ms_width' ? 'ancho' : 'alto'} en píxeles`;

                    const storedDimension = localStorage.getItem(attr);
                    if (storedDimension) {
                        input.value = storedDimension;
                        changeChatDimension(attr, storedDimension);
                    }

                    input.addEventListener('input', (event) => {
                        const value = event.target.value;
                        changeChatDimension(attr, value);
                        localStorage.setItem(attr, value);
                    });

                    borderBottomDiv.appendChild(label);
                    borderBottomDiv.appendChild(input);
                    categoryDiv.appendChild(borderBottomDiv);
                } else {
                    const input = document.createElement('input');
                    input.type = (attr.startsWith('ms_color_')) ? 'color' : (attr.startsWith('ms_background_image_') ? 'url' : 'text');

                    const storedValue = localStorage.getItem(attr);
                    if (storedValue) {
                        input.value = storedValue;
                        if (attr.startsWith('ms_color_')) {
                            changeChatColor(attr, storedValue);
                        } else if (attr.startsWith('ms_background_image_')) {
                            changeChatImage(attr, storedValue);
                        }
                    }

                    label.style.display = 'block';
                    label.style.marginBottom = '5px';
                    input.style.marginBottom = '10px';
                    input.style.border = '1px solid #ccc';
                    input.style.padding = '5px';
                    input.style.width = '100%';

                    input.addEventListener('input', (event) => {
                        const value = event.target.value;
                        if (attr.startsWith('ms_color_')) {
                            changeChatColor(attr, value);
                        } else if (attr.startsWith('ms_background_image_')) {
                            changeChatImage(attr, value);
                        } else {
                            changeChatDimension(attr, value);
                        }
                        localStorage.setItem(attr, value);
                    });

                    borderBottomDiv.appendChild(label);
                    borderBottomDiv.appendChild(input);
                    categoryDiv.appendChild(borderBottomDiv);
                }
              
                categoryDiv.appendChild(spacerDiv);
            }
        });
        contentContainer.appendChild(categoryDiv);
    }

 
    const firstContentDiv = contentContainer.children[0];
    if (firstContentDiv) {
        firstContentDiv.style.display = 'block';
    }

 
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = 'auto'; 
    buttonContainer.style.textAlign = 'center'; 
    buttonContainer.style.padding = '10px 0';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.style.width = '100%';
    closeButton.style.padding = '10px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '5px';

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';  
        modalOpened = false;  
    });

    buttonContainer.appendChild(closeButton);
    modal.appendChild(buttonContainer);


    document.body.appendChild(modal);
}

// funcion que crea el boton que abre el modal, con sus animaciones 

let modalOpened = false;

function createOpenModalButton() {
    // El script va a estar activo en todas las paginas, entonces decido solo que el boton se vea en index.html (Esto se debe cambiar a la pagina que usen de configuracion)
    if (window.location.pathname.endsWith('index.html')) {
        const button = document.createElement('button');
        button.innerText = '➕';  
        button.style.width = '50px';  
        button.style.height = '50px'; 
        button.style.backgroundColor = '#4CAF50'; 
        button.style.color = '#fff'; 
        button.style.border = 'none';
        button.style.borderRadius = '50%';  
        button.style.cursor = 'pointer';
        button.style.fontSize = '24px';  
        button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        button.style.transition = 'transform 0.3s ease, all 0.3s ease'; 
        button.style.position = 'fixed'; 
        button.style.bottom = '20px';  
        button.style.left = '20px';  
        button.classList.add('clase'); 

        const message = document.createElement('div');
        message.innerText = 'Abrir configuración del chatbot';
        message.style.position = 'fixed'; 
        message.style.bottom = '50px'; 
        message.style.left = '80px'; 
        message.style.transform = 'translateY(0)'; 
        message.style.color = '#000'; 
        message.style.padding = '15px 20px'; 
        message.style.borderRadius = '8px'; 
        message.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)'; 
        message.style.opacity = '0'; 
        message.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; 
        message.style.pointerEvents = 'none'; 
        message.style.fontSize = '14px'; 
        message.style.fontWeight = 'bold'; 
        message.style.textAlign = 'center'; 
        message.style.zIndex = '1000'; 
        message.style.border = '2px solid #fff'; 
        
        button.addEventListener('mouseenter', () => {
            if (!modalOpened) {  
                message.style.transform = 'translateY(0)'; 
                message.style.opacity = '1'; 
            }
        });

        button.addEventListener('mouseleave', () => {
            message.style.opacity = '0'; 
            message.style.transform = 'translateY(-10px)'; 
        });

        button.addEventListener('mouseenter', () => {
            if (!modalOpened) {  
                button.style.transform = 'scale(1.1) rotate(360deg)'; 
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';  
        });

        button.addEventListener('click', () => {
            if (!modalOpened) {  
                createTabbedModal(shortcodeAttributes);  
                modalOpened = true;  
            }
        });

        document.body.appendChild(message);
        document.body.appendChild(button); 
    }
}

createOpenModalButton();
