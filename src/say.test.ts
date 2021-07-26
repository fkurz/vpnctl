import buildCmd from "./cmd";

beforeEach(() => {
  jest.spyOn(process, "exit").mockImplementation();
  jest.spyOn(console, "log").mockImplementation();
});

const buildArgs = (...args: string[]) => ["node", "cmd", ...args];

describe("Say subcommand", () => {
  it("Should say 'Konnichiwa!' when passed 'Konnichiwa!'", () => {
    const cmd = buildCmd();
    cmd.parse(buildArgs("say", "Konnichiwa!"));

    expect(console.log).toHaveBeenCalledWith("Konnichiwa!");
  });
});
