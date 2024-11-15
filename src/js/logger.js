class Logger {

    constructor(tag, doLogging) {
        this.tag = tag;
        this._logTraceMessages = false;
        this._logDebugMessages = doLogging;
        this.blacklist = [];
    }

    trace(message, ...optionalParams) {
        if (this._logTraceMessages) {
            console.log(`[${this.tag}]`, message, ...optionalParams);
        }
    }

    log(message, ...optionalParams) {
        if (!this.blacklist.includes(this.tag)) {
            if (this._logDebugMessages) {
                console.log(`[${this.tag}]`, message, ...optionalParams);
            }
        }
    }

    warn(message, ...optionalParams) {
        console.warn(`[${this.tag}]`, message, ...optionalParams);
    }

    error(message, ...optionalParams) {
        console.error(`[${this.tag}]`, message, ...optionalParams);
    }

}