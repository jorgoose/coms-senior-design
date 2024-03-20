# Frontend

## Table of Contents

1. [Technologies](#technologies)
2. [Running](#running)
3. [Next.js](#nextjs)
   - [Routing](#routing)
   - [States](#states)
     - [UseFormState](#useformstate)
     - [UseFormStatus](#useformstatus)
4. [Components](#components)
5. [Api](#api)
6. [Supabase Auth](#supabase-auth)
   - [Route Protection](#route-protection)

---

## Technologies Used in the Frontend

- Next.js
- TailwindCSS
- Vite
- AWS Amplify


### What is Next.js?

<img src="https://embed.zenn.studio/api/optimize-og-image/40b78d97cd17a7db5433/https%3A%2F%2Fnextjs.org%2Fstatic%2Fblog%2Fnext-14%2Ftwitter-card.png" alt="Next.js" width="500"/>

Next.js is a React framework that allows for server side rendering (SSR) and a few other modern features. It is a great tool for building web applications and has a lot of built-in features that make it easy to use.

We are using Next.js v14, which is the latest version. Be careful when looking at documentation, StackOverflow, etc. as many things are different in v14 compared to previous versions.

[Next.js Documentation](https://nextjs.org/docs)

### What is TailwindCSS?

<img src="https://miro.medium.com/v2/resize:fit:1400/1*__f27S-qQF2CAASt5bOwqg.png" alt="Next.js" width="500"/>


TailwindCSS is a CSS framework that allows you to easily place custom styles within your components, so you can avoid having to write large amounts of custom CSS. The developers of TailwindCSS have also done research and design choices that automatically make your styles more appealing to spacing and layout preferences of the human eye.

### What is Vite?

<img src="https://vitejs.dev/logo.svg" alt="Vite" width="100"/>

Vite is a build tool that aims to provide a faster and leaner development experience for modern web development projects. It consists of two major parts: a dev server that lets you run your project locally, and a build command that lets you build your project for production.

### What is AWS Amplify?

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mkZY0XpP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://day-journal.com/memo/images/logo/aws/amplify.png" alt="AWS Amplify" width="100"/>

AWS Amplify is a set of tools and services that enables mobile and front-end web developers to build secure, scalable full stack applications, powered by AWS. Amplify automatically configures things like a server to host the app, a publicly accessible URL, and a CI/CD pipeline to deploy changes we make to the app.

#### Accessing AWS Amplify from the AWS Console
1. Go to the AWS Management Console (https://console.aws.amazon.com/)
2. Our frontend is hosted in the `us-east-1` region, so make sure you are in that region (you can change the region in the top right corner)
2. In the top search bar, type "Amplify" and click on "AWS Amplify"
3. Underneath "All apps", you should see `coms-senior-design` - click on it
4. From here you can access the public URL, adjust environment variables, and several other things

## Starting the Frontend Locally

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

---

## Running

To run the frontend it's recommended to make sure that the environment is properly set up:

1. Run `npm i` under the `frontend/` directory to install all dependencies needed.
2. Create a `.env.local` file directly under the `frontend/` directory.
3. Get the env variables from someone who already has them or find the Supabase URL and key variables.
4. Run the project with `npm run dev` make sure you are under the `frontend/` folder.
5. Click on the link that appears in the terminal and enjoy.

## Next.js

### Routing

Routing is folder based, any folder under the `src/app/` folder has the capability to create a route. To create a route using a folder, simply add a `page.tsx` file where `page` is the literal name of the file and then a route with the name of the folder will be created and accessible.

Example: The file `src/app/dashboard/page.tsx` will be associated with the route `http://localhost:3000/dashboard`.

### State in Next.js

In most frameworks like Next.js, the concept of "state" is an important aspect of your project. It refers to information in the application that can change over time, like a user's login status or the items in a user's shopping cart.

Next.js offers a feature called server-side rendering, which prepares parts of your application on the server before sending them to the user's browser. This can make your web pages load faster. This is an alternative to client-side rendering, where updates happen in the user's browser after the initial page load. Standard React is reliant on client-side rendering, whereas Next.js supports both server-side and client-side rendering.

The useState feature is a tool for managing state in these client-side updates, helping you keep track of changes in the browser. This flexibility in managing state, whether server-side or client-side, enhances the efficiency and user experience of your web applications.

#### UseFormState

We use this for our login/signup submission forms as it allows us to manage the success state of the form and return a message of our choice in case of failure. Consider the following code found in `actions.ts` as an example for this:

```tsx
export async function signIn(prevState: any, formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return {
            message: 'Please enter valid credentials',
        }
    } else {
        revalidatePath('/', 'layout');
        redirect('/');
    }
}
```

Although not directly imported, we still use `UseFormState` here by constructing a message in case there is an error. That message is given back to the login page and appears in this element which is located in the `/login/page.tsx` file:

```html
<p aria-live="polite">
    {state?.message}
</p> 
```

We set the initial state of `UseFormState` with the following code:

```tsx
const initialState = {
    message: '',
}

export default function RandomFunc() {
    const [state, formAction] = useFormState(signIn, initialState);
}
```

The `signIn` function is the function which will be modifying the state with its return value, and the `initialState` is the thing being modified. We can

 access the above state's message property through HTML code with `{state?.message}`.

#### UseFormStatus

This one to my knowledge acts as a boolean value for the form's submission status. False if the form has not been submitted yet, true if it has. Consider the `SubmitButton` component below as an example:

```tsx
'use client'
 
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
    use: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ use }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
        {pending ? 'Loading...' : use}
        </button>
    );
};
  
export default SubmitButton;
```

If `pending` is true, the form has been submitted, we will disable the button `aria-disabled={pending}` and change the text displayed on the button to `Loading...` so that the user clearly knows that the submission has gone through. If we did not use this then everything on the client side would stay the same and the user would have no idea if clicking the button did anything.

## Components

Components will be stored in the folder `src/components` so that they can be imported and used anywhere in the project.

An example of this could be a `Button` component that is used in multiple places in the project. We can create a `Button` component in the `src/components` folder, something like:

```tsx
interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );

};

export default Button; // This exports the component so it can be used in other files
```

and then import at the top of other files like so:

```tsx
import Button from '@/components/Button';
```

which allows us to use the `Button` component in the file like so:

```tsx
// ... some frontend code
<div>
    <Button text="Click me" onClick={() => console.log('Button clicked')} />
</div>

// ... rest of frontend code
```

## API

To make Api requests to the backend, we have decided to use axios as it provides clean and compact api calls. Documentation for how to use the written calls will be mainly contained in the files under the /api folder. It should also be noted that any future api calls should be placed in the proper file under the folder. For example, a call to grab a single user's data should be placed in the /api/users.ts file.

## Supabase Auth

Supabase authentication functions are stored in the `app/actions.ts` file. For both sign in and sign up, we use `revalidatePath` to essentially reset the session as soon as a user successfully logs in. This way we keep a user's current session completely separated from any past sessions. After revalidating the path (which is specifically the '/' path) we then redirect the user to '/' which can serve as a true homepage.

[Server side authentication with Supabase docs.](https://supabase.com/docs/guides/auth/server-side/nextjs)

Route protection is also included in the above docs as they are closely related.

### Route Protection

Route protection is being done via Supabase auth. By using the following code, we are able to redirect unauthorized users to the `/login` page where they can then log in or choose to sign up.

```tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function SomeRoute() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        // HTML stuff
    );
}
```

