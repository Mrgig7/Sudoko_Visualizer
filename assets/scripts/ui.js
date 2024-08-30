class Board {
    constructor() {
        this.board = document.getElementById('board');
        this.animate = true;
        this.renderType = 'input';
    }

    setAnimate(animate) {
        this.animate = animate;
    }

    renderBoardWithoutInput() {
        this.renderType = 'div';
        for(let i = 0; i < 9; ++i) {
            const row = document.createElement('div');
            row.classList.add('row');
            for(let j = 0; j < 9; ++j) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
                if(j % 3 === 2) {
                    cell.style.borderRightWidth = '1px';
                    cell.style.borderRightColor = '#b4befe';
                }
                if(i % 3 === 2) {
                    cell.style.borderBottomWidth = '1px';
                    cell.style.borderBottomColor = '#b4befe';
                }
            }
            this.board.appendChild(row);
        }
    }

    renderBoard() {
        this.renderType = 'input';
        for(let i = 0; i < 9; ++i) {
            const row = document.createElement('div');
            row.classList.add('row');
            for(let j = 0; j < 9; ++j) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.classList.add('cell');
                row.appendChild(cell);
                if(j % 3 === 2) {
                    cell.style.borderRightWidth = '1px';
                    cell.style.borderRightColor = '#b4befe';
                }
                if(i % 3 === 2) {
                    cell.style.borderBottomWidth = '1px';
                    cell.style.borderBottomColor = '#b4befe';
                }
            }
            this.board.appendChild(row);
        }
    }

    getBoard() {
        const board = [];
        for(let i = 0; i < 9; ++i) {
            board.push([]);
            for(let j = 0; j < 9; ++j) {
                const cell = this.board.children[i].children[j];
                if(this.renderType === 'input') {
                    board[i].push(Number(cell.value));
                } else {
                    board[i].push(Number(cell.textContent));
                }
            }
        }
        return board;
    }

    clearBoard() {
        this.board.innerHTML = '';
    }

    setBoard(board) {
        for(let i = 0; i < 9; ++i) {
            for(let j = 0; j < 9; ++j) {
                this.renderCell(i, j, board[i][j]);
                const cell = this.board.children[i].children[j];
                cell.style.color = '#f38ba8';
            }
        }
    }

    renderCell(x, y, value) {
        const row = this.board.children[x];
        const cell = row.children[y];

        if(value === 0) {
            if(this.animate) {
                cell.style.animation = 'fadeOut 200ms ease-out';
            }
            if(this.renderType === 'input') {
                cell.value = '';
            } else {
                cell.textContent = '';
            }
            return;
        }

        cell.style.color = '#b4befe';

        if(this.animate) {
            cell.style.animation = 'fadeIn 200ms ease-in';
        }
        if(this.renderType === 'input') {
            cell.value = value;
        } else {
            cell.textContent = value;
        }
    }

    addValidator() {
        this.board.addEventListener('input', (event) => {
            const cell = event.target;
            if(Number.isNaN(Number(cell.value))) {
                cell.value = '';
            }
            if(cell.value.length > 1) {
                cell.value = cell.value[0];
            }
            if(cell.value < 1 || cell.value > 9) {
                cell.value = '';
            }
        });
    }

    showWarning(i, j) {
        const cell = this.board.children[i].children[j];
        if(this.animate) {
            cell.style.animation = 'warning 200ms ease-in-out';
        }
    }
}

export default new Board();