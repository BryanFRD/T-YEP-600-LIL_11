class UserNotFoundByIdentifier extends Error {
  constructor(identifier: string) {
    super(`User not found by identifier: ${identifier}`);
    this.name = 'UserNotFoundByIdentifier';
  }
}

export default UserNotFoundByIdentifier;
