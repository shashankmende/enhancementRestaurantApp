import {Component} from 'react'
import './index.css'

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

  renderItems = eachItem => {
    if (eachItem !== undefined) {
      return (
        <ul>
          {eachItem.map(each => {
            const {
              dishId,
              addonCat,
              dishAvailability,
              dishType,
              dishCalories,
              dishCurrency,
              dishDescription,
              dishImage,
              dishName,
              dishPrice,
              nextUrl,
              dishQuantity,
            } = each

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

                    {this.customizableOption(dishQuantity, addonCat, dishId)}
                    {addonCat.length !== 0 ? (
                      <p className="customization-button">
                        Customizations available
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                  <p className="dish_calories">
                    {dishCalories} {'  '} calories
                  </p>
                  <img src={dishImage} className="dish_image" />
                </div>
              </li>
            )
          })}
        </ul>
      )
    }
    return ''
  }

  render() {
    const {categoryProps} = this.state
    const {eachItem} = categoryProps
    console.log('each item from items', eachItem)
    return this.renderItems(eachItem)
  }
}

export default CategoryItems
