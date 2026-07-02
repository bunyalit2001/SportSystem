import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocationInterface } from "../models/ILocation";
import { SportEuqipmentTypeInterface } from "../models/ISport_Equipment_Type";
import { SportTypeInterface } from "../models/ISport_Type";
import { ReportInterface } from "../models/IReport";
import TextField from "@mui/material/TextField";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Homebar from './Homebar';
import { Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiUrl } from "../services/ApiConfig";

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

function CreateReport() {
    /////////////////// combobox /////////////////////////////////
    const [location, setLocation] = useState<LocationInterface[]>([]);
    const [sporteuqipmenttype, setSportEuqipmentType] = useState<SportEuqipmentTypeInterface[]>([]);
    const [sporttype, setSportType] = useState<SportTypeInterface[]>([]);
    const [report, setReport] = useState<Partial<ReportInterface>>({});
    const [success, setSuccess] = useState(false);

    const [error, setError] = useState(false);

    const requestOpionsGet = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const feachLocation = async () => {
        fetch(`${apiUrl}/location`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                setLocation(result.data);
            });
    };

    const feachSportEuqipmentType = async () => {
        fetch(`${apiUrl}/sport_equipment_type`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                setSportEuqipmentType(result.data);
            });
    };

    const feachSportType = async () => {
        fetch(`${apiUrl}/sport_type`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                setSportType(result.data);
            });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof report;
        setReport({
            ...report,
            [name]: event.target.value,
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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof report;
        const { value } = event.target;
        console.log(id, value);
        // แก้ตรงนี้ จาก staff เป็น sportequipment
        setReport({ ...report, [id]: value });
    };
    /////////////////////////////////////////////////////////////////////////

    /////////เรียกใช้feach/////////
    useEffect(() => {
        feachLocation();
        feachSportEuqipmentType();
        feachSportType();
    }, []);

    console.log(report);
    ////////////////////////////

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    function submit() {
        let data = {
            LocationID: convertType(report.LocationID),
            Sport_Equipment_TypeID: convertType(report.Sport_Equipment_TypeID),
            Sport_TypeID: convertType(report.Sport_TypeID),
            Detail: report.Detail,
        };

        console.log("data", data);

        const requestOptions = {

            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/report`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setSuccess(true);
                    window.location.href = "/CreateReport"
                } else {
                    setError(true);
                }
            });
    }

    return (
        <div>
            <ThemeProvider theme={Theme}>
                <Homebar />
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
                                padding: 1,
                            }}
                        >
                            <h2>ระบบแจ้งซ่อมแซมอุปกรณ์</h2>
                        </Box>
                        <hr />
                        <Grid container spacing={2} sx={{ padding: 2, marginX: 0.1 }}>
                            <Grid item xs={6}>
                                <p>สถานที่ให้บริการ</p>
                                <Select
                                    fullWidth
                                    id="Location"
                                    onChange={handleChange}
                                    native
                                    value={String(report.LocationID ?? "")}
                                    inputProps={{ name: "LocationID" }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกสถานที่
                                    </option>
                                    {location.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.Location_Name}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <p>รายละเอียดที่ต้องการเเจ้งให้สถานกีฬาทราบ</p>
                                <TextField
                                    fullWidth
                                    id="Detail"
                                    type="string"
                                    label="รายละเอียด"
                                    variant="outlined"
                                    value={report.Detail ?? ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <p>ประเภทกีฬาที่ให้บริการ</p>
                                <Select
                                    fullWidth
                                    id="SportType"
                                    onChange={handleChange}
                                    native
                                    value={String(report.Sport_TypeID ?? "")}
                                    inputProps={{ name: "Sport_TypeID" }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกประเภทกีฬา
                                    </option>
                                    {sporttype.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.Sport_Type_Name}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <p>ประเภทอุปกรณ์กีฬาที่ให้บริการ</p>
                                <Select
                                    fullWidth
                                    id="SportEuqipmentType"
                                    onChange={handleChange}
                                    native
                                    value={String(report.Sport_Equipment_TypeID ?? "")}
                                    inputProps={{ name: "Sport_Equipment_TypeID" }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกประเภทอุปกรณ์กีฬา
                                    </option>
                                    {sporteuqipmenttype.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.SPORT_EQUIPMENT_TYPE_Name}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={RouterLink}
                                    to="/">
                                    BACK
                                </Button>
                                <Button
                                    onClick={submit}
                                    variant="contained"
                                    color="primary"
                                    sx={{ float: "right" }}>
                                    SUBMIT
                                </Button>

                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default CreateReport;
