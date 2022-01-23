import { Command } from "commander";
import vpnConnect from "./vpn-connect";
import vpnDisconnect from "./vpn-disconnect";

const isExecutedAsScript = require.main === module;
if (isExecutedAsScript) {
  const command = new Command()
    .addCommand(vpnConnect)
    .addCommand(vpnDisconnect)
    .addHelpCommand()
    .showHelpAfterError();

  command.parse(process.argv);
}
