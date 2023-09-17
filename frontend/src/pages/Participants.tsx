import ParticipantsList from "../components/ParticipantsList";
import {AppBar, Toolbar } from "@mui/material";
import type {NextPage} from 'next';

export const Participants: NextPage = () => {
  return (
          <>
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
