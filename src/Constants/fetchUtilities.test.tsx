import fetchApi from './fetchUtilities'; // Adjust the import path as necessary

describe('fetchApi', () => {
  beforeEach(() => {
    // Reset mock state before each test
    jest.restoreAllMocks();
  });

  it('should return success true and data for a successful response', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const response = await fetchApi('https://api.example.com/data', {});
    expect(response).toEqual({ success: true, data: mockData });
  });



  it('should return success false and error message for a network error', async () => {
    const mockError = new Error('Network Error');
    global.fetch = jest.fn().mockRejectedValue(mockError);

    const response = await fetchApi('https://api.example.com/data', {});
    expect(response).toEqual({ success: false, error: mockError });
  });

  it('should handle cases where response is not JSON', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error('Failed to parse JSON');
      },
    });

    const response = await fetchApi('https://api.example.com/data', {});
    expect(response).toEqual({ success: false, error: new Error('Failed to parse JSON') });
  });
});
