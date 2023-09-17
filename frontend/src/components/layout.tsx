import Navbar from './Navbar'
import {AppBar, Toolbar } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "pink" }}>
          <Toolbar>
            <Navbar/>
          </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  )
}
