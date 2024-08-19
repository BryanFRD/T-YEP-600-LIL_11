class UserNotFoundById extends Error {
  constructor(identifier: string) {
    super(`User with id ${identifier} not found`);
    this.name = 'UserNotFoundByIdentifier';
  }
}
