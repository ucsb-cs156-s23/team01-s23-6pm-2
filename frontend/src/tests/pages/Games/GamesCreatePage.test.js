import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import GamesCreatePage from "main/pages/Games/GamesCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/gamesUtils', () => {
    return {
        __esModule: true,
        gamesUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("GamesCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /games on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "game": {
                id: 3,
                name: "Super Mario Bros.",
                developer: "Nintendo"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const descriptionInput = screen.getByLabelText("Developer");
        expect(descriptionInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Super Mario Bros.' } })
            fireEvent.change(descriptionInput, { target: { value: 'Nintendo' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/games"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdGame: {"game":{"id":3,"name":"Super Mario Bros.","developer":"Nintendo"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


