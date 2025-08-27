// App.jsx (React 19 + MUI 6)
import { Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import CardFormA from './components/CardFormA';
import CardFormB from './components/CardFormB';
import UserDetailsForm from './components/UserDetailsForm';
import FileUploadForm from './components/FileUploadForm';

const drawerWidth = 240;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          open
          slotProps={{
            paper: {
              sx: { width: drawerWidth, boxSizing: 'border-box' },
            },
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ejemplo-tc1">
                <ListItemText primary="Ejemplo TC 1" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ejemplo-tc2">
                <ListItemText primary="Ejemplo TC 2" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ejemplo-ud">
                <ListItemText primary="Ejemplo UD" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ejemplo-fu">
                <ListItemText primary="Ejemplo FU" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px`, p: 2 }}>
          <Routes>
            <Route path="/ejemplo-tc1" element={<CardFormA />} />
            <Route path="/ejemplo-tc2" element={<CardFormB />} />
            <Route path="/ejemplo-ud" element={<UserDetailsForm />} />
            <Route path="/ejemplo-fu" element={<FileUploadForm />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
