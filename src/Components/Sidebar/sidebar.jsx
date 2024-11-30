import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Box,
    Button,
    ListItemIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Logo from '../../assets/logo.png';

const Sidebar = ({ onLogout }) => {
    const [activeItem, setActiveItem] = useState('Files'); // Default active item

    const menuItems = [
        { label: 'Files', icon: <InsertDriveFileIcon /> },
        { label: 'Help', icon: <HelpOutlineIcon /> },
    ];

    const handleMenuItemClick = (label) => {
        setActiveItem(label);
    };

    const handleLogout = () => {
        onLogout();
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid #ddd',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    height: '100%',
                }}
            >
                {/* Logo Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}
                >
                    <img src={Logo} alt="Logo" style={{ width: '150px' }} />
                </Box>

                <Divider sx={{ marginBottom: 2 }} />

                {/* Menu Items */}
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: activeItem === item.label ? '#e0f7fa' : 'inherit', // Active color
                                color: activeItem === item.label ? '#00796b' : '#333',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: '#e0f7fa',
                                    color: '#00796b',
                                },
                            }}
                            onClick={() => handleMenuItemClick(item.label)}
                        >
                            <ListItemIcon
                                sx={{
                                    color: activeItem === item.label ? '#00796b' : 'inherit',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Spacer for Logout Button at the Bottom */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{
                        marginTop: 2,
                        padding: '10px',
                        fontWeight: '600',
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                        },
                    }}
                    startIcon={<ExitToAppIcon />}
                >
                    Logout
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
