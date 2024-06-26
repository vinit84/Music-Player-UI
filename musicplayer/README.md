# Music Player UI

[![Netlify Status](https://api.netlify.com/api/v1/badges/5f80d2b1-13fe-4664-912f-597d614fa779/deploy-status)](https://app.netlify.com/sites/musicplayerui4u/deploys)

Welcome to the Music Player UI project! This is a fully responsive and interactive music player built with React.js, Tailwind CSS, and Framer Motion for animations.

## Live Demo

Check out the live demo of the project [Music Player UI](https://musicplayerui4u.netlify.app/).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Design](#design)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive design that adapts to various screen sizes.
- Seamless integration with the provided REST API for fetching song data.
- Music continues playing even when the user switches tabs.
- Dynamic background gradient color changes based on the cover image of the current song.
- Fluid and interactive animations and transitions using Framer Motion.
- Functionalities include search, music control (Play/Pause/Next/Previous), tab switching, and music control via seeker.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: A library for animations and transitions in React applications.

## Installation

To get started with the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/vinit84/music-player-ui.git
    cd music-player-ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Usage

Once the development server is running, you can view the application in your browser at `http://localhost:3000`. The application should load the list of songs from the API and display the music player interface as per the design specifications.

## API Reference

The application fetches song data from the following API:

- **Songs API**: `https://cms.samespace.com/items/songs`

## Design

The design for the music player UI can be found on Figma:

[Design Link](https://www.figma.com/file/RtKhzEeeuD2FtRsg2dxSep/Front-end-Assessment?type=design&node-id=1-2&mode=design&t=zEkwOdYyaeNx0z7m-4)

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
