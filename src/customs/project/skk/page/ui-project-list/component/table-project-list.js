import {Box, Divider, Grid, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {useState} from "react";
import {dispatch} from "../../../../../store";
import MuiDialog from "../../../../../component/MuiDialog";
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../../router";
import {skkProjectDelete} from "../../../../../store/slice/skk";
import UserAvatar from "../../../component/toolbar/user-avatar";
import AdsClickIcon from '@mui/icons-material/AdsClick';

const TableProjectList = (props) => {
    const create_table_column = () => {
        return ([
            {
                accessorKey: 'title',
                header: "Title",
                enableSorting: true,
                enableColumnActions: false,
            },
            {
                accessorKey: 'creator',
                header: "Creator",
                enableSorting: true,
                enableColumnActions: false,
                size: 100,
                Cell: ({cell}) => (
                    <>
                        <UserAvatar user={cell.getValue()}/>
                    </>
                )
            },
            {
                accessorKey: 'created',
                header: "Created",
                enableSorting: true,
                enableColumnActions: false,
                size: 100,
                Cell: ({cell}) => (
                    <>
                        <div>{cell.getValue() !== undefined ? cell.getValue().split(", ")[0] : ""}</div>
                        <div>{cell.getValue() !== undefined ? cell.getValue().split(", ")[1] : ""}</div>
                    </>
                )
            },
            {
                accessorKey: 'action',
                header: "Action",
                enableSorting: false,
                enableColumnActions: false,
                size: 80,
                Cell: ({row}) => (
                    <>
                        <IconButton
                            onClick={(e) => handleClick(e, row.original)}><AdsClickIcon/></IconButton>
                        {/*<IconButton*/}
                        {/*    onClick={() => showDialogDelete(row.original)}><DeleteForeverOutlinedIcon/></IconButton>*/}
                        {/*<IconButton onClick={() => openProjectPage(row.original)}><FolderOpenOutlinedIcon/></IconButton>*/}
                    </>
                )
            }
        ])
    }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [data, setData] = useState(props.data)
    const [row, setRow] = useState({})
    const navigate = useNavigate()

    const openProjectPage = () => {
        handleClose();
        navigate(getRouterUrl("skk-project-open", "/", {id: row['id']}))
    }
    const editProjectPage = () => {
        handleClose();
        navigate(getRouterUrl("skk-project-edit", "/", {id: row['id']}))
    }
    const kanbanProjectPage = () => {
        handleClose();
        navigate(getRouterUrl("skk-project-kanban", "/", {id: row['id']}))
    }
    const ganttProjectPage = () => {
        handleClose();
        navigate(getRouterUrl("skk-project-gantt", "/", {id: row['id']}))
    }

    const showDialogDelete = () => {
        setOpenDeleteDialog(true)
        handleClose();
    }
    const dialogClearOnCancelClicked = () => {
        setOpenDeleteDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        dispatch(skkProjectDelete(row))
        setOpenDeleteDialog(false)
        window.location.reload()
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, rr) => {
        setRow(rr)
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MaterialReactTable
                table={useMaterialReactTable({
                    columns: create_table_column(),
                    data,
                    enableRowNumbers: true,
                    rowNumberDisplayMode: 'original',
                    enableStickyHeader: true,
                    manualSorting: false,
                    enableTopToolbar: false,
                    enableStickyFooter: false,
                    enableFullScreenToggle: false,
                    enableDensityToggle: false,
                    enableColumnFilters: false,
                    enableBottomToolbar: data.length > 10
                })}
            />

            <MuiDialog
                open={openDeleteDialog}
                title={<Box textAlign={'center'}><Typography variant={'h4'}>Delete project</Typography></Box>}
                contents={
                    <>
                        <Grid container spacing={2}>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <Typography>Are you want to delete project <b>{row['title']}</b> ?</Typography>
                            </Grid>
                        </Grid>
                    </>
                }
                cancelText={"No"}
                confirmText={"Yes"}
                onCancelClicked={dialogClearOnCancelClicked}
                onConfirmClicked={dialogClearOnConfirmClicked}
            />

            <div>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: 150,
                        },
                    }}
                >
                    <MenuItem onClick={openProjectPage}>Open</MenuItem>
                    <MenuItem onClick={editProjectPage}>Edit</MenuItem>
                    <MenuItem onClick={showDialogDelete}>Delete</MenuItem>
                    <Divider />
                    <MenuItem onClick={ganttProjectPage}>Gantt</MenuItem>
                    <MenuItem onClick={kanbanProjectPage}>Kanban</MenuItem>
                </Menu>
            </div>
        </>
    )
}
export default TableProjectList