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

		let response = await axios.get('https://4gngurqord.execute-api.us-west-2.amazonaws.com/Prod/cards');
		response.data.map((card) => {
			console.log(card);
			if (Object.hasOwn(card, 'id')) cards.push(card);
		});

		return sortCards(cards);
	}

	function sortCards(cards) {
		function compare(a, b) {
			if (a.title > b.title) return 1;
			if (a.title < b.title) return -1;
			return 0;
		}

		return cards.sort(compare);
	}

	function renderCardOptions() {
		return (
			<Form id="form">
				<Form.Select
					className="selectItem"
					onChange={(e) => setSelectedCard(cards.find((card) => card.title === e.target.value))}
					size="lg"
					value={selectedCard.title}
				>
					{cards.map((card) => (
						<option key={card._id}>{card.title}</option>
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
				cardFront={
					cardType === cardVersion.SAKURA ? selectedCard.sakuraCard.front : selectedCard.clowCard.front
				}
				cardBack={cardType === cardVersion.SAKURA ? selectedCard.sakuraCard.back : selectedCard.clowCard.back}
			/>
		);
	}

	return (
		<div className="App">
			<Image src={Logo} className="logo" />
			{cards.length > 0 && renderCardOptions()}
			{console.log(selectedCard)}
			{selectedCard.desc !== '' && <h3 className="meaning">{selectedCard.desc}</h3>}
			{cards.length > 0 && getCanvas()}
		</div>
	);
}

export default App;
