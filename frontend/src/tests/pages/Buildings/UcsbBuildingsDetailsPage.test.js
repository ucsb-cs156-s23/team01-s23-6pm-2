import { render, screen } from "@testing-library/react";
import UcsbBuildingsDetailsPage from "main/pages/Buildings/UcsbBuildingsDetailsPage";
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

jest.mock('main/utils/ucsbBuildingsUtils', () => {
    return {
        __esModule: true,
        ucsbBuildingsUtils: {
            getById: (_id) => {
                return {
                    ucsbBuildings: 
                        {
                            id: 3,
                            name: "Broida Hall",
                            description: "1967"
                        }
                    
                }
            }
        }
    }
});

describe("ucsbBuildingsDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Broida Hall")).toBeInTheDocument();
        expect(screen.getByText("1967")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


