import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  title: '',
  updateTitle: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
