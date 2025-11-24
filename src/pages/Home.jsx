import React, { useEffect, useState } from 'react'
import Header from "../Components/Header"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productsSlice'
import { faHourglass2 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward,faForward } from '@fortawesome/free-solid-svg-icons'



function Home() {
  const dispatch = useDispatch()
  const {loading,allProducts,error}=useSelector(state=>state.productReducer)
  // console.log(allProducts);
  const[currentpage,setCurrentPage]=useState(1)
  const productsPerPage = 8
  const totalPages = Math.ceil(allProducts.length/ productsPerPage)

  const pageItemLastIndex = currentpage * productsPerPage
   const pageItemStartIndex = pageItemLastIndex - productsPerPage
   const visibleProductsArray = allProducts?.slice(pageItemStartIndex,pageItemLastIndex)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[])

  const navigateNextPage= () =>{
    if (currentpage!=totalPages) {
      setCurrentPage(currentpage+1)
      
    }
  }

  const navigatePreviousPage= () =>{
    if (currentpage!=1) {
      setCurrentPage(currentpage-1)
      
    }
  }

  return (

    <>
      <Header insideHome={true} />
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
          

          visibleProductsArray?.map(products=>(
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
      <div className='my-3 text-center' >
        <button onClick={navigatePreviousPage} className='btn' >  <FontAwesomeIcon icon={faBackward} />  </button>
<span className='fw-bolder' >{currentpage} of {totalPages}</span>
        <button onClick={navigateNextPage} className='btn' >  <FontAwesomeIcon icon={faForward} />  </button>

      </div>
     </div>
      </>
  )
}


export default Home