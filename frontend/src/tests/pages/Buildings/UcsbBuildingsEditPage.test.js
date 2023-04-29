import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import UcsbBuildingsEditPage from "main/pages/Buildings/UcsbBuildingsEditPage";
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
jest.mock('main/utils/ucsbBuildingsUtils', () => {
    return {
        __esModule: true,
        ucsbBuildingsUtils: {
            update: (_ucsbBuildings) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    ucsbBuildings: {
                        id: 3,
                        name: "Broida Hall",
                        description: "1967"
                    }
                }
            }
        }
    }
});


describe("UcsbBuildingsEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("UcsbBuildingsForm-name")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Broida Hall')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1967')).toBeInTheDocument();
    });

    test("redirects to /buildings on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "UcsbBuildings": {
                id: 3,
                name: "Broida Hall",
                description: "1967"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Broida Hall' } })
            fireEvent.change(descriptionInput, { target: { value: '1967' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/buildings"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedUcsbBuilding: {"UcsbBuildings":{"id":3,"name":"Broida Hall","description":"1967"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


