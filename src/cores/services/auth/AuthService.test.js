const { when } = require('jest-when');

const AuthService = require('./AuthService');

const logger = {
  info: jest.fn(() => {}),
  error: jest.fn(() => {}),
  debug: jest.fn(() => {}),
};

let authService;
let userDao;
let findOneMock;

let tokenUtil;
let signMock;

const prepareTest = () => {
  findOneMock = jest.fn();
  signMock = jest.fn();

  userDao = {
    findOne: findOneMock,
  };

  tokenUtil = {
    sign: signMock,
  };

  authService = new AuthService({
    userDao,
    tokenUtil,
    logger,
  });
};

describe('AuthService', () => {
  describe('login method', () => {
    beforeEach(() => {
      prepareTest();
    });

    it('should return payload without error', async () => {
      // Given
      const username = 'daniel';
      const password = '123456789';
      const user = {
        id: 1,
        username: 123,
        fullName: 'Daniel Le',
        hashPassword: '$2b$10$dZMiYcDTEaE/4hb5k5Mhw.ONJrJtVcXyXnnA/7Z0RtLDHIIA0DSqG',
      };
      when(findOneMock)
        .calledWith({ username })
        .mockResolvedValue(user);

      when(signMock)
        .calledWith({ id: 1 })
        .mockReturnValue('TOKEN_USER');
      // When
      const response = await authService.login(username, password);

      // Then
      expect(response).toEqual({ fullName: 'Daniel Le', id: 1, token: 'TOKEN_USER' });
    });

    it('should throw error when wrong password', async () => {
      // Given
      const username = 'daniel';
      const password = '123456788'; // correct password is 123456789
      const user = {
        id: 1,
        username: 123,
        fullName: 'Daniel Le',
        hashPassword: '$2b$10$dZMiYcDTEaE/4hb5k5Mhw.ONJrJtVcXyXnnA/7Z0RtLDHIIA0DSqG',
      };
      when(findOneMock)
        .calledWith({ username })
        .mockResolvedValue(user);

      when(signMock)
        .calledWith({ id: 1 })
        .mockReturnValue('TOKEN_USER');

      // When && Then
      await expect(
        authService.login(username, password),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Wrong username or password"`);
    });

    it('should throw error when wrong username', async () => {
      // Given
      const username = 'daniel1';
      const password = '123456789'; // correct password is 123456789
      when(findOneMock)
        .calledWith({ username })
        .mockResolvedValue(null);

      when(signMock)
        .calledWith({ id: 1 })
        .mockReturnValue('TOKEN_USER');

      // When && Then
      await expect(
        authService.login(username, password),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Wrong username or password"`);
    });
  });
});
