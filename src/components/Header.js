import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
  Avatar,
  Link,
  Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import logo from "../assets/images/companyLogo.png";
import { LinkContainer } from "react-router-bootstrap";
import { getUserDetails, logout, getUserStatus } from "../actions/userActions";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditProfile from "../screens/EditProfile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { grey } from '@mui/material/colors';

const App = () => {
  const { userDetails, getStatus, alert, createUser } = useSelector((state) => {
    return ({
      userDetails: state.userDetails,
      getStatus: state.getStatus,
      alert: state.alert,
      createUser: state.createUser
    })
  });

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [userStatus, setUserStatus] = useState();
  const [userProfile, setUserProfile] = useState();
  const [open, setOpen] = useState(false);
  const [headerName, setHeaderName] = useState('');
  const [requiredField, setRequiredField] = useState({});
  const [isPopup, setIsPopup] = useState(false);
  const dropdownList = [
    { id: "1", name: 'Smart Books' },
    { id: "2", name: 'Smart Books Payroll' },
    { id: "3", name: 'Smart Books Payments' },
    { id: "4", name: 'SSheets' },
  ]

  const [alertRes, setAlertRes] = useState('');

  const resetState = () => {
    setUserStatus();
    setUserProfile();
  }

  useEffect(() => {
    if (alert && Object.keys(alert).length > 0) {
      let errorType = alert.type === "alert-success" ? "success" : 'error';
      toast[errorType](alert.message)
      setAlertRes(alert);
      setTimeout(() => {
        setAlertRes('')
      }, 3000);
    }
  }, [alert]);

  useEffect(() => {
    if (createUser?.isProfileCreated) {
      fetchUser()
    }
  }, [createUser])

  useEffect(() => {
    if (getStatus && getStatus.data && Object.keys(getStatus.data).length > 0) {
      setRequiredField(getStatus.data);
    }
  }, [getStatus])

  const theme = createTheme({
    typography: {
      fontSize: 12
    }
  });

  const fetchUser = () => {
    let storeData = localStorage.getItem('userId');
    if (storeData) {
      dispatch(getUserDetails(storeData))
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (userDetails && userDetails?.userInfo && Object.keys(userDetails?.userInfo).length > 0) {
      let x = userDetails?.userInfo;
      let data = x.consolidatedStatus ?? '';
      setUserStatus(data);
      setUserProfile(x);
    } else {
      resetState()
    }
  }, [userDetails])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleDialogClose = () => {
    setOpen(false)
  }

  const checkHandler = () => {
    setIsPopup(true);
    let storeData = localStorage.getItem('userId');
    if (storeData) {
      dispatch(getUserStatus(storeData))
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar sx={{ backgroundColor: '#e4f1e8', position: 'relative' }}>
          <Toolbar >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            // sx={{ mr: 2 }}
            >
              <LinkContainer to="/">
                <img className="logo" src={logo} alt="Logo" />
              </LinkContainer>
            </IconButton>
            {headerName && <Typography variant="h5" marginRight={3}>{headerName}</Typography>}


            <Typography sx={{ cursor: 'pointer' }} variant="subtitle1" onClick={handleClick}>Products and Features</Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {dropdownList && dropdownList.length > 0 ?
                dropdownList.map((x) => {
                  return (
                    <LinkContainer to={'/' + x.id}>
                      <MenuItem onClick={() => { setHeaderName(x.name); handleClose() }}>{x.name}</MenuItem>
                    </LinkContainer>
                  )
                })
                : ''}

            </Menu>
            <LinkContainer to="/feature">
              <IconButton sx={{ 'marginLeft': '10px' }} color="inherit">Features</IconButton>
            </LinkContainer>
            <LinkContainer to="/benefit">
              <IconButton sx={{ 'marginLeft': '10px' }} color="inherit">Benefit</IconButton>
            </LinkContainer>
            <Typography sx={{ flexGrow: 1 }} />

            {!userStatus ? (
              <Button className="btn-color" onClick={() => { setOpen(true); handleClose2() }}>Join</Button>
            ) : (
              userStatus === "success" ?
                <>
                  <Grid item display={'flex'} justifyContent={'space-between'} alignItems={'center'} onClick={(e) => handleClick2(e)}>
                    <Avatar padding={2} alt="Profile Picture" sx={{ width: 50, height: 50, border: '2px solid #e4f1e8', cursor: 'pointer' }} />
                    <h6 className="mx-2">{userProfile?.companyName}</h6>
                  </Grid>
                  <Menu
                    anchorEl={anchorEl2}
                    open={Boolean(anchorEl2)}
                    onClose={handleClose2}
                  >
                    <MenuItem onClick={() => { setOpen(true); }}>Profile</MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>Sign Out</MenuItem>
                  </Menu>
                </>
                :
                <Box display={"flex"} flexDirection={"column"} textAlign={"center"}>
                  <Link component="button" variant="body2" color="primary" onClick={() => checkHandler()}>
                    Check status
                  </Link>
                  <Link component="typography" variant="body2" color={grey[500]} underline="none" onClick={() => dispatch(logout()) }>
                    Sign Out
                  </Link>
                </Box>
            )}
          </Toolbar>
        </AppBar>
        {/* Alert Section */}
        {alertRes && Object.keys(alertRes).length > 0 &&
          <ToastContainer />
        }
      </ThemeProvider>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="d-flex justify-content-between">
          {userStatus ? 'Edit Profile' : 'Create Profile'}
          <HighlightOffIcon onClick={handleDialogClose} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <EditProfile status={userStatus} handleClose={handleDialogClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        width={'100vh'}
        open={isPopup}
        onClose={() => setIsPopup(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="d-flex justify-content-between text-decoration-underline">
          Profile Status
          <HighlightOffIcon onClick={() => setIsPopup(false)} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText color={"primary"}>
            {requiredField && Object.keys(requiredField).length > 0 && Object.keys(requiredField).map((key, i) => (
              <p className="mb-1" key={i}>
                <b>{key} : </b>
                <small className="text-danger">{requiredField[key]}</small>
              </p>
            ))
            }
            <Box marginTop={2} >
              <Link component="button" variant="body2" color="primary" onClick={() => { setOpen(true); setIsPopup(false) }}>
                Click here to Update Profile
              </Link>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default App;
