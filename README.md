# A Hand is 4 relationships
## Description
This interactive p5.js application transforms your hand into a dynamic digital paintbrush. Using your webcam and the power of MediaPipe's real-time hand tracking, the app visualizes the connections between your finger and wrist landmarks. The distance between your fingers intuitively controls the color and transparency of the shape you draw, creating a unique and personal visual experience.

## Features
- **Real-Time Hand Landmark Tracking**: Utilizes MediaPipe to accurately detect and track 21 key points on your hand.
- **Dynamic Generative Drawing**: The landmarks of your hand are connected to form a unique, shifting polygon.
- **Intuitive Color Control**: The distances between your thumb and other fingers dynamically change the Red, Green, Blue, and Alpha (transparency) values of the shape.
- **Interactive Video Background**: Instantly toggle the webcam video feed on or off to see your creation against a clean, black background or overlayed on reality.

## Controls
- **`b` Key**: Toggle the webcam video background on and off.

## Technology Stack
- **p5.js**: The core library for creating the canvas, drawing the graphics, and handling user interaction.
- **MediaPipe**: Provides the advanced machine learning model for real-time hand landmark detection.
- **JavaScript**: The core programming language used to build the application logic.

## Setup and Usage
To run this application, you do not need a complex build process. Simply follow these steps:

1.  **Download or Clone the Repository**
    ```bash
    # If you have git installed
    git clone https://your-repository-url.com
    cd path-to-app
    ```
    Alternatively, download the project files as a ZIP.

2.  **Run a Local Server (Recommended)**
    For best performance and to avoid browser security issues, run the project from a local server. If you have VS Code, the "Live Server" extension is an excellent choice.

3.  **Open in Browser**
    Navigate to `index.html` in your browser. The application will request permission to use your webcam.

4.  **Interact**
    - Allow webcam access when prompted.
    - Position your hand in front of the camera to see the drawing appear.
    - Press the **`b`** key to show or hide the live video feed.

## Contributing
Contributions are welcome! If you have ideas for new features, find a bug, or want to improve the code, please feel free to fork the repository and submit a pull request. You can also open an issue to start a discussion.

## Link to Other App
Explore similar functionalities with the [LIVE app](https://marlonbarrios.github.io/ahandisfourrelationships/).

## License
This project is released under the MIT License. See the `LICENSE.md` file for more details.
