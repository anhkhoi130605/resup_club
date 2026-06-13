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
#Clean Architechture in project
<pre>
📂 ResUpClub (Solution)
├── 📂 src
│   ├── 🚀 ResUpClub.WebApi (Presentation Layer - Mới bổ sung)
│   │   ├── 📁 Controllers
│   │   ├── 📁 Middlewares (Xử lý Exception, Logging)
│   │   └── 📄 Program.cs
│   │
│   ├── ⚙️ ResUpClub.Infrastructure (Infrastructure Layer)
│   │   ├── 📁 Authentication (Triển khai JWT Token Generator)
│   │   ├── 📁 BackgroundJobs (Nếu có chạy ngầm)
│   │   └── 📁 Persistence (Gom Data + Repository lại đây)
│   │       ├── 📁 Configurations (Cấu hình Fluent API cho thực thể)
│   │       ├── 📁 Migrations
│   │       ├── 📁 Repositories (Triển khai cụ thể các Repo)
│   │       └── 📄 ApplicationDbContext.cs
│   │
│   ├── 🧠 ResUpClub.Application (Application Layer)
│   │   ├── 📁 Common
│   │   │   ├── 📁 Exceptions
│   │   │   ├── 📁 Mappings
│   │   │   └── 📁 Behaviors (Validation, Logging)
│   │   ├── 📁 Features (Sắp xếp theo tính năng - Gợi ý thay thế cho DTOs/Services rời rạc)
│   │   │   └── 📁 Clubs
│   │   │       ├── 📁 Commands (Create, Update, Delete)
│   │   │       └── 📁 Queries (GetById, GetAll)
│   │   └── 📁 Interfaces (Nơi chứa các giao tiếp Core)
│   │       ├── 📄 IApplicationDbContext.cs
│   │       ├── 📄 IJwtTokenGenerator.cs
│   │       └── 📁 Repositories (IClubRepository, IUnitOfWork,...)
│   │
│   └── 💎 ResUpClub.Domain (Domain Layer)
│       ├── 📁 Entities
│       ├── 📁 Enums
│       └── 📁 Exceptions (Domain-specific exceptions nếu có)
</pre>
#### Structure of Clean Architechture
<pre>
Presentation (WebApi) ────> Infrastructure 
         │                         │
         │                         ▼
         └───────────────────> Application ──> Domain
</pre>
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





#####Hướng dẫn code
1. Application Service (Hoặc Use Case Handler)
Nhiệm vụ: Chứa Logic nghiệp vụ (Business Logic) của ứng dụng. Nó trả lời cho câu hỏi: "App của tôi có tính năng gì?". Nó đứng ra điều phối các Repository, gọi các dịch vụ khác để hoàn thành một chức năng cụ thể (Ví dụ: Đăng ký thành viên, Duyệt câu lạc bộ).

Vị trí đặt: Nằm ở tầng ResUpClub.Application.

Cách tổ chức (Dự án của bạn đang dùng CQRS / Feature-based):

Bạn không tạo file đặt tên chung chung là UserService.cs nữa.

Thay vào đó, mỗi "Service" sẽ là một Handler nằm trong từng thư mục tính năng (Features).

Ví dụ: Features/Authentication/Login/GoogleLoginCommandHandler.cs. Đó chính là một Application Service.

2. Infrastructure Service (Dịch vụ hạ tầng / Công nghệ)
Nhiệm vụ: Chứa các logic tương tác với Công nghệ bên thứ 3 hoặc Hệ điều hành máy tính. Nó trả lời cho câu hỏi: "Tính năng này được thực hiện bằng công nghệ gì?".

Vị trí đặt: Nằm ở tầng ResUpClub.Infrastructure (Thư mục Services).

Ví dụ thực tế trong dự án của bạn:

EmailService.cs (Kết nối Smtp của Gmail để gửi mail).

CloudinaryStorageService.cs (Cài thư viện Cloudinary để đẩy ảnh lên mây).

Lưu ý: Như chúng ta đã làm, bạn chỉ để Class thực thi ở tầng này, còn Interface của nó (ví dụ IEmailService, IStorageService) bắt buộc phải ném ngược vào tầng Application/Common/Interfaces để giữ cho lõi ứng dụng sạch sẽ.

3. Domain Service (Dịch vụ cốt lõi của nghiệp vụ)
Nhiệm vụ: Chứa các logic nghiệp vụ thuần túy toán học hoặc quy định bắt buộc của mô hình kinh doanh mà không phụ thuộc vào bất kỳ trạng thái nào của DB hay bên thứ 3. Thường dùng khi một logic cần tính toán liên quan đến nhiều Entity cùng lúc.

Vị trí đặt: Nằm ở tầng ResUpClub.Domain (Thư mục Services).

Ví dụ: Bạn làm app quản lý câu lạc bộ, có quy định: "Một sinh viên không được tham gia quá 3 câu lạc bộ cùng một lúc". Logic kiểm tra này không thuộc về riêng một Sinh viên, cũng không thuộc về riêng một Câu lạc bộ. Bạn sẽ viết một ClubMembershipDomainService.cs nằm ở tầng Domain để check việc này.

💡 Quy tắc thực tế dễ nhớ: * Nếu viết code liên quan đến Gọi API bên ngoài, cài NuGet lạ, gửi mail, lưu file, SMS ➡️ Nhét vào Infrastructure.

Nếu viết code điều phối dữ liệu để chạy một tính năng cụ thể cho giao diện gọi ➡️ Nhét vào Application (Handlers).

Nếu viết quy định, điều kiện ràng buộc dữ liệu ➡️ Nhét vào Domain.