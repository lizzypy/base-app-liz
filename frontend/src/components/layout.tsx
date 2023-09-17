import Navbar from './Navbar'
import {AppBar, Toolbar } from "@mui/material";

export default function Layout({ children }) {
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
      <main>{children}</main>
    </>
  )
}
