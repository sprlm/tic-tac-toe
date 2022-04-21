const tableSpaces = document.querySelectorAll('td');

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

  return { spaces, findWinningSpaces, gameIsTied, gameIsOver, placeMarkerAtIndex };
})();

const displayController = (() => {
  const displayGameBoard = () => {
    tableSpaces.forEach((space, i) => {
      space.textContent = gameBoard.spaces[i];

      (space.textContent === 'O') ? space.classList.add('orange') : space.classList.add('blue');
    });
  };

  const displayGameOverMessage = () => {
    let indexes;

    if (indexes = gameBoard.findWinningSpaces()) {
      document.querySelector(`td[data-index="${indexes[0]}"]`).classList.add('winner');
      document.querySelector(`td[data-index="${indexes[1]}"]`).classList.add('winner');
      document.querySelector(`td[data-index="${indexes[2]}"]`).classList.add('winner');

    } else if (gameBoard.gameIsTied()) {
      console.log('tie');
    }
  };

  return { displayGameBoard, displayGameOverMessage };
})();

const gameController = (() => {
  let _player1 = playerFactory('Player 1', 'O');
  let _player2 = playerFactory('Player 2', 'X');

  let currentPlayer = _player1;

  const changeCurrentPlayer = () => {;
    gameController.currentPlayer = (gameController.currentPlayer === _player1) ? _player2 : _player1;
  };

  return { currentPlayer, changeCurrentPlayer };
})();

tableSpaces.forEach((space) => {
  space.addEventListener('click', (e) => {
    if (!gameBoard.gameIsOver()) {
      gameBoard.placeMarkerAtIndex(e.target.dataset.index);
      if (gameBoard.gameIsOver()) {
        displayController.displayGameOverMessage();
      }
    }
  });
});
