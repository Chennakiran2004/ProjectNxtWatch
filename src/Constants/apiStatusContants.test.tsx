import apiStatusConstants from './apiStatusConstants'; // Adjust the import path as necessary

describe('apiStatusConstants', () => {
  it('should contain the correct status constants', () => {
    expect(apiStatusConstants).toEqual({
      initial: 'INITIAL',
      success: 'SUCCESS',
      failure: 'FAILURE',
      inProgress: 'IN_PROGRESS',
    });
  });

  it('should have the correct value for each status', () => {
    expect(apiStatusConstants.initial).toBe('INITIAL');
    expect(apiStatusConstants.success).toBe('SUCCESS');
    expect(apiStatusConstants.failure).toBe('FAILURE');
    expect(apiStatusConstants.inProgress).toBe('IN_PROGRESS');
  });
});
