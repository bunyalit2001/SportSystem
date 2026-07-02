import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SportEuqipmentTypeInterface } from "../models/ISport_Equipment_Type";
import { SportTypeInterface } from "../models/ISport_Type";
import { SportEquipmentInterface } from "../models/ISport_Equipment";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { StaffInterface } from "../models/IStaff";
import Snackbar from "@mui/material/Snackbar";
import { GetStaffByID } from "../services/HttpClientService";
import StaffBar from "../component/StaffBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from "../component/Home";
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

function CreateSportEquipment() {
  /////////////////////////////////// COMBOBOX /////////////////////////////////////
  const [sportequipmenttype, setSportEquipmentype] = useState<SportEuqipmentTypeInterface[]>([]);
  const [sporttype, setSportType] = useState<SportTypeInterface[]>([]);
  const [staff, setStaff] = useState<StaffInterface>();
  const [sportequipment, setSportEquipment] = useState<Partial<SportEquipmentInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const feachSportEquipmentType = async () => {
    fetch(`${apiUrl}/sport_equipment_type`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setSportEquipmentype(result.data);
      });
  };

  const fetchSportType = async () => {
    fetch(`${apiUrl}/sport_type`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setSportType(result.data);
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
    const name = event.target.name as keyof typeof sportequipment;
    setSportEquipment({
      ...sportequipment,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof sportequipment;
    const { value } = event.target;
    // แก้ตรงนี้ จาก staff เป็น sportequipment
    setSportEquipment({ ...sportequipment, [id]: value });
  };

  const fetchStaffByID = async () => {
    let res = await GetStaffByID();
    if (res) {
      setSportEquipment((prev) => ({
        ...prev,
        StaffID: res.ID,
      }));
      setStaff(res);
    }
  };

  // เรียกใช้ feach
  useEffect(() => {
    feachSportEquipmentType();
    fetchSportType();
    fetchStaffByID();
  }, []);


  // คำสั่งซ้ำกันแยกออกมาเป็นฟังก์ชันอ่านง่ายกว่า
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    // ลองเทียบกับโค้ดเดิม
    let data = {
      StaffID: convertType(sportequipment.StaffID),
      Sport_TypeID: convertType(sportequipment.Sport_TypeID),
      Sport_Equipment_TypeID: convertType(sportequipment.Sport_Equipment_TypeID),
      Sport_Equipment_Name: sportequipment.Sport_Equipment_Name,
      Sport_Equipment_Amount: convertType(sportequipment.Sport_Equipment_Amount),
      // StaffID: 1,
      // Sport_TypeID: 1,
      // Sport_Equipment_TypeID: 1,
      // Sport_Equipment_Name: "testttt",
      // Sport_Equipment_Amount: 1000,
    };


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

    fetch(`${apiUrl}/Create_Sports_Equipment`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          window.location.href = "/sport_equipment_data";
        } else {
          setError(true);
        }
      });
  }

  const [token, setToken] = useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && localStorage.getItem("role") === "staff") {
      setToken(token);
    }
  }, []);

  if (!token || !isAuthenticatedAs("staff")) {

    return <Home />;
  }

  return (
    <div>
      <ThemeProvider theme={Theme}>
       <StaffBar/>
    <div />

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
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 1,
                  height: 50,
                },
              }}
            >
              <h2>ระบบบันทึกข้อมูลอุปกรณ์กีฬา</h2>
            </Box>
            <hr />
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <p>ประเภทอุปกรณ์กีฬา</p>
                <Select
                  fullWidth
                  id="SportEquipmentType"
                  onChange={handleChange}
                  native
                  value={String(sportequipment.Sport_Equipment_TypeID ?? "")}
                  inputProps={{ name: "Sport_Equipment_TypeID" }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกประเภทอุปกรณ์กีฬา
                  </option>
                  {sportequipmenttype.map((item) => (
                    <option key={item.ID} value={item.ID}>
                      {item.SPORT_EQUIPMENT_TYPE_Name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <p>ประเภทกีฬา</p>
                <Select
                  fullWidth
                  id="SportType"
                  onChange={handleChange}
                  native
                  value={String(sportequipment.Sport_TypeID ?? "")}
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

              <Grid item xs={12}>
                <p>ชื่ออุปกรณ์กีฬา</p>
                <TextField
                  fullWidth
                  id="Sport_Equipment_Name" // แก้ตรงนี้ให้ตรงกับ json (แก้แล้ว)
                  label="ชื่ออุปกรณ์กีฬา"
                  variant="outlined"
                  value={sportequipment.Sport_Equipment_Name ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <p>จำนวนอุปกรณ์</p>
                <TextField
                  fullWidth
                  id="Sport_Equipment_Amount" // แก้ตรงนี้ให้ตรงกับ json (แก้แล้ว)
                  type="Number"
                  InputProps={{ inputProps: { min: 0, max: 20000 } }}
                  label="จำนวนอุปกรณ์"
                  variant="outlined"
                  value={sportequipment.Sport_Equipment_Amount ?? ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/sport_equipment_data"
                  variant="contained"
                  color="secondary"
                >
                  BACK
                </Button>

                <Button
                  onClick={submit}
                  variant="contained"
                  color="primary"
                  sx={{ float: "right" }}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default CreateSportEquipment;
