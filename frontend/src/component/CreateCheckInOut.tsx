import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocationReservationInterface } from '../models/ILocationReservationID'
import { StaffInterface } from '../models/IStaff'
import { StatusIDInterface } from '../models/IStatusID'
import { CreateCheckInOutInterface } from '../models/ICreateCheckInOut';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ListLocationReservation, GetStaffByID } from "../services/HttpClientService";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StaffBar from '../component/StaffBar';
import Home from '../component/Home';
import SearchIcon from '@mui/icons-material/Search';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ForwardIcon from '@mui/icons-material/Forward';
import { apiUrl } from "../services/ApiConfig";
import { isAuthenticatedAs } from "../services/AuthService";

const Theme = createTheme({
    palette: {
        primary: {
            main: '#323232',
        },
        secondary: {
            main: '#FF8B8B',
            // light: '#0066ff',
            // main: '#0044ff',
            // contrastText: '#ffcc00',
        },
    },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // combo box
    const [status, setStatus] = useState<StatusIDInterface[]>([]);
    const [locationReservation, setLocationReservation] = useState<LocationReservationInterface[]>([]);
    const [staffID, setStaffID] = useState<StaffInterface>();
    const [CreateCheckInOut, setCreateCheckInOut] = useState<Partial<CreateCheckInOutInterface>>({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [successIn, setSuccessIn] = useState(false);
    const [successOut, setSuccessOut] = useState(false);
    const [errorIn, setErrorIn] = useState(false);
    const [errorOut, setErrorOut] = useState(false);
    const [findCheckInID, setFindCheckInID] = useState([]);

    const requestOptionsGet = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const feachStatus = async () => {
        fetch(`${apiUrl}/locationReservation/`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => {
                setStatus(result.data);
            });
    };

    const listLocationReservation = async () => {
        let res = await ListLocationReservation();
        if (res) {
            setLocationReservation(res);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CreateCheckInOut;
        const { value } = event.target;

        setCreateCheckInOut({
            ...CreateCheckInOut,
            [id]: value
        })
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof CreateCheckInOut
        setCreateCheckInOut({
            ...CreateCheckInOut,
            [name]: event.target.value,
        });
    };

    const handleCloseIn = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessIn(false);
        setErrorIn(false);
    };
    const handleCloseOut = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessOut(false);
        setErrorOut(false);
    };
    const fetchStaffByID = async () => {
        let res = await GetStaffByID();
        if (res) {
            setCreateCheckInOut((prev) => ({
                ...prev,
                StaffID: res.ID,
            }));
            setStaffID(res);
        }
    };

    //เรียกใช้ feach ,เมื่อเริ่มรัน React ในเว็บบราวเซอร์
    useEffect(() => {
        fetchStaffByID();
        listLocationReservation();
    }, [])

    const columns: GridColDef[] = [
        { field: "ID", headerName: "รหัสการจอง", width: 100 },
        {
            field: "Member",
            headerName: "ชื่อสมาชิก",
            width: 180,
            valueFormatter: (params) => params.value.Member_Name,
        },
        {
            field: "Location",
            headerName: "สถานที่",
            width: 180,
            valueFormatter: (params) => params.value.Location_Name,
        },
        {
            field: "Sport_Type",
            headerName: "ประเภทกีฬา",
            width: 150,
            valueFormatter: (params) => params.value.Sport_Type_Name,
        },
        {
            field: "Time_In",
            headerName: "เวลาเข้า",
            width: 200,
            // valueFormatter: (params) => params.value.format("DD/MM/YYYY hh:mm A"), 
        },
        { field: "Time_Out", headerName: "เวลาออก", width: 200 },
    ];

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const getReservationID = () => {
        const id = Number(CreateCheckInOut.LocationReservationID);
        return Number.isFinite(id) && id > 0 ? id : undefined;
    };

    const readJsonResponse = async (response: Response) => {
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res?.error || "Request failed");
        }
        return res;
    };

    function checkAPI(id: number) {
        fetch(`${apiUrl}/locationReservationField/${id}`, requestOptionsGet)
            .then(readJsonResponse)
            .then((res) => {
                if (res.data) {
                    setLocationReservation(res.data);
                }
            })
            .catch(() => {
                setErrorIn(true);
            });
        return true;
    }

    function shearch() {
        const reservationID = getReservationID();
        if (!reservationID) {
            setErrorIn(true);
            return;
        }
        checkAPI(reservationID);
    }

    function checkIn() {
        const reservationID = getReservationID();
        if (!reservationID) {
            setErrorIn(true);
            return;
        }

        let data = {
            StaffID: convertType(CreateCheckInOut.StaffID),
            LocationReservationID: reservationID,
            StatusID: 1,
        }

        fetch(`${apiUrl}/cioChStatus/${reservationID}`, requestOptionsGet)
            .then(readJsonResponse)
            .then((res) => {
                const checkInOutList = Array.isArray(res.data) ? res.data : [];
                let num: number = 0;
                for (let i = 0; i < checkInOutList.length; i++) {
                    let obj = checkInOutList[i];
                    if (obj.StatusID === 1) {
                        num += 1;
                    }
                }
                if (num === 0) {
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    };

                    fetch(`${apiUrl}/createcio`, requestOptions)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                setSuccessIn(true);
                            } else {
                                setErrorIn(true);
                            }
                        });
                } else {
                    setErrorIn(true);
                }
            })
            .catch(() => {
                setErrorIn(true);
            });
    }
    function checkOut() {
        const reservationID = getReservationID();
        if (!reservationID) {
            setErrorOut(true);
            return;
        }

        let data = {
            StaffID: convertType(CreateCheckInOut.StaffID),
            LocationReservationID: reservationID,
            StatusID: 2,
        }

        fetch(`${apiUrl}/cioChStatus/${reservationID}`, requestOptionsGet)
            .then(readJsonResponse)
            .then((res) => {
                const checkInOutList = Array.isArray(res.data) ? res.data : [];
                let num: number = 0;
                let numFindStatus1: number = 0;
                for (let i = 0; i < checkInOutList.length; i++) {
                    let obj = checkInOutList[i];
                    if (obj.StatusID === 1) {
                        numFindStatus1 += 1;
                    } else if (obj.StatusID === 2) {
                        num += 1;
                    }
                }
                if ((numFindStatus1 === 1) && (num === 0)) {
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    };
                    fetch(`${apiUrl}/createcio`, requestOptions)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                setSuccessOut(true);
                            } else {
                                setErrorOut(true);
                            }
                        });
                } else {
                    setErrorOut(true);
                }
            })
            .catch(() => {
                setErrorOut(true);
            });
    }

    if (!isAuthenticatedAs("staff")) {
        return <Home />;
    }

    return (
        <ThemeProvider theme={Theme}>
            <StaffBar />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        mt: 2,
                    }}
                >
                    <Snackbar
                        open={successIn}
                        autoHideDuration={3000}
                        onClose={handleCloseIn}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleCloseIn} severity="success">
                            บันทึกข้อมูลการเช็คอินสำเร็จ
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={successOut}
                        autoHideDuration={3000}
                        onClose={handleCloseOut}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleCloseOut} severity="success">
                            บันทึกข้อมูลการเช็คเอ้าท์สำเร็จ
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={errorIn}
                        autoHideDuration={6000}
                        onClose={handleCloseIn}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleCloseIn} severity="error">
                            บันทึกข้อมูลการเช็คอินไม่สำเร็จ
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={errorOut}
                        autoHideDuration={6000}
                        onClose={handleCloseOut}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleCloseOut} severity="error">
                            บันทึกข้อมูลการเช็คเอ้าท์ไม่สำเร็จ
                        </Alert>
                    </Snackbar>
                </Box>
                <Paper>
                    <Box
                        display={"flex"}
                        sx={{
                            marginTop: 3,
                            padding: 2,
                        }}
                    >
                        <h2>ยืนยันการ เข้า-ออก สถานที่ให้บริการ</h2>
                    </Box>
                    <hr />

                    <Grid container spacing={2} sx={{ mx: { xs: 0, sm: 5 }, my: 1, p: 1 }}>
                        <Grid item xs={12} sm={4}>
                            <p>รหัสการจองสถานที่ของสมาชิก</p>
                            <TextField
                                fullWidth
                                id="LocationReservationID"
                                type="number"
                                label="ป้อนรหัสการจอง"
                                variant="outlined"
                                // name="Email"
                                // size="small"
                                value={CreateCheckInOut.LocationReservationID ?? ""}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <br />
                            <br />
                            <br />
                            <Button
                                size="large"
                                onClick={shearch}
                                variant="contained"
                                color="secondary"
                                startIcon={<SearchIcon />}>Search
                            </Button>
                        </Grid>
                        <Grid item>
                            <br />
                            <br />
                            <br />
                            <Button
                                size="large"
                                onClick={listLocationReservation}
                                variant="outlined"
                                color="primary"
                                startIcon={<AllInboxIcon />}>Find All
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mx: { xs: 0, sm: 5 }, my: { xs: 2, sm: -8 }, p: { xs: 1, sm: 3 } }}>
                        <div style={{ height: 300, width: "100%", marginTop: "20px", overflowX: "auto" }}>
                            <DataGrid
                                rows={locationReservation}
                                getRowId={(row) => row.ID}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </div>
                    </Grid>
                    <Grid container spacing={2} sx={{ mx: { xs: 0, sm: 5 }, my: 5, p: 1 }}>
                        <Grid item>
                            <Button
                                size="large"
                                onClick={checkIn}
                                variant="contained"
                                color="secondary"
                                startIcon={<WhereToVoteIcon />}>
                                Check IN
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                size="large"
                                onClick={checkOut}
                                variant="contained"
                                color="primary"
                                startIcon={<ForwardIcon />}>
                                Check OUT
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
