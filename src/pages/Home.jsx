import React, { useEffect } from 'react'
import Header from "../Components/Header"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productsSlice'
import { faHourglass2 } from '@fortawesome/free-solid-svg-icons'


function Home() {
  const dispatch = useDispatch()
  const {loading,allProducts,error}=useSelector(state=>state.productReducer)
  // console.log(allProducts);
  

  useEffect(()=>{
    dispatch(getAllProducts())
  },[])

  return (

    <>
      <Header/>
     <div className='container py-5' > 
      {
        loading?
        <div className="text-center my-5 fw-bolder fs-5"><img width="100px" className='' src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="no img" />loading</div>

     : 
      <div className='row my-5' >

        {/* dulipcate */}
        {
          allProducts?.length<0?
          <p>products not found</p>:
          

          allProducts?.map(products=>(
             <div key={products?.id} className='col-md-3 mb-2' >
{/* card */}
    <Card >
      <Card.Img height={'250px'} variant="top" src={products?.thumbnail} />
      <Card.Body className='text-center' >
        <Card.Title className='fw-bold' >{products?.title}</Card.Title>
      <Link to={`/products/${products?.id}/view`} className='btn btn-success rounded-4' >View more..</Link>
      </Card.Body>
    </Card>
        </div>
          ))
        }
      </div>
      }
     </div>
      </>
  )
}


export default Home