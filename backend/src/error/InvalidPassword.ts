class InvalidPassword extends Error {
  constructor(password: string) {
    super('Invalid password: ' + password);
    this.name = 'InvalidPassword';
  }
}

export default InvalidPassword;
