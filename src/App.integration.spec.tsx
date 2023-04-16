import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as reactQuery from "react-query";
import { UseQueryResult } from "react-query";
import * as userService from "./services/user.service";
import { act } from "react-dom/test-utils";

describe("App Integration", () => {
  function setup(queryResultOverrides: Partial<UseQueryResult> = {}) {
    const defaultQueryResult = {} as UseQueryResult;

    if (queryResultOverrides.data) {
      jest.spyOn(userService, "getUsers").mockImplementation(async () => {
        return {
          data: queryResultOverrides.data as any,
        };
      });
    } else {
      jest.spyOn(reactQuery, "useQuery").mockImplementation(() => {
        return {
          ...defaultQueryResult,
          ...(queryResultOverrides as UseQueryResult),
        };
      });
    }

    render(<App />);
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("on initial load", () => {
    it("should show no user count", async () => {
      setup({ isLoading: true });
      const tblHeadingEl = await screen.findByTestId(`users-tbl-heading`);
      expect(tblHeadingEl).toHaveTextContent(`Users`);
      expect(tblHeadingEl).not.toHaveTextContent(`(`);
    });
    it("should not show user rows", async () => {
      setup({ isLoading: true });
      expect(screen.queryByTestId(`user-row`)).not.toBeInTheDocument();
    });
    it("should show a loading indicator", async () => {
      setup({ isLoading: true });
      expect(await screen.findByTestId(`loading`)).toBeInTheDocument();
    });
    it("should enable refresh button", async () => {
      setup({ isLoading: true });
      expect(
        await screen.findByTestId<HTMLButtonElement>(`refresh-btn`)
      ).not.toHaveAttribute("disabled");
    });
    it("should disable clear all button", async () => {
      setup({ isLoading: true });
      expect(
        await screen.findByTestId<HTMLButtonElement>(`clear-all-btn`)
      ).toHaveAttribute("disabled");
    });
  });

  describe("when the api successfully returns users", () => {
    const expectedUserCount = 10;
    let jsonUsers: any[];

    beforeEach(() => {
      jsonUsers = require("../test/users.json");
    });

    it("should show the correct user count", async () => {
      act(() => setup({ data: jsonUsers }));
      await waitFor(async () => {
        const tblHeadingEl = await screen.findByTestId(`users-tbl-heading`);
        expect(tblHeadingEl).toHaveTextContent(`Users (${expectedUserCount})`);
      });
    });
    it("should show the correct number of user rows", async () => {
      act(() => setup({ data: jsonUsers }));
      await waitFor(async () => {
        expect(await screen.findAllByTestId(`user-row`)).toHaveLength(
          expectedUserCount
        );
      });
    });
    it("should not show a loading indicator", async () => {
      act(() => setup({ data: jsonUsers }));
      await waitFor(async () => {
        expect(screen.queryByTestId(`loading`)).not.toBeInTheDocument();
      });
    });
    it("should disable refresh", async () => {
      act(() => setup({ data: jsonUsers }));
      await waitFor(async () => {
        expect(
          await screen.findByTestId<HTMLButtonElement>(`refresh-btn`)
        ).toHaveAttribute("disabled");
      });
    });
    it("should enable clear all", async () => {
      act(() => setup({ data: jsonUsers }));
      await waitFor(async () => {
        expect(
          await screen.findByTestId<HTMLButtonElement>(`clear-all-btn`)
        ).not.toHaveAttribute("disabled");
      });
    });
  });
});
