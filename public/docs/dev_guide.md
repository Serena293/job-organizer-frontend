# Project Overview - Work Organization App

## 🚀 Project Description
A full-stack work organization application with:
- **Backend**: Java Spring Boot
- **Frontend**: Vue 3 + Tailwind CSS (first Vue/Tailwind project)
- **Authentication**: JWT-based login/registration system

## 🏗️ Architecture Overview
- **Framework**: Vue 3 with Composition API
- **State Management**: Pinia stores
- **Styling**: Tailwind CSS utility classes
- **Icons**: PrimeIcons
- **Authentication**: JWT tokens with localStorage persistence

## 📁 Store Structure

### 🔐 AuthStore (`/stores/authStore.js`)
Manages user authentication and profile data.

**State:**
- `token`: JWT token from localStorage
- `email`: User's email address
- `user`: Complete user profile object

**Getters:**
- `isLoggedIn`: Checks if user is authenticated

**Actions:**
- `login(token, email)`: Stores token, sets email, fetches profile
- `logout()`: Clears all auth data and removes token from storage
- `fetchProfile()`: Retrieves user profile from `/api/auth/me` endpoint

### 💼 JobStore (`/stores/jobStore.js`)
Manages job-related operations and data.

**State:**
- `jobs`: Array of job listings
- `selectedJob`: Currently selected job detail
- `isLoading`: Loading state indicator

**Actions:**
- `fetchJobs()`: Retrieves all jobs from `/jobs` endpoint
- `fetchJobById(id)`: Gets specific job details, checks cache first
- `deleteJob(id)`: Removes job from server and local state
- `updateJob(id, data)`: Updates job with PATCH request

### 📋 ProfileStore (`/stores/profileStore.js`)
Handles user documents and notes management.

**State:**
- `documents`: User's uploaded documents
- `notes`: User's personal notes
- `isLoading`: Loading state for async operations
- `error`: Error handling state

**Core Utility:**
- `fetchWithAuth()`: Helper method that automatically adds Authorization header

**Notes Actions:**
- `fetchNotes()`: Gets all notes from `/notes` endpoint
- `addNote(newNote)`: Creates new note (POST to `/notes`)
- `updateNote(id, updatedNote)`: Modifies existing note (PUT to `/notes/:id`)
- `deleteNote(id)`: Removes note from server and local state

**Documents Actions:**
- `fetchDocuments()`: Retrieves user documents from `/documents`
- `addDocument(newDocument)`: Uploads new document
- `updateDocument(id, updatedDocument)`: Edits document metadata
- `deleteDocument(id)`: Removes document

## 🔄 API Endpoints Used

**Authentication:**
- `GET /api/auth/me` - Get user profile

**Jobs:**
- `GET /jobs` - Fetch all jobs
- `GET /jobs/{id}` - Get specific job
- `DELETE /jobs/{id}` - Delete job
- `PATCH /jobs/{id}` - Update job

**Profile Data:**
- `GET /notes` - Fetch user notes
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

- `GET /documents` - Fetch documents
- `POST /documents` - Upload document
- `PUT /documents/{id}` - Update document
- `DELETE /documents/{id}` - Delete document

## 🛡️ Authentication Flow
1. User logs in → JWT token received
2. Token stored in localStorage and AuthStore
3. Automatic profile fetch on login
4. Token included in all subsequent API requests via Authorization header

## 💡 Technical Features
- **Automatic Token Management**: Persistent login via localStorage
- **Error Handling**: Comprehensive try-catch blocks with error state management
- **Loading States**: Visual feedback during async operations
- **Optimistic Updates**: Local state updates before server confirmation
- **Caching**: Job data caching to reduce unnecessary network requests

## 🚦 Current Status
- ✅ Authentication system working
- ✅ Job management implemented
- ✅ Notes CRUD operations functional
- ✅ Documents management complete
- ✅ Responsive Tailwind design

## 🔧 Development Notes
This is the first Vue.js + Tailwind CSS project. The architecture follows Vue 3 Composition API patterns with Pinia for state management. All API calls include JWT authentication tokens automatically.

---

*Last Updated: ${new Date().toLocaleDateString()}*