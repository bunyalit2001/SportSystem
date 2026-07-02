import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Alert, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PackageInterface } from '../models/IPackage'
import { Payment_TypeInterface } from '../models/IPayment_Type'
import { MemberInterface } from '../models/IMember'
import { BankInterface } from '../models/IBank'
import { CreatePaymentInterface } from '../models/ICreatePayment'
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './Home';
import MemberBar from './MemberBar';
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


const priceData = [25000, 2000, 80]

function CreatePayment() {

  // combo box
  const [payment_type, setPayment_Type] = useState<Payment_TypeInterface[]>([]);
  const [bank, setBank] = useState<BankInterface[]>([]);
  const [packages, setPackage] = useState<PackageInterface[]>([]);
  const [CreatePayment, setCreatePayment] = useState<Partial<CreatePaymentInterface>>({  });
  const [datetime, setDatetime] = React.useState<Date | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [member, setMember] = useState<MemberInterface>();
  // const [price, setPrice] = useState(0)
  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const feachPackage = async () => {
    fetch(`${apiUrl}/package`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPackage(result.data);
      });
  };

  const feachPayment_Type = async () => {
    fetch(`${apiUrl}/payment_type`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPayment_Type(result.data);
      });
  };

  const feachBank = async () => {
    fetch(`${apiUrl}/bank`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setBank(result.data);
      });
  };

  const fetchMemberByID = async () => {
    let res = await GetMemberByID();
    if (res) {
      setCreatePayment((prev) => ({
        ...prev,
        MemberID: res.ID,
      }));
      setMember(res);
    }
  };
  console.log(typeof CreatePayment.MemberID)

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    if(event.target.id != null){
    const id = event.target.id as keyof typeof CreatePayment;
    const { value } = event.target;
    console.log(id, value);
    setCreatePayment({ ...CreatePayment, [id]: value });}
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof CreatePayment
    const nextPayment = {
      ...CreatePayment,
      [name]: event.target.value,
    };

    if (event.target.name === "PackageID") {
      nextPayment.Price = priceData[+event.target.value - 1];
    }

    setCreatePayment(nextPayment);
  };

  //เรียกช้ feach//
  useEffect(() => {
    feachPackage();
    feachPayment_Type();
    feachBank();
    fetchMemberByID();
  }, []);
  console.log(CreatePayment);


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
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

  function proofpayment() {
    const price = priceData[Number(CreatePayment.PackageID) - 1];
    let data = {
      MemberID: convertType(CreatePayment.MemberID),
      PackageID: convertType(CreatePayment.PackageID),
      Payment_TypeID: convertType(CreatePayment.Payment_TypeID),
      BankID: convertType(CreatePayment.BankID),
      Bank_Account: CreatePayment.Bank_Account,
      Price: convertType(price),
      Datetime: datetime,
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

    fetch(`${apiUrl}/payment`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          window.location.href = "/CreatePayment";
        } else {
          setError(true);
        }
      });
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
                marginTop: 1,
                padding: 0,
                marginX: 13,
              }}
            >
              <h1>ชำระเงิน</h1>
            </Box>
            <hr />

            <Grid container spacing={2} sx={{ padding: 2, marginX: 0.1 }}>

              {/* package */}
              <Grid item xs={6}>

                <h3>Package</h3>
                <Select
                  required
                  fullWidth
                  id="Package"
                  onChange={handleChange}
                  native
                  value={String(CreatePayment.PackageID ?? "")}
                  inputProps={{ name: "PackageID" }}>
                  <option aria-label="None" value="">
                    select-your-package
                  </option>
                  {packages.map((item) => (
                    <option key={item.ID} value={item.ID} >
                      {item.Package_Type}

                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
                <p><h3>ช่องทางรับชำระเงิน</h3></p>
                <Select
                  fullWidth
                  id="Payment_Type" ///เลือก combobox
                  onChange={handleChange}
                  native
                  value={String(CreatePayment.Payment_TypeID ?? "")}
                  inputProps={{ name: "Payment_TypeID" }}>
                  <option aria-label="None" value="">
                    กรุณาเลือกช่องทางการชำระเงิน
                  </option>
                  {payment_type.map((item) => (
                    <option key={item.ID} value={item.ID} >
                      {item.Payment_Type_Name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <p><h3>ชื่อธนาคาร</h3></p>
                <Select
                  fullWidth
                  id="Bank"
                  onChange={handleChange}
                  native
                  value={String(CreatePayment.BankID ?? "")}
                  inputProps={{ name: "BankID" }}>
                  <option aria-label="None" value="">
                    กรุณาเลือกธนาคาร
                  </option>
                  {bank.map((item) => (
                    <option key={item.ID} value={item.ID} >
                      {item.Bank_Name}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <h3>หมายเลขบัญชี</h3>
                <TextField
                  required
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  id="Bank_Account"
                  type="string"
                  label="หมายเลขบัญชี"
                  variant="outlined"
                  value={CreatePayment.Bank_Account ?? ""}
                  onChange={handleInputChange} />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>

                <FormControl fullWidth variant="outlined">

                  <p><h3>จำนวนเงิน</h3></p>

                  <TextField
                    required
                    id="Price"
                    variant="outlined"
                    size="medium"
                    disabled
                    value={CreatePayment.Price ?? ""}
                    InputLabelProps={{
                      shrink: true,
                    }}

                  />
                </FormControl>
              </Grid>

              {/* วันเวลาที่ชำระ */}
              <Grid item xs={3}>
                <FormControl fullWidth variant="outlined">
                  <p><h3>วันเวลาที่ชำระ</h3></p>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker

                      renderInput={(props) => <TextField {...props} />}
                      value={datetime}
                      onChange={setDatetime}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                {/*<Item>xs=6</Item>*/}
              </Grid>

              <Grid item xs={6} sx={{ marginTop: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/HomeMember"
                >
                  BACK
                </Button>
                <Button
                  onClick={proofpayment}
                  variant="contained"
                  color="primary"
                  sx={{ float: 'right' }}>
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

export default CreatePayment;
