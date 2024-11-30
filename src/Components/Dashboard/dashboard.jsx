import React, { useState } from 'react';
import {
    Grid,
    Box,
    Button,
    Typography,
    Menu,
    MenuItem,
    Card,
    CardContent,
    Avatar,
    Paper,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Divider,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import ImageIcon from '@mui/icons-material/Image';
import DownloadIcon from '@mui/icons-material/Download';
import Sidebar from '../Sidebar/sidebar';

const Dashboard = ({ onLogout }) => {
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [selectedFolder, setSelectedFolder] = useState(null);

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf':
                return <PictureAsPdfIcon color="error" />;
            case 'excel':
                return <TableChartIcon color="success" />;
            case 'word':
                return <DescriptionIcon color="primary" />;
            case 'image':
                return <ImageIcon color="primary" />;
            default:
                return <DescriptionIcon />;
        }
    };

    const getThumbnail = (type, url) => {
        switch (type) {
            case 'pdf':
                return '/pdf-thumbnail.png';  // Placeholder for PDF thumbnails
            case 'excel':
                return '/excel-thumbnail.png';  // Placeholder for Excel thumbnails
            case 'word':
                return '/word-thumbnail.png';  // Placeholder for Word thumbnails
            case 'image':
                return url;  // For image files, show the image itself
            default:
                return '/file-thumbnail.png';  // Default thumbnail for other file types
        }
    };

    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files).map((file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type.includes('pdf')
                ? 'pdf'
                : file.type.includes('excel') || file.type.includes('sheet')
                    ? 'excel'
                    : file.type.includes('image')
                        ? 'image'
                        : 'file',
            url: URL.createObjectURL(file),
            postedDate: new Date().toLocaleString(),
        }));
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    };

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleDialogOpen = () => {
        setDialogOpen(true);
        handleMenuClose();
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setFolderName('');
    };

    const handleFolderCreate = () => {
        if (folderName.trim()) {
            setFolders((prevFolders) => [...prevFolders, { id: Date.now(), name: folderName }]);
        }
        handleDialogClose();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type.includes('pdf')
                ? 'pdf'
                : file.type.includes('excel') || file.type.includes('sheet')
                    ? 'excel'
                    : file.type.includes('image')
                        ? 'image'
                        : 'file',
            url: URL.createObjectURL(file),
            postedDate: new Date().toLocaleString(),
        }));
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleFolderClick = (folder) => {
        setSelectedFolder(folder.id === selectedFolder ? null : folder.id);
    };

    const handleDownload = (file) => {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar onLogout={onLogout} />
            <div style={{ flex: 1, padding: '20px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5">File Manager</Typography>
                    <div>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleMenuOpen}
                            sx={{ backgroundColor: "#d32f2f", color: "#FFF", textTransform: "none" }}
                        >
                            Create
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleDialogOpen}>New Folder</MenuItem>
                            <MenuItem>
                                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                    Add File
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    hidden
                                    onChange={handleFileUpload}
                                />
                            </MenuItem>
                        </Menu>
                    </div>
                </Box>

                <Paper
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    style={{
                        padding: '20px',
                        border: '2px dashed #ccc',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <Typography variant="body1">
                        Drag and drop files here, or click to upload
                    </Typography>
                </Paper>

                <Typography variant="h6">Folders</Typography>
                <Grid container spacing={2} mb={4}>
                    {folders.map((folder) => (
                        <Grid item xs={2} key={folder.id}>
                            <Card
                                onClick={() => handleFolderClick(folder)}
                                sx={{
                                    backgroundColor: selectedFolder === folder.id ? '#d32f2f' : 'transparent',
                                    cursor: 'pointer',
                                }}
                            >
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <Avatar>
                                            <FolderIcon color="primary" />
                                        </Avatar>
                                        <Typography variant="body2" noWrap ml={2} color={selectedFolder === folder.id ? '#FFF' : 'inherit'}>
                                            {folder.name}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Divider />
                <Typography variant="h6">Files</Typography>
                <Grid container spacing={2}>
                    {files
                        .filter(file => !selectedFolder || file.folderId === selectedFolder)
                        .map((file) => (
                            <Grid item xs={3} key={file.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={getThumbnail(file.type, file.url)}
                                        alt={file.name}
                                    />
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <Avatar>{getFileIcon(file.type)}</Avatar>
                                            <Typography variant="body2" noWrap ml={2}>
                                                {file.name}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                                            <Typography variant="caption" color="textSecondary">
                                                {file.postedDate}
                                            </Typography>
                                            <IconButton onClick={() => handleDownload(file)} sx={{ ml: 2 }}>
                                                <DownloadIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

                <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="xs">
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
                        <Button onClick={handleDialogClose} variant="outlined" color="black">
                            Cancel
                        </Button>
                        <Button onClick={handleFolderCreate} variant="contained" color="primary" sx={{ backgroundColor: "#d32f2f" }}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Dashboard;
