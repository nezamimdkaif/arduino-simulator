# Arduino Circuit Simulator
## FOSSEE OSHW Semester Long Internship 2025 - Screening Task

This repository contains a complete web-based Arduino simulator developed for the FOSSEE OSHW Screening Task. It features drag-and-drop component placement, automatic wiring, and real-time logic simulation.

---

## Features Implemented

### Task 1: Web-Based Interface
- **Component Palette**: Drag-and-drop functionality for Arduino Uno, LED, and Push Button.
- **Visual Canvas**: Interactive area for building circuits.
- **Code View**: Real-time display of auto-generated Arduino code.
- **Simulation Controls**: Start and Stop buttons to control the simulation state.

### Task 2: Auto-Wiring & Configuration
- **Automatic Connections**: Components are automatically wired to default pins upon placement (LED to Pin 10, Button to Pin 2).
- **Pin Configuration**: Users can reassign pins using a dropdown menu (Pins 2-13 available).
- **Conflict Resolution**: Logic prevents assigning the same pin to multiple components.

### Task 3: Code Generation & Logic Simulation
- **Auto-Generation**: Valid Arduino code (`pinMode`, `digitalWrite`, `digitalRead`) is generated automatically based on the circuit configuration.
- **Logic Level Simulation**: 
    - Pressing the virtual Push Button sends a logical LOW signal (simulating pull-up).
    - The Arduino logic processes this signal and turns the LED ON or OFF.
    - Verified functionality with button-controlled LED logic.

---

## Installation and Setup

### Option 1: Local Server (Recommended)
You can run the project using a local Python HTTP server:

```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Option 2: Direct File Access
Alternatively, simply open the `index.html` file directly in a modern web browser (Edge, Chrome, or Firefox).

---

## Usage Guide

1.  **Add Components**: Drag the Arduino Uno, LED, and Push Button from the left palette onto the central canvas.
2.  **Generate Code**: Click the "Generate Code" button to produce the initial Arduino sketch.
3.  **Configure Pins**: Use the dropdown menus on the LED or Button components to change their assigned pins. The code will update automatically.
4.  **Start Simulation**: Click the green "Start Simulation" button.
5.  **Interact**: Click and hold the Push Button on the canvas. The virtual LED will light up, demonstrating the logic control.
6.  **Stop Simulation**: Click the "Stop Simulation" button to reset the state.

---

## Submission Details

- **Candidate Name**: MD KAIF NEZAMI
- **Department**: ECE (3rd Semester)
- **Institution**: BIT SINDRI
- **Email**: mdkaif.ece24@bitsindri.ac.in
- **Date**: February 2025

---

## Technical Implementation

- **Language**: Core HTML, CSS, and Vanilla JavaScript.
- **Architecture**:
    - `main.js`: Handles UI interactions, drag-and-drop logic, and code generation.
    - `simulation.js`: Manages the simulation loop and state updates.
- **Simulation Logic**: The system simulates a standard Arduino loop, checking inputs and updating outputs at a fixed interval (50ms).

---

## References

- Wokwi Elements (UI Inspiration)
- Arduino Reference Documentation