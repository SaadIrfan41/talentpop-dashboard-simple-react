import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import ErrorPage from './pages/404.tsx'
import Login from './pages/login.tsx'
import Register from './pages/register.tsx'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/AuthRoute/ProtectedRoute.tsx'
import PublicRoute from './components/AuthRoute/PublicRoute.tsx'
import HomePage from './App.tsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
)
