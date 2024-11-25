import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Typography,
  Grid,
  IconButton,
  Badge,
  Modal,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import logo from "../images/logo.png";

import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TaskIcon from "@mui/icons-material/Task";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import dayjs from "dayjs";
import { getFilesCount, updateDocketNumber } from "../../lib/api-docket";
import LoadingSpinner from "../ui/LoadingSpinner";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import CustomSnackbar from "../ui/SnackbarComponent";

const style = {
  position: "absolute",
  fontFamily: "roboto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1%",
  boxShadow: 24,
  p: 4,
};

function Header() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmmessage, setConfirmmessage] = useState("");
  const [isConfirmationopen, setConfirmationopen] = useState(false);
  const [time, setTime] = useState(dayjs(new Date()).format("HH:mm:ss"))

  const countSetter = async () => {
    const getCount = await getFilesCount();
    console.log(getCount);
    setCount(getCount.data.count);
  };

  // useEffect(() => {
  //     countSetter();
  // }, []);

  const handleLrUpdate = async () => {
    setIsLoading(true);
    const response = await updateDocketNumber();
    if (response.status === 200) {
      countSetter();
      setConfirmmessage(response.data.message);
      setConfirmationopen(true);
      setOpen(false);
      setIsLoading(false);
    } else {
      countSetter();
      setConfirmmessage(response.data.message);
      setConfirmationopen(true);
      setOpen(false);
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  setInterval(() => setTime(dayjs(new Date()).format("HH:mm:ss")), 1000)

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <nav className="navbar1 navbar1-expand-lg navbar1-light">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            margin: "0px 20px 0px 0px",
            padding: "0px 15px 15px",
            height: "75px",
            borderTop: "5px solid #63ac1e"
          }}
        >
          <Grid
            item
            style={{ padding: "0px", display: "flex", alignItems: "center" }}
          >
            <img src={logo} alt="" id="logo" style={{ marginRight: "10px" }} />
            <div>
              <Typography variant="h6" style={{ margin: 0 }}>
                <NavLink id="title" to="/index">
                  <span id="icon" style={{ color: "black" }}>
                    OM SAIRAM LOGISTICS
                  </span>
                </NavLink>
              </Typography>
              <Typography variant="body2" style={{ margin: 0 }}>
                <span id="icons" style={{ textAlign: "left", color: "black", fontWeight: 'bold', fontSize: '13px' }}>
                  PLOT NO-E7B/4, MIDC, PHASE-III,CHAKAN INDUSTRIAL AREA,
                  TAL-KHED, DIST. PUNE-410501
                </span>
              </Typography>
            </div>
          </Grid>

          <Grid item>
            {/* <Typography>
                            <span id="icons-details">Help Line / IT Support<br />
                                Contact No: +919112293931/+919209054594<br />
                                Email: - it@omsairamlogistics.com</span>
                        </Typography> */}
          </Grid>

          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Notifications">
              <span id="icons1">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </span>
            </Tooltip>
            <Tooltip title="Update Docket Number">
              <span
                id="icons1"
                onClick={handleOpen}
                style={{ marginLeft: "40px" }}
              >
                <Badge badgeContent={count} color="error">
                  <CardTravelIcon />
                </Badge>
              </span>
            </Tooltip>
          </Grid>

          <Grid item>
            <div id="marginicon1">
              <Typography variant="h6">
                <span id="icons11">
                  Welcome, superadmin Date:{" "}
                  {dayjs(new Date()).format("DD-MM-YYYY")}
                </span>
                <Grid container spacing={8}>
                  <Grid item sx={{ fontFamily: "poppins", fontWeight: "bold" }}>
                    {
                      time
                    }
                  </Grid>
                  <Grid item>
                    <NavLink to="/" id="hover1" sx={{ textDecoration: "none" }}>
                      <span id="icons1">
                        <Tooltip title="Logout">
                          <PowerSettingsNewIcon
                            sx={{
                              display: { xs: "none", md: "flex" },
                              fontSize: "150%",
                              fontWeight: 900,
                              color: '#4e944f',
                              mr: 0.7,
                            }}
                          />
                        </Tooltip>{" "}
                      </span>
                    </NavLink>
                  </Grid>

                </Grid>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </nav >

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Are You want to Update Docket Number?
            </Typography>
            <br />
            <Button
              variant="contained"
              color="success"
              sx={{ marginRight: 1 }}
              onClick={handleLrUpdate}
            >
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <CustomSnackbar
        open={isConfirmationopen}
        message={confirmmessage}
        onClose={() => setConfirmationopen(false)}
        color={"error"}
      />
    </>
  );
}

export default Header;
