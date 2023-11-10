import './index.css'

const CategoryItems = props => {
  const {eachItem, onClickMinus, onClickPlus} = props
  let count = 0

  const convertingIntoCamelCase = each => ({
    addonCat: each.addonCat,
    dishAvailability: each.dishAvailability,
    dishType: each.dish_Type,
    dishCalories: each.dish_calories,
    dishCurrency: each.dish_currency,
    dishDescription: each.dish_description,
    dishImage: each.dish_image,
    dishName: each.dish_name,
    dishPrice: each.dish_price,
    nextUrl: each.nextUrl,
  })

  const onClickMinusBtn = () => {
    count -= 1
    onClickMinus()
  }

  const onClickPlusBtn = () => {
    count += 1
    onClickPlus()
  }

  const customizableOption = addonCat => {
    if (addonCat.length !== 0) {
      return (
        <>
          <div className="buttons-container">
            <button
              type="button"
              className="quantity_button"
              onClick={onClickMinusBtn}
            >
              -
            </button>
            <p>{count}</p>

            <button
              type="button"
              className="quantity_button"
              onClick={onClickPlusBtn}
            >
              +
            </button>
          </div>
        </>
      )
    }
    return ''
  }

  return (
    <ul>
      {eachItem.map(each => {
        const newData = convertingIntoCamelCase(each)
        const {
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
        } = newData

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

                {customizableOption(addonCat)}
                {dishAvailability ? (
                  <p className="customization-button">
                    Customizations available
                  </p>
                ) : (
                  <p className="not-available">Not available</p>
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

export default CategoryItems
