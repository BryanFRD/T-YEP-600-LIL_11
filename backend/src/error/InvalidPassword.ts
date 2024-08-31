class InvalidPassword extends Error {
  statusCode: number;
  constructor(password: string) {
    super('Invalid password: ' + password);
    this.name = 'InvalidPassword';
    this.statusCode = 400;
  }
}

export default InvalidPassword;
