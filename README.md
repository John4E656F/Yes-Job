# Yes Job - Horeca Job Listing Web Application

[![Yes Job - Horeca Job Board](https://github.com/John4E656F/Yes-Job/blob/main/public/images/png/yesjobpreview.png 'Yes Job - Horeca Job Board')](https://yesjob.be/)

[Check Out the project](https://yesjob.be/)

A web application for browsing and applying to job listings. Built with Next.js, React, Tailwind CSS, and Supabase.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Job Listing Web Application is a platform that allows users to explore and apply for job listings. It provides a user-friendly interface for browsing job offers, applying through an external form, and viewing detailed job descriptions.

## Features

- Browse and search for job listings.
- View detailed information about each job offer.
- Apply to job listings using an external application form.
- Pagination for easy navigation through job listings.

## To Do

- Search functionality
- Footer and Contact Page
- Recruter Page to update, edit or delete. Auth Magic Link

## Technologies Used

The following technologies, libraries, and frameworks were used to build this project:

- [Next.js](https://nextjs.org/): A React framework for building web applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for designing web applications.
- [Supabase](https://supabase.io/): An open-source alternative to Firebase, used for data storage and management.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following software and tools installed:

- npm or yarn or pnpm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/job-listing-app.git
   ```

2. Navigate to the project directory:

   ```
   cd job-listing-app
   ```

3. Install dependencies:

   ```
     npm install || yarn install || pnpm install
   ```

4. Set up environment variables:

   Create a .env.local file in the project root and add the following environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anonymous-key
   NEXT_PRIVATE_SENDGRID_API_KEY=your-sendgrid-api-key
   ```

   Replace <i>your-supabase-url</i> <i>your-supabase-anonymous-key</i> and <i>your-sendgrid-api-key</i> with your Supabase project URL and anonymous key.

5. Start the development server:

   ```
   npm run dev || yarn run dev || pnpm run dev
   ```

6. Open your browser and visit http://localhost:3000 to view the application.

## Usage

- Browse job listings by scrolling through the homepage.
- Use the search bar to find specific job listings.
- Click on a job listing card to view detailed information.
- Apply to a job listing by clicking the "Postulez sur le site web de recruteurs" button, which redirects you to an external application form.
- Navigate through job listings using the "Previous" and "Next" buttons at the bottom of the page.

## Contributing

We welcome contributions from the community. If you would like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```
   git checkout -b feature/my-feature
   ```

3. Make your changes and commit them:

   ```
   git commit -m "Add new feature"
   ```

4. Push your changes to your fork:

   ```
   git push origin feature/my-feature
   ```

5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License.
