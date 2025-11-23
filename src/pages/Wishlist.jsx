import React from 'react'
import Header from '../Components/Header'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeWishlistitem } from '../redux/slices/wishlistSlice'
import Swal from 'sweetalert2'
import { addToCart } from '../redux/slices/cartSlice';



function Wishlist() {
  const userWishlist = useSelector(state=>state.wishlistReducer)
   const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

  const handleCart = (product)=>{
    const exisitingProduct = userCart?.find(item=>item.id==product.id)
    dispatch(addToCart(product))
    dispatch(removeWishlistitem(product.id))
          Swal.fire({
    title: 'completed',
    text: exisitingProduct?`quantity of ${product.title},is updated successfullty` :'product added to your cart',
    icon: 'success',
    confirmButtonText: 'ok'
  })
  }
  return (
    <>
    <Header/>
    <div className='container py-5 ' >
{/* wishlist with content */}
{
 userWishlist?.length>0?
 <div className="row">
  {
  userWishlist?.map(product=>(
    <div className='col-md-3 mb-2 mt-5 ' >
{/* card */}
  <Card >
      <Card.Img  height={'270px'} variant="top" src={product?.thumbnail} />
      <Card.Body className='text-center ' >
        <Card.Title className='fw-bold' > {product?.title}</Card.Title>
        <div className='d-flex justify-content-evenly my-1' >
          <button onClick={()=>dispatch(removeWishlistitem(product?.id))} className='btn text-danger fs-4' > <FontAwesomeIcon icon={faHeartCirclePlus} /> </button>
          <button onClick={()=>handleCart(product)} className='btn text-success fs-4' > <FontAwesomeIcon icon={faCartPlus} /> </button>
        </div>
      </Card.Body>
    </Card>
    </div>
  ))
  }
</div>
:
<div style={{height:"83vh"}} className='d-flex justify-content-center align-items-center flex-column' >
  <img className='w-25'  src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif" alt="no img" />
  <h3>wishlist is empty</h3>
  <Link to={'/'}  className='btn btn-success rounded-5'>Add more</Link>
</div>
}
    </div>
    </>
  )
}

export default Wishlist