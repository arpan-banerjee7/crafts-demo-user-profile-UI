import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { products } from "../products";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Product() {
  const params = useParams();  
  
  const userLogin = useSelector(state => state.userLogin);
  const { userId, name, email } = userLogin.userInfo;
  
  const subscription = async (e) => {
   
  };
  
  return (
    <Card sx={{ maxWidth: 345, margin: "300px 0 300px 700px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {products[params.id - 1].name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {products[params.id - 1].description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {products[params.id - 1].brand}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {products[params.id - 1].category}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ${products[params.id - 1].price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={subscription}>
          Subscription
        </Button>
      </CardActions>
    </Card>
  );
}
