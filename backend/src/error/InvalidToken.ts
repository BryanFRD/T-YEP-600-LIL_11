import exp from "constants";

class InvalidToken extends Error {
  constructor() {
    super('Invalid token');
    this.name = 'InvalidToken';
    }
}

export default InvalidToken;