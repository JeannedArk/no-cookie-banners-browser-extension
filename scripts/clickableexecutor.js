class ClickableExecutor {
    constructor(fn) {
        this.fn = fn;
    }

    click() {
        this.fn();
    }

}