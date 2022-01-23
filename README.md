# vpn

## About

A small command line tool to automate VPN connections.
Currently supports CiscoVPN (Anyconnect) and OpenVPN.

## Get started

Run the following from the root of this project to build, package, and install the tool on your machine

```bash
npm install
npm build
npm package
npm link .
```

Verify that you properly installed the vpn tool.

```bash
$ vpn
Usage: main [options] [command]

Options:
  -h, --help         display help for command

Commands:
  connect <name>
  disconnect <name>
  help [command]     display help for command
```
