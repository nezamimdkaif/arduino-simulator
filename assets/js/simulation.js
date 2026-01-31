// simulation.js - Arduino Logic Simulation Engine

class SimulationEngine {
    constructor() {
        this.running = false;
        this.interval = null;
        this.updateRate = 50; // milliseconds
    }

    start() {
        if (this.running) {
            console.warn("⚠️ Simulation already running");
            return;
        }

        const validation = this.validateCircuit();
        if (!validation.valid) {
            this.showToast(validation.error, 'error');
            return false;
        }

        this.running = true;
        console.log("🟢 Simulation Started");
        this.showToast("Simulation started successfully!", 'success');

        // Update simulation state at fixed intervals
        this.interval = setInterval(() => {
            this.update();
        }, this.updateRate);

        return true;
    }

    stop() {
        if (!this.running) return;

        this.running = false;
        console.log("🔴 Simulation Stopped");
        this.showToast("Simulation stopped", 'success');

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        // Turn OFF all LEDs when simulation stops
        const leds = window.circuitComponents.filter(c => c.type === "led");
        leds.forEach(led => {
            led.setState(false);
        });

        // Release all buttons
        const buttons = window.circuitComponents.filter(c => c.type === "button");
        buttons.forEach(btn => {
            btn.setPressed(false);
        });
    }

    validateCircuit() {
        const arduino = window.circuitComponents.find(c => c.type === "arduino");
        if (!arduino) {
            return { valid: false, error: "Please add Arduino Uno to the canvas!" };
        }

        const led = window.circuitComponents.find(c => c.type === "led");
        if (!led) {
            return { valid: false, error: "Please add an LED to the canvas!" };
        }

        const button = window.circuitComponents.find(c => c.type === "button");
        if (!button) {
            return { valid: false, error: "Please add a Push Button to the canvas!" };
        }

        // Check for pin conflicts
        if (led.pin === button.pin) {
            return { valid: false, error: "LED and Button cannot share the same pin!" };
        }

        return { valid: true };
    }

    update() {
        if (!this.running) return;

        const leds = window.circuitComponents.filter(c => c.type === "led");
        const buttons = window.circuitComponents.filter(c => c.type === "button");

        if (leds.length === 0 || buttons.length === 0) return;

        // Logic: Button Controls LED (Task 3 Requirement)
        // Iterate through buttons to find state. 
        // For screening task simplicity (1 LED, 1 Button), we map directly.

        buttons.forEach(btn => {
            const isPressed = btn.isPressed();

            // Only log changes to avoid spam
            if (btn._lastState !== isPressed) {
                // Determine Log Level based on importance
                console.log(`[Sim] Button Pin ${btn.pin}: ${isPressed ? 'PRESSED' : 'RELEASED'}`);
                btn._lastState = isPressed;
            }

            leds.forEach(led => {
                led.setState(isPressed);
            });
        });

        // Update the status panel with real-time state
        if (window.updateStatus) {
            window.updateStatus();
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    getStatus() {
        const arduino = window.circuitComponents.find(c => c.type === "arduino");
        const led = window.circuitComponents.find(c => c.type === "led");
        const button = window.circuitComponents.find(c => c.type === "button");

        let status = [];

        if (arduino) {
            status.push(`<p><strong>✓ Arduino Uno</strong> added</p>`);
        } else {
            status.push(`<p><strong>✗ Arduino Uno</strong> required</p>`);
        }

        if (led) {
            const stateText = led.state ? '<span style="color:#51cf66; font-weight:bold;">ON</span>' : '<span style="color:#868e96;">OFF</span>';
            status.push(`<p><strong>✓ LED</strong> on Pin ${led.pin} - ${stateText}</p>`);
        } else {
            status.push(`<p><strong>✗ LED</strong> required</p>`);
        }

        if (button) {
            const stateText = button.pressed ? '<span style="color:#51cf66; font-weight:bold;">PRESSED</span>' : '<span style="color:#868e96;">RELEASED</span>';
            status.push(`<p><strong>✓ Button</strong> on Pin ${button.pin} - ${stateText}</p>`);
        } else {
            status.push(`<p><strong>✗ Button</strong> required</p>`);
        }

        if (this.running) {
            status.push(`<p style="color: #51cf66;"><strong>▶ Simulation Active</strong></p>`);
        } else {
            status.push(`<p style="color: #868e96;">■ Simulation Idle</p>`);
        }

        return status.join('');
    }
}

// Initialize global simulation engine
window.simulationEngine = new SimulationEngine();


