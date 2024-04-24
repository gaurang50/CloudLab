import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Link,
  TextField
} from '@mui/material';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import {
  Event as EventIcon,
  Web as WebIcon,
  Computer as ComputerIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.2rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '0 8px',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          '&:hover': {
            boxShadow: '0 8px 26px rgba(0, 0, 0, 0.2)',
          }
        }
      }
    }
  }
});

const eventsData = [
  { title: 'Tech Conference 2024', date: 'May 15, 2024', icon: <EventIcon />, description: 'Join us for the annual tech conference where industry leaders share their insights.', location: 'Virtual Event', action: 'Register' },
  { title: 'Webinar on React', date: 'June 3, 2024', icon: <WebIcon />, description: 'Explore the latest features of React in our upcoming webinar.', location: 'Online', action: 'Watch Now' },
  { title: 'Software Engineering Workshop', date: 'July 21, 2024', icon: <ComputerIcon />, description: 'Hands-on workshop on software development best practices.', location: 'Tech Hub', action: 'Learn More' },
  { title: 'AI & Machine Learning Expo', date: 'August 11, 2024', icon: <ScheduleIcon />, description: 'Dive into the future with our AI and machine learning expo.', location: 'Convention Center', action: 'View Details' },
  { title: 'Annual Developer Meetup', date: 'September 9, 2024', icon: <PeopleIcon />, description: 'Network with other developers at our annual meetup.', location: 'Local Cafe', action: 'Join' },
  { title: 'Cybersecurity Conference', date: 'October 23, 2024', icon: <SecurityIcon />, description: 'Learn about the latest in cybersecurity and how to protect your data.', location: 'Online', action: 'Explore' }
];

const HomePage = ({ currentUser }) => {
  const [expanded, setExpanded] = useState(null);
  const [events, setEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    filterEvents(event.target.value);
  };

  const filterEvents = (search) => {
    const filteredEvents = eventsData.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
    setEvents(filteredEvents);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const remindEvent = (title) => {
    // Trigger reminder, for simplicity, using a snackbar
    setSnackbarOpen(true);
  };

  useEffect(() => {
    // Placeholder for any useEffect logic
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box>
            <Button color="inherit" component={Link} href="#">
              Home
            </Button>
            <Button color="inherit" component={Link} href="#">
              About
            </Button>
            <Button color="inherit" component={Link} href="#">
              Contact Us
            </Button>
            <Button color="inherit" component={Link} href="#">
              Settings
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={() => window.open('https://mail.google.com/', '_blank')}>
              Gmail
            </Button>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.youtube.com/', '_blank')}>
              YouTube
            </Button>
            <Button variant="contained" color="primary" onClick={() => window.open('https://www.linkedin.com/', '_blank')}>
              LinkedIn
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          minHeight: '100vh',
          pt: 2,
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{mt:4, mb: 10, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Your Dashboard, {currentUser || 'User'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your personal hub for quick access to all essential tools and news.
          </Typography>
          <TextField
            label="Search Events"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon position="end" />
            }}
          />
        </Box>
        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                transform: expanded === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s',
                backgroundColor: '#f5f5f5',
                color: '#333',
                padding: '16px',
                borderRadius: '15px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}>
                <CardActionArea onClick={() => handleExpandClick(index)}>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 140
                  }}>
                    {event.icon}
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
                      {event.description}
                    </Typography>
                    <Box sx={{ textAlign: 'center', mb: 1 }}>
                      <Typography variant="caption" display="block" gutterBottom>
                        <LocationOnIcon fontSize="small" /> {event.location}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        <ScheduleIcon fontSize="small" /> {event.date}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => remindEvent(event.title)}
                        sx={{ mt: 3 , mb:2}}
                      >
                        Remind Me
                      </Button>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.alert(`Clicked ${event.action}`)}
                      sx={{ width: '100%' }}
                    >
                      {event.action}
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Reminder set for the event!"
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </ThemeProvider>
  );
};

export default HomePage;
