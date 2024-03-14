# Team Contributions

This document outlines the contributions and accomplishments of each team member to the project, broken down by the different components of the project.

# Demo 1

## Frontend

### Eli:

### Lali:

---

## Backend and Serverless Functions

### David:
- Set up the Supabase tables
    - Games
    - GameAnalytics
    - GameConcepts
    - Reviews
    - Users
- Selected and provided the frontend with test Game data
    - Stored the test Game data in table TestGamesEndpoint

### Sam:
- Did a spike on running node modules with AWS Lambdas
    - Inserted Hard Coded Game Data from Lambda to Supabase
- Implemented Supabase Trigger to insert users from auth table into our User table
- Implemented Supabase Function to execute the logic of inserting users into our own User table

### Madhav:
- AWS lambda
    - Get request to Steam API for all their games
- Machine Learning
    - ML model to predict game sales number based on its header image

---

## Infrastructure, CI/CD

### Logan:
- Set up AWS Amplify for the frontend
- Configured AWS EC2 with Go & the Gin framework installed for the backend
- Set up CI/CD to automatically re-deploy the frontend when changes are made to `/frontend` on the `main` branch
- Updated CI/CD to automatically deploy the backend code to EC2 when changes are made to `/backend` on the `main` branch
- Set up CI/CD to automatically deploy serverless functions to AWS Lambda when changes are made to `/lambdas` on the `main` branch
    - YAML file for this process can be found in [`.github/workflows/lambda.yml`](../.github/workflows/lambda.yml)
    - Documentation for this process can be found [here](Lambdas.md)

---

# Demo 2

... coming soon
