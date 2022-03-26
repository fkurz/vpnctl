# vpnctl

## About

A small command line tool to automate VPN connections.
Currently supports CiscoVPN (Anyconnect) and OpenVPN.

## Get started

Run the following from the root of this project to build, package, and install the tool on your machine

```bash
npm install
npm run build
npm run package
npm link .
```

Verify that you properly installed the vpn tool.

```bash
$ vpnctl
Usage: main [options] [command]

Options:
  -h, --help         display help for command

Commands:
  connect <name>
  disconnect <name>
  help [command]     display help for command
```

## Configuration

When we run `vpnctl connect endpoint-name` the second parameter _endpoint-name_ is a key that identifies an endpoint configuration entry in the configuration file. The endpoint configuration file is expected to be in YAML format and should be located at ~/.config/vpn.config.yml.

Below is an example configuration file with an entry for an AnyConnect endpoint and an OpenVPN endpoint with comments.

```yaml
anyconnect-endpoint:
  # Tells vpnctl to use AnyConnect
  provider: ciscovpn
  # The host name of the AnyConnect VPN endpoint
  host: vpn.someserver.com
  # User name to authenticate with
  username: user-name
  # Password to authenticate the given user with
  password: password
openvpn-endpoint:
  # Tells vpnctl to use OpenVPN
  provider: openvpn
  # List containing all inline parameters to be passed to the OpenVpn binary (e.g. --tls-client)
  # In an .ovpn file, these are the directives which only span one line.
  directives:
    - tls-client
    - client
    - nobind
    # ...
  # The --ca file option (certificate authority file in .pem format) as a multiline string.
  ca: |-
    -----BEGIN CERTIFICATE-----
    # ...
    -----END CERTIFICATE-----
  # The --cert file option (local certificate in .pem format) as a multiline string.
  cert: |-
    -----BEGIN CERTIFICATE-----
    #...
    -----END CERTIFICATE-----
  # The --key file option (local private key in .pem format) as a multiline string.
  key: |-
    -----BEGIN PRIVATE KEY-----
    # ...
    -----END PRIVATE KEY-----
```

> :information*source: In case of an OpenVpn configuration entry, the \_directives*, _ca_, _cert_, and _key_ properties are used to construct a configuration file which is then piped to the openvpn binary via STDIN (using the `--config /dev/stdin` option). This way, all file parameters passed to openvpn can be conveniently stored in the vpnctl configuration file instead of having to keep track of multiple files.
