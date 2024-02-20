# Frontend

## Technologies
- NextJS
- TailwindCSS

### What is NextJS?
NextJS is a React framework that allows for server side rendering (SSR) and a few other modern features. It is a great tool for building web applications and has a lot of built in features that make it easy to use.

### What is TailwindCSS?
TailwindCSS is a CSS framework that allows you to easily place custom styles within your components, so you can avoid having to write large amounts of custom CSS. The developers of TailwindCSS have also done research and design choices that automatically make your styles more appealing to spacing and layout preferences of the human eye.

## Getting Started
To get started with the frontend, you will need to have NodeJS installed on your machine. You can download NodeJS from the official website [here](https://nodejs.org/en/download/).

Once you have NodeJS installed, you can navigate to the `frontend` directory in the root of the project and run the following command to install the necessary dependencies:

```bash
npm install
```

After the dependencies are installed, you can run the following command to start the development server:

```bash
npm run dev
```

This will start the frontend server locally, and you can access it by navigating to `http://localhost:3000` in your web browser.

## NextJS Routing

Routing is folder based, any folder under the `src/app/` folder has the capability to create a route. To create a route using a folder, simply add a `page.tsx` file where page is the literal name of the file and then a route with the name of the folder will be created and accessible.

Ex: The file `src/app/dashboard/page.tsx` will be associated with the route `http://localhost:3000/dashboard`

## Components

Components will be stored in the folder `src/components` so that they can be imported and used anywhere in the project.

## API

API requests to data sources outside the frontend, mainly the backend server, will use Axios. Axios gives us a way to make HTTP requests to the backend server and handle the responses.



