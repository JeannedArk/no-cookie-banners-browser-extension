class ClickableExecutor {
    constructor(fn, textContent, metadata) {
        this.fn = fn;
        this.textContent = textContent;
        this.metadata = metadata;
    }

    click() {
        this.fn();
    }

}