const levels = document.querySelectorAll('.lvl');

//Выбирается уровень игры
function chooseLevel() {
	levels.forEach(elem => {
		elem.addEventListener('click', () => {
			for (let i=0; i<levels.length; i++) {
				levels[i].style.listStyle = 'none';
			};
			elem.style.listStyleImage = 'url("img/Rectangle.png")';
		});
	});
}
chooseLevel();

const lvlSimple = levels[0];
const lvlMedium = levels[1];
const lvlComplex = levels[2];
const simpleGame = document.querySelector('.simple-game');
const mediumGame = document.querySelector('.medium-game');
const complexGame = document.querySelector('.complex-game');
const cards = document.querySelectorAll('.cell');
const bugCard = document.createElement('img');
bugCard.src = 'img/victory.png';
const btnStart = document.querySelector('.start');
btnStart.addEventListener('click', startGame);

//Старт игры. (Переходит к карточному столу и создает массив карт выбранного уровня)
function startGame() {
	const menu = document.getElementById('menu');
	menu.classList.add('displayNone');
	const arrCards = [];
	
	if ((lvlSimple.style.listStyle !== 'none') & (lvlMedium.style.listStyle === 'none') & (lvlComplex.style.listStyle === 'none')) {
		simpleGame.classList.remove('displayNone');
		for (let i=0; i<3; i++) {
			arrCards.push(cards[i]);
		}
	} else {
		if ((lvlMedium.style.listStyle !== 'none') & (lvlSimple.style.listStyle === 'none') & (lvlComplex.style.listStyle === 'none')) {
			mediumGame.classList.remove('displayNone');
			for (let i=3; i<9; i++) {
				arrCards.push(cards[i]);
			};		
		} else {
			if ((lvlComplex.style.listStyle !== 'none') & (lvlMedium.style.listStyle === 'none') & (lvlSimple.style.listStyle === 'none')) {
				complexGame.classList.remove('displayNone');
				for (let i=9; i<19; i++) {
					arrCards.push(cards[i]);
				};
			} else {
				alert('Выберите уровень!');
				menu.classList.remove('displayNone');
			}
		}
	};
	//Генерируется рандомный номер карты из массива
	const random = Math.floor(Math.random() * arrCards.length); 
	console.log(random);
	//Заменяется обратная строна карты с gameOver на bugCard
	const back = arrCards[random].children[1];
	back.children[0].style.display = 'none';
	back.append(bugCard);
	bugCard.classList.add('card');
}

//При клике карта переворачивается. 
//При повторном клике все сбрасывается и переходит к началу игры
let current = 0;
let clickedCard;
function flipTheCard () {
	cards.forEach(elem => {
		elem.addEventListener('click', () => {
			current++;
			if (current%2 === 0) {
				simpleGame.classList.add('displayNone');
				mediumGame.classList.add('displayNone');
				complexGame.classList.add('displayNone');
				menu.classList.remove('displayNone');
				for (let i=0; i<levels.length; i++) {
					levels[i].style.listStyle = 'none';
				};
				clickedCard.classList.toggle('rotate');
				clickedCard.children[1].children[0].style.display = 'block';
				current = 0;
			} else {
				elem.classList.toggle('rotate');
				clickedCard = elem;
			};
		});
	});
}
flipTheCard();