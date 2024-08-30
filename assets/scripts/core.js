import board from './ui.js';

class SudokuSolver {
    constructor() {
        this.board = [];
        this.delay = 300;
        this.showWarning = false;
    }

    setShowWarning(showWarning) {
        this.showWarning = showWarning;
    }

    setDelay(delay) {
        this.delay = delay;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    initBoard() {
        for(let i = 0; i < 9; ++i) {
            this.board.push([]);
            for(let j = 0; j < 9; ++j) {
                this.board[i].push(0);
            }
        }
    }

    setBoard(board) {
        for(let i = 0; i < 9; ++i) {
            this.board[i] = [];
            for(let j = 0; j < 9; ++j) {
                this.board[i][j] = board[i][j];
            }
        }
    }

    isValid(i, j, k) {
        for(let x = 0; x < 9; ++x) {
            if(this.board[x][j] === k) {
                if(this.showWarning) {
                    board.showWarning(x, j);
                }
                return false;
            }
        }

        for(let y = 0; y < 9; ++y) {
            if(this.board[i][y] === k) {
                if(this.showWarning) {
                    board.showWarning(i, y);
                }
                return false;
            }
        }

        const startRow = i - i % 3;
        const startCol = j - j % 3;

        for(let x = 0; x < 3; ++x) {
            for(let y = 0; y < 3; ++y) {
                if(this.board[startRow + x][startCol + y] === k) {
                    if(this.showWarning) {
                        board.showWarning(startRow + x, startCol + y);
                    }
                    return false;
                }
            }
        }

        return true;
    }

    async solveSudoku(i, j) {
        if(i === 9) {
            return true;
        }
        if(j === 9) {
            return this.solveSudoku(i + 1, 0);
        }

        if(this.board[i][j] !== 0) {
            return this.solveSudoku(i, j + 1);
        } else {
            for(let k = 1; k <= 9; ++k) {
                if(this.board[i][j - 1] === k || this.board[i][j - 2] === k) {
                    continue;
                }
                if(this.isValid(i, j, k)) {
                    this.board[i][j] = k;
                    board.renderCell(i, j, k);
                    await this.sleep(this.delay);
                    if(await this.solveSudoku(i, j + 1)) {
                        return true;
                    }
                    this.board[i][j] = 0;
                }
            }
        }

        return false;
    }
}

export default new SudokuSolver();