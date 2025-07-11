import React, { useState, useEffect } from 'react';

interface Cell {
  row: number;
  col: number;
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  adjBombs: number;
}

type GameStatus = 'playing' | 'won' | 'lost';

const sizeLookup = {
  9: { totalBombs: 10 },
  16: { totalBombs: 40 },
  30: { totalBombs: 160 }
};

const colors = [
  '',
  '#0000FA',
  '#4B802D',
  '#DB1300',
  '#202081',
  '#690400',
  '#457A7A',
  '#1B1B1B',
  '#7A7A7A',
];

const Minesweeper: React.FC = () => {
  const [size, setSize] = useState(9);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [bombCount, setBombCount] = useState(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    init();
  }, [size]);

  useEffect(() => {
    if (status !== 'playing') return;
    const timer = setInterval(() => {
      setElapsedTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  const init = () => {
    const newBoard: Cell[][] = [];
    for (let r = 0; r < size; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < size; c++) {
        row.push({
          row: r,
          col: c,
          bomb: false,
          revealed: false,
          flagged: false,
          adjBombs: 0
        });
      }
      newBoard.push(row);
    }

    // Place bombs
    let bombs = sizeLookup[size].totalBombs;
    while (bombs > 0) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (!newBoard[r][c].bomb) {
        newBoard[r][c].bomb = true;
        bombs--;
      }
    }

    // Calculate adjacent bombs
    newBoard.forEach(row =>
      row.forEach(cell => {
        const adj = getAdjCells(newBoard, cell);
        cell.adjBombs = adj.filter(c => c.bomb).length;
      })
    );

    setBoard(newBoard);
    setBombCount(sizeLookup[size].totalBombs);
    setElapsedTime(0);
    setStatus('playing');
  };

  const getAdjCells = (b: Cell[][], cell: Cell) => {
    const adj: Cell[] = [];
    const lastRow = b.length - 1;
    const lastCol = b[0].length - 1;
    const { row, col } = cell;
    if (row > 0 && col > 0) adj.push(b[row - 1][col - 1]);
    if (row > 0) adj.push(b[row - 1][col]);
    if (row > 0 && col < lastCol) adj.push(b[row - 1][col + 1]);
    if (col < lastCol) adj.push(b[row][col + 1]);
    if (row < lastRow && col < lastCol) adj.push(b[row + 1][col + 1]);
    if (row < lastRow) adj.push(b[row + 1][col]);
    if (row < lastRow && col > 0) adj.push(b[row + 1][col - 1]);
    if (col > 0) adj.push(b[row][col - 1]);
    return adj;
  };

  const reveal = (cell: Cell, b: Cell[][]): boolean => {
    if (cell.revealed) return false;
    cell.revealed = true;
    if (cell.bomb) return true;
    if (cell.adjBombs === 0) {
      const adj = getAdjCells(b, cell);
      adj.forEach(c => {
        if (!c.revealed) reveal(c, b);
      });
    }
    return false;
  };

  const checkWin = (b: Cell[][]): boolean => {
    for (let row of b) {
      for (let cell of row) {
        if (!cell.revealed && !cell.bomb) return false;
      }
    }
    return true;
  };

  const handleCellClick = (cell: Cell, e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'playing') return;

    const newBoard = board.map(row => row.map(c => ({ ...c })));
    const clicked = newBoard[cell.row][cell.col];

    if (e.shiftKey || e.type === 'contextmenu') {
      if (!clicked.revealed) {
        clicked.flagged = !clicked.flagged;
        setBombCount(bombCount + (clicked.flagged ? -1 : 1));
      }
    } else {
      if (clicked.flagged) return;
      const hitBomb = reveal(clicked, newBoard);
      if (hitBomb) {
        setStatus('lost');
      } else if (checkWin(newBoard)) {
        setStatus('won');
      }
    }

    setBoard(newBoard);
  };

  return (
    <div className="inline-block bg-gray-200 p-3 border-4 border-gray-500" style={{ fontFamily: 'monospace' }}>
      <div className="flex justify-between items-center mb-2 px-2 py-1 border-2 border-gray-500 bg-gray-300">
        <div className="bg-black text-red-500 px-2 py-1">{bombCount.toString().padStart(3, '0')}</div>
        <button
          className="mx-4 text-lg"
          onClick={() => init()}
        >
          {status === 'lost' ? '😵' : status === 'won' ? '😎' : '🙂'}
        </button>
        <div className="bg-black text-red-500 px-2 py-1">{elapsedTime.toString().padStart(3, '0')}</div>
      </div>

      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${size}, 20px)` }}
      >
        {board.flat().map(cell => (
          <div
            key={`${cell.row}-${cell.col}`}
            onClick={e => handleCellClick(cell, e)}
            onContextMenu={e => handleCellClick(cell, e)}
            className="w-5 h-5 flex items-center justify-center text-xs"
            style={{
              backgroundColor: cell.revealed ? '#C0C0C0' : '#E0E0E0',
              border: cell.revealed ? 'inset 2px #808080' : 'outset 2px #fff',
              color: colors[cell.adjBombs],
            }}
          >
            {cell.revealed
              ? cell.bomb
                ? '💣'
                : cell.adjBombs || ''
              : cell.flagged
              ? '🚩'
              : ''}
          </div>
        ))}
      </div>

      <div className="flex justify-around mt-2">
        <button className="border-2 border-gray-500 bg-gray-200 px-2 py-1" onClick={() => setSize(9)}>Easy</button>
        <button className="border-2 border-gray-500 bg-gray-200 px-2 py-1" onClick={() => setSize(16)}>Medium</button>
        <button className="border-2 border-gray-500 bg-gray-200 px-2 py-1" onClick={() => setSize(30)}>Hard</button>
      </div>
    </div>
  );
};

export default Minesweeper;
