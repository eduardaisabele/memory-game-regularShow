const grid = document.getElementById('grid');
const spanPlayer = document.getElementById('player');
const timer = document.getElementById('timer');
const characters = [
    'benson',
    'cloudJane',
    'eillen',
    'margarete',
    'mordecai',
    'morte',
    'musculoso',
    'pailurito',
    'rigbi',
    'saltitao'
];

//funcao molde que cria a tag e a div
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//cria as cartas
const createCard = (character) => {

    //cria as tags e a div do html
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    //muda as imgs dinamicamente pela variavel ${character}
    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card
}

//funcao que verifica se as cartas sao iguais ou diferentes, 
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');
        
        firstCard = '';
        secondCard = '';

        checkAndGame();

    }else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500)
    }
}

//funcao que vira a carta quando clicka
const revealCard = ({ target }) => {
    if(target.parentNode.className.includes('reveal-card')){
        return
    }
    //verifica se a carta virada ja foi virada
    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

let firstCard = '';
let secondCard = '';

const checkAndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabns, ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML}`);
    }
}

//funcao que duplica as cartas ja colocando eleas em ordem aleatoria, funcao tbm carrega o jogo
const loadGame = () => {

    const duplicateCharacters = [ ... characters, ... characters ];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {
    //uma das formas de convertar strings em numeros: usando o Number() ou colocando o + na frente da string a ser convertida
    // const currentTime = Number(timer.innerHTML);

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;

    startTimer();
    loadGame();
}