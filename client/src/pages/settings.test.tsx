import {
  render,
  screen,
  waitFor,
  userEvent,
  fireEvent,
  act,
} from "../../test/utils";
import Settings from "../pages/settings";

describe("SettingsPage", () => {
  it("should list the existing projects", async () => {
    render(<Settings />);

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: /second client/i })
      ).toBeInTheDocument();
    });

    userEvent.selectOptions(
      screen.getByLabelText(/current client/i),
      screen.getByRole("option", { name: /second client/i })
    );

    await waitFor(() => {
      expect(screen.getByText("Third Project")).toBeInTheDocument();
    });

    expect(
      (screen.getByText("Second Client") as HTMLOptionElement).selected
    ).toBe(true);
  });

  it("should default to the saved client from localStorage", async () => {
    localStorage.setItem("clientId", "2");

    render(<Settings />);

    /* https://github.com/testing-library/react-testing-library/issues/1051 */
    await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

    await screen.findByRole("option", { name: /second client/i });

    await waitFor(() => {
      expect(
        (screen.getByLabelText(/current client/i) as HTMLSelectElement).value
      ).toBe("2");
    });

    expect(
      (screen.getByText(/second client/i) as HTMLOptionElement).selected
    ).toBe(true);
  });

  it("should let the user create a client", async () => {
    render(<Settings />);

    /* https://github.com/testing-library/react-testing-library/issues/1051 */
    await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

    await screen.findByRole("option", { name: /second client/i });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /add client/i })
      ).not.toBeDisabled();
    });

    fireEvent.change(screen.getByRole("textbox", { name: /client name/i }), {
      target: { value: "Test Client" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add client/i }));

    await waitFor(() => {
      expect(
        (screen.getByLabelText(/current client/i) as HTMLSelectElement).value
      ).toBe("3");
    });

    expect(
      (screen.getByText(/test client/i) as HTMLOptionElement).selected
    ).toBe(true);
  });

  it("should let the user create a project", async () => {
    render(<Settings />);

    /* https://github.com/testing-library/react-testing-library/issues/1051 */
    await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

    await screen.findByRole("option", { name: /second client/i });

    userEvent.selectOptions(
      screen.getByLabelText(/current client/i),
      screen.getByRole("option", { name: /second client/i })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /add project/i })
      ).not.toBeDisabled();
    });

    fireEvent.change(screen.getByRole("textbox", { name: /project name/i }), {
      target: { value: "Test Project" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add project/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/test project/i) as HTMLOptionElement
      ).toBeInTheDocument();
    });
  });
});
