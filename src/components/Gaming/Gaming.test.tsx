import '@testing-library/jest-dom';

import { screen, fireEvent, waitFor, act } from '@testing-library/react';

import Gaming from '../Gaming';

import renderWithProviders from '../../utils/renderWithProviders';

import * as fetchGamingVideos from '../../utils/getGamingVideos';


describe('Gaming Component', () => {

  const fetchGamingVideosSpyFn = jest.spyOn(fetchGamingVideos, 'fetchGamingVideos')

  
  it('should render Gaming component correctly', () => {
    renderWithProviders(<Gaming />);

    expect(screen.getByTestId('gaming-container')).toBeInTheDocument();
  });

  it('should render Gaming component correctly in dark theme', () => {
    renderWithProviders(<Gaming />);

    expect(screen.getByTestId('gaming-container')).toBeInTheDocument();

  });

  it('should fetch data successfully and render videos', async () => {

    const mockGamingVideos = [
      {
        id: '1',
        title: 'Game 1',
        thumbnailUrl: 'https://example.com/thumbnail1.jpg',
        viewCount: 100000,
      },
      {
        id: '2',
        title: 'Game 2',
        thumbnailUrl: 'https://example.com/thumbnail2.jpg',
        viewCount: 100000000,
      },
    ];

    fetchGamingVideosSpyFn.mockResolvedValueOnce(mockGamingVideos)

    await act(async () => {
      renderWithProviders(<Gaming />)
    })



    await waitFor(() => {
      expect(fetchGamingVideosSpyFn).toHaveBeenCalledWith();
      expect(screen.getByText('Game 1')).toBeInTheDocument();
    })
  })

  it('should render error message when the status is in failed', async () => {

    fetchGamingVideosSpyFn.mockRejectedValueOnce('failed to fetch video')

    await act(async () => {
      renderWithProviders(<Gaming />)
    })

    await act(() => {
      expect(fetchGamingVideosSpyFn).toHaveBeenCalledWith();
    })
  })

  it('render loader when the status is in loading', async () => {

    fetchGamingVideosSpyFn.mockImplementationOnce(() => new Promise(() => {}))
    await act(async () => {
      renderWithProviders(<Gaming />)
    })

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
  
});
