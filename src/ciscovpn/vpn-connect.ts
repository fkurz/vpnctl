import { spawn } from "child_process";
import { stdout, stderr, on, exit } from "process";
import vpnDisconnect from "./vpn-disconnect";

export interface CiscoVpnConnectConfiguration {
  host: string;
  username: string;
  password: string;
}

const ciscoAnyConnectBinaryPath = "/opt/cisco/anyconnect/bin/vpn";

export default ({
  host,
  username,
  password,
}: CiscoVpnConnectConfiguration): void => {
  const commandOptions = ["-s", "connect", host];
  // A trailing line break seems to be necessary so that the Cisco AnyConnect binary will
  // recognize the password input.
  // The variable is called "responseFile" as per the naming in the Cisco AnyConnect client.
  const responseFile = `${username}\n${password}\n`;
  const ciscoAnyconnectConnectProcess = spawn(
    ciscoAnyConnectBinaryPath,
    commandOptions
  );
  ciscoAnyconnectConnectProcess.stdin.write(responseFile);
  ciscoAnyconnectConnectProcess.stdout.pipe(stdout);
  ciscoAnyconnectConnectProcess.stderr.pipe(stderr);

  // Disconnect when receiving the SIGINT signal (CTRL + C)
  on("SIGINT", () => {
    vpnDisconnect({ host });
    exit(0);
  });

  // Keep this process running until explicitely terminated
  setInterval(() => {
    stdout.write("VPN connection is up.\r");
  }, 1 << 30);
};
