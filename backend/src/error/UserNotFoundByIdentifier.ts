class UserNotFoundByIdentifier extends Error {
  statusCode: number;
  constructor(identifier: string) {
    super(`User not found by identifier: ${identifier}`);
    this.name = 'UserNotFoundByIdentifier';
    this.statusCode = 404;
  }
}

export default UserNotFoundByIdentifier;
