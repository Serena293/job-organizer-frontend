🚀 Job Organizer App

A full-stack Progressive Web App (PWA) designed to help users organize and streamline their job search. Manage tasks, jobs, events, notes, and documents—all in one place.

🌐 Live Demo

https://job-organizer-frontend.onrender.com

👉 View Live Demo on Render

✨ Features

🔑 User Authentication: Secure JWT-based login and registration.

📅 Calendar & Events: Add and manage personal events directly on the calendar.

📌 Task & Job Management: Add, edit, and delete tasks and job entries.

📄 Document Uploads: Upload files via Cloudinary integration.

📝 Notes: Keep personal notes for tasks or jobs.

📱 PWA Ready: Installable Progressive Web App with offline support.

✉️ Email Confirmation: Users receive a confirmation email after registration.

⚡ Full CRUD: Demonstrates create, read, update, and delete operations.

🛠 Technology Stack
Layer	Technology / Service
Frontend	Vue 3, Vite (deployed on Render)
Backend	Spring Boot, Java (deployed on Fly.io)
Database	PostgreSQL on Neon
Storage	Cloudinary for file uploads
Authentication	JWT (JSON Web Tokens)
PWA	Vite Plugin PWA
📌 How It Works

Frontend (Vue 3) communicates with the Spring Boot backend via REST API.

Backend handles authentication, CRUD operations for tasks, jobs, events, and notes.

Database (Neon) stores all user data securely.

Cloudinary manages document and file uploads.

PWA features allow offline usage and installation on mobile devices.

💡 Note: The live demo is hosted on Render with the backend deployed separately on Fly.io.
