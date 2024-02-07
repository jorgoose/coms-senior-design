# TrendPlay: Empowering Indie Game Development

## Overview

"TrendPlay" is a web-based platform designed to bridge the gap between indie game developers and their audience. With the indie gaming sector continuously growing more and more accessible, our platform's goal is to offer a unique set of tools for developers to validate game concepts before diving into full-scale development, essentially helping them refine the concept for their game before potentially wasting valubale development time on a game no one wants to play in the first place. TrendPlay aims to provide valuable insights into both historical and predictive analytics of video games, leveraging machine learning and other statistical models to forecast potential game performance and market reception.

## Core Functionalities

- **User Account Creation:** Users can sign up to access personalized insights and engage with the community.
- **Three User Types:** Users are categorized into User, Developer, and Admin, each with unique privileges.
- **Feedback and Suggestions:** A collaborative environment for developers to pitch game concepts and gather community feedback.
- **Game Analytics:** Access comprehensive analytics on current, past, and upcoming games, including machine learning-based predictions on review scores.
- **Advanced Analytics for Developers:** Detailed analytics on how specific game attributes such as genre, language support, and platform choice affect market performance.
- **Profile and Settings:** Personalized user profiles and settings for a customized experience.
- **Admin Controls:** Robust admin features for content moderation.
- **Cloud-based Architecture:** A scalable, distributed cloud infrastructure supporting the frontend, backend, and machine learning components.


## Architecture

![Diagram of Application Architecture](https://media.discordapp.net/attachments/1196673973543501851/1204851317797945364/image.png?ex=65d63c3b&is=65c3c73b&hm=622c051dc372f3c2ab3673211855d08d0038d2da13b372b766b7bf373db0cb11&=&format=webp&quality=lossless&width=960&height=436)

- **Frontend:** Developed using NextJS and TypeScript, hosted on AWS Amplify for quick deployment and scalability
- **Core Backend Service:** Built with the Gin framework in Golang, deployed on AWS EC2
- **Database:** Utilizes Supabase for a cloud-based database solution
- **Data Fetching and Processing:** Automated data retrieval from Steam using AWS Lambda, SQS, and EventBridge for regular updates
- **Machine Learning Model:** Prediction models hosted on AWS SageMaker for  forecasts of game review scores

## Repository Structure

- `/frontend` - Contains the NextJS application code.
- `/backend` - Houses the Golang backend services.
- `/ml` - Includes Jupyter notebooks for machine learning model development.
- `/lambdas` - Lambda function code for data fetching, processing, etc.
