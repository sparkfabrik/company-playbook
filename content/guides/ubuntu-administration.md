This guide contains examples and tips&tricks to solve common and advanced tasks
on Linux and more specifically on our provisioned Ubuntu stack.

## Firmware updates

> This piece assumes you are running Ubuntu >= 20.04

Once upon a time, it was quite impossible to upgrade the firmware on Linux, now the situation
gets a lot better thanks to the great (Linux Vendor Firmware Service - LVFS)[https://fwupd.org/] project,
which allows hardware vendors to upload firmware updates, freeing the users to use Windows just to
upgrade their firmware. We mainly use Lenovo machines and guess what, they are fully supported.

### Pre-requisites

To succeed with the upgrades, we need to check 2 things on the BIOS/UEFI configurations:

1. Ensure to have the `Secure boot` disabled.
2. Ensure to have the `Boot lock` disabled (under `Startup` bios section)
3. *[OPTIONAL]* *: Ensure to have `Linux-Firmware-Updater` ad the first item on the `Boot priority order` on the UEFI conf.

### Graphical front-ends

GNOME Software will check for updates periodically and automatically download firmware in the background on GNOME. After the firmware has been downloaded a popup will be displayed in Gnome Software to perform the update.

![Firmware update](%image_url%/guides/firmware-update.png)

### Usage

To display all devices detected by `fwupd`:

`$ fwupdmgr get-devices`

> Note: Listed devices may not be updatable through fwupd (e.g. Intel integrated graphics). Alternative vendor solutions may be provided instead.

To download the latest metadata from the Linux Vendor Firmware Service (LVFS):

`$ fwupdmgr refresh`

To list updates available for any devices on the system:

`$ fwupdmgr get-updates`

To install updates:

`$ fwupdmgr update`

For more detailed info check this guide: https://wiki.archlinux.org/index.php/Fwupd




