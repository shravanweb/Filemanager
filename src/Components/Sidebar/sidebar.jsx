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
    useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Logo from '../../assets/logo.png';

const Sidebar = ({ onLogout }) => {
    const isMobileSmall = useMediaQuery('(max-width: 479px)');
    const isMobileLarge = useMediaQuery('(min-width: 480px) and (max-width: 767px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
    const isDesktop = useMediaQuery('(min-width: 1200px)');

    const [activeItem, setActiveItem] = useState('Files');

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
                width: isMobileSmall ? 60 : isMobileLarge ? 80 : 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobileSmall ? 60 : isMobileLarge ? 80 : 240,
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
                    padding: isMobileSmall ? 1 : 2,
                    height: '100%',
                }}
            >
                {/* Logo Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: isMobileSmall ? 1 : 2,
                    }}
                >
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{ width: isMobileSmall ? '40px' : isMobileLarge ? '80px' : '150px' }}
                    />
                </Box>

                <Divider sx={{ marginBottom: isMobileSmall ? 1 : 2 }} />

                {/* Menu Items */}
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: activeItem === item.label ? '#e0f7fa' : 'inherit',
                                color: activeItem === item.label ? '#00796b' : '#333',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: '#e0f7fa',
                                    color: '#00796b',
                                },
                                padding: isMobileSmall ? '5px' : '10px',
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
                            {!isMobileSmall && (
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: isMobileLarge ? '14px' : '16px',
                                        fontWeight: '500',
                                    }}
                                />
                            )}
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
                        padding: isMobileSmall ? '8px' : '10px', // Adjust padding for mobile
                        fontWeight: '600',
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                        },
                        fontSize: isMobileSmall ? '12px' : '14px', // Adjust font size for mobile
                        display: 'flex', // Ensure flexbox display to align text and icon
                        justifyContent: isMobileSmall ? 'center' : 'flex-start', // Center text/icon on mobile
                    }}
                    startIcon={!isMobileSmall && <ExitToAppIcon />} // Hide icon on mobile
                >
                    {isMobileSmall ? <ExitToAppIcon /> : 'Logout'} {/* Show only icon on mobile */}
                </Button>

            </Box>
        </Drawer>
    );
};

export default Sidebar;
