
## Overview

This project is a web-based Arduino circuit simulator developed as part of the FOSSEE OSHW Semester Long Internship 2025 screening task. The simulator provides an interactive environment for building and testing Arduino circuits with real-time code generation and logic simulation capabilities.

## Features

* **Drag-and-Drop Interface**: Intuitive component placement on visual canvas
* **Automatic Wiring System**: Smart auto-connection to default Arduino pins
* **Real-Time Code Generation**: Automatic Arduino sketch generation based on circuit configuration
* **Interactive Simulation**: Live circuit simulation with button-controlled LED logic
* **Pin Configuration**: Flexible pin reassignment with conflict prevention
* **Visual Feedback**: Real-time component state visualization during simulation

## Project Structure

```
arduino-simulator/
├── index.html              
├── assets/
│   ├── css/
│   │   └── style.css     
│   ├── icons/            
│   └── js/
│       ├── main.js        
│       └── simulation.js 
├── README.md              
└── USAGE.md             
```

## Requirements

### Browser Requirements
* Modern web browser (Chrome 90+, Firefox 88+, Edge 90+, or Safari 14+)
* JavaScript enabled
* HTML5 Canvas support

### System Requirements
* No additional dependencies required
* Runs entirely in the browser
* Python 3.x (optional, for local server hosting)

## Installation

### Option 1: Live Demo (Recommended) 

**Access the simulator directly - No installation required!**

**Live URL:** https://698082fc7a017caae8fb4240--lustrous-faun-c12ff9.netlify.app/

Simply open the link in your browser and start building circuits immediately.

---

### Option 2: Local HTTP Server

1. Navigate to the project directory:
```bash
cd arduino-simulator
```

2. Start a local HTTP server:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### Option 3: Direct File Access

Simply open `index.html` directly in your web browser:
```bash
# On Linux
xdg-open index.html

# On macOS
open index.html

# On Windows
start index.html
```

## Usage

### Building Your Circuit

1. **Add Arduino Board**: Drag the Arduino Uno from the component palette to the canvas
2. **Add Components**: Drag LED and Push Button components onto the canvas
3. **Auto-Wiring**: Components are automatically connected to default pins:
   - LED → Pin 10 (Digital PWM)
   - Push Button → Pin 2 (Digital with pull-up)

### Code Generation

1. Click the **"Generate Code"** button to create Arduino sketch
2. View the generated code in the code panel
3. Code updates automatically when you modify pin configurations

### Pin Configuration

1. Click on any component to view its properties
2. Use the dropdown menu to select a different pin (Pins 2-13 available)
3. System prevents pin conflicts automatically
4. Code regenerates with new pin assignments

### Running Simulation

1. Click the **"Start Simulation"** button (green)
2. Interact with components:
   - Click and hold the Push Button to activate it
   - LED responds based on button state
3. Click **"Stop Simulation"** button to reset

## Technical Implementation

### Architecture

The application follows a modular architecture with clear separation of concerns:

* **assets/js/main.js**: Handles UI interactions, drag-and-drop functionality, and code generation
* **assets/js/simulation.js**: Manages simulation loop, component states, and logic processing
* **assets/css/style.css**: Provides professional styling and responsive layout
* **assets/icons/**: Contains component icons and visual assets

### Simulation Logic

The simulator implements a standard Arduino execution model:

```
setup() → called once at start
loop()  → executed continuously (50ms interval)
```

* Push Button simulates active-LOW logic (pull-up configuration)
* Digital read/write operations follow Arduino specifications
* State changes trigger visual updates in real-time

### Component Model

Each component maintains:
* Position coordinates (x, y)
* Pin assignment
* Current state (HIGH/LOW)
* Visual representation

## Features by Task

### Task 1: Web-Based Interface 
* Component palette with draggable elements
* Visual canvas for circuit building
* Real-time code view panel
* Simulation control buttons

### Task 2: Auto-Wiring & Configuration 
* Automatic pin assignment on component placement
* User-configurable pin selection (dropdown)
* Pin conflict detection and prevention
* Dynamic code updates on pin changes

### Task 3: Code Generation & Logic Simulation 
* Automatic Arduino code generation (`setup()`, `loop()`)
* Proper `pinMode()`, `digitalWrite()`, `digitalRead()` usage
* Functional button-to-LED control logic
* Real-time simulation with visual feedback

## Troubleshooting

### Common Issues

**Circuit not responding:**
* Ensure simulation is started (green "Start" button)
* Check that components are properly placed on canvas
* Verify pin assignments are not conflicting

**Code not generating:**
* Ensure Arduino board is placed first
* Check that components have valid pin assignments
* Try refreshing the page and rebuilding circuit

**Components not dragging:**
* Verify JavaScript is enabled in browser
* Try using a different browser
* Clear browser cache and reload

## Future Enhancements

* Additional component support (resistors, sensors, displays)
* Serial monitor functionality
* Circuit save/load capability
* Multi-board support
* Breadboard view
* Component library expansion

## Submission Information

* **Candidate**: MD KAIF NEZAMI
* **Department**: Electronics and Communication Engineering (3rd Semester)
* **Institution**: BIT Sindri
* **Email**: mdkaif.ece24@bitsindri.ac.in
* **Submission Date**: February 2025
* **Project**: FOSSEE OSHW Semester Long Internship 2025 - Screening Task

## References

* [Arduino Official Documentation](https://www.arduino.cc/reference/en/)
* [Wokwi Arduino Simulator](https://wokwi.com/)
* [FOSSEE OSHW Project](https://oshw.fossee.in/)

## License

This project is developed as part of an academic screening task for FOSSEE OSHW Internship Program.

## Contributing

As this is a screening task submission, contributions are not currently accepted. However, feedback and suggestions are welcome via email.

---
