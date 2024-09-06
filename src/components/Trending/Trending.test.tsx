import '@testing-library/jest-dom';

import { screen, act } from '@testing-library/react';

import Trending from '../Trending';

import renderWithProviders from '../../utils/renderWithProviders';

import * as fetchTrendingVideos from '../../utils/fetchTredingVideos';


describe('Trending Component', () => {
  const fetchTrendingVideosSpy = jest.spyOn(fetchTrendingVideos, 'fetchTrendingVideos')

  it('should render Trending component correctly', () => {
    renderWithProviders(<Trending />);

    expect(screen.getByTestId('trending-container')).toBeInTheDocument();
  });

  it('should fetch data successfully and render videos', async () => {

    const mockTrendingVideos = [
      {
        id: '1',
        channel: { name: 'Channel 1', profile_image_url: 'https://example.com/profile1.jpg' },
        published_at: '2024-08-01T00:00:00Z',
        thumbnail_url: 'https://example.com/thumbnail1.jpg',
        title: 'Video 1',
        view_count: 1000,
      },
      {
        id: '2',
        channel: { name: 'Channel 2', profile_image_url: 'https://example.com/profile2.jpg' },
        published_at: '2024-08-01T00:00:00Z',
        thumbnail_url: 'https://example.com/thumbnail2.jpg',
        title: 'Video 2',
        view_count: 2000,
      },
    ];
    

    fetchTrendingVideosSpy.mockResolvedValueOnce(mockTrendingVideos)

    await act(() => {
      renderWithProviders(<Trending/>)
    })

    await act(() => {
      expect(fetchTrendingVideosSpy).toHaveBeenCalled()
      expect(screen.getByText('Video 1')).toBeInTheDocument()
    })

  })



  it("Should render loader", async () => {

    fetchTrendingVideosSpy.mockImplementationOnce(() => new Promise(() => {}))
    
    await act(async () => {
      renderWithProviders(<Trending />)
    })

    expect(screen.getByTestId("loader")).toBeInTheDocument()
  })

  it('should render error message when the status is in failed', async () => {

    fetchTrendingVideosSpy.mockRejectedValueOnce('failed to fetch video')

    await act(async () => {
      renderWithProviders(<Trending />)
    })

    await act(() => {
      expect(fetchTrendingVideosSpy).toHaveBeenCalledWith();
    })
  })
  

});
