# Arduino Circuit Simulator - User Manual

## Introduction

Welcome to the **Arduino Circuit Simulator**. This guide provides a comprehensive walkthrough of the simulator's interface and operational workflows. Unlike the technical overview in the README, this document is designed to help you master the day-to-day usage of the tool, from basic circuit building to advanced pin configuration.

## Interface Tour

The simulator interface is divided into three main common sections:

*   **Component Palette (Left Panel)**: Contains all available drag-and-drop components (Arduino Uno, LED, Push Button).
*   **Circuit Canvas (Center)**: The main workspace where you build and interact with your circuit.
*   **Code & Status Panel (Right Panel)**: Displays the generated Arduino C++ code and real-time status updates of your connections.

## Getting Started: Your First Circuit

Follow these steps to build standard "Button Controlled LED" circuit:

### 1. Initialize the Board
*   Locate the **Arduino Uno** in the Component Palette.
*   Drag and drop it anywhere onto the central **Circuit Canvas**.
*   *Note: You can only place one Arduino board per session.*

### 2. Add Peripherals
*   Drag an **LED** component onto the canvas.
*   Drag a **Push Button** component onto the canvas.

### 3. Automatic Wiring
*   The system acts as a "smart breadboard". As soon as you drop components, they are automatically wired to default pins:
    *   **LED** connects to **Pin 10**.
    *   **Button** connects to **Pin 2**.
*   Check the **Circuit Status** area in the bottom right; it should now show all components as "Added".

## detailed Operational Guide

### Pin Configuration
You are not limited to the default pins. To customize your connections:

1.  **Pin Selection**: Click the dropdown menu inside any component box (LED or Button).
2.  **Available Pins**: Select any available digital pin (D2-D13).
    *   *Smart Conflict Prevention*: Pins already in use by other components will be disabled in the dropdown to prevent short circuits.
3.  **Code Update**:
    *   **Important**: Changing a pin **does not** automatically regenerate the code (to prevent accidental overrides).
    *   You will see a notification: *"Pin changed. Click 'Generate Code' to update."*
    *   Click the green **Generate Code** button to refresh the sketch with your new pin mappings.

### Simulation Control

Once your circuit is built and configured:

1.  **Start Button**: Click the green **Start Simulation** button in the top toolbar.
    *   The status panel will change to **▶ Simulation Active**.
2.  **Interaction**:
    *   **Press & Hold**: Click and hold your mouse on the **Push Button** component.
    *   **Visual Feedback**:
        *   The button visual will depress.
        *   The LED component will light up (bright green).
        *   The generated code logic is executing in real-time (50ms cycles).
3.  **Stop**: Click the red **Stop Simulation** button to reset the state.

### Code Generation Logic

The logic generated is a standard debounce-free control loop:

*   **Setup**: Configures LED as `OUTPUT` and Button as `INPUT_PULLUP`.
*   **Loop**: Reads the button state. If the button signal is `LOW` (pressed), it writes `HIGH` to the LED.

## Troubleshooting & Tips

*   **"Code will be auto-generated"**: If you see this placeholder, make sure you have dragged all three required components (Arduino, LED, Button) onto the canvas.
*   **Simulation Won't Start**: Ensure you have a complete circuit. The simulator requires at least one Arduino and one peripheral to run.
*   **Resetting**: If the canvas gets cluttered, use the yellow **Clear Canvas** button to remove all components and start fresh.
