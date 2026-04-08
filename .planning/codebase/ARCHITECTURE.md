# Architecture

## Communication
- Client-Server architecture using RESTful APIs.
- Frontend (React) communicates with Backend (Express) via Axios.
- Backend interacts with MongoDB using Mongoose ODM.

## Authentication Flow
1. User submits credentials via `/register` or `/login`.
2. Server validates/compares using `bcryptjs`.
3. Server issues a JWT.
4. Client stores JWT (Local Storage/Cookies) for subsequent requests.

## Data Model
- **User**: Name, Email, Password, Role.
- **Note**: Title, Subject, Content/URL, UploadedBy, Timestamp.
- **Question**: Subject, QuestionText, Difficulty, Timestamp.
