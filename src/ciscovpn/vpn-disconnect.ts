import { spawn } from "child_process";
import { stdout, stderr } from "process";

const ciscoAnyConnectBinaryPath = "/opt/cisco/anyconnect/bin/vpn";

export interface CiscoVpnDisconnectConfiguration {
  host: string;
}

export default ({ host }: CiscoVpnDisconnectConfiguration): void => {
  const commandOptions = ["-s", "disconnect", host];
  const childProcess = spawn(ciscoAnyConnectBinaryPath, commandOptions);
  childProcess.stdout.pipe(stdout);
  childProcess.stderr.pipe(stderr);
};
