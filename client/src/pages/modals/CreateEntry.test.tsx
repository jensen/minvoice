import {
  renderRouter,
  waitFor,
  userEvent,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "../../../test/utils";
import { mockPost } from "../../services/mocks/server";

describe("CreateEntry", () => {
  it("should create an entry with valid input", async () => {
    const user = userEvent.setup();

    renderRouter("/time/day/2022/6/2/new");

    await screen.findByRole("option", { name: "[FIRST] First Project" });

    await user.click(screen.getByRole("button", { name: "Choose Project" }));

    await user.click(
      screen.getByRole("option", { name: "[FIRST] First Project" })
    );

    fireEvent.change(screen.getByPlaceholderText("Notes"), {
      target: { value: "Test description" },
    });

    fireEvent.change(screen.getByPlaceholderText(/0:00/), {
      target: { value: "1:30" },
    });

    expect(screen.getByText(/Save/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/save/i));

    await waitForElementToBeRemoved(() => screen.queryByText(/save/i));

    expect(screen.getByText("[FIRST] First Project")).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.getByText("1:30")).toBeInTheDocument();
  });

  it("should render missing field errors", async () => {
    mockPost("/api/entries").error([
      "Must include description",
      "Must include duration",
    ]);

    renderRouter("/time/day/2022/6/2/new");

    await screen.findByText(/new entry for thursday, june 2/i);

    expect(screen.getByText(/save/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/save/i));

    await screen.findByText(/must include description/i);
    await screen.findByText(/must include duration/i);
  });
});
