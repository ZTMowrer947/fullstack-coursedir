export default class HttpError extends Error {
  #code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.#code = code;
    this.name = 'HttpError';
  }

  get code(): number {
    return this.#code;
  }

  toString(): string {
    return `HTTP ${this.code}: ${super.toString()}`;
  }
}
