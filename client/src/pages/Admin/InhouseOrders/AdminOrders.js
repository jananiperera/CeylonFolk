import React, { useState, useEffect } from "react";
import PageHeader from "../PageHeader";
import ViewListIcon from '@material-ui/icons/ViewList';
import AdminNav from "../../../components/Reusable/AdminNav"
import useStyles from './style';
import { Paper, Box } from "@material-ui/core";
import { useParams } from 'react-router';
import AllOrders from './AllOrders';
import PendingOrders from "./PendingOrders";



function AdminOrders() {
    const classes = useStyles();
    const { id } = useParams();

    return (

        <div style={{ display: "flex" }}>
            <AdminNav />
            <div className={classes.content}>
                <PageHeader title="INHOUSE ORDERS" icon={<ViewListIcon fontSize="large" />} />
                <div className={classes.stat}>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Pending Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>100</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Accepted Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>100</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Dispatched Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>100</span>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={3} className={classes.featured}>
                        <div className={classes.featuredItem}>
                            <span className={classes.featuredTitle}>Rejected Orders</span>
                            <div className={classes.featuredItemCount}>
                                <span className={classes.featuredCount}>100</span>
                            </div>
                        </div>
                    </Paper>
                </div>
                <Box className={id == 0 ? classes.activeContent : classes.hideContent}>
                    <AllOrders />
                </Box>
                <Box className={id == 1 ? classes.activeContent : classes.hideContent}>
                    <PendingOrders />
                </Box>
            </div>
        </div>
    )
}

export default AdminOrders;

