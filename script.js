const tableSpaces = document.querySelectorAll('td');

const playerFactory = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let spaces = Array(9).fill('');

  return { spaces };
})();

const displayController = (() => {
  const displayGameBoard = () => {
    tableSpaces.forEach((space, i) => {
      space.textContent = gameBoard.spaces[i];
      if (space.textContent === 'O') {
        space.classList.add('orange');
      } else {
        space.classList.add('blue');
      }
    });
  };

  return { displayGameBoard };
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
    if (e.target.textContent === '') {
      gameBoard.spaces[e.target.dataset.index] = gameController.currentPlayer.marker;
      gameController.changeCurrentPlayer();
      displayController.displayGameBoard();
    };
  });
});
