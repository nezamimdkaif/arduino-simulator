// main.js - Main application logic with FIXED simulation

// Global state
window.circuitComponents = [];
let draggedType = null;
let componentIdCounter = 0;

// Available Arduino pins (digital 2-13 as per requirements)
const AVAILABLE_PINS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const DEFAULT_LED_PIN = 10;
const DEFAULT_BUTTON_PIN = 2;

// Component Class
class Component {
    constructor(type, id, x, y) {
        this.type = type;
        this.id = id;
        this.x = x;
        this.y = y;
        this.element = null;

        if (type === 'led') {
            this.pin = DEFAULT_LED_PIN;
            this.state = false;
        } else if (type === 'button') {
            this.pin = DEFAULT_BUTTON_PIN;
            this.pressed = false;
        }
    }

    setState(state) {
        if (this.type !== 'led') return;
        this.state = state;
        this.updateVisual();
    }

    setPressed(pressed) {
        if (this.type !== 'button') return;
        this.pressed = pressed;
        console.log(`🔘 Button ${pressed ? 'PRESSED' : 'RELEASED'}`);
        this.updateVisual();
    }

    isPressed() {
        return this.type === 'button' ? this.pressed : false;
    }

    updateVisual() {
        if (this.type === 'led') {
            const ledDisplay = this.element.querySelector('.led-display');
            if (ledDisplay) {
                if (this.state) {
                    ledDisplay.classList.add('on');
                    console.log('💡 LED ON');
                } else {
                    ledDisplay.classList.remove('on');
                    console.log('💡 LED OFF');
                }
            }
        } else if (this.type === 'button') {
            const btnDisplay = this.element.querySelector('.button-display');
            if (btnDisplay) {
                if (this.pressed) {
                    btnDisplay.classList.add('pressed');
                } else {
                    btnDisplay.classList.remove('pressed');
                }
            }
        }
    }

    setPin(newPin) {
        this.pin = newPin;
        updatePinDisplay(this);
        // autoGenerateCode(); // Disabled per user request
        showToast('Pin changed. Click "Generate Code" to update.', 'info');
    }

    render() {
        const div = document.createElement('div');
        div.className = `dropped-component ${this.type}`;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.dataset.id = this.id;

        let innerHTML = '';

        if (this.type === 'arduino') {
            innerHTML = `
                <div class="component-header">
                    <span class="component-title">Arduino Uno</span>
                    <button class="component-delete" onclick="deleteComponent(${this.id})">×</button>
                </div>
                <div class="component-body">
                    <div class="arduino-visual">
                        <div class="arduino-board"></div>
                    </div>
                    <div class="arduino-pins">
                        <div class="pin-row"><span>Digital 2-13</span></div>
                        <div class="pin-row"><span>5V / GND</span></div>
                    </div>
                </div>
            `;
        } else if (this.type === 'led') {
            innerHTML = `
                <div class="component-header">
                    <span class="component-title">LED</span>
                    <button class="component-delete" onclick="deleteComponent(${this.id})">×</button>
                </div>
                <div class="component-body">
                    <div class="led-display ${this.state ? 'on' : ''}"></div>
                    <div class="pin-config">
                        <label>Pin: <span id="led-pin-${this.id}">${this.pin}</span></label>
                        <select onchange="changePinForComponent(${this.id}, this.value)">
                            ${this.getPinOptions()}
                        </select>
                    </div>
                </div>
            `;
        } else if (this.type === 'button') {
            innerHTML = `
                <div class="component-header">
                    <span class="component-title">Push Button</span>
                    <button class="component-delete" onclick="deleteComponent(${this.id})">×</button>
                </div>
                <div class="component-body">
                    <div class="button-display" id="button-display-${this.id}">
                        <span style="font-size: 10px; color: #fff; user-select: none; pointer-events: none;">PRESS</span>
                    </div>
                    <div class="pin-config">
                        <label>Pin: <span id="button-pin-${this.id}">${this.pin}</span></label>
                        <select onchange="changePinForComponent(${this.id}, this.value)">
                            ${this.getPinOptions()}
                        </select>
                    </div>
                </div>
            `;
        }

        div.innerHTML = innerHTML;
        this.element = div;

        // Make draggable
        this.makeDraggable();

        if (this.type === 'button') {
            const btnDisplay = div.querySelector('.button-display');
            if (btnDisplay) {
                console.log('✅ Button event handlers attached immediately');

                // Mouse events
                btnDisplay.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🖱️ Mouse DOWN on button');

                    // ALWAYS press visually, even if simulation is stopped (Physical button behavior)
                    this.setPressed(true);

                    if (window.simulationEngine && window.simulationEngine.running) {
                        // Attach global release listener
                        const handleRelease = () => {
                            console.log('🖱️ Global Mouse UP - Releasing button');
                            this.setPressed(false);
                            window.removeEventListener('mouseup', handleRelease);
                        };

                        window.addEventListener('mouseup', handleRelease);
                    } else {
                        console.log('ℹ️ Simulation not running, but button pressed visually');
                        // For visual feel, release after a short delay or allow "stuck" press until mouse up local
                        const handleReleaseLocal = () => {
                            this.setPressed(false);
                            window.removeEventListener('mouseup', handleReleaseLocal);
                        };
                        window.addEventListener('mouseup', handleReleaseLocal);
                    }
                });

                // Touch events for mobile
                btnDisplay.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    // Always press visually
                    this.setPressed(true);
                });

                btnDisplay.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.setPressed(false);
                });

                // Visual feedback
                btnDisplay.style.cursor = 'pointer';
                btnDisplay.style.userSelect = 'none';
            }
        }

        return div;
    }

    getPinOptions() {
        const usedPins = window.circuitComponents
            .filter(c => c.id !== this.id && (c.type === 'led' || c.type === 'button'))
            .map(c => c.pin);

        return AVAILABLE_PINS.map(pin => {
            const disabled = usedPins.includes(pin) ? 'disabled' : '';
            const selected = pin === this.pin ? 'selected' : '';
            return `<option value="${pin}" ${disabled} ${selected}>Pin ${pin}</option>`;
        }).join('');
    }

    makeDraggable() {
        let isDragging = false;
        let startX, startY, offsetX, offsetY;

        this.element.addEventListener('mousedown', (e) => {
            // Don't drag if clicking button, select, or button display
            if (e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'SELECT' ||
                e.target.classList.contains('button-display') ||
                e.target.closest('.button-display')) {
                return;
            }

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = this.element.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            this.element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dropZone = document.getElementById('dropZone');
            const rect = dropZone.getBoundingClientRect();

            let newX = e.clientX - rect.left - offsetX;
            let newY = e.clientY - rect.top - offsetY;

            // Keep within bounds
            newX = Math.max(0, Math.min(newX, dropZone.clientWidth - this.element.offsetWidth));
            newY = Math.max(0, Math.min(newY, dropZone.clientHeight - this.element.offsetHeight));

            this.element.style.left = newX + 'px';
            this.element.style.top = newY + 'px';
            this.x = newX;
            this.y = newY;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                this.element.style.cursor = 'move';
            }
        });
    }
}

// Initialize drag and drop
function initDragAndDrop() {
    const items = document.querySelectorAll('.component-item');
    const dropZone = document.getElementById('dropZone');

    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedType = e.target.closest('.component-item').dataset.type;
            e.dataTransfer.effectAllowed = 'copy';
        });

        item.addEventListener('dragend', () => {
            draggedType = null;
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedType) return;

        // Check if Arduino already exists
        if (draggedType === 'arduino') {
            const hasArduino = window.circuitComponents.some(c => c.type === 'arduino');
            if (hasArduino) {
                showToast('Only one Arduino Uno allowed!', 'error');
                return;
            }
        }

        const rect = dropZone.getBoundingClientRect();
        const x = e.clientX - rect.left - 60;
        const y = e.clientY - rect.top - 40;

        addComponent(draggedType, x, y);
        dropZone.classList.add('has-components');
    });
}

// Add component to canvas
function addComponent(type, x, y) {
    const id = componentIdCounter++;
    const component = new Component(type, id, x, y);

    window.circuitComponents.push(component);

    const dropZone = document.getElementById('dropZone');
    dropZone.appendChild(component.render());

    updateStatus();
    autoGenerateCode();
    showToast(`${type.toUpperCase()} added to canvas`, 'success');
}

// Delete component
function deleteComponent(id) {
    const index = window.circuitComponents.findIndex(c => c.id === id);
    if (index === -1) return;

    const component = window.circuitComponents[index];
    component.element.remove();
    window.circuitComponents.splice(index, 1);

    const dropZone = document.getElementById('dropZone');
    if (window.circuitComponents.length === 0) {
        dropZone.classList.remove('has-components');
    }

    updateStatus();
    autoGenerateCode();
    showToast(`Component removed`, 'success');
}

// Change pin for component
function changePinForComponent(id, newPin) {
    const component = window.circuitComponents.find(c => c.id === id);
    if (!component) return;

    newPin = parseInt(newPin);

    // Check if pin is already used by another component
    const pinInUse = window.circuitComponents.some(c =>
        c.id !== id && (c.type === 'led' || c.type === 'button') && c.pin === newPin
    );

    if (pinInUse) {
        showToast('Pin already in use!', 'error');
        return;
    }

    component.setPin(newPin);

    // Update all selects to reflect new availability
    updateAllPinSelects();

    showToast(`Pin changed to ${newPin}`, 'success');
}

// Update pin display
function updatePinDisplay(component) {
    const span = document.getElementById(`${component.type}-pin-${component.id}`);
    if (span) {
        span.textContent = component.pin;
    }
}

// Update all pin selects
function updateAllPinSelects() {
    window.circuitComponents.forEach(component => {
        if (component.type === 'led' || component.type === 'button') {
            const select = component.element.querySelector('select');
            if (select) {
                const currentValue = component.pin;
                select.innerHTML = component.getPinOptions();
                select.value = currentValue;
            }
        }
    });
}

// Auto-generate Arduino code
function autoGenerateCode() {
    const codeDisplay = document.getElementById('codeDisplay');

    const arduino = window.circuitComponents.find(c => c.type === 'arduino');
    const led = window.circuitComponents.find(c => c.type === 'led');
    const button = window.circuitComponents.find(c => c.type === 'button');

    if (!arduino || !led || !button) {
        codeDisplay.textContent = '// Add Arduino, LED, and Button to generate code';
        return;
    }

    const code = `const int LED_PIN = ${led.pin};
const int BUTTON_PIN = ${button.pin};

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  digitalWrite(LED_PIN, LOW); // LED Off by default
}

void loop() {
  // Read button (INPUT_PULLUP means Low = Pressed)
  int state = digitalRead(BUTTON_PIN);
  
  if (state == LOW) {
    digitalWrite(LED_PIN, HIGH); // Turn LED On
  } else {
    digitalWrite(LED_PIN, LOW);  // Turn LED Off
  }
}`;

    codeDisplay.textContent = code;
}

// Update status panel
function updateStatus() {
    const statusContent = document.getElementById('statusContent');
    statusContent.innerHTML = window.simulationEngine.getStatus();
}

// Show toast notification
function showToast(message, type = 'success') {
    window.simulationEngine.showToast(message, type);
}

// Clear canvas
function clearCanvas() {
    if (confirm('Clear all components?')) {
        window.circuitComponents.forEach(c => c.element.remove());
        window.circuitComponents = [];

        const dropZone = document.getElementById('dropZone');
        dropZone.classList.remove('has-components');

        updateStatus();
        autoGenerateCode();
        showToast('Canvas cleared', 'success');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Arduino Simulator Initialized');

    initDragAndDrop();

    // Simulate button
    document.getElementById('simulateBtn').addEventListener('click', () => {
        console.log('▶️ Start Simulation clicked');
        if (window.simulationEngine.start()) {
            document.getElementById('simulateBtn').style.display = 'none';
            document.getElementById('stopBtn').style.display = 'inline-block';
            updateStatus();
        }
    });

    // Stop button
    document.getElementById('stopBtn').addEventListener('click', () => {
        console.log('⏹️ Stop Simulation clicked');
        window.simulationEngine.stop();
        document.getElementById('simulateBtn').style.display = 'inline-block';
        document.getElementById('stopBtn').style.display = 'none';
        updateStatus();
    });

    // Clear canvas button
    document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

    // Auto Wire button
    const autoWireBtn = document.getElementById('autoWireBtn');
    if (autoWireBtn) {
        autoWireBtn.addEventListener('click', () => {
            console.log('🔗 Auto Wire clicked');
            autoGenerateCode(); // Ensures logical connection
            showToast('Auto-wiring complete: Components connected!', 'success');
        });
    }

    // Generate code button
    document.getElementById('generateCode').addEventListener('click', () => {
        autoGenerateCode();
        showToast('Code generated!', 'success');
    });

    // Toggle view button
    const toggleBtn = document.getElementById('toggleView');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const codeSidebar = document.querySelector('.code-sidebar');
            const currentDisplay = window.getComputedStyle(codeSidebar).display;

            if (currentDisplay === 'none') {
                codeSidebar.style.display = 'flex';
                this.textContent = 'Hide Code View';
            } else {
                codeSidebar.style.display = 'none';
                this.textContent = 'Show Code View';
            }
        });
    }

    // Initial status update
    updateStatus();

    console.log('✅ All event listeners attached');
});

// Make functions globally accessible
window.deleteComponent = deleteComponent;
window.changePinForComponent = changePinForComponent; 