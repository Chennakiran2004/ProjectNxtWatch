import Cookies from 'js-cookie';
import { setCookie, getCookie, removeCookie } from '../Constants/storageUtilities'; // Adjust the import path as necessary

jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

describe('Cookie Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setCookie', () => {
    it('should call Cookies.set with the correct parameters', () => {
      const name = 'jwt_token';
      const value = 'some_value';
      const options = { expires: 7 };

      setCookie(name, value, options);

      expect(Cookies.set).toHaveBeenCalledWith(name, value, options);
    });
  });

  describe('getCookie', () => {
    it('should call Cookies.get with "jwt_token"', () => {
      getCookie();

      expect(Cookies.get).toHaveBeenCalledWith('jwt_token');
    });

    it('should return the correct value from Cookies.get', () => {
      const expectedValue = 'some_value';
      (Cookies.get as jest.Mock).mockReturnValue(expectedValue);

      const result = getCookie();

      expect(result).toBe(expectedValue);
    });

    it('should return undefined if Cookies.get returns undefined', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const result = getCookie();

      expect(result).toBeUndefined();
    });
  });

  describe('removeCookie', () => {
    it('should call Cookies.remove with "jwt_token"', () => {
      removeCookie();

      expect(Cookies.remove).toHaveBeenCalledWith('jwt_token');
    });
  });
});
