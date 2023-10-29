import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Container, TextField, Button, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createUserProfile,
  updateUserProfile,
  getUserDetails,
} from "../actions/userActions";

export default function EditProfile(props) {
  const dispatch = useDispatch();
  const theme = createTheme({
    palette: {
      primary: { main: "#7ea68c", light: "#fff", contrastText: "#fff" },
      secondary: { main: "#fff", light: "#6D6D64", contrastText: "#6D6D64" },
    },
    typography: {
      fontSize: 12,
    },
  });

  const userData = useSelector((state) => state.userDetails);
  const [productList, setProductList] = useState([]);
  const [formData, setFormData] = useState();
  const [userStatus, setUserStatus] = useState();

  useEffect(() => {
    let storeData = localStorage.getItem("userId");
    if (storeData) {
      dispatch(getUserDetails(storeData));
    }
  }, []);

  useEffect(() => {
    if (
      userData &&
      Object.keys(userData).length > 0 &&
      Object.keys(userData?.userInfo).length > 0
    ) {
      let x = userData?.userInfo;
      let temp = x?.subscriptions;
      setProductList(temp);
      setFormData({
        userId: x.userId,
        companyName: x.companyName,
        legalName: x.legalName,
        businessAddress: {
          line1: x.businessAddress?.line1,
          line2: x.businessAddress?.line2,
          city: x.businessAddress?.city,
          state: x.businessAddress?.state,
          zip: x.businessAddress?.zip,
          country: x.businessAddress?.country,
        },
        legalAddress: {
          line1: x.legalAddress?.line1,
          line2: x.legalAddress?.line2,
          city: x.legalAddress?.city,
          state: x.legalAddress?.state,
          zip: x.legalAddress?.zip,
          country: x.legalAddress?.country,
        },
        taxIdentifiers: {
          pan: x.taxIdentifiers?.pan,
          ein: x.taxIdentifiers?.ein,
        },
        email: x.email,
        website: x.website,
      });
      setUserStatus(x.consolidatedStatus);
    }
  }, [userData]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (props.status) {
      // update profile
      let obj = { ...formData, subscriptions: productList };
      if (userStatus.toLowerCase() !== "in progress") {
        dispatch(updateUserProfile(formData.userId, obj));
      }
    } else {
      if (props && props.selectedProduct) {
        // create new profile if user status not
        let obj = { ...formData, subscriptions: [props.selectedProduct.id] };
        dispatch(createUserProfile(obj));
      }
    }
    props.handleClose();
  };

  const handleChangeProfile = (e, name) => {
    if (name) {
      setFormData({
        ...formData,
        [name]: { ...formData[name], [e.target.name]: e.target.value },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" marginTop={10}>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleUpdate}>
            <TextField
              id="email"
              value={formData?.email || ""}
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              autoComplete="false"
              required
              size="small"
              onChange={(e) => handleChangeProfile(e)}
            />

            <TextField
              id="companyName"
              type="text"
              label="Company Name"
              name="companyName"
              value={formData?.companyName || ""}
              onChange={(e) => handleChangeProfile(e)}
              fullWidth
              margin="normal"
              size="small"
              autoComplete="false"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Legal Name"
              name="legalName"
              value={formData?.legalName}
              onChange={(e) => handleChangeProfile(e)}
              fullWidth
              margin="normal"
              size="small"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="website"
              name="website"
              value={formData?.website}
              onChange={(e) => handleChangeProfile(e)}
              fullWidth
              margin="normal"
              size="small"
              InputLabelProps={{ shrink: true }}
            />

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                paddingY={2}
                color={"primary"}
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Business Address
              </Typography>

              <TextField
                label="line1"
                name="line1"
                value={formData?.businessAddress?.line1}
                onChange={(e) => handleChangeProfile(e, "businessAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="line2"
                name="line2"
                value={formData?.businessAddress?.line2}
                onChange={(e) => handleChangeProfile(e, "businessAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="city"
                name="city"
                value={formData?.businessAddress?.city}
                onChange={(e) => handleChangeProfile(e, "businessAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="state"
                name="state"
                value={formData?.businessAddress?.state}
                onChange={(e) => handleChangeProfile(e, "businessAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="zip"
                name="zip"
                value={formData?.businessAddress?.zip}
                onChange={(e) => handleChangeProfile(e, "businessAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="country"
                name="country"
                value={formData?.businessAddress?.country}
                onChange={(e) => handleChangeProfile(e, "businessAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                paddingY={2}
                color={"primary"}
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Legal Address
              </Typography>

              <TextField
                label="line1"
                name="line1"
                value={formData?.legalAddress?.line1}
                onChange={(e) => handleChangeProfile(e, "legalAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="line2"
                name="line2"
                value={formData?.legalAddress?.line2}
                onChange={(e) => handleChangeProfile(e, "legalAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="city"
                name="city"
                value={formData?.legalAddress?.city}
                onChange={(e) => handleChangeProfile(e, "legalAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="state"
                name="state"
                value={formData?.legalAddress?.state}
                onChange={(e) => handleChangeProfile(e, "legalAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="zip"
                name="zip"
                value={formData?.legalAddress?.zip}
                onChange={(e) => handleChangeProfile(e, "legalAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="country"
                name="country"
                value={formData?.legalAddress?.country}
                onChange={(e) => handleChangeProfile(e, "legalAddress")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                paddingY={2}
                color={"primary"}
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Tax Identifiers
              </Typography>

              <TextField
                label="pan"
                name="pan"
                value={formData?.taxIdentifiers?.pan}
                onChange={(e) => handleChangeProfile(e, "taxIdentifiers")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="ein"
                name="ein"
                value={formData?.taxIdentifiers?.ein}
                onChange={(e) => handleChangeProfile(e, "taxIdentifiers")}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid spacing={2} className="d-flex justify-content-end">
              <Button type="submit" variant="contained" color="primary">
                {props.status ? "Update" : "Create"}
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
