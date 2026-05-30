import { ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import React from 'react'

export default function EnhancedTableToolbar({ numSelected, stage, handleStageChange }) {
    return (
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'  }}>
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected (Max 2)
          </Typography>
          <Typography variant="h5" id="tableTitle" component="div">
            Select Dinosaurs to compare
          </Typography>
  
        <ToggleButtonGroup
          value={stage}
          exclusive
          onChange={handleStageChange}
          size="medium"
        >
          <ToggleButton value="Adult">Adult</ToggleButton>
          <ToggleButton value="Prime">Prime</ToggleButton>
          <ToggleButton value="Frail">Frail</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    );
}