import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import GamesEditPage from "main/pages/Games/GamesEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/gamesUtils', () => {
    return {
        __esModule: true,
        gamesUtils: {
            update: (_restaurant) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    restaurant: {
                        id: 3,
                        name: "Super Mario Bros.",
                        developer: "Nintendo"
                    }
                }
            }
        }
    }
});


describe("GamesEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("GamesForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Super Mario Bros.')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Nintendo')).toBeInTheDocument();
    });

    test("redirects to /games on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "game": {
                id: 3,
                name: "Super Mario Bros.",
                developer: "Nintendo"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const developerInput = screen.getByLabelText("Developer");
        expect(developerInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Super Mario Bros.' } })
            fireEvent.change(developerInput, { target: { value: 'Nintendo' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/games"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedGame: {"game":{"id":3,"name":"Super Mario Bros.","developer":"Nintendo"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


