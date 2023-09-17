import {waitFor, render, screen, act} from "@testing-library/react";
import {AxiosInstance} from "axios";
import useParticipants from "./useParticipants";
import React from "react";
import {useHttpClient} from "./useHttpClient";
import { renderHook } from '@testing-library/react'

jest.mock("./useHttpClient")

const mockedUseHttpClient = jest.mocked(useHttpClient, true)
const TestParticipantsComponent = () => {
  const {participants, isLoading} = useParticipants()
  return (
    <>{
        isLoading ?
          <></> :
          <div>
            {
              participants.map((p) => {
                return (
                  <>
                    <li>First Name: {p.first_name}</li>
                    <li>Last Name: {p.last_name}</li>
                    <li>ID: {p.id}</li>
                  </>
              )
              })
            }
          </div>
      }
    </>
  )
}

describe('useParticipants', () => {
  const mockHttpClient = {
    get: jest.fn(),
    post: jest.fn()
  }
  beforeEach(async () => {
    const expectedParticipantsResponse = {
      data: [
        {
          "id":1,
          "first_name":"clayton",
          "last_name":"johnson",
          "birthdate":"2016-04-16",
        }
      ]
    }
    mockedUseHttpClient.mockReturnValue(((mockHttpClient as unknown) as AxiosInstance))
    mockHttpClient.get.mockReturnValue(Promise.resolve(expectedParticipantsResponse))
    mockHttpClient.post.mockReturnValue(expectedParticipantsResponse)
  });

  it('should return renderable participant data', async () => {
    act(() => {
      render (
        <TestParticipantsComponent/>
      )
    })

    expect(mockHttpClient.get.mock.calls[0][0]).toEqual(`/participants`)
    await waitFor(() => {
      expect(mockHttpClient.get).toHaveBeenCalledWith('/participants')
      expect(screen.getByText(/clayton/)).not.toBeNull()
      expect(screen.getByText(/1/)).not.toBeNull()
    })
  });
  it("automatically fetches the given URL when called", async () => {
      const { result } = renderHook(() => useParticipants())

      await waitFor(() => {
        expect(result.current.participants).toEqual([{
          "id":1,
          "first_name":"clayton",
          "last_name":"johnson",
          "birthdate":"2016-04-16"
        }])
        console.log(result.current)
        expect(mockHttpClient.get).toHaveBeenCalledWith('/participants')
      })
  })
});
