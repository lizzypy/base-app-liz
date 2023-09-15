import { render, screen } from "@testing-library/react";
import { Welcome } from "./Welcome";
import useUsers from "../hooks/useUsers";

jest.mock("../hooks/useUsers");

const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>

describe('<Welcome>', () => {
    it('should render a table with the participants available', async () => {

        mockUseUsers.mockReturnValue({
          users: [
            {
                id: 1,
                email: "liz.johnson@example.com",
            },
            {
                id: 2,
                email: "other@example.com",
            }
          ],
          isLoading: false
        })

        render(<Welcome/>)

        expect(await screen.findByText("liz.johnson@example.com")).toBeVisible()
    })
})
