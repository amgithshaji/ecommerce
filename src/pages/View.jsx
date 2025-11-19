import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/slices/wishlistSlice';


function View() {
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
  // get product id from url
  const {id} = useParams()
  console.log(id);
  // state for storing product to be view
  const [product,setProduct] = useState({})
  // console.log(product);

  useEffect(()=>{
    if (sessionStorage.getItem("products")) {
      const allProducts = JSON.parse(sessionStorage.getItem("products"))
      setProduct(allProducts.find(item=>item.id==id))
      
    }
  },[])

  const handleWishlist = ()=>{
    const exisitingProduct = userWishlist?.find(item=>item.id==id)
    if (exisitingProduct) {
      alert("product already added")
      
    }else{
      dispatch(addToWishlist(product))

    }
  }


  
  return (

    <>
 <Header/>
 <div className='container py-5' >
<div className='row my-5' >
  <div className='col-md-6' >
<img style={{width:"70%",marginLeft:"15%"}} className='img-fluid ' src={product?.thumbnail} alt="no img" />
<div className='d-flex justify-content-evenly mt-5' >
  <button onClick={handleWishlist} className='btn btn-primary' >ADD to wishlist</button>
    <button className='btn btn-success' >ADD to cart</button>

</div>
  </div>
  <div className='col-md-6' >
<h1 className='fw-bold' >{product?.title}</h1>
<h3 className='text-danger fw-bolder' >${product?.price}</h3>
<h5>Brand:{product?.brand}</h5>
<h5 className='fw-bold' >Category:{product?.category}</h5>
<h5>Description:{product?.description}</h5>
<h5 className='my-1 mt-3 fw-bold' > Client review </h5>
{/* duplicate div */}
{
  product?.reviews?.length>0?
  product?.reviews?.map((item,index)=>(
    <div key={index} className='mb-3 p-2 border rounded shadow' >
<p><span className='fw-bolder' >{item?.reviewerName}:  
</span>
{item?.comment}
</p>
<p><span className='fw-bolder' >Rating: {item?.rating} <FontAwesomeIcon icon={faStar} className='text-warning' />
</span>
</p>
</div>
  ))
  :
  <div>no client reviews are avilabale  </div>
}


  </div>


</div>
 </div>
    </>
  )
}

export default View