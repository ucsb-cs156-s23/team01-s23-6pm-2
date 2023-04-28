import { render, screen } from "@testing-library/react";
import GamesDetailsPage from "main/pages/Games/GamesDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/gamesUtils', () => {
    return {
        __esModule: true,
        gamesUtils: {
            getById: (_id) => {
                return {
                    games: {
                        id: 3,
                        name: "Sonic Unleashed",
                        developer: "Sonic Team"
                    }
                }
            }
        }
    }
});

describe("GamesDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GamesDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Sonic Unleashed")).toBeInTheDocument();
        expect(screen.getByText("Sonic Team")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


