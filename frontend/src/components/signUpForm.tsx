import React, {useState} from "react";
import {Button, Container, Typography} from '@material-ui/core'
import axios from 'axios';
import {Box, Modal} from "@mui/material";

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

function SignUpForm() {
    const [open, setOpen] = useState<boolean>(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpSuccessful, setSignUpSuccessful] = useState(false);


    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
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
            <Button onClick={handleOpen}>Sign Up</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 200}}>
                    <h1>Sign Up</h1>
                    <Container
                        style={{display: "flex", justifyContent: "center", flexDirection: "column", width: "150px"}}>
                        <input
                            style={{width: "100%", alignItems: "center"}}
                            type="text"
                            onChange={handleEmailChange}
                            className="email-input"
                            placeholder="Email"/>

                        <input
                            style={{width: "100%", alignItems: "center", margin: "10px 0px"}}
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

export default SignUpForm;