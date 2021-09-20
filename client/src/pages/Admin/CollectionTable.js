import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import LayersIcon from "@material-ui/icons/Layers";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CollectionForm from "./CollectionForm";
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography, Table, TableContainer, TableHead, Button } from "@material-ui/core";
import useTable from "../../components/Reusable/useTable";
import Controls from "../../components/Reusable/Controls";
import Popup from "../../components/Reusable/Popup";
import Notification from "../../components/Reusable/Notification";
import ConfirmDialog from "../../components/Reusable/ConfirmDialog";
import Collection from "../../images/collection.json";
import AdminNav from "../../components/Reusable/AdminNav"
import useStyles from './style';
import axios from 'axios';
import { actionDeleteCollection } from '../../_actions/collections';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import CollectionEdit from "./EditCollectionForm";
import DeleteIcon from '@material-ui/icons/Delete';


const CollectionTable = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup1, setOpenPopup1] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const dispatch = useDispatch();
    const [collectionId, setCollectionId] = useState([]);

    const openInPopup = (item) => {
       
        setOpenPopup(true);
    };

    // const openInPopup1 = (item) => {
     
    //     setOpenPopup1(true);
    // };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Collection,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [listOfCollections, setListOfCollections] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/collection").then((response) => {
          
            setListOfCollections(response.data);
        })
    }, []);


    const onRemove = (id) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });


        dispatch(actionDeleteCollection(id));

       
        const data = { id: id }
       
        axios.delete(`http://localhost:3001/collection/remove/`, { data }).then((response) => {

            if (response.data.data == 0) {
                setNotify({
                    isOpen: true,
                    message: 'Removed Failed !',
                    type: 'error'
                });
            } else {

                setNotify({
                    isOpen: true,
                    message: 'Removed Successfully !',
                    type: 'success'
                });
                axios.get("http://localhost:3001/collection").then((response) => {
                    console.log(response.data);
                    setListOfCollections(response.data);
                });

            }



        });



    };

    const onSetId = (id) => {
        localStorage.setItem("collection_id", id);


    };

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(listOfCollections, "", filterFn);



    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.collection_name.toLowerCase().includes(target.value))
            }
        })
    }

    function setCollectionIdtoChange(value) {
        setOpenPopup1(true)
        setCollectionId({
            collection_id: value.id,
        })
    }

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />

            <main className={classes.content}>
                <PageHeader title="COLLECTIONS" icon={<LayersIcon fontSize="large" />} />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search Collection"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>

                                ),
                            }}
                            onChange={handleSearch}
                        />
                        <Controls.Button
                            text="Add New Collection"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => {
                                setOpenPopup(true);
                            }}
                        />
                    </Toolbar>

                    <container>
                        <center>
                            <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>COLLECTIONS</Typography>
                            <TableContainer style={{ marginTop: '30px', align: 'center', width: '1100px', height: '100%' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Collection Name</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Image</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>View Designs</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Update</TableCell>
                                            <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recordsAfterPagingAndSorting()
                                            .map((value) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}>{value.collection_name}</TableCell>
                                                        <TableCell align="center" style={{ fontFamily: 'Montserrat' }}><img height={100} align="center" src={'http://localhost:3001/' + value.coverImage} alt=""></img></TableCell>

                                                        <TableCell align="center">
                                                            <Button
                                                                href="http://localhost:3000/designs"
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => onSetId(value.id)}
                                                            >View Designs
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Controls.Button
                                                                text="Edit"
                                                                onClick={() => setCollectionIdtoChange(value)}
                                                            />
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Button name="remove"
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => {
                                                                    setConfirmDialog({
                                                                        isOpen: true,
                                                                        title: 'Are you sure to delete this?',
                                                                        subTitle: "You can't undo this operation...",
                                                                        onConfirm: () => { onRemove(value.id) }
                                                                    })
                                                                }}>

                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                                <TblPagination />
                            </TableContainer>
                        </center>
                    </container>


                    <Popup
                        title="Add Collection Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <CollectionForm />
                    </Popup>


                    <Popup

                        title="Edit Collection Form"

                        openPopup={openPopup1}
                        setOpenPopup={setOpenPopup1}
                    >

                        <CollectionEdit selectedCollectionId={collectionId} />
                    </Popup>

                    <Notification notify={notify} setNotify={setNotify} />

                    {<ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />}
                </Paper>
            </main>
        </div>
    );
};

export default CollectionTable;
