<div align="center">
    <p align="center">
        <a href="https://nodejs.org/">
            <img src="https://avatars.githubusercontent.com/u/9950313?s=200&v=4" alt="Node.js logo" height="140">
        </a>
    </p>
</div>
<br>
<p align="center">
    <a href="https://github.com/berkanumutlu/challenge-nodejs-presentation-dashboard-app/stargazers" rel="nofollow"><img src="https://img.shields.io/github/stars/berkanumutlu/challenge-nodejs-presentation-dashboard-app?style=flat&logo=github" alt="Presentation Dashboard App Repo stars"></a>
    <a href="https://github.com/berkanumutlu/challenge-nodejs-presentation-dashboard-app/blob/master/LICENSE" target="_blank" rel="nofollow"><img src="https://img.shields.io/github/license/berkanumutlu/challenge-nodejs-presentation-dashboard-app" alt="Presentation Dashboard App Repo License"></a>
    <a href="https://nodejs.org" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Node.js-v20.18.0-5FA04E?logo=nodedotjs&logoColor=white&labelColor=5FA04E" alt="Node.js Version"></a>
    <a href="https://nextjs.org/docs/14" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/next-v14.2.18-black?logo=nextdotjs&logoColor=white&labelColor=black" alt="Next.JS Version"></a>
     <a href="https://18.react.dev" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/React-v18.3.1-087EA4?logo=react&logoColor=white&labelColor=087EA4" alt="React Version"></a>
    <a href="https://tailwindcss.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Tailwind-v3.4.15-06B6D4?logo=tailwindcss&logoColor=white&labelColor=06B6D4" alt="Tailwind Version"></a>
    <a href="https://ui.shadcn.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/shadcn/ui-v2.1.6-black?logo=shadcnui&logoColor=white&labelColor=black" alt="shadcn/ui Version"></a>
    <a href="https://www.prisma.io" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Prisma-v5.22.1-2D3748?logo=prisma&logoColor=white&labelColor=2D3748" alt="Prisma Version"></a>
    <a href="https://www.postgresql.org/docs/release/15.7" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/PostgreSQL-v15.7-4169E1?logo=postgresql&logoColor=white&labelColor=4169E1" alt="PostgreSQL Version"></a>
    <a href="https://www.npmjs.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/NPM-v10.8.2-CB3837?logo=npm&logoColor=F7F7F7&labelColor=CB3837" alt="NPM Version"></a>
    <a href="https://www.docker.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Docker-v4.25.2-2496ED?logo=docker&logoColor=white&labelColor=2496ED" alt="Docker Version"></a>
</p>

# [Challenge] Presentation Dashboard App with Node.js

It is a challenge project that aims to create a presentation management dashboard using Node.js, React and PostgreSQL.

## Installation

**1)** Clone repository

```shell
$ git clone https://github.com/berkanumutlu/challenge-nodejs-presentation-dashboard-app.git
```

Or with SSH

```shell
$ git clone git@github.com:berkanumutlu/challenge-nodejs-presentation-dashboard-app.git
```

Or with Github CLI

```shell
$ git clone gh repo clone berkanumutlu/challenge-nodejs-presentation-dashboard-app
```

**2)** Copy the example.env file and **make the required configuration changes** in the file

```shell
$ cp /src/api/.env.example /src/api/.env
$ cp /src/app/.env.example /src/app/.env
```

**3)** Install docker container (required docker)

```shell
$ docker-compose up -d
```

**4)** After installation, find your app and api container id on docker

```shell
$ docker ps

# Output:
CONTAINER ID   IMAGE                                             COMMAND                  CREATED      STATUS          PORTS                                        NAMES
...
d3cf849b1b36   challenge-nodejs-presentation-dashboard-app-app   "docker-entrypoint.s…"   2 days ago   Up 37 minutes   0.0.0.0:3000->3000/tcp                       presentation-dashboard-app    
...
```

- And connect to the terminal of your app and api container (Use different terminals)

```shell
$ docker exec -it {APP_CONTAINER_ID} bash
$ docker exec -it {API_CONTAINER_ID} bash
```

**5)** Install all the dependencies using npm (In different terminals)

```shell
/user/local/api $ npm install
/user/local/app $ npm install
```

**6)** Generate mock data

```shell
/user/local/api $ npm run db:seed:mock
```

**7)** Restart your docker container

```shell
$ docker-compose restart
```

**8)** Now you're ready to use project

- To stop the Docker container, use the following command

```shell
$ docker-compose stop
```

## Screenshots

<ul>
    <li>
        <p>Home Page & Admin Login Page</p>
        <p align="center">
            <img src="screenshots/home_page.png" alt="Home page" width="49%" />
            <img src="screenshots/admin_login_page.png" alt="Admin Login Page" width="49%" />
        </p>
    </li>
    <li>
        <p>Dashboard</p>
        <p align="center">
            <img src="screenshots/dashboard.png" alt="Dashboard" />
        </p>
    </li>
    <li>
        <p>Create Presentation Modal</p>
        <p align="center">
            <img src="screenshots/create_presentation_modal.png" alt="Create Presentation Modal" width="49%" />
            <img src="screenshots/create_presentation_modal_valid_form.png" alt="Create Presentation Modal Valid Form" width="49%" />
        </p>
    </li>
    <li>
        <p>Presentation Item Menu</p>
        <p align="center">
            <img src="screenshots/presentation_item_menu.png" alt="Presentation Item Menu" />
        </p>
    </li>
    <li>
        <p>Rename & Delete Presentation Modal</p>
        <p align="center">
            <img src="screenshots/rename_presentation_modal.png" alt="Rename Presentation Modal" width="49%" />
            <img src="screenshots/delete_presentation_modal.png" alt="Delete Presentation Modal" width="49%" />
        </p>
    </li>
</ul>

## Preview

[![Presentation Dashboard App Preview Video](https://cdn.loom.com/sessions/thumbnails/cf82b552a7d04a1084123ea33e85e1e1-f586746bd56ce04d-full-play.gif)](https://www.loom.com/share/cf82b552a7d04a1084123ea33e85e1e1?sid=9038fd59-3cdf-4742-a8d2-1e313203bff5)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
