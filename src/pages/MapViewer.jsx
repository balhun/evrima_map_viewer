import React, { useState } from 'react';
import { MapContainer, ImageOverlay, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@mui/material/styles';
import { Alert, Divider, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, Paper, Box } from '@mui/material';

import gateway0_21_8k from '../assets/gateway0_21_8k.webp';
import gateway0_21_2k from '../assets/gateway0_21_2k.webp';
import gateway0_21_900 from '../assets/gateway0_21_900.webp';
import mud_overlay from '../assets/mud_overlay.png';
import water_overlay from '../assets/water_overlay.png';
import playerMarkerImg from '../assets/brachiosaurus.png';

import '../App.css';

const GAME_BOUNDS = [
  [-549425, -507600],
  [662425, 612000]
];

const playerIcon = L.icon({
  iconUrl: playerMarkerImg,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -38],
});

function parseGameCoords(input) {
  const cleaned = input.replace(/,(?=\d{3}[\.,])/g, '');
  const parts = cleaned.split(/[\s,]+/).filter(Boolean);
  const gameX = parseFloat(parts[0]);
  const gameY = parseFloat(parts[1]);
  return [-gameX, gameY];
}

function MapClickHandler({ onMapClick }) {
  const [clickPosition, setClickPosition] = useState(null);

  useMapEvents({
    click(e) {
      setClickPosition(e.latlng);
      onMapClick({
        x: -Math.round(e.latlng.lat),
        y: Math.round(e.latlng.lng)
      });
    }
  });

  return clickPosition === null ? null : (
    <Marker position={clickPosition} />
  );
}

export default function MapViewer() {
  const theme = useTheme();

  const [isMud, setMud] = useState(true);
  const [isWater, setWater] = useState(true);
  const [selectedMap, setSelectedMap] = useState(gateway0_21_8k);
  const [input, setInput] = useState('');
  const [markerPos, setMarkerPos] = useState(null);
  const [clickedCoords, setClickedCoords] = useState(null);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      const pos = parseGameCoords(input);
      if (isNaN(pos[0]) || isNaN(pos[1])) {
        setError('Invalid coordinates. Paste them directly from the game.');
        return;
      }
      setError('');
      setMarkerPos(pos);
    }
  }

  const islandSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
    padding: '15px',
  };

  return (
    <Box
      sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: theme.palette.mapBackground,
          overflow: 'hidden',
          zIndex: 0 
        }}
    >
      <div className='islands-top' onKeyDown={(e) => e.stopPropagation()}>
        <Paper sx={islandSx} elevation={4}>
          <FormControl fullWidth>
            <InputLabel>Map Size Selector</InputLabel>
            <Select 
              label="Map Resolution"
              value={selectedMap}
              onChange={(e) => setSelectedMap(e.target.value)}
            >
              <MenuItem value={gateway0_21_8k}>High resolution</MenuItem>
              <MenuItem value={gateway0_21_2k}>Medium resolution</MenuItem>
              <MenuItem value={gateway0_21_900}>Low resolution</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        <Paper sx={islandSx} elevation={4}>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked onChange={() => setWater(!isWater)} color="primary" />} label="Water overlay" />
            <FormControlLabel control={<Switch defaultChecked onChange={() => setMud(!isMud)} color="primary" />} label="Mud overlay" />
          </FormGroup>

          <TextField
            label="Press Enter"
            placeholder="Paste game coords..."
            variant="outlined"
            onKeyDown={handleSubmit}
            onChange={e => setInput(e.target.value)}
            value={input}
            error={!!error}
          />
          <Divider/>

          <Alert severity="info">Click on the map for coordinates.</Alert>
          <TextField
            label="Latitude"
            variant="outlined"
            value={clickedCoords ? clickedCoords.x : ''}
            slotProps={{ input: {readOnly: true} }}
          />
          <TextField
            label="Longitude"
            variant="outlined"
            value={clickedCoords ? clickedCoords.y : ''}
            slotProps={{ input: {readOnly: true} }}
          />
        </Paper>
      </div>

      <div className='islands-bottom'> 
        <Paper sx={islandSx} elevation={4}>
          <Alert severity="info">Map and overlays made by <a href="https://discord.gg/NuqdEub" target='_blank' style={{color: theme.palette.primary.main}}>Coco</a> (Vulnona). Thank you! <a href="https://www.flaticon.com/free-icons/dinosaur" title="dinosaur icons" target='_blank' style={{color: theme.palette.primary.main}}>Marker Icon</a></Alert>
          <Alert severity="warning">This website is using high resolution images! Expect lag.</Alert>
        </Paper>
      </div>

      <MapContainer
        crs={L.CRS.Simple}
        bounds={GAME_BOUNDS}
        zoomControl={false}
        zoomSnap={0.5}
        zoomDelta={0.5}
        wheelDebounceTime={40}
        wheelPxPerZoomLevel={80}
        maxZoom={-6}
        minZoom={-11}
        maxBoundsViscosity={1}
        className='map'
      >
        <MapClickHandler onMapClick={setClickedCoords} />
        <ImageOverlay url={selectedMap} bounds={GAME_BOUNDS} />
        <ImageOverlay url={mud_overlay} bounds={GAME_BOUNDS} opacity={isMud ? 1 : 0}/>
        <ImageOverlay url={water_overlay} bounds={GAME_BOUNDS} opacity={isWater ? 1 : 0}/>
        {markerPos && <Marker position={markerPos} icon={playerIcon} />}
      </MapContainer>
    </Box>
  );
}