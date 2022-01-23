import { spawn } from "child_process";
import { stdout, stderr } from "process";
import { EOL } from "os";

export interface OpenVpnConnectConfiguration {
  directives: string[];
  ca: string;
  cert: string;
  key: string;
}

export default ({
  directives,
  ca,
  cert,
  key,
}: OpenVpnConnectConfiguration): void => {
  // Fake reading configuration from input by providing /dev/stdin as configuration file
  const commandOptions = ["--config", "/dev/stdin"];
  const config = `${directives.join("\n")}
<ca>
${ca}
</ca>
<cert>
${cert}
</cert>
<key>
${key}
</key>
${EOL}`;

  const openVpnProcess = spawn("openvpn", commandOptions);
  openVpnProcess.stdin.write(config);
  openVpnProcess.stdin.end();
  openVpnProcess.stdout.pipe(stdout);
  openVpnProcess.stderr.pipe(stderr);
};
