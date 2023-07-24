# vpnctl

## About

A small command line tool to automate VPN connections.
Currently supports CiscoVPN (Anyconnect) and OpenVPN.

## Get started

Run the following from the root of this project to build, package, and install the `vpnctl` tool on 
your machine

```bash
npm install
npm run build
npm run package
npm link .
```

> :information_source: The installation procedure is known to not work with newer Node versions. At 
> time of writing, the highest known version that works is Node v16.20.0. If you encounter problems 
> during installation, please try downgrading your Node version accordingly. 

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
  # Binary path (optional).
  # Newer versions of AnyConnect binary changed the location (e.g. "/opt/cisco/secureclient/bin/vpn" on macOS).
  # To keep backwards compatibility with older versions of AnyConnect, override the binary location here.
  binaryPath: /some/path

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

> :information_source: In case of an OpenVpn configuration entry, the \_directives*, _ca_, _cert_, and _key_ properties are used to construct a configuration file which is then piped to the openvpn binary via STDIN (using the `--config /dev/stdin` option). This way, all file parameters passed to openvpn can be conveniently stored in the vpnctl configuration file instead of having to keep track of multiple files.

## Troubleshooting

### Connect capability is unavailable. Another Cisco Secure Client application acquired it.

The following problem occurs, when the **Cisco Secure Client** application is running and you try to start a VPN session with `vpnctl`.

```shell
$ vpnctl connect endpoint-name
Reading VPN configuration from /Users/main/.config/vpn.config.yml...
Successfully read configuration!
Cisco Secure Client (version 5.0.02075) .

Copyright (c) 2004 - 2023 Cisco Systems, Inc.  All Rights Reserved.


  >> state: Unknown
  >> state: Disconnected
  >> state: Disconnected
  >> notice: Ready to connect.
  >> registered with local VPN subsystem.
  >> contacting host (vpn.someserver.com) for login information...
  >> state: Disconnected
  >> error: Connect capability is unavailable. Another Cisco Secure Client application acquired it. Terminating the other application and restarting this application may resolve this issue. Otherwise, contact your system administrator.
VPN>
```

**Solution**: Close the **Cisco Secure Client** application.