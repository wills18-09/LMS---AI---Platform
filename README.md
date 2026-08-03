# 🎓 LMS AI Platform 🚀

An AI-powered Learning Management System designed to provide a complete digital learning experience with course management, video learning, assessments, achievements, analytics, and intelligent learning assistance.

The platform provides dedicated workflows for students, instructors, and administrators with a scalable full-stack architecture consisting of a React frontend, Node.js backend, PostgreSQL database, and a separate AI service.

---

# Features Implemented

## Authentication & Authorization

- User registration and login
- JWT-based authentication
- Refresh token support
- Protected routes
- Role-based access control

Roles supported:

- Student
- Instructor
- Admin

---

## Course Management

- Course creation and management
- Instructor course dashboard
- Course approval workflow
- Course catalog
- Course details pages
- Module and lecture management
- Student enrollment system

---

## Learning Experience

- Video lecture management
- Video upload system
- Course player interface
- Lecture progress tracking
- Notes system
- Bookmark system
- Learning resource management
- Student learning dashboard

---

## AI Learning Assistant 🤖

The platform includes an AI-powered learning assistant to improve the student learning experience.

Implemented:

- AI Tutor chat assistant
- Lecture-based question answering
- Retrieval-Augmented Generation (RAG)
- Transcript processing pipeline
- Text chunking
- Vector embeddings
- Similarity search using pgvector
- AI lecture summarization
- AI generated flashcards
- AI generated quizzes

AI Service:

- Built using FastAPI
- Integrated with LLM providers
- Separate AI microservice architecture

---

## Assignments & Assessments

- Assignment creation
- Student submissions
- File uploads
- Manual grading
- Feedback system
- Quiz creation
- Quiz attempts
- Auto grading support

---

## Student Engagement

- Certificates
- Badges
- Learning streaks
- Course reviews and ratings
- Announcements
- Notifications
- Recommendations
- Study plans
- Learning mastery tracking

---

## Instructor Features

- Instructor dashboard
- Course management
- Lecture management
- Assignment management
- Quiz builder
- Student performance tracking
- Course analytics support

---

## Admin Features

- Admin dashboard
- User management
- User suspension
- Course moderation
- Platform statistics

---

# Frontend

Built using React and TypeScript.

Implemented:

- Authentication pages
- Protected routing
- Student dashboard
- Instructor dashboard
- Admin dashboard
- Course catalog UI
- Course details UI
- Course player UI
- Quiz interface
- AI Tutor interface
- Notification system
- Reusable component architecture
- API service integration
- Redux Toolkit state management
- Responsive styling foundation

---

# Backend

Built using Node.js and Express with TypeScript.

Implemented:

- REST API architecture
- Authentication system
- RBAC middleware
- Course APIs
- Enrollment APIs
- Lecture APIs
- Upload APIs
- Assignment APIs
- Quiz APIs
- Review APIs
- Announcement APIs
- Notification APIs
- Analytics APIs
- Admin APIs

---

# AI Service

Built using Python and FastAPI.

Implemented:

- AI chat endpoints
- RAG retrieval pipeline
- Document processing
- Transcript chunking
- Embedding generation
- Vector similarity search
- Summarization endpoints
- Flashcard generation
- Quiz generation

---

# Database & Infrastructure

Implemented using:

- PostgreSQL
- pgvector
- Redis
- Docker
- Docker Compose

Database includes:

- User management
- Courses
- Modules
- Lectures
- Enrollments
- Progress tracking
- Assignments
- Quizzes
- Reviews
- Achievements
- AI document storage

---

# Project Architecture

```
LMS AI Platform

│
├── frontend
│   └── React + TypeScript + Vite
│
├── Backend
│   └── Node.js + Express + TypeScript
│
└── ai-service
    └── FastAPI + RAG + LLM Integration
```

---

# Repository Structure

```
LMS-AI-Platform

│
├── Backend
│   ├── src
│   │   ├── modules
│   │   ├── middleware
│   │   ├── services
│   │   └── db
│
├── frontend
│   └── src
│       ├── components
│       ├── pages
│       ├── services
│       └── styles
│
└── ai-service
    └── app
        ├── core
        ├── models
        ├── rag
        └── routers
```

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Redux Toolkit
- CSS

---

## Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt
- Multer

---

## AI Service

- Python
- FastAPI
- LLM APIs
- Vector Embeddings
- RAG Pipeline

---

## Database & Infrastructure

- PostgreSQL
- pgvector
- Redis
- Docker
- Docker Compose

---

# Running The Project Locally

## Backend

```bash
cd Backend

npm install

npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## AI Service

```bash
cd ai-service

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Runs on:

```
http://localhost:8000
```

---

# Environment Variables

Required environment variables:

## Backend

```env
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
```

---

## Frontend

```env
VITE_API_URL=
```

---

## AI Service

```env
GROQ_API_KEY=
GEMINI_API_KEY=
MODEL_NAME=
```

---

# Docker Support

The project includes Docker configuration for required infrastructure services.

Services:

- PostgreSQL
- Redis
- pgvector

Run:

```bash
docker compose up
```

---

# Future Enhancements

- Cloud deployment
- Advanced analytics
- Real-time collaboration
- Live classes
- Mobile application
- Additional AI learning features

---

# Developer

**Mantasha Shoaib**

Backend Development Intern