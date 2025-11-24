import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decrementCartItem, emptyCart, incrementCartItem, removeCartItem } from '../redux/slices/cartSlice'
import Swal from 'sweetalert2'



function Cart() {
    const userCart = useSelector(state=>state.cartReducer)
 const[sum,setsum] = useState(0)
const dispatch = useDispatch()
const navigate = useNavigate()

 useEffect(()=>{
  setsum(userCart?.reduce((acc,curr)=>acc+curr.totalprice,0))
 },[userCart])

 const handleDecrementcart = (product)=>{
  if (product.quantity>1) {
    // decrement
    dispatch(decrementCartItem(product))
    
  }else{
    // remove
    dispatch(removeCartItem(product.id))
  }
 }

 const checkout = ()=>{
  dispatch(emptyCart())
  navigate("/")
            Swal.fire({
      title: 'order Placed successfully..',
      text: "thank you for purchasing with us",
      icon: 'success',
      confirmButtonText: 'ok'
    })
 }

  return (
    <>
      <Header />
      <div className='container py-5' >
      
         <div className='my-5' >
          <h1 className='text-danger fw-bold' >cart summary</h1>
           {
          userCart?.length>0?
<div className="row mt-5">
       
  <div className="col-md-8 border rounded p-5 mt-3 table-responsive ">
              <table className='table ' >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>product</th>
                    <th>image</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>...</th>

                  </tr>
                </thead>
                <tbody>
                {
            userCart.map((product,index)=>(

                  <tr key={index} >
                    <td>{index+1}</td>
                    <td>{product?.title}</td>
                    <td> <img width={'50px'} height={'50px'} src={product?.images}/> </td>
                    <td>
                      <div className='d-flex' >
                        <button onClick={()=>handleDecrementcart(product)} className='btn fs-3 fw-bold' >-</button>
                        <input style={{ width: "50px" }} value={product?.quantity} type="text" className='form-control' readOnly />
                        <button onClick={()=>dispatch(incrementCartItem(product))} className='btn fs-3 fw-bold' >+</button>

                      </div>
                    </td>
                    <td>  ${product.price}</td>
                    <td> <button onClick={()=>dispatch(removeCartItem(product?.id))} className='btn btn-danger' > <FontAwesomeIcon icon={faTrash} /></button> </td>
                  </tr>
                        ))
                      }

                </tbody>
              </table>
              <div className='float-end mt-3' >
<button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-2' >EMPTY CART</button>
<Link to={'/'} className='btn btn-primary' >SHOP MORE</Link>
              </div>
            </div>
       
            {/* total amount column */}
            <div className="col-md-4">
              <div className='border rounded p-5' >
                <h3 className='fw-bold' > Total Amount : <span className='text-danger' >$ {sum}</span></h3>
                <hr />
                <div className=' d-grid mt-2'>
                  <button onClick={()=>dispatch(checkout())} className='btn btn-success' >Check out</button>
                </div>
              </div>
            </div>

          </div>
          :
          <div style={{height:"83vh"}} className='d-flex justify-content-center align-items-center flex-column' >
  <img className='w-25'  src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif" alt="no img" />
  <h3>cart is empty</h3>
  <Link to={'/'}  className='btn btn-success rounded-5'>Add Product</Link>
</div>
}
        </div>
       
      </div>
    </>
  )
}

export default Cart