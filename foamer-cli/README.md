# foamer-cli

Basic little CLI tool for managing configs.

You probably want to use [the configurator](https://foamer.mstrodl.com), which is far more user-friendly!

## Installing the CLI

You can install the CLI directly from git if you just want to use the latest version:
```bash
$ cargo install --locked foamer-cli --git https://github.com/Mstrodl/foamer-firmware
```

Then, you can just run `foamer-cli` assuming `~/.cargo/bin/` is in your `PATH`!

## Running the CLI for development

If you want to make changes to the config format or CLI, you can clone the repository and run it from the cli directory:

```bash
$ cargo run
```

## Usage

Using the CLI should be pretty straight-forward, and hopefully the actions and option names are fairly self-explanatory.

If you get stuck, you can refer to the help:

```bash
$ foamer-cli help
$ foamer-cli help usb
```

The basics of working with devices:

```bash
# View the name and serial number of the attached device
$ foamer-cli usb info

# Save config stored on device to file
$ foamer-cli usb dump config_output.json

# ...Modify config file as necessary...

# Write the updated config file to the device:
$ foamer-cli usb program my_new_config.json
```

If you just want to validate your config matches the schema, you can run:

```bash
# Verify config file format without writing to device
$ foamer-cli verify-config questionable_config.json
```

...to verify the config file is valid!

If you want to start from scratch, you can always get a copy of the default config:

```bash
# Create new config file from defaults
$ foamer-cli create-config default_config.json
```
