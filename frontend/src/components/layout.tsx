import Navbar from './Navbar'
import {AppBar, Toolbar } from "@mui/material";

export default function Layout({ children }: any) {
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
