class ClickableExecutor {
    constructor(fn, textContent) {
        this.fn = fn;
        this.textContent = textContent;
    }

    click() {
        this.fn();
    }

}