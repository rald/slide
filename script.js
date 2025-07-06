const size = 3;
let tiles = [];
let blankIndex = 8; // last tile is blank

function createTiles() {
  tiles = [];
  for (let i = 0; i < size * size; i++) {
    tiles.push(i);
  }
  blankIndex = tiles.length - 1;
}

function drawPuzzle() {
  const puzzle = document.getElementById('puzzle');
  puzzle.innerHTML = '';
  tiles.forEach((tile, idx) => {
    const div = document.createElement('div');
    div.className = 'tile';
    if (tile === size * size - 1) {
      div.classList.add('blank');
    } else {
      const x = tile % size;
      const y = Math.floor(tile / size);
      div.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
      div.onclick = () => moveTile(idx);
    }
    puzzle.appendChild(div);
  });
}

function isPuzzleSolved() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

function moveTile(idx) {
  const moves = [-1, 1, -size, size];
  for (let move of moves) {
    if (
      idx + move === blankIndex &&
      ((move === -1 && idx % size !== 0) ||
       (move === 1 && idx % size !== size - 1) ||
       (move === -size && idx >= size) ||
       (move === size && idx < size * (size - 1)))
    ) {
      [tiles[idx], tiles[blankIndex]] = [tiles[blankIndex], tiles[idx]];
      blankIndex = idx;
      drawPuzzle();

      if (isPuzzleSolved()) {
        // Delay alert to allow screen update first
        setTimeout(() => {
          alert("Congratulations! You solved the puzzle!");
        }, 0);
      }
      break;
    }
  }
}

function countInversions(arr) {
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] !== size * size - 1 && arr[j] !== size * size - 1 && arr[i] > arr[j]) {
        inversions++;
      }
    }
  }
  return inversions;
}

function isSolvable(arr) {
  const inversions = countInversions(arr);
  // For 3x3 puzzle (odd width), solvable if inversions even
  return inversions % 2 === 0;
}

function shuffleTiles() {
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles));

  blankIndex = tiles.indexOf(size * size - 1);
  drawPuzzle();
}

createTiles();
drawPuzzle();

