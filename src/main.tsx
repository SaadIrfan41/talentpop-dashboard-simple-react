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
import { DEV_BASE_URL, Mode, PROD_BASE_URL } from './lib/mode.ts'

// console.log(
//   // process.env.NODE_ENV,
//   process.env.PROD_BASE_URL
//   // process.env.DEV_BASE_URL
// )
console.log(Mode)
console.log(PROD_BASE_URL)
console.log(DEV_BASE_URL)
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
    // ErrorBoundary: null,
    errorElement: <ErrorPage />,
  },
  {
    path:
      Mode === 'development'
        ? DEV_BASE_URL + '/login'
        : PROD_BASE_URL + '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path:
      Mode === 'development'
        ? DEV_BASE_URL + '/register'
        : PROD_BASE_URL + '/register',
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
