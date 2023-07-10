import { Command } from "commander";
import yaml from "yaml";
import { homedir } from "os";
import { readFileSync } from "fs";
import vpnConnectCisco, {
  CiscoVpnConnectConfiguration,
} from "./ciscovpn/vpn-connect";
import vpnConnectOpenVpn from "./openvpn/vpn-connect";

const home = homedir();
const CONFIG_FILE_PATH = `${home}/.config/vpn.config.yml`;

enum VpnProvider {
  OPEN_VPN = "openvpn",
  CISCO_VPN = "ciscovpn",
}

export default new Command("connect")
  .alias("c")
  .argument("name")
  .action((name: string) => {
    console.info(`Reading VPN configuration from ${CONFIG_FILE_PATH}...`);

    const file = readFileSync(CONFIG_FILE_PATH, "utf8");
    const config = yaml.parse(file);

    console.info("Successfully read configuration!");

    const configurationByName = config[name];
    if (!configurationByName) {
      throw new Error(`Missing configuration "${name}".`);
    }

    const provider = configurationByName.provider;
    if (!provider) {
      throw new Error(
        `Invalid configuration: missing required property "provider"`
      );
    }

    switch (provider) {
      case VpnProvider.CISCO_VPN: {

        const ciscoVpnConfiguration: CiscoVpnConnectConfiguration = {
          host: configurationByName.host,
          username: configurationByName.username,
          password: configurationByName.password,
          binaryPath: configurationByName.binaryPath
        };
        vpnConnectCisco(ciscoVpnConfiguration);
        return;
      }
      case VpnProvider.OPEN_VPN:
        vpnConnectOpenVpn(configurationByName);
        return;
      default:
        throw new Error(
          `Invalid configuration property: provider must be in {${Object.values(
            VpnProvider
          )}}.`
        );
    }
  });
