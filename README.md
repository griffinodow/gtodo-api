[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <h3 align="center">G-Todo API</h3>
  <p align="center">
    Todo list web app for my portfolio 
    <br />
    <a href="https://g-todo.griffindow.com">View Website</a>
    ·
    <a href="https://github.com/griffinodow/gtodo-api/issues">Report Bug</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot](./docs/gtodo-screenshot.png)

Back-end todo list web app. Create todo lists and todo item entries that can be marked as completed by clicking the checkbox.

### Features
- Serve GraphQL API
- Perist, update, and delete data in a PostgreSQL database
- Create, read, update, delete lists
- Create, read, update, delete tasks inside lists

### Ambition

The goal of this project was to learn Node.js and TypeScript as a back-end app. Serve a GraphQL API with TypeGraphQL.js and Express.js. Then to persist data with PostgreSQL.

### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [TypeGraphQL.js](https://typegraphql.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

<!-- GETTING STARTED -->
## Getting Started

### View Demo Site

[g-todo.griffindow.com](https://g-todo.griffindow.com/)

### Environment

For easy configuration the Docker container expects the follow environment variables to be set for configuration. Environment variables can be passed to Docker with the -e flag.
| Entry | Environment Variable |
| --- | --- |
| Postgres User | GT_PG_USER |
| Postgres Host | GT_PG_HOST |
| Postgres Port | GT_PG_PORT |
| Postgres Database | GT_PG_DB |
| Postgres Password | GT_PG_PW |

### Develop Locally

```bash
# Serve with hot reload at localhost:3000
npm run dev

# Build for production
npm run build
```

### Deploy Container

Deploy the front-end micro-service container with the following command.

```bash
docker run -p 4000:4000 griffinodow/gtodo-api
```

This will allow the app to be served at: http://localhost:4000

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/griffinodow/gtodo-api.svg?style=for-the-badge
[contributors-url]: https://github.com/griffinodow/gtodo-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/griffinodow/gtodo-api.svg?style=for-the-badge
[forks-url]: https://github.com/griffinodow/gtodo-api/network/members
[stars-shield]: https://img.shields.io/github/stars/griffinodow/gtodo-api.svg?style=for-the-badge
[stars-url]: https://github.com/griffinodow/gtodo-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/griffinodow/gtodo-api.svg?style=for-the-badge
[issues-url]: https://github.com/griffinodow/gtodo-api/issues
[license-shield]: https://img.shields.io/github/license/griffinodow/gtodo-api.svg?style=for-the-badge
[license-url]: https://github.com/griffinodow/gtodo-api/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/griffinodow