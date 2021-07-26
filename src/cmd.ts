import { Command } from "commander";
import buildSayCmd from "./say";

const HELLO = "Hello!";

export default (): Command => {
  const command = new Command()
    .option("-g, --greet", `Say ${HELLO}`, false)
    .addCommand(buildSayCmd())
    .addHelpCommand()
    .showHelpAfterError();

  command.action((options) => {
    if (options.greet) {
      console.log(HELLO);
      return
    }

    command.help();
  });

  return command;
};
