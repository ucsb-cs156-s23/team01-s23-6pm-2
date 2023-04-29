import { render, screen, waitFor } from "@testing-library/react";
import UcsbBuildingsIndexPage from "main/pages/Buildings/UcsbBuildingsIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/ucsbBuildingsUtils', () => {
    return {
        __esModule: true,
        ucsbBuildingsUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    ucsbBuildingss: [
                        {
                            "id": 3,
                            "name": "Broida Hall",
                            "description": "1967",
                            "architecture": "Horizontal",
                            "location": "East"  
                        },
                    ]
                }
            }
        }
    }
});


describe("UcsbBuildingsIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createUcsbBuildingButton = screen.getByText("Create Ucsb Building");
        expect(createUcsbBuildingButton).toBeInTheDocument();
        expect(createUcsbBuildingButton).toHaveAttribute("style", "float: right;");

        const name = screen.getByText("Broida Hall");
        expect(name).toBeInTheDocument();

        const description = screen.getByText("1967");
        expect(description).toBeInTheDocument();

        expect(screen.getByTestId("UcsbBuildingsTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("UcsbBuildingsTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("UcsbBuildingsTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const name = screen.getByText("Broida Hall");
        expect(name).toBeInTheDocument();

        const description = screen.getByText("1967");
        expect(description).toBeInTheDocument();

        const deleteButton = screen.getByTestId("UcsbBuildingsTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/buildings"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `UcsbBuildingsIndexPage deleteCallback: {"id":3,"name":"Broida Hall","description":"1967"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


