import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { SportEquipmentInterface } from "../models/ISport_Equipment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
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


function SportEquipmentData() {
  const [sportquipments, setSportEquipments] = React.useState<SportEquipmentInterface[]>([]);

  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const getSportEquipments = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    // fetch ผิด เพราะไม่ใส่ path
    fetch(`${apiUrl}/sport_equipment_data`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSportEquipments(res.data);
        }
      });


  };

  /////////////////// จัดคอลัมน์รายการบันทึก //////////////////////

  const columns: GridColDef[] = [
    { field: "ID", headerName: "No.", width: 100 },

    {
      field: "Staff",
      headerName: "Staff Name",
      width: 170,
      valueFormatter: (params) => params.value.Staff_name,
    },

    {
      field: "Sport_type",
      headerName: "Sport type Name",
      width: 220,
      valueFormatter: (params) => params.value.Sport_Type_Name,
    },

    {
      field: "Sport_equipment_type",
      headerName: "Sport Equipment Type Name",
      width: 220,
      valueFormatter: (params) => params.value.SPORT_EQUIPMENT_TYPE_Name,
    },

    {
      field: "Sport_Equipment_Name",
      headerName: "Sport Equipment Name",
      width: 220,
    },

    {
      field: "Sport_Equipment_Amount",
      headerName: "Sport Equipment Amount",
      width: 220,
    },
  ];

  const fetchSportEquipments = async () => {
    fetch(`${apiUrl}/sport_equipment_data`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setSportEquipments(result.data);
      });
  };

  useEffect(() => {
    getSportEquipments();
    fetchSportEquipments();
  }, []);

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
        <StaffBar />
        <div />

        <Container maxWidth="lg">
          <Box display="flex" sx={{ justifyContent: "flex-end", m: 2 }}>
            <Box>
              <Button
                sx={{ float: 'right' }}
                component={RouterLink}
                to="/create_sport_equipment"
                variant="contained"
                color="secondary"
              >
                CreateData
              </Button>
            </Box>
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
                <h3>รายการบันทึกข้อมูลอุปกรณ์กีฬา</h3>
              </Box>

              <hr />

              <Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px", overflowX: "auto" }}>
                  <DataGrid
                    rows={sportquipments}
                    getRowId={(row) => row.ID}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
              </Box>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SportEquipmentData;
