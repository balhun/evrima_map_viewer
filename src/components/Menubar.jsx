import React from 'react';
import { Button, Paper, Switch, FormControlLabel, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

export default function Menubar({ currentMode, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper 
      elevation={4}
      sx={(theme) => ({
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        height: '60px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        borderRadius: '12px',
        gap: '15px',
      })}
    >
      {/* 👈 Notice the logic is flipped! Active = contained, Inactive = outlined */}
      <Button
        variant={location.pathname === "/" ? 'outlined' : 'contained'}
        onClick={() => navigate('/')}
      >
        Evrima Map Viewer
      </Button>
      
      <Button
        variant={location.pathname === "/dino-matchup" ? 'outlined' : 'contained'}
        onClick={() => navigate('/dino-matchup')}
      >
        Dinosaur Matchup
      </Button>

      {/* 👈 Pushes the switch to the far right side */}
      <Box sx={{ flexGrow: 1 }} />

      <FormControlLabel
        control={
          <Switch 
            checked={currentMode === 'dark'} 
            onChange={toggleTheme} 
            color="primary" 
          />
        }
        label={currentMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        sx={{ color: 'text.primary', margin: 0 }} 
      />
    </Paper>
  );
}