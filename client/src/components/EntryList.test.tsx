import { screen, renderRouter, waitFor } from "../../test/utils";
import EntryList, { EmptyEntries } from "./EntryList";

describe("EntryList", () => {
  it("should render a list with one item", async () => {
    renderRouter("/time/day/2022/6/1");

    await waitFor(() => screen.getByText(/First Client/));
  });

  it("should render an empty list", () => {
    renderRouter("/time/day/2022/6/2");

    expect(
      screen.getByText(/There are no entries for this day./)
    ).toBeInTheDocument();
  });
});
