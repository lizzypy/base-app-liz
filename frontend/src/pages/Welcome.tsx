import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {AppBar, Toolbar } from "@mui/material";
import useUsers from "../hooks/useUsers";
import type {NextPage} from 'next';
import Navbar from "../components/Navbar";
import ParticipantsList from "../components/ParticipantsList";
import {Typography} from "@material-ui/core";

export const Welcome: NextPage = () => {
    const { users, isLoading } = useUsers();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: true,
        },
        {
            field: 'updated_at',
            headerName: 'Last Updated',
            width: 300,
            editable: true,
        },
    ]

    return (
        <div>
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
                <Box sx={{textAlign:'left', height: 400, width: '100%'}}>
                    <Typography variant={'h6'}> Users </Typography>
                   <div style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        rows={users}
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
                   </div>
                </Box>
            </section>
        </div>
    );
}
