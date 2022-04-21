const tableSpaces = document.querySelectorAll('td');
const newGameBtn = document.querySelector('.new-game-btn');
const player1NameInput = document.querySelector('.player-name.orange');
const player2NameInput = document.querySelector('.player-name.blue');

const playerFactory = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let spaces = Array(9).fill('');

  const findWinningSpaces = () => {
    let line;
    let indexes;

    for (let i = 0; i < 8; i++) {
      switch (i) {
        case 0:
          line = spaces[0] + spaces[1] + spaces[2];
          indexes = [0, 1, 2];
          break;
        case 1:
          line = spaces[3] + spaces[4] + spaces[5];
          indexes = [3, 4, 5];
          break;
        case 2:
          line = spaces[6] + spaces[7] + spaces[8];
          indexes = [6, 7, 8];
          break;
        case 3:
          line = spaces[0] + spaces[3] + spaces[6];
          indexes = [0, 3, 6];
          break;
        case 4:
          line = spaces[1] + spaces[4] + spaces[7];
          indexes = [1, 4, 7];
          break;
        case 5:
          line = spaces[2] + spaces[5] + spaces[8];
          indexes = [2, 5, 8];
          break;
        case 6:
          line = spaces[0] + spaces[4] + spaces[8];
          indexes = [0, 4, 8];
          break;
        case 7:
          line = spaces[2] + spaces[4] + spaces[6];
          indexes = [2, 4, 6];
          break;
      }

      if (line === 'XXX' || line === 'OOO') return indexes;
    }

    return false;
  };

  const gameIsTied = () => {
    return !spaces.includes('');
  };

  const gameIsOver = () => {
    return findWinningSpaces() || gameIsTied();
  };

  const placeMarkerAtIndex = (index => {
    if (spaces[index] === '') {
      gameBoard.spaces[index] = gameController.currentPlayer.marker;
      gameController.changeCurrentPlayer();
      displayController.displayGameBoard();
    }
  });

  const resetBoard = () => {
    gameBoard.spaces.fill('');
  }

  return { 
    spaces, 
    findWinningSpaces, 
    gameIsTied, 
    gameIsOver, 
    placeMarkerAtIndex, 
    resetBoard
  };
})();

const displayController = (() => {
  const displayGameBoard = () => {
    tableSpaces.forEach((space, i) => {
      space.textContent = gameBoard.spaces[i];

      (space.textContent === 'O') ? space.classList.add('orange') : space.classList.add('blue');
    });
  };

  const displayGameOver = () => {
    let indexes;

    if (indexes = gameBoard.findWinningSpaces()) {
      let winningMarker = document.querySelector(`td[data-index="${indexes[0]}"]`).textContent;

      document.querySelector(`td[data-index="${indexes[0]}"]`).classList.add('winner');
      document.querySelector(`td[data-index="${indexes[1]}"]`).classList.add('winner');
      document.querySelector(`td[data-index="${indexes[2]}"]`).classList.add('winner');

      if (winningMarker === 'O') {
        player1NameInput.classList.add('name-winner');
      } else {
        player2NameInput.classList.add('name-winner');
      }

    } else if (gameBoard.gameIsTied()) {
      player1NameInput.classList.add('name-draw');
      player2NameInput.classList.add('name-draw');
    }
  };

  const resetDisplay = () => {
    tableSpaces.forEach((space) => {
      space.textContent = '';
      space.className = '';
    });

    player1NameInput.classList.remove('name-winner');
    player2NameInput.classList.remove('name-winner');
    player1NameInput.classList.remove('name-draw');
    player2NameInput.classList.remove('name-draw');
  };

  return { 
    displayGameBoard, 
    displayGameOver, 
    resetDisplay
  };
})();

const gameController = (() => {
  let player1 = playerFactory('Player 1', 'O');
  let player2 = playerFactory('Player 2', 'X');

  let currentPlayer = player1;

  const changeCurrentPlayer = () => {
    gameController.currentPlayer = (gameController.currentPlayer === player1) ? player2 : player1;
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    displayController.resetDisplay();
    gameController.currentPlayer = player1;
  };

  return { 
    player1,
    player2,
    currentPlayer, 
    changeCurrentPlayer, 
    resetGame
   };
})();



tableSpaces.forEach((space) => {
  space.addEventListener('click', (e) => {
    if (!gameBoard.gameIsOver()) {
      gameBoard.placeMarkerAtIndex(e.target.dataset.index);
      if (gameBoard.gameIsOver()) {
        displayController.displayGameOver();
      }
    }
  });
});

newGameBtn.addEventListener('click', gameController.resetGame);

player1NameInput.addEventListener('blur', (e) => {
  gameController.player1.name = e.target.value;
});

player2NameInput.addEventListener('blur', (e) => {
  gameController.player2.name = e.target.value;
});
