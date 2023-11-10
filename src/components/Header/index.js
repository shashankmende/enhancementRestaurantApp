import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {restaurantName, cartSize} = props
  return (
    <div className="header-container">
      <h1>{restaurantName}</h1>
      <div className="icons-container">
        <p className="my-orders">My Orders</p>
        <AiOutlineShoppingCart size={40} />
        <p className="cart_count">{cartSize}</p>
      </div>
    </div>
  )
}

export default Header
