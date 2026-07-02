import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MemberInterface } from '../models/IMember'
import { SportEuqipmentTypeInterface } from '../models/ISport_Equipment_Type';
import { SportEquipmentInterface } from '../models/ISport_Equipment';
import { CreateBorrow_Sport_EquipmentInterface } from '../models/ICreateBorrow_Sport_Equipment';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MemberBar from './MemberBar';
import Home from './Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import { GetMemberByID } from "../services/HttpClientService";
import { apiUrl } from "../services/ApiConfig";
import { isAuthenticatedAs } from "../services/AuthService";

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateBorrow_Sport_Equipment() {

    const [Time_Borrow, setTime_Borrow] = React.useState<Date | null>(null);
    const [Time_Giveback, setTime_Giveback] = React.useState<Date | null>(null);
    // combo box
    const [Sport_Equipment_Type, setSport_Equipment_Type] = useState<SportEuqipmentTypeInterface[]>([]);
    const [Sport_Equipment, setSport_Equipment] = useState<SportEquipmentInterface[]>([]);
    const [CreateBorrow_Sport_Equipment, setCreateBorrow_Sport_Equipment] = useState<Partial<CreateBorrow_Sport_EquipmentInterface>>({});
    const [member, setMember] = useState<MemberInterface>();
    const [CreateBorrow_Sport_Equipments, setCreateBorrow_Sport_Equipments] = React.useState<CreateBorrow_Sport_EquipmentInterface[]>([]);


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const requestOpionsGet = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const getBorrowSportEquipment = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },


        }

        fetch(`${apiUrl}/borrow-sport-eqiupments`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCreateBorrow_Sport_Equipments(res.data);
                }
            });
    }

    const fetchCreateBorrowSportEquipments = async () => {
        fetch(`${apiUrl}/borrow-sport-eqiupments`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                setCreateBorrow_Sport_Equipments(result.data);
            });
    };

    const feachSport_Equipment = async () => {
        fetch(`${apiUrl}/sport_equipment_data`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                setSport_Equipment(result.data);
            });
    };

    const feachSport_Equipment_Type = async () => {
        fetch(`${apiUrl}/sport_equipment_type`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                setSport_Equipment_Type(result.data);
            });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof CreateBorrow_Sport_Equipment
        setCreateBorrow_Sport_Equipment({
            ...CreateBorrow_Sport_Equipment,
            [name]: event.target.value,
        });
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof CreateBorrow_Sport_Equipment;
        const { value } = event.target;
        // แก้ตรงนี้ จาก staff เป็น sportequipment
        setCreateBorrow_Sport_Equipment({ ...CreateBorrow_Sport_Equipment, [id]: value });
    };

    const fetchMemberByID = async () => {
        let res = await GetMemberByID();
        if (res) {
            setCreateBorrow_Sport_Equipment((prev) => ({
                ...prev,
                MemberID: res.ID,
            }));
            setMember(res);
        }
    };

    //เรียกช้ feach//
    useEffect(() => {
        feachSport_Equipment_Type();
        feachSport_Equipment();
        fetchCreateBorrowSportEquipments();
        getBorrowSportEquipment();
        fetchMemberByID();
    }, []);

    const columns: GridColDef[] = [
        { field: "ID", headerName: "No.", width: 20 },

        {
            field: "Member",
            headerName: "Member",
            width: 150,
            valueFormatter: (params) => params.value.Member_Name,
        },

        {
            field: "Sport_Equipment_Type",
            headerName: "Sport Equipment Type",
            width: 170,
            valueFormatter: (params) => params.value.SPORT_EQUIPMENT_TYPE_Name,
        },
        {
            field: "Sport_Equipment",
            headerName: "Sport Equipment",
            width: 170,
            valueFormatter: (params) => params.value.Sport_Equipment_Name,
        },
        {
            field: "Time_Borrow",
            headerName: "Time Borrow",
            width: 220,   
        },
        {
            field: "Time_Giveback",
            headerName: "Time Giveback",
            width: 220,
        },
    ];

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    }

    function submit() {
        let data = {
            MemberID: convertType(CreateBorrow_Sport_Equipment.MemberID),
            Sport_Equipment_TypeID: convertType(CreateBorrow_Sport_Equipment.Sport_Equipment_TypeID),
            Sport_EquipmentID: convertType(CreateBorrow_Sport_Equipment.Sport_EquipmentID),
            Time_Borrow: Time_Borrow,
            Time_Giveback: Time_Giveback,

        }

        const requestOptions = {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(data),
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/borrow-sport-eqiupment`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                    window.location.href = "/CreateBorrow_Sport_Equipment"
                } else {
                    setError(true);
                }
            });
    };

    const [token, setToken] = useState<String>("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && localStorage.getItem("role") === "member") {
            setToken(token);
        }
    }, []);

    if (!token || !isAuthenticatedAs("member")) {

        return <Home />;
    }

    return (
        <div>
            <ThemeProvider theme={Theme}>
                <MemberBar />
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            mt: 2,
                        }}
                    >
                        <Snackbar
                            open={success}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert onClose={handleClose} severity="success">
                                บันทึกข้อมูลสำเร็จ
                            </Alert>
                        </Snackbar>

                        <Snackbar
                            open={error}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert onClose={handleClose} severity="error">
                                บันทึกข้อมูลไม่สำเร็จ
                            </Alert>
                        </Snackbar>
                    </Box>
                    <Paper>
                        <Box
                            display={"flex"}
                            sx={{
                                marginTop: 2,
                                padding: 2,

                            }}
                        >
                            <h2>ยืมอุปกรณ์กีฬา</h2>
                        </Box>
                        <hr />

                        <Grid container spacing={2} sx={{ margin: 2 }}>
                            <Grid item xs={11}>
                                <p>ประเภทอุปกรณ์</p>
                                <Select
                                    fullWidth
                                    id="SportEquipmentType"
                                    onChange={handleChange}
                                    native
                                    value={String(CreateBorrow_Sport_Equipment.Sport_Equipment_TypeID ?? "")}
                                    inputProps={{ name: "Sport_Equipment_TypeID" }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกประเภทอุปกรณ์กีฬา
                                    </option>
                                    {Sport_Equipment_Type.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.SPORT_EQUIPMENT_TYPE_Name}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>


                            <Grid item xs={11}>
                                <p>อุปกรณ์กีฬา</p>
                                <Select fullWidth id="Sport_Equipment"
                                    onChange={handleChange}
                                    native
                                    value={String(CreateBorrow_Sport_Equipment.Sport_EquipmentID ?? "")}
                                    inputProps={{ name: "Sport_EquipmentID", }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกอุปกรณ์กีฬา
                                    </option>
                                    {Sport_Equipment.map((item) => (
                                        <option key={item.ID} value={item.ID} >
                                            {item.Sport_Equipment_Name}
                                        </option>
                                    ))}
                                </Select>

                                <FormControl fullWidth variant="outlined">
                                    <p>เวลายืม</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            value={Time_Borrow}
                                            onChange={setTime_Borrow}
                                        />
                                    </LocalizationProvider>
                                </FormControl>

                                <FormControl fullWidth variant="outlined">
                                    <p>เวลาคืน</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            value={Time_Giveback}
                                            onChange={setTime_Giveback}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>

                            <Grid item xs={11}>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={RouterLink}
                                    to="/HomeMember"
                                >
                                    BACK
                                </Button>
                                <Button
                                    onClick={submit}
                                    variant="contained"
                                    color="primary"
                                    sx={{ float: 'right' }}>
                                    SUBMIT
                                </Button>
                            </Grid>

                            <Grid item xs={11}>
                                <Box
                                    display={"flex"}
                                    sx={{
                                        marginTop: 2,
                                    }}
                                >
                                    <h2>รายการยืมอุปกรณ์กีฬา</h2>
                                </Box>
                                <hr />
                                <Box>
                                    <div style={{ height: 400, width: "100%", marginTop: "20px", overflowX: "auto" }}>
                                        <DataGrid
                                            rows={CreateBorrow_Sport_Equipments}
                                            getRowId={(row) => row.ID}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                        />
                                    </div>
                                </Box>

                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default CreateBorrow_Sport_Equipment;
