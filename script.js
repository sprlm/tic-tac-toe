const spaces = document.querySelectorAll('td');

const gameBoard = (() => {
  let spaces = Array(9).fill('');
  spaces = ['X','O','X','','X','O','','O',''];

  return {spaces};
})();

const displayController = (() => {
  const displayGameBoard = () => {
    spaces.forEach((space, i) => {
      space.textContent = gameBoard.spaces[i];
      if (i % 2 === 0) space.classList.toggle('blue');
      else space.classList.toggle('orange');
    });
  };

  return {displayGameBoard};
})();

const playerFactory = (name, marker) => {
  return {name, marker};
};

const player1 = playerFactory('Player 1', 'O');
const player2 = playerFactory('Player 2', 'X');

displayController.displayGameBoard();
