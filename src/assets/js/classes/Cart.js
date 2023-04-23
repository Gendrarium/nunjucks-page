import CardCart from './CardCart';

export default class Cart {
	constructor({ cards, cartSpanSelector, subtotalSpanSelector, totalSpanSelector }) {
		this._cardsElement = cards;
		this._cards = [];
		this._cartSpan = document.querySelector(cartSpanSelector);
		this._cartAmount = 0;
		this._subtotalSpan = document.querySelector(subtotalSpanSelector);
		this._subtotal = 0;
		this._tax = 100;
		this._shipping = 150;
		this._total = 0;
		this._totalSpan = document.querySelector(totalSpanSelector);
	}
	_changePurchasesAmount(amount, price) {
		this._cartAmount += amount;
		this._cartSpan.textContent = this._cartAmount;
		this._subtotal += amount * price;
		this._subtotalSpan.textContent = '$' + this._subtotal.toLocaleString();
		this._total = this._subtotal + this._tax + this._shipping;
		this._totalSpan.textContent = '$' + this._total.toLocaleString();
	}
	listenCardChanging() {
		this._cards = Array.from(this._cardsElement).map(card => {
			const cardCart = new CardCart(card, this._changePurchasesAmount.bind(this));
			cardCart.addListeners();
			return cardCart;
		});
	}
}
