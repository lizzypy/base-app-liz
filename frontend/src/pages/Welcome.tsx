import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import React, {useState} from "react";
import {AppBar, Toolbar } from "@mui/material";
import useParticipants from "../hooks/useParticipants";
import SignUpForm from "../components/signUpForm";

export const Welcome = () => {
    const apiData = useParticipants();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'first_name',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'last_name',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'birthdate',
            headerName: 'Birth Date',
            width: 110,
            editable: true,
        }
    ]

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    Participants
                </Toolbar>
                <SignUpForm/>
            </AppBar>
            <section aria-label={"projects-section"}
                     style={{
                         padding: "40px 30px",
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "space-around"
                     }}>
                <Box sx={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={apiData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </section>
        </div>
    );
}