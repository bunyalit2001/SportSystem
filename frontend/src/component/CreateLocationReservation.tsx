import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocationInterface } from "../models/ILocation";
import { SportTypeInterface } from "../models/ISport_Type";
import { LocationReservationInterface } from "../models/ILocationReservation";
import { MemberInterface } from "../models/IMember";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormControl, FormLabel } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GetMemberByID } from "../services/HttpClientService";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './Home';
import MemberBar from './MemberBar';
import { Link as RouterLink } from "react-router-dom";
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

function LocationReservation() {

  const [location, setLocation] = useState<LocationInterface[]>([]);
  const [sporttype, setSportType] = useState<SportTypeInterface[]>([]);

  const [locationreservations, setLocationReservations] = useState<LocationReservationInterface[]>([]);

  const [locationreservation, setLocationReservation] = useState<Partial<LocationReservationInterface>>({});

  const [time_in, setTime_in] = useState<Date | null>(new Date());
  const [time_out, setTime_out] = useState<Date | null>(new Date());
  const [member, setMember] = useState<MemberInterface>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  /////////////////// combobox /////////////////////////////////

  const feachLocation = async () => {
    fetch(`${apiUrl}/location`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setLocation(result.data);
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

  ////////////////////////////////////////////////////////////

  //แสดงข้อมูล
  const feachLocationReservation = async () => {
    fetch(`${apiUrl}/Location_Reservations`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setLocationReservations(result.data);
      });
  };

  /////////////////////////////////////////////////////////////////

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof locationreservation;
    setLocationReservation({
      ...locationreservation,
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

  /////////////////////////////////////////////////////////////////////////////////

  const fetchMemberByID = async () => {
    let res = await GetMemberByID();
    if (res) {
      setLocationReservation((prev) => ({
        ...prev,
        MemberID: res.ID,
      }));
      setMember(res);
    }
  };
  console.log(typeof locationreservation.MemberID)

  /////////////////////////////////////////////////////////////////////////

  /////////เรียกใช้feach/////////
  useEffect(() => {
    feachLocation();
    feachSportType();
    feachLocationReservation();
    fetchMemberByID();
  }, []);

  console.log(locationreservation)
  ////////////////////////////

  const columns: GridColDef[] = [

    { field: "ID", headerName: "ID", width: 100 },
    { field: "Location", headerName: "Location", width: 150 , valueFormatter: (params) => params.value.Location_Name,},
    { field: "Time_In", headerName: "Time In", width: 300 },
    { field: "Time_Out", headerName: "Time Out", width: 300 },
    { field: "Member", headerName: "Member", width: 300 , valueFormatter: (params) => params.value.Member_Name,},
    { field: "Sport_Type", headerName: "Sport Type", width: 300 , valueFormatter: (params) => params.value.Sport_Type_Name,},

  ];

  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
      MemberID: locationreservation.MemberID,
      LocationID: typeof locationreservation.LocationID === "string" ? parseInt(locationreservation.LocationID) : 0,
      Sport_TypeID: typeof locationreservation.Sport_TypeID === "string" ? parseInt(locationreservation.Sport_TypeID) : 0,
      Time_In: time_in,
      Time_Out: time_out,
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/Location_Reservation`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/CreateLocationReservation";
          }, 500);
        } else {
          setError(true);
        }
      });
    console.log(locationreservation.MemberID)
  }

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
        <Container maxWidth="xl">
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
              <h2>Location Reservation</h2>
            </Box>
            <hr />
            <Grid container spacing={2} sx={{ padding: 2, marginX: 0.1 }}>
              <Grid xs={6}>
                <h3>สถานที่ให้บริการต่างๆ</h3>
                <p>สถานที่ให้บริการ</p>
                <Select
                  fullWidth
                  id="Location"
                  onChange={handleChange}
                  native
                  value={String(locationreservation.LocationID ?? "")}
                  inputProps={{ name: "LocationID", }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกสถานที่
                  </option>
                  {location.map((item) => (
                    <option key={item.ID} value={item.ID} >
                      {item.Location_Name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid xs={6} sx={{ padding: 1 }}>

              </Grid>
              <Grid xs={6}>
                <p>ประเภทกีฬาที่ให้บริการ</p>
                <Select
                  fullWidth
                  id="SportType"
                  onChange={handleChange}
                  native
                  value={String(locationreservation.Sport_TypeID ?? "")}
                  inputProps={{ name: "Sport_TypeID", }}>
                  <option aria-label="None" value="">
                    กรุณาเลือกประเภทกีฬา
                  </option>
                  {sporttype.map((item) => (
                    <option key={item.ID} value={item.ID} >
                      {item.Sport_Type_Name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid xs={6}>

              </Grid>
              <Grid xs={3} >
                <FormControl fullWidth variant="outlined">
                  <p>เวลาเข้า</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={time_in}
                      onChange={setTime_in}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid xs={3}>
                <FormControl fullWidth variant="outlined">
                  <p>เวลาออก</p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={time_out}
                      onChange={setTime_out}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid xs={6}>

              </Grid>
              <Grid xs={6} sx={{ marginTop: 3 }}>
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
            </Grid>
          </Paper>
        </Container>
        <div style={{ height: 400, width: "97%", marginTop: '20px', marginLeft: '23px' }}>
          <h3>รายการจองสถานที่</h3>
          <DataGrid
            rows={locationreservations}

            getRowId={(row) => row.ID}

            columns={columns}

            pageSize={5}

            rowsPerPageOptions={[5]}

          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default LocationReservation;
