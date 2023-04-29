import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import UcsbBuildingsCreatePage from "main/pages/Buildings/UcsbBuildingsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/ucsbBuildingsUtils', () => {
    return {
        __esModule: true,
        ucsbBuildingsUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("UcsbBuildingsCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /buildings on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "ucsbbuilding": {
                id: 3,
                name: "Girvetz Hall",
                age: "1965"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UcsbBuildingsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();


        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'Girvetz Hall' } })
            fireEvent.change(descriptionInput, { target: { value: '1965' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/ucsbbuildings"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdUcsbBuilding: {"ucsbbuilding":{"id":3,"name":"Girvetz Hall","age":"1965"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


