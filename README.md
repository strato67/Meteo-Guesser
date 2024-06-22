<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://www.svgrepo.com/show/512410/lightning-1262.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Meteo Guesser</h3>

  <p align="center">
    A multiplayer weather guessing game.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Meteo Guesser is an weather guessing game inspired by Kahoot, designed for interactive play with others. Utilizing Websockets, players can create or join sessions hosted by fellow participants. The game challenges players to predict weather conditions, temperatures and locations based on clues provided. This project was developed with a microservices architecture in mind, and can be deployed on a cloud VM of your choice.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCSS]][Tailwind-url]
* [![Express.js][Express.js]][Express-url]
* [![Flask][Flask]][Flask-url]
* [![Redis][Redis]][Redis-url]
* [![MongoDB][MongoDB]][Mongo-url]
* [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* Docker
* Docker Compose
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a OpenWeatherMap API Key at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Clone the repo
   ```sh
   git clone https://github.com/strato67/Meteo-Guesser.git
   ```
3. Create a .env file in `/weather-retriever` and copy your API key into it 

4. Create a .env file in `/weather-client` and specify your host url 
   ```env
   NEXT_PUBLIC_HOST_URL="localhost:8080"
   ```
5. Run `docker compose up -d` to initialize the backend
6. Start the frontend
   ```bash
   cd weather-client
   npm install
   npm run build && npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`][license-url] for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/strato67/Meteo-Guesser.svg?style=for-the-badge
[contributors-url]: https://github.com/strato67/Meteo-Guesser/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/strato67/Meteo-Guesser.svg?style=for-the-badge
[forks-url]: https://github.com/strato67/Meteo-Guesser/network/members
[stars-shield]: https://img.shields.io/github/stars/strato67/Meteo-Guesser.svg?style=for-the-badge
[stars-url]: https://github.com/strato67/Meteo-Guesser/stargazers
[issues-shield]: https://img.shields.io/github/issues/strato67/Meteo-Guesser.svg?style=for-the-badge
[issues-url]: https://github.com/strato67/Meteo-Guesser/issues
[license-shield]: https://img.shields.io/github/license/strato67/Meteo-Guesser.svg?style=for-the-badge
[license-url]: https://github.com/strato67/Meteo-Guesser/blob/main/LICENSE
[product-screenshot]: https://github.com/strato67/Meteo-Guesser/blob/main/docs/gameplay.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
