import { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import './App.css';
import Canvas from './Canvas';
import Logo from './assets/logo.png';

function App() {
	const cardVersion = {
		CLOW: 'Carta Clow',
		SAKURA: 'Carta Sakura',
	};
	const [cards, setCards] = useState([]);
	const [selectedCard, setSelectedCard] = useState({});
	const [cardType, setCardType] = useState(cardVersion.CLOW);

	useEffect(() => {
		(async function () {
			const cards = await getCards();
			setCards(cards);
			console.log(cards);
			console.log(cards[0]);
			setSelectedCard(cards[0]);
		})();
	}, []);

	async function getCards() {
		let cards = [];

		let response = await axios.get('https://protected-taiga-89091.herokuapp.com/api/card');
		response.data.data.map((card) => {
			if (Object.hasOwn(card, 'cardNumber')) cards.push(card);
		});

		// API is supposed to have 72 cards, but the second page returns empty objects.

		// response = await axios.get('https://protected-taiga-89091.herokuapp.com/api/card', {
		// 	params: { page: 2, pageSize: 60 },
		// });
		// cards.push(...response.data.data);
		// console.log(cards);

		return sortCards(cards);
	}

	function sortCards(cards) {
		function compare(a, b) {
			if (a.spanishName > b.spanishName) return 1;
			if (a.spanishName < b.spanishName) return -1;
			return 0;
		}

		return cards.sort(compare);
	}

	function renderCardOptions() {
		return (
			<Form id="form">
				<Form.Select
					className="selectItem"
					onChange={(e) => setSelectedCard(cards.find((card) => card.spanishName === e.target.value))}
					size="lg"
					value={selectedCard.spanishName}
				>
					{cards.map((card) => (
						<option key={card._id}>{card.spanishName}</option>
					))}
				</Form.Select>

				<Form.Select
					className="selectItem"
					onChange={(e) => setCardType(e.target.value)}
					size="lg"
					value={cardType}
				>
					<option>{cardVersion.CLOW}</option>
					<option>{cardVersion.SAKURA}</option>
				</Form.Select>
			</Form>
		);
	}

	function getCanvas() {
		return (
			<Canvas
				cardFront={cardType === cardVersion.SAKURA ? selectedCard.sakuraCard : selectedCard.clowCard}
				cardBack={
					cardType === cardVersion.SAKURA
						? selectedCard.cardsReverse.sakuraReverse
						: selectedCard.cardsReverse.clowReverse
				}
			/>
		);
	}

	return (
		<div className="App">
			<Image src={Logo} className="logo" />
			{cards.length > 0 && renderCardOptions()}
			{selectedCard.meaning !== '' && <h3 className="meaning">{selectedCard.meaning}</h3>}
			{cards.length > 0 && getCanvas()}
		</div>
	);
}

export default App;
