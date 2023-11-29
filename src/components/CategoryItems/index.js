import {Component} from 'react'
import './index.css'
import CartContext from '../../Context/CartContext'

class CategoryItems extends Component {
  state = {categoryProps: this.props}

  DecreaseQuantity = id => {
    const {categoryProps} = this.state
    const {eachItem} = categoryProps
    const item = eachItem.map(each => {
      if (each.dishId === id) {
        const {dishQuantity} = each
        if (dishQuantity >= 1) {
          return {...each, dishQuantity: dishQuantity - 1}
        }
        return each
      }
      return each
    })
    return item
  }

  incrementQuantity = id => {
    const {categoryProps} = this.state
    const {eachItem} = categoryProps

    const item = eachItem.map(each => {
      if (each.dishId === id) {
        const {dishQuantity} = each

        return {...each, dishQuantity: dishQuantity + 1}
      }
      return each
    })
    return item
  }

  onClickMinusBtn = event => {
    const {categoryProps} = this.state

    const {onClickMinus} = categoryProps
    const dishId = event.target.value
    const updatedEachItem = this.DecreaseQuantity(dishId)
    console.log('updated eachItem =/////////', updatedEachItem)
    console.log('+++++++******', event.target.value)
    this.setState({
      categoryProps: {...categoryProps, eachItem: updatedEachItem},
    })

    onClickMinus()
  }

  onClickPlusBtn = event => {
    const {categoryProps} = this.state
    const {onClickPlus} = categoryProps
    const dishId = event.target.value
    const IncrementEachItem = this.incrementQuantity(dishId)
    console.log('increment updated item=******', IncrementEachItem)
    this.setState({
      categoryProps: {...categoryProps, eachItem: IncrementEachItem},
    })
    onClickPlus()
  }

  customizableOption = (qty, addonCat, dishId) => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        if (cartList.length !== 0) {
          const item = cartList.filter(each => each.dishId === dishId)

          if (item[0] !== undefined) {
            return (
              <>
                <div className="buttons-container">
                  <button
                    type="button"
                    className="quantity_button"
                    value={dishId}
                    onClick={this.onClickMinusBtn}
                  >
                    -
                  </button>
                  <p>{item[0].dishQuantity}</p>

                  <button
                    type="button"
                    value={dishId}
                    className="quantity_button"
                    onClick={this.onClickPlusBtn}
                  >
                    +
                  </button>
                </div>
              </>
            )
          }
        }
        console.log('entered into empty cart')
        return (
          <>
            <div className="buttons-container">
              <button
                type="button"
                className="quantity_button"
                value={dishId}
                onClick={this.onClickMinusBtn}
              >
                -
              </button>
              <p>{qty}</p>

              <button
                type="button"
                value={dishId}
                className="quantity_button"
                onClick={this.onClickPlusBtn}
              >
                +
              </button>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderQuantity = (cartList, dishId) => {
    const newItem = cartList.filter(each => each.dishId === dishId)
    if (newItem[0] !== undefined) {
      const {dishQuantity} = newItem[0]
      console.log('new quantity', dishQuantity)
      return dishQuantity
    }
    return 1
  }

  renderItems = eachItem => {
    const {categoryProps} = this.state
    const {updateData} = categoryProps

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, addCartItem} = value
          if (eachItem !== undefined) {
            return (
              <ul>
                {eachItem.map(each => {
                  const {
                    dishId,
                    addonCat,
                    dishAvailability,

                    dishCalories,
                    dishCurrency,
                    dishDescription,
                    dishImage,
                    dishName,
                    dishPrice,
                    nextUrl,
                    dishQuantity,
                  } = each

                  const onClickAddToCart = () => {
                    addCartItem(each, dishId)
                    updateData(dishId, dishQuantity)
                  }

                  return (
                    <li className="category-list-item">
                      <img src={nextUrl} alt="isVeg" />
                      <div className="right-container">
                        <div className="text-container">
                          <h1>{dishName}</h1>
                          <p>
                            {dishCurrency}
                            {'  '}
                            {dishPrice}
                          </p>
                          <p>{dishDescription}</p>
                          {dishAvailability ? (
                            this.customizableOption(
                              dishQuantity,
                              addonCat,
                              dishId,
                            )
                          ) : (
                            <p className="not-available">Not available</p>
                          )}

                          {addonCat.length !== 0 ? (
                            <p className="customization-button">
                              Customizations available
                            </p>
                          ) : (
                            ''
                          )}

                          {dishAvailability && dishQuantity > 0 ? (
                            <button
                              type="button"
                              className="add-to-cart"
                              onClick={onClickAddToCart}
                            >
                              ADD TO CART
                            </button>
                          ) : (
                            ''
                          )}

                          {/*   cartList.length > 0 &&
                          dishAvailability &&
                          this.renderQuantity(cartList, dishId) > 0 ? (
                            <button
                              type="button"
                              className="add-to-cart"
                              onClick={onClickAddToCart}
                            >
                              ADD TO CART
                            </button>
                          ) : (
                            ''
                          ) */}
                        </div>
                        <p className="dish_calories">
                          {dishCalories} {'  '} calories
                        </p>
                        <img
                          src={dishImage}
                          className="dish_image"
                          alt="item"
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          }
          return ''
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    const {categoryProps} = this.state
    const {eachItem} = categoryProps
    console.log('each item from items', eachItem)
    return this.renderItems(eachItem)
  }
}

export default CategoryItems
