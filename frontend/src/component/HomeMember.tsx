import React, {useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MemberBar from './MemberBar'
import Home from './Home';
import { isAuthenticatedAs } from "../services/AuthService";

function HomeMember() {

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
            <MemberBar />
            <Container>
        <Grid container component="main" sx={{ height: "91vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={12}
            sx={{
              backgroundImage: "url(https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80)",
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
export default HomeMember;
