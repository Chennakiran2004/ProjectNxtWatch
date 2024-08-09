import '@testing-library/jest-dom';

import { screen, fireEvent, waitFor, act } from '@testing-library/react';

import Home from '../Home';

import renderWithProviders from '../../utils/renderWithProviders';

import * as fetchHomeVideos from '../../utils/fetchHomeVideos';


describe('Home Component', () => {
  
  it("renders the component correctly", () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("Home container")).toBeInTheDocument()
  })

  it("should render correctly", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText("GET IT NOW")).toBeInTheDocument();
    expect(screen.getByText("Buy Nxt Watch Premium prepaid plans with UPI")).toBeInTheDocument();
  })

  it("handles search input", () => {
    renderWithProviders(<Home />);

    const searchInput = screen.getByPlaceholderText("Search") as HTMLInputElement

    fireEvent.change(searchInput, {target : {value: "new Task"}})

    expect(searchInput.value).toBe("new Task")
  })

  it("should render banner correctly", () => {
    renderWithProviders(<Home />);

    expect(screen.getByTestId("banner")).toBeInTheDocument()
  })

  it("should hide the banner when close button is clicked", () => {
    renderWithProviders(<Home />);

    const closeBtn = screen.getByTestId("close")
    fireEvent.click(closeBtn)

    expect(screen.queryByTestId("banner")).not.toBeInTheDocument()
  })

  it("render loader when the status is in loading", async () => {

    const fetchHomeVideosSpy = jest.spyOn(fetchHomeVideos, 'fetchHomeVideos')

    fetchHomeVideosSpy.mockImplementationOnce(() => new Promise(() => {}))
    renderWithProviders(<Home/>)


    expect(screen.getByTestId("loader")).toBeInTheDocument()
  })

  it('should render error message when the status is in failed', async () => {
    const fetchHomeVideosSpy = jest.spyOn(fetchHomeVideos, 'fetchHomeVideos')
    
    fetchHomeVideosSpy.mockRejectedValueOnce('failed to fetch video')

    await act(() => {
      renderWithProviders(<Home/>)
    })

    await waitFor(() => {
      expect(fetchHomeVideosSpy).toHaveBeenCalledWith('')
      expect(screen.getByTestId("no-vieos-view-container")).toBeInTheDocument()
    })
  })

  it('should fetch data successfully and render videos', async () => {
    const fetchHomeVideosSpy = jest.spyOn(fetchHomeVideos, 'fetchHomeVideos')

    const mockVideos = [
      {
        id: '1',
        channel: {
          name: 'Mock Channel 1',
          profileImageUrl: 'https://example.com/mock1.jpg',
        },
        publishedAt: '2024-08-08',
        viewCount: 10,
        title: 'Mock Video 1',
        thumbnailUrl: 'https://example.com/mock1.jpg',
      },
    ];

    fetchHomeVideosSpy.mockResolvedValueOnce(mockVideos);

    await act(() => {
      renderWithProviders(<Home/>)
    })

    await waitFor(() => {
      expect(fetchHomeVideosSpy).toHaveBeenCalledWith('');
      expect(screen.getByText('Mock Video 1')).toBeInTheDocument();
    });
  });
});
