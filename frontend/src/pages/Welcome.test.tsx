import { render, screen } from "@testing-library/react";
import { Welcome } from "./Welcome";
import useParticipants from "../hooks/useParticipants";

jest.mock("../hooks/useParticipants");

const mockUseParticipants = useParticipants as jest.MockedFunction<typeof useParticipants>

describe('<Welcome>', () => {
    it('should render a table with the participants available', async () => {

        mockUseParticipants.mockReturnValue([
            {
                id: 1,
                first_name: "liz",
                last_name: "test1"
            },
            {
                id: 2,
                first_name: "test2",
                last_name: "johnson"
            }
        ])

        render(<Welcome/>)

        expect(await screen.findByText("liz")).toBeVisible()
    })
})