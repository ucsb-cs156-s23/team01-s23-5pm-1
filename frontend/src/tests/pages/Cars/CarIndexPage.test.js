import { render, screen, waitFor } from "@testing-library/react";
import CarIndexPage from "main/pages/Cars/CarIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/carUtils', () => {
    return {
        __esModule: true,
        carUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    cars: [
                        {
                            "id": 3,
                            "make": "Ford",
                            "model": "Mustang",
                            "year": "1969"
                        },
                    ]
                }
            }
        }
    }
});


describe("CarIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CarIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CarIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createCarButton = screen.getByText("Create Car");
        expect(createCarButton).toBeInTheDocument();
        expect(createCarButton).toHaveAttribute("style", "float: right;");

        const make = screen.getByText("Ford");
        expect(make).toBeInTheDocument();

        const model = screen.getByText("Mustang");
        expect(model).toBeInTheDocument();

        expect(screen.getByTestId("CarTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("CarTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("CarTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CarIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const name = screen.getByText("Ford");
        expect(name).toBeInTheDocument();

        const description = screen.getByText("Mustang");
        expect(description).toBeInTheDocument();

        const deleteButton = screen.getByTestId("CarTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/cars"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `CarIndexPage deleteCallback: {"id":3,"make":"Ford","model":"Mustang","year":"1969"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});
