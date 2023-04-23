const burgerButton = document.querySelector('.header__icon_burger');
const menu = document.querySelector('.cart__right-column');
let visibleMenu = false;

const changeMenuVisibility = () => {
	if (!visibleMenu) {
		visibleMenu = true;
		menu.classList.add('cart__right-column_absolute');
	} else {
		visibleMenu = false;
		menu.classList.remove('cart__right-column_absolute');
	}
};

burgerButton.addEventListener('click', changeMenuVisibility);

if (module.hot) {
	module.hot.dispose(() => {
		burgerButton.removeEventListener('click', changeMenuVisibility);
	});
}
