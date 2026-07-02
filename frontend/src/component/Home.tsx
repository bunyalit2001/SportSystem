import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Homebar from './Homebar'

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

function Home() {
  return (
    <div>
      <Homebar />
      <Container>
        <Grid container component="main" sx={{ height: "91vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={12}
            sx={{
              backgroundImage: "url(https://images.unsplash.com/photo-1485313260896-6e6edf486858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
              backgroundRepeat: "secondary",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
          }}>  

          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Home;