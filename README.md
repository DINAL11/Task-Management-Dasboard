# TaskFlow - Project Management Dashboard

A modern task and project management dashboard built with Angular. This application demonstrates core Angular concepts including components, services, routing, and reactive programming with RxJS.

## Features

- 📊 **Dashboard Overview**: Visual stats and recent tasks
- 📝 **Task Management**: Create, update, and track tasks
- 🚀 **Project Tracking**: Monitor project progress
- 🏷️ **Priority & Status Tags**: Organize tasks efficiently
- 📱 **Responsive Design**: Works on desktop and mobile

## Technologies Used

- Angular 15+
- TypeScript
- RxJS for reactive programming
- CSS Grid & Flexbox for layouts
- Angular Router for navigation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskflow-dashboard.git
cd taskflow-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── dashboard/
│   ├── models/
│   │   └── task.model.ts
│   ├── services/
│   │   └── task.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.*
│   └── app.module.ts
└── ...
```

## Key Learning Objectives

This project demonstrates:
- Component architecture and data binding
- Service injection and dependency management
- RxJS Observables and reactive patterns
- TypeScript interfaces and enums
- Angular routing and navigation
- Modern CSS techniques

## Future Enhancements

- Add drag-and-drop task management
- Implement user authentication
- Add real-time updates with WebSockets
- Connect to a backend API
- Add task filtering and search
