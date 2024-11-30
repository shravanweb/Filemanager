import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import Logo from '../../assets/logo.png';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login logic
        if (credentials.username === 'admin' && credentials.password === 'password') {
            onLogin();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                position: 'relative',
                backgroundImage: `url('https://thumbs.dreamstime.com/b/small-portable-pink-air-cooler-perfect-cooling-down-hot-summer-days-stylish-efficient-making-ideal-337858915.jpg?w=1400')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Dull Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark semi-transparent overlay
                }}
            />

            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    width: 400,
                    textAlign: 'center',
                    borderRadius: 2,
                    zIndex: 1, // Ensures the form stays above the overlay
                }}
            >
                <img
                    src={Logo}
                    alt="Logo"
                    style={{
                        width: '200px',
                        margin: '0 auto',
                        marginBottom: 16,
                    }}
                />
                <Typography variant="h5" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Please log in to your account
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                padding: 1,
                                fontSize: '16px',
                                backgroundColor: "#d0242c",
                                color: "#FFF",
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
