import {Component} from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import CategoryItems from './components/CategoryItems'
import './App.css'

class App extends Component {
  state = {restrauntData: '', activeTabId: '11', cartSize: 0}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log('response =', data)
    const tableMenuList = data[0].table_menu_list

    const categoryDishesFunction = each => ({
      dishAvailability: each.dish_Availability,
      dishType: each.dish_type,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishId: each.dish_id,
      dishName: each.dish_name,
      dishPrice: each.dish_price,
      nextUrl: each.nextUrl,
      dishImage: each.dish_image,
      addonCat: each.addonCat,
      dishQuantity: 0,
    })

    const tableMenuListFunction = each => ({
      categoryDishes: each.category_dishes.map(eachCategory =>
        categoryDishesFunction(eachCategory),
      ),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nextUrl,
    })

    const newTableMenuList = tableMenuList.map(each =>
      tableMenuListFunction(each),
    )

    const newCategoryDishes = newTableMenuList.map(each => {
      const {categoryDishes} = each
      const innerResult = categoryDishes.map(eachItem =>
        categoryDishesFunction(eachItem),
      )
      return innerResult
    })

    if (response.ok === true) {
      const newData = {
        branchName: data[0].branch_name,
        nextUrl: data[0].nextUrl,
        restaurantId: data[0].restaurant_id,
        restaurantImage: data[0].restaurant_image,
        restaurantName: data[0].restaurant_name,
        tableId: data[0].table_id,
        tableMenuList: newTableMenuList,
        tableName: data[0].table_name,
      }
      console.log('new data', newData)

      this.setState({
        restrauntData: newData,
      })
    }
  }

  renderTabs = () => {
    const {restrauntData, activeTabId} = this.state
    const {tableMenuList} = restrauntData
    console.log('tablemenu list from function', tableMenuList)
    if (tableMenuList !== undefined) {
      return (
        <ul className="tabs-container">
          {tableMenuList.map(each => (
            <Tabs
              eachMenu={each}
              key={each.menuCategoryId}
              isActive={activeTabId === each.menuCategoryId}
              updateTabId={this.updateTabId}
            />
          ))}
        </ul>
      )
    }
    return ''
  }

  updateTabId = tabId => {
    this.setState({
      activeTabId: tabId,
    })
  }

  onClickMinus = () => {
    const {cartSize} = this.state
    if (cartSize >= 1) {
      this.setState({
        cartSize: cartSize - 1,
      })
    } else {
      this.setState({
        cartSize: 0,
      })
    }
  }

  onClickPlus = () => {
    const {cartSize} = this.state
    this.setState({
      cartSize: cartSize + 1,
    })
  }

  renderCategoryItems = tableMenuList => {
    const {activeTabId} = this.state

    if (tableMenuList !== undefined) {
      const newList = tableMenuList.filter(
        each => each.menuCategoryId === activeTabId,
      )

      return (
        <ul>
          {newList.map(each => (
            <CategoryItems
              eachItem={each.categoryDishes}
              key={each.menuCategoryId}
              onClickMinus={this.onClickMinus}
              onClickPlus={this.onClickPlus}
            />
          ))}
        </ul>
      )
    }
    return ''
  }

  render() {
    const {restrauntData, cartSize} = this.state

    const {restaurantName, tableMenuList} = restrauntData

    return (
      <div>
        <Header restaurantName={restaurantName} cartSize={cartSize} />
        {this.renderTabs()}
        {this.renderCategoryItems(tableMenuList)}
      </div>
    )
  }
}

export default App
