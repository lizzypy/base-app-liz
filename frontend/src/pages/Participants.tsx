import ParticipantsList from "../components/ParticipantsList";
import {AppBar, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";
import type {NextPage} from 'next';

export const Participants: NextPage = () => {
  return (
          <>
            <AppBar position="static" sx={{ bgcolor: "pink" }}>
                <section aria-label={"toolbar-section"}
                         style={{display: "flex", flexDirection: "row", justifyContent: "right"}}>
                    <Toolbar>
                        <Navbar/>
                    </Toolbar>
                </section>
            </AppBar>
            <section aria-label={"participants-section"}
                     style={{
                         padding: "40px 30px",
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "space-around"
                     }}>
              <ParticipantsList/>
            </section>
          </>
    )
}
