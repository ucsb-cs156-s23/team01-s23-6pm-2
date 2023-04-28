import { render, screen, waitFor } from "@testing-library/react";
import GamesIndexPage from "main/pages/Games/GamesIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/gamesUtils', () => {
    return {
        __esModule: true,
        gamesUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    games: [
                        {
                            "id": 3,
                            "name": "Sonic Unleashed",
                            "developer": "Sonic Team",
                            "year": "2008"   
                        },
                    ]
                }
            }
        }
    }
});


describe("GamesIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createGamesButton = screen.getByText("Create Game");
        expect(createGamesButton).toBeInTheDocument();
        expect(createGamesButton).toHaveAttribute("style", "float: right;");

        const name = screen.getByText("Sonic Unleashed");
        expect(name).toBeInTheDocument();

        const developer = screen.getByText("Sonic Team");
        expect(developer).toBeInTheDocument();

        expect(screen.getByTestId("GamesTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("GamesTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("GamesTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const name = screen.getByText("Sonic Unleashed");
        expect(name).toBeInTheDocument();

        const developer = screen.getByText("Sonic Team");
        expect(developer).toBeInTheDocument();

        const deleteButton = screen.getByTestId("GamesTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/games"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `GamesIndexPage deleteCallback: {"id":3,"name":"Sonic Unleashed","developer":"Sonic Team"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


