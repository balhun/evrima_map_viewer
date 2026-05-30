import { Box, TableCell, TableHead, TableRow, TableSortLabel, useTheme } from '@mui/material';
import React from 'react'

const getHeadCells = (stage) => [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dinosaur' },
  { id: 'diet', numeric: false, disablePadding: false, label: 'Diet' },
  { id: `bf${stage}`, numeric: true, disablePadding: false, label: `${stage} Bite Force` },
  { id: `weight${stage}`, numeric: true, disablePadding: false, label: `${stage} Weight (kg)` },
  { id: `speed${stage}`, numeric: true, disablePadding: false, label: `${stage} Speed (km/h)` },
  { id: 'growthTime', numeric: true, disablePadding: false, label: 'Growth Time' },
];

export default function EnhancedTableHead({ order, orderBy, onRequestSort, stage }) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property);
  const headCells = getHeadCells(stage);
    const theme = useTheme();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ 
              backgroundColor: theme.palette.background.paper, 
              borderBottom: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary
            }}></TableCell>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ 
              backgroundColor: theme.palette.background.paper, 
              borderBottom: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}