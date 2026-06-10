## TechStack

- Backend: ASP.NET Core WebAPI
- Framework: .NET 10
- Frontend: ReactJS
- API documentation: OpenAPI / Swagger
- Kiến trúc: Application, Domain, Infrastructure, API

## Chức năng dự kiến

# ResUp Club

ResUp Club is a club management project built with a layered architecture, using ASP.NET Core WebAPI for the backend and ReactJS for the frontend. The goal is to create a modern, scalable, and maintainable web system for the ResUp club.

## Overview

The backend exposes RESTful APIs and the React frontend consumes those APIs over HTTP. This separation keeps the user interface independent from business logic, making the project easier to develop, test, and extend.

## Tech Stack

- Backend: ASP.NET Core WebAPI
- Framework: .NET 10
- Frontend: ReactJS
- API documentation: OpenAPI / Swagger
- Architecture: Application, Domain, Infrastructure, API

## Planned Features

- Club information management
- Member management
- Activity and event management
- Account and role management
- Dashboard and reporting in future iterations

## Project Structure

```text
Project-ResUp-Club/
├── Back-End-ASP.Net/
│   ├── ResUpClub.API/           # WebAPI entry point
│   ├── ResUpClub.Application/   # DTOs, services, use cases
│   ├── ResUpClub.Domain/        # Entities, enums, shared interfaces
│   └── ResUpClub.Infrastructure/# Repository, data access, configurations
└── Front-End-ReactJS/           # ReactJS application
```

## Environment Requirements

- .NET SDK 10.0 or later
- Node.js 18 or later
- npm or yarn
- Visual Studio 2022 or VS Code

## Run the Backend

```bash
cd Back-End-ASP.Net/ResUpClub.API
dotnet restore
dotnet run
```

After the application starts, the API will run using the settings defined in `appsettings.json` and `launchSettings.json`.

## Run the Frontend

```bash
cd Front-End-ReactJS
npm install
npm run dev
```

If you are using Create React App or another setup, replace the command with the one that matches your ReactJS project.

## API Documentation

In the Development environment, the backend enables OpenAPI to help you inspect and test endpoints. After launching the API, you can open the generated documentation and try the available routes.

## Roadmap

- Complete controllers for each business module
- Connect to a database
- Build a ReactJS interface that matches the API
- Add authentication, authorization, and standardized error handling
- Introduce CI/CD and automated testing

## Notes

The repository is currently in an early stage, so this README focuses on the overall direction and setup for the ResUp Club project.
