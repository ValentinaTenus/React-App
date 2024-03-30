type Constructor = {
    message: string;
    cause?: unknown;
};

class ApplicationError extends Error {
    public cause?: unknown;

    public constructor({ message, cause }: Constructor) {
        super(message);
        this.cause = cause;
    }
}

export { ApplicationError };

