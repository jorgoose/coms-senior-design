# Frontend
## NextJS Routing

Routing is folder based, any folder under the src/app/ folder has the capability to create a route. To create a route using a folder, simply add a page.tsx file where page is the literal name of the file and then a route with the name of the folder will be created and accessible.

Ex.

for this structure: src/app/dashboard/page.tsx a route will be created which is accessible on the web using /dashboard

## Components

Components will be stored in the folder 'components' which is directly under src so that they can be imported and used anywhere in the project.

## Api

As of right now to make api requests I am using axios, a simple method of making calls.