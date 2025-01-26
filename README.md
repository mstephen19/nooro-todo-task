# Nooro Todo App Take-Home Task

This project is a basic todo app built using the following technologies:

- TypeScript
- Node.js
- MySQL
- Prisma ORM
- Next.js
- Tailwind CSS
- Docker

As this is a just a take-home task, the project is only configured to run in a development setting.

## Run on your machine

1. Install [Docker](https://www.docker.com/)
2. Start the Docker daemon
3. Run the following command at the root of this project:

```shell
docker compose up
```

Once the MySQL server & HTTP server have started, the client application will start in `dev` mode. It can be accessed via `http://localhost:3000`.

## Moving forward

Given that the time spent on this project was capped at 6 hours, there are a few things that are left to be improved:

1. Client-side error messaging. For the sake of time, `alert()` is used to notify the user of errors.
2. SSR error messaging - `error.tsx` should be added to notify the user of 500 errors.
3. Make API routes more composable - currently the `app.route().METHOD()` configurations are slightly repeating themselves.

The next feature in this app would likely be the addition of a `User` table in the DB, and login functionality.
