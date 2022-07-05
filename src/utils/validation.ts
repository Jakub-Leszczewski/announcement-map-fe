export class Validation {
  public static passwordValidation (password: string): boolean {
    const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,36}$/;
    return !!(password && regularExpression.test(password));
  }
}
