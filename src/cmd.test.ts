import buildCmd from "./cmd";

const buildArgs = (...args: string[]) => ["node", "cmd", ...args];

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation();
  jest.spyOn(process, "exit").mockImplementation();
  jest.spyOn(process.stdout, "write").mockImplementation();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Base command", () => {
  it("Should print help when passed nothing", () => {
    const cmd = buildCmd();

    cmd.parse(buildArgs());

    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringMatching(/Usage: cmd \[options\] \[command\]/)
    );
  });

  it("Should print help when passed invalid subcommand", () => {
    const cmd = buildCmd();

    cmd.parse(buildArgs("delete-internet"));

    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringMatching(/Usage: cmd \[options\] \[command\]/)
    );
  });

  it("Should print help when passed '-h'", () => {
    const cmd = buildCmd();
    const args = buildArgs("-h");
    cmd.parse(args);

    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringMatching(/Usage: cmd \[options\] \[command\]/)
    );
  });


  it("Should print help when passed '--help'", () => {
    const cmd = buildCmd();
    const args = buildArgs("--help");
    cmd.parse(args);

    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringMatching(/Usage: cmd \[options\] \[command\]/)
    );
  });

  it("Should say 'Hello!' when passed '-g'", () => {
    const cmd = buildCmd();
    const args = buildArgs("-g");

    cmd.parse(args);

    expect(console.log).toHaveBeenCalledWith("Hello!");
  });

  it("Should print 'Hello!' when passed '--greet'", () => {
    const cmd = buildCmd();
    const args = buildArgs("--greet");

    cmd.parse(args);

    expect(console.log).toHaveBeenCalledWith("Hello!");
  });
});
