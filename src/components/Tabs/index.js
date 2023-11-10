import './index.css'

const Tabs = props => {
  const {eachMenu, isActive, updateTabId} = props
  console.log('is active from', isActive)

  /*    const convertingIntoCamelcase = () => ({
    menuCategory: eachMenu.menu_category,
  })    */

  //    const tabName = convertingIntoCamelcase().menuCategory

  const styleCsName = isActive ? 'activeClsName' : ''
  const btnColor = isActive ? 'activeColor' : ''

  const onClickTabItem = () => {
    updateTabId(eachMenu.menuCategoryId)
  }

  const {menuCategory} = eachMenu

  return (
    <li className={`tabItem ${styleCsName}`} onClick={onClickTabItem}>
      <button className={`tabButton ${btnColor}`} type="button">
        {menuCategory}
      </button>
    </li>
  )
}
export default Tabs
