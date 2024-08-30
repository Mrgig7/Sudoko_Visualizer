import board from "./ui.js";
import solver from "./core.js";

class Main {
    constructor() {
        this.animate = false;
        this.renderType = 'input';
        this.showWarning = false;
        this.delay = 0;
        this.solveButton = document.getElementById('solve');
        this.clearButton = document.getElementById('clear');
        this.warnCheckbox = document.getElementById('warn');
        this.animCheckbox = document.getElementById('anim');
        this.delayInput = document.getElementById('delay');
        this.showDelay = document.getElementById('showDelay');
    }

    init() {
        this.animate = this.animCheckbox.checked;
        this.delay = Number(this.delayInput.value);
        this.showWarning = this.warnCheckbox.checked;

        if(!this.animate) {
            this.warnCheckbox.checked = false;
            this.disableButton(this.warnCheckbox);
            this.showWarning = false;
            solver.setShowWarning(this.showWarning);
            document.getElementById('warnLabel').style.opacity = 0.5;
        } else {
            this.enableButton(this.warnCheckbox);
            document.getElementById('warnLabel').style.opacity = 1;
        }

        this.showDelay.innerText = `${this.delay}`;

        board.clearBoard();
        board.setAnimate(this.animate);

        if(this.renderType === 'div') {
            board.renderBoardWithoutInput();
        } else {
            board.renderBoard();
            board.addValidator();
        }

        solver.setShowWarning(this.showWarning);
        solver.setDelay(this.delay);

        this.addEventListeners();
    }

    disableButton(button) {
        button.disabled = true;
        button.style.opacity = 0.5;
        button.style.cursor = 'not-allowed';
    }

    enableButton(button) {
        button.disabled = false;
        button.style.opacity = 1;
        button.style.cursor = 'pointer';
    }

    addEventListeners() {
        this.warnCheckbox.addEventListener('change', () => {
            this.showWarning = this.warnCheckbox.checked;
            solver.setShowWarning(this.showWarning);
        });

        this.animCheckbox.addEventListener('change', () => {
            this.animate = this.animCheckbox.checked;
            board.setAnimate(this.animate);
            if(!this.animate) {
                this.warnCheckbox.checked = false;
                this.showWarning = false;
                solver.setShowWarning(this.showWarning);
                this.disableButton(this.warnCheckbox);
                document.getElementById('warnLabel').style.opacity = 0.5;
            } else {
                this.enableButton(this.warnCheckbox);
                document.getElementById('warnLabel').style.opacity = 1;
            }
        });

        this.delayInput.addEventListener('input', () => {
            this.delay = Number(this.delayInput.value);
            this.showDelay.innerText = `${this.delay}`;
            solver.setDelay(this.delay);
        });

        this.solveButton.addEventListener('click', async () => {
            const currentBoardState = board.getBoard();
            solver.setBoard(currentBoardState);

            board.clearBoard();
            board.renderBoardWithoutInput();
            board.setBoard(currentBoardState);

            this.disableButton(this.solveButton);
            this.disableButton(this.clearButton);
            const solved = await solver.solveSudoku(0, 0);
            this.enableButton(this.solveButton);
            this.enableButton(this.clearButton);
        });

        this.clearButton.addEventListener('click', () => {
            board.clearBoard();
            board.renderBoard();
        });
    }
}

const main = new Main();
main.init();