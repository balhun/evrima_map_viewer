import React, { useState } from 'react'
import Menubar from '../components/Menubar'
import { Outlet } from 'react-router'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    mapBackground: '#0b2651',
    background: {
      default: '#100f0d',
      paper: '#112240',
    },
    primary: { main: '#4FC3F7' },
    text: {
      primary: '#E2E8F0',
      secondary: '#8892B0',
    },
    divider: 'rgba(79, 195, 247, 0.15)',
    rowStripe: '#4fc3f70d', 
  },
  typography: { button: { textTransform: 'none' } },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(to top left, #100f0d, #1c1a17, #2c2824)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
          borderBottom: '4px solid #1e7aa5',
          backgroundImage: 'none',
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          borderBottom: 'none !important'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.29)', 
          borderRadius: '8px',
        }
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    mapBackground: '#81D4FA',
    background: {
      default: '#E3F2FD',
      paper: '#FFFFFF',
    },
    primary: { main: '#0288D1' },
    text: {
      primary: '#0A1929',
      secondary: '#475569',
    },
    divider: 'rgba(2, 136, 209, 0.2)',
    rowStripe: 'rgba(2, 136, 209, 0.04)', 
  },
  typography: { button: { textTransform: 'none' } },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
          borderBottom: '4px solid #0288D1',
          backgroundImage: 'none',
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          borderBottom: 'none !important'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(2, 137, 209, 0.23)', 
          borderRadius: '8px',
        }
      }
    }
  }
});


export default function Layout() {
  const [themeMode, setThemeMode] = useState(darkTheme);

  function toggleTheme() {
    if (themeMode.palette.mode === 'dark') {
      setThemeMode(lightTheme);
    } else {
      setThemeMode(darkTheme);
    }
  }

  return (

    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <div className='container-main'>
        <div className='container'>
          <Menubar currentMode={themeMode.palette.mode} toggleTheme={toggleTheme} />
          <Outlet /> 
        </div>
      </div>
    </ThemeProvider>
  )
}