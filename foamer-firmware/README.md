# foamer-firmware

## Installing the firmware over USB

Attach the device to a computer over USB. Hold down the "BOOTSEL" button on the green pico module and power cycle the device using the "SHUTDOWN" toggle button. When you see a new "flash drive" attach, you can release the BOOTSEL button.

[Grab a copy of the firmware from the latest successful github workflow build](https://nightly.link/Mstrodl/foamer-firmware/workflows/firmware/master/firmware.zip). Unzip it, and copy the `foamer-firmware-release.uf2` file to the "flash drive". You may need to eject the "flash drive" if it doesn't disconnect on its own.

The device should then restart into the new firmware version!

## Building for testing

Make sure you have `cargo-make` installed:

```bash
$ cargo install cargo-make
```

Build a debug archive:

```
$ cargo make archive
# Or, for optimized release builds: `cargo make -p release archive`
```

If all goes well, artifacts will be placed in `dist/`.

Then, the `foamer-firmware-debug.uf2` file can be installed on the device!

## Getting logs over USB

Builds compiled with the `usb-logging` feature (anything built with `cargo make`
or the github workflows have it enabled) will make `defmt` formatted logs available over serial.

`defmt` logs are not plain text and need to be decoded using information contained in the ELF file.
To view them, we need `defmt-print`.

First, make sure you have `defmt-print` installed:
```
$ cargo install defmt-print
```

Then, you can attach defmt-print to the serial port exposed by the device:

```
$ defmt-print -e foamer-firmware-release.elf serial --path /dev/ttyACM0
```

You might need to replace `/dev/ttyACM0` with the path to the serial port on your system.

## Running with a debugger

When using an SWD debugger like a [debugprobe](https://github.com/raspberrypi/debugprobe), it should be as simple as:

```bash
$ cargo run
```

That will compile, flash, and attach to RTT to decode and print defmt-formatted log messages.
