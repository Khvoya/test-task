import { MenuItems, NavBarItems } from '../../types/NavBarItems'

export const header = {
    menuItem: (menuItem: MenuItems) =>
        `.main-menu-sublist__column a[href="${menuItem}"]`,
    navOption: (navOption: NavBarItems) =>
        `.main-menu__item > a[href="/ru-ru/${navOption}/"]`,
    actualProducts:
        'a[href="/ru-ru/products/"]~div .main-menu-sublist__item-holder>span',
    searchButton: '.header__search',
    searchInput: '#site-search',
    submitSearchButton: '.search-form__button input',
    menuSublist: 'a[href="/ru-ru/products/"]~div .main-menu-sublist',
}
