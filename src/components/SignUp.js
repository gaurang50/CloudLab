import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
  Link,
  CssBaseline,
  Alert,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import lightBackgroundImage from './light.jpg'; // Ensure this is the correct path to your image file
import { auth, googleAuthProvider } from '../config/firebase'; // Correct the path based on your setup
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import SvgIcon from '@mui/material/SvgIcon';

function GoogleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4818h4.8441c-.2087 1.125-.8424 2.0782-1.7955 2.7218v2.2618h2.9086c1.7018-1.5655 2.6818-3.8705 2.6818-6.625z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.4673-.8055 5.9564-2.1805l-2.9086-2.2618c-.8055.54-1.8373.8591-3.0478.8591-2.3446 0-4.3286-1.5836-5.035-3.7109H.964v2.3318C2.4382 16.1536 5.4818 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2827-1.1173-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.964C.3477 6.1732 0 7.5477 0 9c0 1.4523.3477 2.8268.964 4.0418l3-2.3318z" />
      <path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4545 3.4409 1.3454L15.3636.965C13.8373-.6455 11.8268 0 9 0 5.4818 0 2.4382 1.8464.964 4.9582l3 2.7418c.7064-2.1273 2.6905-3.7109 5.035-3.7109z" />
    </SvgIcon>
  );
}
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login', { state: { email, password } }); // Redirect to login page with credentials
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${lightBackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <EmailOutlined color="action" style={{ marginRight: 8 }} />
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockOutlined color="action" style={{ marginRight: 8 }} />,
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockOutlined color="action" style={{ marginRight: 8 }} />
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
            fullWidth={false}
            variant="contained"
            sx={{
              width: 327,
              height: 48,
              mt: 3,
              mb: 2,
              padding: "12px 20px",
              borderRadius: "40px",
              background: "rgba(255, 255, 255, 1)",
              boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.1)",
              marginLeft:"85px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 1,
              textTransform: 'none'
            }}
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
          >
            <span style={{
              width: "175px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Raleway",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: "24px",
              textAlign: "center",
              color: "rgba(18, 18, 18, 1)",
              background: "rgba(0, 0, 0, 0)",
              opacity: 1
            }}>
              Sign up with Google
            </span>
          </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
