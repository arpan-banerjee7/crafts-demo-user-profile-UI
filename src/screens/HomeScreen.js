import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Slideshow from '../components/Slideshow';
import { Typography, Grid, Box, Button } from '@mui/material';
import original from "../assets/images/original.png";
import brandImg from "../assets/images/brand-image.png";
import quality from "../assets/images/quality.png";
import account3 from "../assets/images/account3.jpg";
import { getProduct, getUserDetails, updateUserProfile } from "../actions/userActions";
import { alertActions } from "../actions/alertAction";


const DashboardPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const qualities = [
    { title: 'Manage bills', caption: '82% of customers agree QuickBooks Live Bookkeeping saves them time to focus on growing their business', img: quality },
    { title: 'Expenses', caption: 'Track expenses across all your different accounts.', img: brandImg },
    { title: '24/7 expert support', caption: 'Find deductions you didn’t know about to get all you deserve.', img: original }
  ]
  const [productDetails, setProductDetails] = useState({});
  const [subscribeProduct, setSubscribeProduct] = useState([]);

  useEffect(() => {
    let storedData = localStorage.getItem('userId');
    if (storedData) {
      dispatch(getUserDetails(storedData))
    }
  }, [])

  useEffect(() => {
    if (params) {
      dispatch(getProduct(params.id))
      document.getElementById('product-section')?.scrollIntoView()
    }
  }, [params]);

  const { getProductDetails, userDetails } = useSelector((state) => state)

  useEffect(() => {
    if (getProductDetails && Object.keys(getProductDetails).length > 0) {
      if (getProductDetails?.data && Array.isArray(getProductDetails?.data) && getProductDetails?.data.length > 0)
        setProductDetails(getProductDetails?.data[0])
    }
  }, [getProductDetails]);

  useEffect(() => {
    if (userDetails?.userInfo && Object.keys(userDetails.userInfo).length > 0) {
      let data = userDetails.userInfo?.subscriptions ?? [];
      setSubscribeProduct(data)
    }
  }, [userDetails])

  const handleSubscription = (productId) => {
    let storedData = localStorage.getItem('userId');
    let obj = { subscriptions: [...subscribeProduct, productId] }
    if (storedData) {
      dispatch(updateUserProfile(storedData, obj))
    } else {
      dispatch(alertActions.error("Profile not created yet... Join Now"));
    }
  }

  return (
    <div>
      <Slideshow />
      {/* Quality section */}
      <section className='div-center flex-column'>
        <Grid paddingY={4} paddingX={12} className="div-center flex-column text-center">
          <Typography variant='h5'>
            Features that fit your business
          </Typography>
          <Typography variant='subtitle2'>
            Lorem ipsum dolor sit amet. In fugit nihil id facere excepturi non officiis fugit vel saepe fugit sit autem fuga
            cum ratione galisum.
            Cum corrupti quam sit repellendus blanditiis sed asperiores veritatis 33 modi incidunt rem quia quibusdam.
          </Typography>
        </Grid>
        <Grid paddingY={4} paddingX={12} container spacing={3} className="quality-section div-center text-center">
          {/* description 1 */}
          {qualities && Array.isArray(qualities) && qualities.length > 0 ?
            qualities.map((x) =>
              <Grid item xs={4} className='div-center flex-column'>
                <div><img alt="" src={x.img} /></div>
                <Typography variant='h6'>{x.title}</Typography>
                <Typography variant='caption'>{x.caption}</Typography>
              </Grid>
            )
            : ''}


        </Grid>
      </section>

      {/* Product Details */}
      <section className='product-detail-section mt-5' id="product-section">
        <Grid container spacing={2} paddingY={4} paddingX={12}>
          <Grid xs={5} className='section-color shadow-sm rounded'>
            <img alt="" className='rounded' src={productDetails?.image ?? account3} />
          </Grid>

          <Grid xs={7} className='div-center flex-column align-items-center section-color'>
            <Typography variant='h5'>
              {productDetails?.name ?? 'Product1'}
            </Typography>
            <Typography variant='subtitle1' padding={3}>
              {productDetails?.description ??
                'Eos rerum quod ab repellendus illo sit quia esse aut nihil adipisci aut nobis voluptatem. Ut itaque  placeat iste cum voluptate amet. Quo praesentium dolorem est architecto eaque cum voluptatibus reprehenderit ea dolores debitis qui sint doloribus. Et consequatur sunt aut minima laudantium sit dolor sint.'
              }
            </Typography>
            <Box width={'100%'} paddingX={5} display={"flex"} flexDirection={'column'}>
              <p><b>Price</b> : {productDetails?.price ?? '100.00'}</p>
              <p><b>Brand</b> : {productDetails?.Brand ?? 'Apple'}</p>
            </Box>
            {subscribeProduct && subscribeProduct.length > 0 && subscribeProduct.includes(productDetails.id) ?
              <Button variant="contained" color='error' sx={{ color: '#fff', marginBottom: '5px' }} disabled="true">Already Subscribed</Button>
              :
              <Button className="btn-color" sx={{ color: '#fff', marginBottom: '5px' }} onClick={() => handleSubscription(productDetails.id)}>Subscribe </Button>
            }

          </Grid>

        </Grid>
      </section>

    </div>
  );
};

export default DashboardPage;
