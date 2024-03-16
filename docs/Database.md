# Supabase

## What is Supabase
- PostgreSQL
- Makes it easy to create real-time applications using PostgreSQL
- Utilizes JWT Tokens to perform authentication

## Authentication with Supabase
- Settings on user authentication can be found in Settings->Authentication
    - This helps set up password strength, MFA, and JWT configuration. 
- Authenticated users can be found on the main page under the authentication tab on the sidebar

### Transferring users from auth to table
Users that sign up are automatically placed into an auth table, this is hidden behind a lot of security in supabase. It requires the most privileged token to access it's data. Due to security recommendations we decided to avoid this and instead set up a trigger to a function that would add users automatically to our table. That way we abstract out the responsiblities, Supabase takes care of security and we take care of user management. 

The first thing that is executed is the trigger, this can be found under the Database tab on the sidebar and under the 'Trigger' section. After selecting trigger drop down the schema and select the auth schema. The trigger that was created is named 'on_auth_user_created' and it is instructed to execute after there is an insert command in the auth table. It then is instructed to execute the function 'handle_new_user'. 

The 'handle_new_user' function can be found right underneath the trigger section within the Database tab on the sidebar. You can view the function by hitting the 3 dots at the end of the function and clicking 'edit function'. This function inserts a new user into the Users table within the Public schema. It inserts users with the data being user ID, email, username, and account type. 
