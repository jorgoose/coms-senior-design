# Frontend

Basic documentation for the frontend, hopefully helpful with stuff like next.js and supabase.

## Running

To run the frontend its recommended to make sure that the environment is properly set up
1. Run npm i under the frontend/ directory to install all dependencies needed
2. Create a .env.local file directly under the frontend/ directory
3. Get the evn variables from someone who already has them or find the Supabase url and key variables
4. Run the project with `npm run dev` make sure you are under the frontend/ folder
5. Click on the link that appears in the terminal and enjoy

## Next.js

### Routing

Routing is folder based, any folder under the src/app/ folder has the capability to create a route. To create a route using a folder, simply add a page.tsx file where page is the literal name of the file and then a route with the name of the folder will be created and accessible.

Ex.

for this structure: src/app/dashboard/page.tsx a route will be created which is accessible on the web using /dashboard

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

Components will be stored in the folder 'components' which is directly under src so that they can be imported and used anywhere in the project.

## Supabase Auth

Supabase authentication functions are stored in the app/actions.ts file. For both sign in and sign up we use revalidatePath to essentially reset the session as soon as a user successfully logs in. This way we keep a user's current session completely separated from any past sessions. After revalidating the path (which is specifically the '/' path) we then redirect the user to '/' which can serve as a true homepage.

[Server side authentication with supabase docs.](https://supabase.com/docs/guides/auth/server-side/nextjs)

Route protection is also included in the above docs as they are closely related.

## Route Protection

Route protection is being done via Supabase auth. By using the following code we are able to redirect unauthorized users to the /login page where they can then login or choose to signup.

```tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function someRoute() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        // html stuff
    );
}
```

## Api

As of right now to make api requests I am using axios, a simple method of making calls. So far however, api calls have not been necessary as Supabase has been taking care of it.