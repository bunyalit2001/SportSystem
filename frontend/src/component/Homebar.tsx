import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { VscReport } from "react-icons/vsc";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#323232',
        },
        secondary: {
            main: '#FF8B8B',
        },
    },
});

function Homebar() {

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={Theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1 }}>
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/">
                                <HomeIcon sx={{ width: 25, height: 25}}/>
                            </Button>
                            Sport Center Management
                            </Typography>
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/CreateReport">
                                <VscReport size={25} />
                                Report
                            </Button>
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/CreateMember">
                                |
                                <AiOutlineUserAdd size={25} />
                                CreateMember
                            </Button>
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/Login">
                                |
                                <AiOutlineUser size={25} />
                                Login
                            </Button>                        
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/StaffLogin">
                                |
                                <AdminPanelSettingsIcon sx={{ width: 25, height: 25}}/>
                                Staff Login
                            </Button>                            
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </div>
    );
};
export default Homebar;