import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import App from "./App"
import store from "./storeFolder/store"
import { render } from "@testing-library/react"
import { screen } from "@testing-library/react"

describe("App component", () => {

    it("should render without crashing", () => {
        render(
            // <Provider store={store}>
            //     <MemoryRouter>
            //         <App/>
            //     </MemoryRouter>
            // </Provider>
            <App/>
        )

        expect(screen.getByText(/login/i)).not.toBeNull()
    })
})