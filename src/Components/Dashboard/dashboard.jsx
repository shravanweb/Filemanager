import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Dialog, IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Divider,
    Breadcrumbs,
    Link,
    Paper,
    Menu,
    MenuItem,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/Download'; 
import Sidebar from '../Sidebar/sidebar';
import moment from 'moment';

const Dashboard = ({ onLogout }) => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [folderHierarchy, setFolderHierarchy] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    // Open/Close dropdown menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Create a new folder
    const handleCreateFolder = () => {
        if (folderName.trim()) {
            const newFolder = {
                id: Date.now(),
                name: folderName,
                parentId: currentFolder?.id || null,
                type: 'folder',
            };
            setFolders((prevFolders) => [...prevFolders, newFolder]);
        }
        setFolderName('');
        setDialogOpen(false);
        handleMenuClose();
    };

    // Navigate into a folder
    const handleOpenFolder = (folder) => {
        setCurrentFolder(folder);
        setFolderHierarchy((prev) => [...prev, folder]);
    };

    // Navigate back using breadcrumb
    const handleBreadcrumbClick = (folder, index) => {
        setCurrentFolder(folder || null);
        setFolderHierarchy(folderHierarchy.slice(0, index + 1));
    };

    // Filter folders and files based on the current folder
    const getCurrentFolderContents = () => {
        const currentFolderId = currentFolder?.id || null;
        const currentFolders = folders.filter((folder) => folder.parentId === currentFolderId);
        const currentFiles = files.filter((file) => file.folderId === currentFolderId);
        return { currentFolders, currentFiles };
    };

    // File upload
    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files).map((file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            folderId: currentFolder?.id || null,
            thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
            uploadTime: new Date().toISOString(), // Ensure upload time is always set
        }));
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
        handleMenuClose();
    };

    const { currentFolders, currentFiles } = getCurrentFolderContents();

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar onLogout={onLogout} />
            <div style={{ flex: 1, padding: '20px' }}>
                <Box>
                    {/* Breadcrumb Navigation */}
                    <Breadcrumbs aria-label="breadcrumb" mb={3}>
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={() => handleBreadcrumbClick(null, -1)}
                            style={{ cursor: 'pointer' }}
                        >
                            File Manager
                        </Link>
                        {folderHierarchy.map((folder, index) => (
                            <Link
                                key={folder.id}
                                underline="hover"
                                color="inherit"
                                onClick={() => handleBreadcrumbClick(folder, index)}
                                style={{ cursor: 'pointer' }}
                            >
                                {folder.name}
                            </Link>
                        ))}
                    </Breadcrumbs>

                    {/* Header Section */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5">
                            {currentFolder ? `Folder: ${currentFolder.name}` : ''}
                        </Typography>
                        <Box>
                            <Button
                                sx={{ backgroundColor: "#244391" }}
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleMenuClick}
                            >
                                New
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => setDialogOpen(true)}>
                                    <FolderIcon style={{ marginRight: '8px' }} />
                                    Create Folder
                                </MenuItem>
                                <MenuItem>
                                    <FileUploadIcon style={{ marginRight: '8px' }} />
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                        Add File
                                    </label>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                    <Divider />

                    {/* Folder and File List */}
                    <Grid container spacing={1}>
                        {currentFolders.map((folder) => (
                            <Grid item xs={2} key={folder.id}>
                                <Card onClick={() => handleOpenFolder(folder)} style={{ cursor: 'pointer', height: '100%' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <FolderIcon sx={{ fontSize: '100px', color:"#244391" }} />
                                        <Typography variant="body2" noWrap style={{ marginBottom: '8px' }}>
                                            {folder.name}
                                        </Typography>
                                      
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                        {currentFiles.map((file) => (
                            <Grid item xs={3} key={file.id}>
                                <Card style={{ height: '100%', position: 'relative' }}>
                                    <CardContent style={{ height: '100%' }}>
                                        {/* Thumbnail and file preview */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 1,
                                                height: '100px',
                                                backgroundColor: '#f5f5f5',
                                            }}
                                        >
                                            {file.thumbnail ? (
                                                <img src={file.thumbnail} alt={file.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                            ) : (
                                                <FileUploadIcon fontSize="large" />
                                            )}
                                        </Box>

                                        {/* File name */}
                                        <Typography variant="body2" noWrap>
                                            {file.name}
                                        </Typography>

                                        {/* File upload time */}
                                        <Typography variant="caption">
                                            {file.uploadTime ? moment(file.uploadTime).format('MMMM Do YYYY, h:mm:ss a') : 'No upload time'}
                                        </Typography>

                                        {/* Download icon at the bottom-right */}
                                        <IconButton
                                            onClick={() => handleDownload(file)}
                                            style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                backgroundColor: '#fff',
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <FileDownloadIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>

                    {/* Create Folder Dialog */}
                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
                        <DialogTitle>Create New Folder</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Folder Name"
                                fullWidth
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)} variant="outlined">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateFolder}
                                color="primary"
                                variant="contained"
                                sx={{ backgroundColor: "#244391" }}
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </div>
        </div>
    );
};

export default Dashboard;
