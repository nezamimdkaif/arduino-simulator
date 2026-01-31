# Arduino Simulator Usage Guide

## Project Overview

This document provides detailed instructions on how to set up, run, and troubleshoot the Arduino Circuit Simulator. The project is designed to run in any standard web environment without complex dependencies.

---

## Technical Requirements

- A modern web browser (Google Chrome, Firefox, or Microsoft Edge).
- A text editor (VS Code, Sublime Text, or Notepad) for reviewing code.
- Basic understanding of Arduino concepts (pins, digital logic).

---

## Installation & Setup

### 1. File Structure Verification
Ensure your project directory maintains the following structure for correct asset loading:

```text
ARDUINO-SIMULATOR/
├── index.html
├── README.md
├── USAGE.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        └── simulation.js
```

### 2. Launching the Simulator
You can run the simulator using one of the following methods:

**Method A: Visual Studio Code Live Server (Recommended)**
1.  Open the project folder in VS Code.
2.  Right-click on `index.html`.
3.  Select "Open with Live Server".

**Method B: Direct Launch**
1.  Navigate to the project folder in your file explorer.
2.  Double-click `index.html` to open it in your default web browser.

---

## Operational Guide

### 1. Building the Circuit
-   Navigate to the **Components** palette on the left side of the interface.
-   Drag the **Arduino Uno** component onto the main canvas.
-   Drag an **LED** and a **Push Button** onto the canvas.
    -   The system will automatically wire the LED to Pin 10 and the Button to Pin 2.

### 2. Generating Code
-   Click the **Generate Code** button in the right-hand panel.
-   The system will generate a valid C++ Arduino sketch corresponding to your current wiring.

### 3. Modifying Connections
-   To change a pin assignment, locate the dropdown menu inside the component box on the canvas.
-   Select a new digital pin (D2-D13) from the list.
-   The generated code will update instantly to reflect this change.

### 4. Running the Simulation
-   Click the **Start Simulation** button.
-   The status panel will indicate "Simulation Active".
-   Click and hold the **Push Button** component.
-   Observe the **LED** status change. The console log (F12) will also display debug information for verification.

---

## Troubleshooting

### Common Issues

**Issue: The simulation does not start.**
-   **Cause**: Missing components on the canvas.
-   **Solution**: Ensure you have at least one Arduino, one LED, and one Button placed.

**Issue: Button clicks are not registered.**
-   **Cause**: Simulation is not active.
-   **Solution**: Ensure you have clicked the "Start Simulation" button. The status indicator should be green.

**Issue: Generated code does not appear.**
-   **Cause**: JavaScript error or empty canvas.
-   **Solution**: Check the browser console (F12) for errors and ensure assets are loaded correctly.

---

## Contact Information

For technical queries regarding this submission, please contact:

**Md Kaif Nezami**
Department of ECE
BIT Sindri
mdkaif.ece24@bitsindri.ac.in