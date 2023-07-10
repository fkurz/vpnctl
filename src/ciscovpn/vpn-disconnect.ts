import { spawn } from "child_process";
import { stdout, stderr } from "process";

// TODO FK refactor into config and make configurable with default
const defaultCiscoAnyConnectBinaryPath = "/opt/cisco/secureclient/bin/vpn";

export interface CiscoVpnDisconnectConfiguration {
  host: string;
  binaryPath: string
}

export default ({ host, binaryPath }: CiscoVpnDisconnectConfiguration): void => {
  const commandOptions = ["-s", "disconnect", host];
  const childProcess = spawn(binaryPath, commandOptions);
  childProcess.stdout.pipe(stdout);
  childProcess.stderr.pipe(stderr);
};
