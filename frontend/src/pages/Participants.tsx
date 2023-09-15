import ParticipantsList from "../components/ParticipantsList";
import {AppBar, Toolbar } from "@mui/material";
import SignUpForm from "../components/signUpForm";
import type {NextPage} from 'next';

export const Participants: NextPage = () => {
  return (
          <>
            <AppBar position="static" sx={{ bgcolor: "pink" }}>
                <section aria-label={"toolbar-section"}
                         style={{display: "flex", flexDirection: "row", justifyContent: "right"}}>
                    <Toolbar>
                        <SignUpForm/>
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
