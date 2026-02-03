# Arduino Circuit Simulator

## Overview

This project is a web-based Arduino circuit simulator developed as part of the FOSSEE OSHW Semester Long Internship 2025 screening task. The simulator provides an interactive environment for building and testing Arduino circuits with real-time code generation and logic simulation capabilities.

## Live Demo

**Access the simulator directly - No installation required**

Live URL: https://698082fc7a017caae8fb4240--lustrous-faun-c12ff9.netlify.app/

## Key Features

- **Drag-and-Drop Interface**: Intuitive component placement on visual canvas
- **Automatic Wiring System**: Smart auto-connection to default Arduino pins (internal implementation)
- **Real-Time Code Generation**: Automatic Arduino sketch generation based on circuit configuration
- **Interactive Simulation**: Live circuit simulation with button-controlled LED logic
- **Pin Configuration**: Flexible pin reassignment with conflict prevention
- **Visual Feedback**: Real-time component state visualization during simulation

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
└── README.md               
```

## System Requirements

### Browser Requirements
- Modern web browser (Chrome 90+, Firefox 88+, Edge 90+, or Safari 14+)
- JavaScript enabled
- HTML5 Canvas support

### System Requirements
- No additional dependencies required
- Runs entirely in the browser
- Python 3.x (optional, for local server hosting)

## Installation Options

### Option 1: Live Demo (Recommended)

Access the simulator directly through the live URL provided above. No installation required.

### Option 2: Local HTTP Server

For local development and testing:

1. Navigate to the project directory:
```bash
cd arduino-simulator
```

2. Start a local HTTP server:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### Option 3: Direct File Access

Open `index.html` directly in your web browser:
```bash
# On Linux
xdg-open index.html

# On macOS
open index.html

# On Windows
start index.html
```

## User Guide

### Interface Overview

The simulator interface consists of three primary sections:

- **Component Palette (Left Panel)**: Contains all available drag-and-drop components (Arduino Uno, LED, Push Button)
- **Circuit Canvas (Center)**: Main workspace for building and interacting with circuits
- **Code & Status Panel (Right Panel)**: Displays generated Arduino code and real-time connection status

### Building Your First Circuit

1. **Initialize the Board**
   - Locate the Arduino Uno in the Component Palette
   - Drag and drop it onto the Circuit Canvas
   - Note: Only one Arduino board per session

2. **Add Components**
   - Drag an LED component onto the canvas
   - Drag a Push Button component onto the canvas

3. **Automatic Wiring**
   - Components are automatically wired to default pins upon placement:
     - LED → Digital Pin 10 (PWM capable)
     - Push Button → Digital Pin 2 (with internal pull-up)
   - Check the Circuit Status panel to verify all components are added
   - Note: The "Auto Wire" button provides manual wiring visualization, though wiring occurs automatically during component placement

### Pin Configuration

To customize pin assignments:

1. Click the dropdown menu inside any component box (LED or Button)
2. Select any available digital pin (D2-D13)
3. Smart Conflict Prevention: Pins already in use are automatically disabled in the dropdown
4. After changing pins, click the "Generate Code" button to update the Arduino sketch

### Code Generation

1. Click the "Generate Code" button to create the Arduino sketch
2. View the generated code in the Code Panel
3. Code automatically reflects current circuit configuration and pin assignments
4. Generated code includes proper `pinMode()`, `digitalWrite()`, and `digitalRead()` functions

### Running Simulation

1. Click the "Start Simulation" button (green) in the toolbar
2. The status panel will indicate "Simulation Active"
3. Interact with components:
   - Click and hold the Push Button component
   - LED will light up (visual state change to bright color)
   - Release button to turn LED off
4. Click "Stop Simulation" button to reset circuit state

### Additional Controls

- **Switch to Code View**: Toggle between circuit view and code-focused view
- **Clear Canvas**: Remove all components and reset the workspace
- **Circuit Status**: Monitor component addition and simulation state in real-time

## Technical Implementation

### Architecture

The application follows a modular architecture with clear separation of concerns:

- **assets/js/main.js**: Handles UI interactions, drag-and-drop functionality, and code generation
- **assets/js/simulation.js**: Manages simulation loop, component states, and logic processing
- **assets/css/style.css**: Provides professional styling and responsive layout
- **assets/icons/**: Contains component icons and visual assets

### Simulation Logic

The simulator implements a standard Arduino execution model:

```
setup() → called once at start
loop()  → executed continuously (50ms interval)
```

Implementation details:
- Push Button simulates active-LOW logic (pull-up configuration)
- Digital read/write operations follow Arduino specifications
- State changes trigger visual updates in real-time

### Component Model

Each component maintains:
- Position coordinates (x, y)
- Pin assignment
- Current state (HIGH/LOW)
- Visual representation

## Features by Task

### Task 1: Web-Based Interface & Component Handling
- Component palette with draggable elements
- Visual canvas for circuit building
- Real-time code view panel
- Simulation control buttons

### Task 2: Auto-Wiring Logic with Configurable Pins
- Automatic pin assignment on component placement
- User-configurable pin selection (dropdown)
- Pin conflict detection and prevention
- Dynamic code updates on pin changes

### Task 3: Auto Code Generation & Logic-Level Simulation
- Automatic Arduino code generation (`setup()`, `loop()`)
- Proper `pinMode()`, `digitalWrite()`, `digitalRead()` usage
- Functional button-to-LED control logic
- Real-time simulation with visual feedback

## Troubleshooting

### Common Issues

**Circuit not responding:**
- Ensure simulation is started (green "Start Simulation" button)
- Verify all required components are placed on canvas
- Check that pin assignments are not conflicting

**Code not generating:**
- Ensure Arduino board is placed first
- Verify all components have valid pin assignments
- Try clicking "Generate Code" button explicitly

**Components not dragging:**
- Verify JavaScript is enabled in browser
- Try using a different browser (Chrome recommended)
- Clear browser cache and reload

**Simulation button interaction:**
- Click and hold the button component for LED response
- Ensure simulation is active before interaction

## Future Enhancements

- Additional component support (resistors, sensors, displays)
- Serial monitor functionality
- Circuit save/load capability
- Multi-board support
- Breadboard view
- Component library expansion

## Submission Information

- **Candidate**: MD KAIF NEZAMI
- **Department**: Electronics and Communication Engineering (3rd Semester)
- **Institution**: BIT Sindri
- **Email**: mdkaif.ece24@bitsindri.ac.in
- **Submission Date**: February 2025
- **Project**: FOSSEE OSHW Semester Long Internship 2025 - Screening Task

## References

- [Arduino Official Documentation](https://www.arduino.cc/reference/en/)
- [Wokwi Arduino Simulator](https://wokwi.com/)
- [Wokwi Elements GitHub](https://github.com/wokwi/wokwi-elements)
- [FOSSEE OSHW Project](https://oshw.fossee.in/)

## License

This project is developed as part of an academic screening task for FOSSEE OSHW Internship Program.

## Contributing

As this is a screening task submission, contributions are not currently accepted. However, feedback and suggestions are welcome via email.

---
