const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false // if capslock is on, the text gets automatically sorrounded by dollar signs
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        let latexSymbol;

        const fragment = document.createDocumentFragment();
        
        const keyLayout = [
            "\u2208", "\u2209", "\u220b", "\u220c", "\u2203", "\u2204", "\u2200", "\u2205", "\u2286", "\u2287", "backspace",
            "\u2282", "\u2283","\u2288", "\u2289", "\u22c3", "\u22c2", "\u2206", "\u2264", "\u2265", "\u2245",
            "caps", "\u2211", "\u220f", "\u221A", "\u221B", "\u221C", "\u222B", "\u222E", "\u222c", "\u222f", "enter",
            "done", "{", "|", "log", "ln", "\u00b0", "\u00b9", "\u00b2", "\u2081", "\u2082", "$",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "\u2245", "enter", "$"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock); // turn on light
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;
					
				case "\u2208":
				    keyElement.textContent = key;
					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock ? "$".concat("\\in" , "$") : "\\in";
						this._triggerEvent("oninput");
                    });
				
					break;
					
				case "\u2209":
					keyElement.textContent = key;
					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock ? "$".concat("\\notin" , "$") : "\\notin";
						this._triggerEvent("oninput");
                    });
				
					break;
					
				case "\u220b":
					keyElement.textContent = key;
					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock ? "$".concat("\\ni" , "$") : "\\ni";
						this._triggerEvent("oninput");
                    });
					
				case "\u220c":
					keyElement.textContent = key;
					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock ? "$".concat("\\notni" , "$") : "\\notni";
						this._triggerEvent("oninput");
                    });
				
					break;
					
				case "\u2203":
					keyElement.textContent = key;
					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock ? "$".concat("\\exists" , "$") : "\\exists";
						this._triggerEvent("oninput");
                    });
				
					break;

                case "\u2204":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\nexists" , "$") : "\\nexists";
                        this._triggerEvent("oninput");
                    });
                    
                        break;

                case "\u2200":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\forall" , "$") : "\\forall";
                        this._triggerEvent("oninput");
                    });
                            
                    break;
				
                case "\u2205":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\emptyset" , "$") : "\\emptyset";
                        this._triggerEvent("oninput");
                    });
                                
                    break;

                case "\u2286":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\subseteqq " , "$") : "\\subseteqq";
                        this._triggerEvent("oninput");
                    });
                                
                    break;

                case "\u2287":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\supseteqq " , "$") : "\\supseteqq";
                        this._triggerEvent("oninput");
                    });
                                
                    break;

                case "\u2282":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\subset " , "$") : "\\subset";
                        this._triggerEvent("oninput");
                    });
                                
                    break;

                case "\u2283":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\supset " , "$") : "\\supset";
                        this._triggerEvent("oninput");
                    });
                                
                    break;

                case "\u2288":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\nsubseteq " , "$") : "\\nsubseteq";
                        this._triggerEvent("oninput");
                     });
                                    
                    break;

                case "\u2289":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\nsupseteq " , "$") : "\\nsupseteq";
                        this._triggerEvent("oninput");
                     });
                                    
                    break;

                case "\u22c3":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\cup " , "$") : "\\cup";
                        this._triggerEvent("oninput");
                     });
                                    
                    break;               
                    
                case "\u22c2":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\cap " , "$") : "\\cap";
                        this._triggerEvent("oninput");
                     });
                                    
                    break;
                    
                case "\u2206":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\bigtriangleup " , "$") : "\\bigtriangleup";
                        this._triggerEvent("oninput");
                     });
                                    
                    break; 
                    
                case "\u2264":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\leq " , "$") : "\\leq";
                        this._triggerEvent("oninput");
                    });
                                        
                    break;  
                    
                case "\u2265":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? "$".concat("\\geq " , "$") : "\\geq";
                        this._triggerEvent("oninput");
                    });

                    break;

                    case "\u2245":
                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? "$".concat("\\cong " , "$") : "\\cong";
                            this._triggerEvent("oninput");
                        });
                                        
                    break;  

                default:
                    keyElement.textContent = key;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

Keyboard.init();

