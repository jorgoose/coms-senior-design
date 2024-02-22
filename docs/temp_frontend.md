# Frontend

## Technologies
- NextJS
- TailwindCSS
- AWS Amplify

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

### States

Next.js is interesting with things like useState as useState is something rendered on the client side, while Next.js also supports Server Side Rendering.

#### UseFormState

We use this for our login/signup submission forms as it allows us to manage the success state of the form and return a message of our choice in case of failure. Consider the following code found in actions.ts as an example for this:

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

 Although not directly imported, we still use UseFormState here by constructing a message in case there is an error. That message is given back to the login page and appears in this element which is located in the /login/page.tsx file:

```html
<p aria-live="polite">
    {state?.message}
</p> 
```

We set the initial state of UseFormState with the following code:

```tsx
const initialState = {
    message: '',
}

export default function randomFunc() {
    const [state, formAction] = useFormState(signIn, initialState);
}
```
The signIn function is the function which will be modifying the state with its return value, and the initialState is the thing being modified. We can access the above state's message property through html code with ```{state?.message}```.

#### UseFormStatus

This one to my knowledge acts as a boolean value for the form's submission status. False if the form has not been submitted yet, true if it has. Consider the SubmitButton component below as an example:

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

If pending is true, the form has been submitted, we will disable the button ```aria-disabled={pending}``` and change the text displayed on the button to ```Loading...``` so that the user clearly knows that the submission has gone through. If we did not use this then everything on the client side would stay the same and the user would have no idea if clicking the button did anything.

## Components

Components will be stored in the folder `src/components` so that they can be imported and used anywhere in the project.

## API

API requests to data sources outside the frontend, mainly the backend server, will use Axios. Axios gives us a way to make HTTP requests to the backend server and handle the responses.



