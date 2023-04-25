import { render, screen } from "@testing-library/react";
import CourseDetailsPage from "main/pages/Courses/CourseDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/courseUtilitiess', () => {
    return {
        __esModule: true,
        courseUtilitiess: {
            getById: (_id) => {
                return {
                    course: {
                        "id": 1,
                        "title": "CMPSC 156 - ADV APP PROGRAM",
                        "courseNumber": "07427",
                        "Department": "Computer Science",
                    }
                }
            }
        }
    }
});

describe("CourseDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CourseDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CourseDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("CMPSC 156 - ADV APP PROGRAM")).toBeInTheDocument();
        expect(screen.getByText("07427")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


