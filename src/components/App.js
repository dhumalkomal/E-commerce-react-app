// importing libraries
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'

// importing local components
import { Navbar } from './index'
import {
  Home,
  NotFound,
  AddProduct,
  Cart,
  Product
} from '../pages'

// importing actions and reducers for React-Redux
import {
  fetchCartItemsOfUser,
  fetchProductsFromDB,
} from '../features'

// importing Styles
import '../assets/styles/App.css'

function App(props) {
  // destructuring props
  const { userID, getCartItems, getProducts } = props;

  // fetching products and cart
  useEffect(() => {    
    getProducts();
    getCartItems(userID);
  }, [getCartItems, getProducts, userID]);

  return (
    <>
      <Navbar userID={userID} />
      {/* Routes for different Pages */}
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/products/:productID' element={<Product />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/user/cart' element={<Cart userID={userID} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

// Prop type validation
App.propTypes = {
  userID: PropTypes.string.isRequired,
  getCartItems: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired
}

// Sending Props to App
const mapStateToProps = (state, ownProps) => ({
  userID: ownProps.userID,
})

// Sending actions dispatch 
const mapDispatchToProps = (dispatch) => ({ 
  getCartItems: (id) => dispatch(fetchCartItemsOfUser(id)),
  getProducts: () => dispatch(fetchProductsFromDB()),
})

// exporting App
export default connect(mapStateToProps, mapDispatchToProps)(App);
