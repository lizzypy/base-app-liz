import React, {useState} from "react";
import {Button, Container, Typography, MenuItem} from '@material-ui/core'
import axios from 'axios';
import {Box, Input, Modal} from "@mui/material";
import Link from "next/link";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [signInOpen, setSignInOpen] = useState<boolean>(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpSuccessful, setSignUpSuccessful] = useState(false);


    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const handleSignInOpen = () => {
        setSignInOpen(true);
    }
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const submitData = () => {
        handleClose();
        let data = {
            user: {
                email: email,
                password: password,
                password_confirmation: password,
            }
        }

        axios({
            url: '/users',
            method: 'POST',
            baseURL: 'http://new-url.com',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => {
                setSignUpSuccessful(true)
                return response.data
            });
    };

    return (
        <>
            <section aria-label={"toolbar-section"}
                         style={{display: "flex", flexDirection: "row", justifyContent: "left"}}>
              <MenuItem>
                 <Link
                    style={{
                        textDecoration: 'none',
                        color: '#000'
                    }}
                    href="/"
                 >
                   HOME
                 </Link>
              </MenuItem>
              <MenuItem>
                 <Link
                    style={{
                        textDecoration: 'none',
                        color: '#000'
                    }}
                    href="/users"
                 >
                   USERS
                 </Link>
              </MenuItem>
              <MenuItem>
                 <Link
                    style={{
                        textDecoration: 'none',
                        color: '#000'
                    }}
                    href="/participants"
                 >
                   PARTICIPANTS
                 </Link>
              </MenuItem>
            </section>
            <section aria-label={"toolbar-section"}
                         style={{display: "flex", flexDirection: "row", justifyContent: "right"}}>

             <MenuItem>
                 <Link
                  style={{
                          textDecoration: 'none',
                          color: '#000'
                      }}
                  href="/signup">SIGN UP
                </Link>
              </MenuItem>
              <Button
                style={{
                        textDecoration: 'none',
                        color: '#000'
                    }}
                onClick={handleSignInOpen}>Sign In
              </Button>
            </section>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <h1>Sign Up</h1>
                    <Container
                        style={{display: "flex", justifyContent: "center", flexDirection: "column", width: "150px"}}>
                        <Input
                            sx={{alignItems: "center"}}
                            type="text"
                            onChange={handleEmailChange}
                            className="email-input"
                            placeholder="Email"/>

                        <Input
                            sx={{alignItems: "center", margin: "10px 0px"}}
                            type="password"
                            onChange={handlePasswordChange}
                            className="password-input"
                            placeholder="Password"/>

                    </Container>
                    <Button onClick={submitData}>Sign Up</Button>
                    {signUpSuccessful && <Typography variant={"body1"}>You have signed up successfully!</Typography>}
                </Box>
            </Modal>
        </>
    );
}

export default Navbar;
