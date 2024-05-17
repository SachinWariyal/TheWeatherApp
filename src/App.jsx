import { Alert, Snackbar } from '@mui/material'
import './App.css'
import CurrentLocation from './Components/CurrentLocation'
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Show the snackbar when the component mounts
    setSnackbarOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <>
    <Navbar/>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: '8vh' }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          As I was not able to understand the geocoding API(getting latitude and longitude by city name), so the app doesnt provide dynamic data as of now. Due to lack of time research was also not possible.
        </Alert>
      </Snackbar>
      <CurrentLocation/>
    </>
  )
}

export default App
