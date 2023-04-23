import Cart from '../classes/Cart';

const cart = new Cart({
	cards: document.querySelectorAll('.cart-card'),
	cartSpanSelector: '.header__cart-num',
	subtotalSpanSelector: '#cartSubtotal',
	totalSpanSelector: '#cartTotal',
});

cart.listenCardChanging();
