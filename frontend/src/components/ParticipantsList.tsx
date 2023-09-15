import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {AppBar, Toolbar } from "@mui/material";
import useParticipants from "../hooks/useParticipants";
import type {NextPage} from 'next';
import SignUpForm from "../components/signUpForm";
import {Typography} from "@material-ui/core";

const ParticipantsList = () => {
    const { participants, isLoading } = useParticipants();

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'first_name',
            headerName: 'First Name',
            width: 300,
            editable: true,
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
            width: 300,
            editable: true,
        },
    ]

    return (
        <div>
                <Box sx={{textAlign:'left', height: 400, width: '100%'}}>
                    <Typography variant={'h6'}> Participants </Typography>
                   <div style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        rows={participants}
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
        </div>
    );
}

export default ParticipantsList;
