export default class CardCart {
	constructor(card, handleChangingCard) {
		this._element = card;
		this._handleChangingCard = handleChangingCard;
		this._delButton = this._element.querySelector('#del');
		this._incrementButton = this._element.querySelector('#plus');
		this._decrementButton = this._element.querySelector('#minus');
		this._amountSpan = this._element.querySelector('.cart-card__amount');
		this._amount = Number(this._amountSpan.textContent);
		this._priceSpan = this._element.querySelector('.cart-card__price');
		this._price = Number(this._priceSpan.textContent.match(/\d+/g).join(''));
		this._priceForOne = this._price / this._amount;
	}
	_changeAmount(_newAmount) {
		this._amount = _newAmount;
		this._amountSpan.textContent = this._amount;
		this._changePrice(_newAmount);
	}
	_changePrice(_newAmount) {
		this._price = _newAmount * this._priceForOne;
		this._priceSpan.textContent = (this._price > 1000 ? '$' : '$ ') + this._price.toLocaleString();
	}
	_deleteCard() {
		this._element.parentNode.removeChild(this._element);
		this._handleChangingCard(-this._amount, this._priceForOne);
	}
	_increment() {
		const _newAmount = this._amount + 1;
		this._handleChangingCard(1, this._priceForOne);
		this._changeAmount(_newAmount);
	}
	_decrement() {
		const _newAmount = this._amount - 1;
		console.log(_newAmount, this._amount, _newAmount < 1);
		if (_newAmount < 1) {
			this._deleteCard();
		} else {
			this._handleChangingCard(-1, this._priceForOne);
			this._changeAmount(_newAmount);
		}
	}
	addListeners() {
		this._handleChangingCard(this._amount, this._price);

		this._incrementButton.addEventListener('click', this._increment.bind(this));
		this._decrementButton.addEventListener('click', this._decrement.bind(this));
		this._delButton.addEventListener('click', this._deleteCard.bind(this));

		if (module.hot) {
			module.hot.dispose(() => {
				this._incrementButton.removeEventListener('click', this._increment.bind(this));
				this._decrementButton.removeEventListener('click', this._decrement.bind(this));
				this._delButton.removeEventListener('click', this._deleteCard.bind(this));
			});
		}
	}
}
