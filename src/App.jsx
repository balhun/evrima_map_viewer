import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router' // or 'react-router-dom' depending on your version
import MapViewer from './pages/MapViewer' 
import Layout from './components/Layout'
import DinoMatchup from './pages/DinoMatchup'
import { ThemeProvider } from '@mui/material'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <MapViewer />
        },
        {
          path: "dino-matchup",
          element: <DinoMatchup />
        }
      ]
    }
  ],
  {
    basename: "/evrima_map_viewer/", 
  }
)

export default function App() {
  return ( <RouterProvider router={router} /> )
}