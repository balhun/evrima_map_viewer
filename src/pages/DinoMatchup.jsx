import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip,
  ToggleButtonGroup, ToggleButton,
  Divider
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useMemo } from 'react';
import { useState } from 'react';
import EnhancedTableToolbar from '../components/EnhancedTableToolbar';
import EnhancedTableHead from '../components/EnhancedTableHead';

function createData(
  id, 
  diet, 
  name, 
  bfAdult, bfPrime, bfFrail, 
  weightAdult, weightPrime, weightFrail, 
  speedAdult, speedPrime, speedFrail, 
  growthTime, 
  ability, 
  packLimit, 
  maxEggs, 
  nestType, 
  starving, 
  dehydration
) {
  return {
    id,
    diet,
    name,
    bfAdult, bfPrime, bfFrail,
    weightAdult, weightPrime, weightFrail,
    speedAdult, speedPrime, speedFrail,
    growthTime,
    ability,
    packLimit,
    maxEggs,
    nestType,
    starving,
    dehydration
  };
}

const rows = [
  // --- CARNIVORES ---
  createData(1, 'Carnivore', 'Tyrannosaurus', 699, 630, 490, 9300, 12300, 9400, 29, 29.9, 25.2, '35h 33m', 'Crush & Sparring', 2, 5, 'Debris', 75, 60),
  createData(2, 'Carnivore', 'Carnotaurus', 150, 120, 90, 1300, 1800, 1300, 49.5, 45, 39.6, '7h 40m', 'Charge', 3, 6, 'Debris', 75, 60),
  createData(3, 'Carnivore', 'Allosaurus', 175, 140, 105, 2600, 3700, 2600, 39.8, 35.6, 33.6, '10h', 'Pounce', null, 4, 'Debris', 60, 60),
  createData(4, 'Carnivore', 'Ceratosaurus', 150, 127.5, 97.5, 1450, 1950, 1450, 40.3, 36, 33.1, '6h', 'Bacteria', 5, 4, 'Debris', 60, 60),
  createData(5, 'Carnivore', 'Deinosuchus', 500, 550, 450, 8000, 13500, 9500, 18, 21.4, 18.9, '23h 3m', 'Lunge', 2, 4, 'Debris', 90, 10),
  createData(6, 'Carnivore', 'Dilophosaurus', 85, 68, 51, 700, 977, 700, 47.5, 41.4, 35.3, '6h', 'Hallucinations', 4, 6, 'Mound', 60, 60),
  createData(7, 'Carnivore', 'Omniraptor', 65, 58.5, 45.5, 395, 660, 395, 46.8, 43.2, 35.1, '5h 55m', 'Bleed', 8, 6, 'Mound', 50, 60),
  createData(8, 'Carnivore', 'Herrerasaurus', 30, 24, 18, 175, 225, 175, 45, 37.7, 28.7, '5h 25m', 'Climb', 8, 6, 'Debris', 50, 45),
  createData(9, 'Carnivore', 'Pteranodon', 20, 16, 12, 45, 60, 45, 28.5, 27, 23.4, '4h 30m', 'Flight', 6, 4, 'Debris', 50, 45),
  createData(10, 'Carnivore', 'Troodon', 15, 13.5, 10.5, 60, 79.8, 60, 45, 41.4, 33.3, '3h 10m', 'Venom', 10, 5, 'Mound', 60, 50),
  createData(11, 'Carnivore', 'Austroraptor', 40, null, null, 240, null, null, 48.1, null, null, '?', 'Pounce', null, 4, 'Debris', null, null),

  // --- HERBIVORES ---
  createData(12, 'Herbivore', 'Triceratops', 600, 810, 630, 9500, 12500, 9500, 23.6, 25.1, 20.7, '29h 10m', 'Spar', 4, 6, 'Mound', 90, 60),
  createData(13, 'Herbivore', 'Stegosaurus', 50, 45, 37.5, 6000, 9300, 6000, 26.2, 25.2, 24.3, '17h 55m', 'Tail Swing', 5, 5, 'Mound', 90, 45),
  createData(14, 'Herbivore', 'Maiasaura', 39.42, 40, 30, 3700, 5400, 3700, 46.9, 32.4, 25.2, '7h', 'Bipedal/Quadrapedal', 10, 8, 'Mound', 60, 30),
  createData(15, 'Herbivore', 'Diabloceratops', 275, 220, 165, 3000, 3900, 3000, 36, 32.4, 28.2, '7h 45m', 'Spar', 6, 6, 'Mound', 80, 60),
  createData(16, 'Herbivore', 'Tenontosaurus', 35, 31.5, 24.5, 1600, 1830, 1600, 40.5, 31.9, 36.4, '5h 40m', 'Tail Slam', 8, 6, 'Mound', 60, 50),
  createData(17, 'Herbivore', 'Pachycephalosaurus', 30, 25.5, 19.5, 500, 910, 700, 41.8, 39.5, 30.6, '6h 15m', 'Fractures', 8, 8, 'Mound', 50, 45),
  createData(18, 'Herbivore', 'Dryosaurus', 20, 16, 12, 130, 185, 130, 45, 39.6, 32.5, '4h 25m', 'Dodge', 10, 8, 'Mound', 40, 40),
  createData(19, 'Herbivore', 'Hypsilophodon', 2, 1.8, 1.4, 20, 23, 20, 39.6, 37.8, 30.6, '1h 50m', 'Blind Spit', 10, 6, 'Debris', 45, 30),
  createData(20, 'Herbivore', 'Kentrosaurus', 30, null, null, 1950, null, null, 34.2, null, null, '?', '?', null, 5, 'Mound', null, null),

  // --- OMNIVORES ---
  createData(21, 'Omnivore', 'Beipiaosaurus', 20, 16, 12, 90, 90, 90, 32, 29.5, 26.8, '3h 40m', 'Dive', 12, 8, 'Debris', 35, 20),
  createData(22, 'Omnivore', 'Gallimimus', 25, 20, 15, 535, 560, 535, 45.6, 41.4, 34.2, '5h 25m', 'Group Buffs', 8, 5, 'Mound', 40, 45),
];

function timeToMinutes(timeStr) {
  if (!timeStr || timeStr === '?') return -1;
  
  let hours = 0;
  let minutes = 0;
  
  const hMatch = timeStr.match(/(\d+)h/);
  const mMatch = timeStr.match(/(\d+)m/);
  
  if (hMatch) hours = parseInt(hMatch[1], 10);
  if (mMatch) minutes = parseInt(mMatch[1], 10);
  
  return (hours * 60) + minutes;
}

function descendingComparator(a, b, orderBy) {

  if (b[orderBy] === null || b[orderBy] === '?') return -1;
  if (a[orderBy] === null || a[orderBy] === '?') return 1;


  if (orderBy === 'growthTime') {
    const timeA = timeToMinutes(a[orderBy]);
    const timeB = timeToMinutes(b[orderBy]);
    if (timeB < timeA) return -1;
    if (timeB > timeA) return 1;
    return 0;
  }

  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function DinoMatchup() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('bfAdult');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stage, setStage] = useState('Prime');

  const theme = useTheme();


  const handleStageChange = (event, newStage) => {
    if (newStage !== null) {
      setStage(newStage);

      if (orderBy.startsWith('bf') || orderBy.startsWith('weight') || orderBy.startsWith('speed')) {
        const metric = orderBy.replace(/(Adult|Prime|Frail)/, '');
        setOrderBy(metric + newStage);
      }
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      if (selected.length >= 2) {
        newSelected = [selected[1], id];
      } else {
        newSelected = [...selected, id];
      }
    } else {
      newSelected = selected.filter((item) => item !== id);
    }
    setSelected(newSelected);
  };

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, stage]
  );

  return (
    <div className='matchup-background'>
        <div className='matchup-container'>
            <div className='island-matchup'>
                <Box>
                  <Paper>
                    
                    <EnhancedTableToolbar
                      numSelected={selected.length} 
                      stage={stage} 
                      handleStageChange={handleStageChange} 
                    />

                    <Divider/>
                    
                    <TableContainer sx={{ maxHeight: 'calc(100vh - var(--menubar-total) - 170px)', overflow: 'auto' }}>
                      <Table size="medium" stickyHeader>
                        <EnhancedTableHead
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          stage={stage}
                        />
                        <TableBody>
                          {visibleRows.map((row, index) => {
                            const isItemSelected = selected.includes(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                                sx={{ 
                                  cursor: 'pointer',
                                  backgroundColor: index % 2 === 0 ? theme.palette.rowStripe : 'transparent',
                                }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox checked={isItemSelected} />
                                </TableCell>
                                
                                <TableCell padding="none" sx={{ minWidth: "150px" }}>
                                  {row.name}
                                </TableCell>
                                <TableCell>{row.diet}</TableCell>
                                
                                <TableCell align="right">{row[`bf${stage}`] ?? 'N/A'}</TableCell>
                                <TableCell align="right">
                                  {row[`weight${stage}`] ? row[`weight${stage}`].toLocaleString() : 'N/A'}
                                </TableCell>
                                <TableCell align="right">{row[`speed${stage}`] ?? 'N/A'}</TableCell>
                                
                                <TableCell>{row.growthTime}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={(e, newPage) => setPage(newPage)}
                      onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                    />
                  </Paper>
                </Box>
            </div>
        </div>
    </div>
  )
}
