import { renderRouter, screen, waitFor, fireEvent } from "../../test/utils";

describe("Time Page", () => {
  it("should navigate to the selected day", async () => {
    renderRouter("/time/day/2022/6/2");

    await waitFor(() => {
      expect(screen.getByText(/create one/i)).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /wednesday/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/entry description/i)).toBeInTheDocument();
    });
  });

  it("should navigate to the previous day", async () => {
    renderRouter("/time/day/2022/6/2");

    await waitFor(() => {
      expect(screen.getByText(/create one/i)).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /previous day/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/entry description/i)).toBeInTheDocument();
    });
  });

  it("should navigate to the next day", async () => {
    renderRouter("/time/day/2022/6/1");

    await waitFor(() => {
      expect(screen.getByText(/entry description/i)).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /next day/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/create one/i)).toBeInTheDocument();
    });
  });
});
