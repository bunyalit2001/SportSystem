import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import { VscReport } from "react-icons/vsc";
import HomeIcon from '@mui/icons-material/Home';
import { MdOutlinePayment, MdSportsVolleyball, MdOutlineLocationCity, MdLogout } from "react-icons/md";

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

function MemberBar() {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
      };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={Theme}>
                    <AppBar position="static">
                        <Toolbar sx={{ flexWrap: "wrap", gap: 1, py: 1 }}>
                            <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: "auto" } }}>
                            <Button 
                            size="small"
                            color="secondary" 
                            component={RouterLink}
                            to="/HomeMember">
                                <HomeIcon sx={{ width: 25, height: 25}}/>
                            </Button>
                            Sport Center Management [ MEMBER ]
                            </Typography>
                            <Button 
                            size="small"
                            color="secondary" 
                            component={RouterLink}
                            to="/CreatePayment">
                                |
                                <MdOutlinePayment size={25} />
                                PayMent
                            </Button>
                            <Button 
                            size="small"
                            color="secondary" 
                            component={RouterLink}
                            to="/CreateBorrow_Sport_Equipment">
                                |
                                <MdSportsVolleyball size={25} />
                                Borrow
                            </Button> 
                            <Button 
                            size="small"
                            color="secondary" 
                            component={RouterLink}
                            to="/CreateLocationReservation">
                                |
                                <MdOutlineLocationCity size={25} />
                                Location Reservation
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
export default MemberBar;
