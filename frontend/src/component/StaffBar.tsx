import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import { VscReport } from "react-icons/vsc";
import HomeIcon from '@mui/icons-material/Home';
import { MdLogout, MdLocationPin,MdOutlineSportsBasketball } from "react-icons/md";

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

function StaffBar() {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
      };

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
                            to="/HomeStaff">
                                <HomeIcon sx={{ width: 25, height: 25}}/>
                            </Button>
                            Sport Center Management [ STAFF ]
                            </Typography>
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/CreateCheckInOut">
                                |
                                <MdLocationPin size={25} />
                                Check In
                            </Button>
                            <Button 
                            color="secondary" 
                            component={RouterLink}
                            to="/sport_equipment_data">
                                |
                                <MdOutlineSportsBasketball size={25} />
                                SportEquipment
                            </Button>                        
                            <Button 
                            color="secondary" 
                            onClick={logout}
                            >
                                |
                                <MdLogout size={25}/>
                                Logout
                            </Button>                            
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </div>
    );
};
export default StaffBar;