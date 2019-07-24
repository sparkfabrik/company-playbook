/*
Title: Setup OpenVPN with Ubuntu NetworkManager
*/

Setting up OpenVPN on NetworkManager on Ubuntu can be a PITA, but not if you follow these steps!

## Prerequisite

* Ubuntu 18.04+ or 16.04 (preferrably with Gnome Desktop Manager)
* OpenVPN 2.4+

Ubuntu 16.04 ships OpenVPN 2.3+, it's quite easy to upgrade it:

```bash
curl -s https://swupdate.openvpn.net/repos/repo-public.gpg | apt-key add
echo "deb http://build.openvpn.net/debian/openvpn/stable xenial main" > /etc/apt/sources.list.d/openvpn-aptrepo.list
apt update
apt install -y openvpn
```

## Step-by-step

First of all install the NetworkManager OpenVPN extension.

```bash
sudo apt install network-manager-openvpn-gnome
```

Then create a new network using NetworkManager's settings.

On the type of network selection screen, select `VPN`.

![NM Select network](%image_url%/procedures/nm-select.png)

Then `Import from file...`.

![NM Select ovpn](%image_url%/procedures/nm-openvpn-select.png)

And select the file that `support@sparkfabrik.com` sent you. The file name should be similar to:

`firewall-UDP4-1194-edoardo.dusi-config.ovpn`

> **IMPORTANT FINAL PART**

When you review the settings that NM imported, enter the username and password given to you by `support` and then check the option `Store the password for all users` on the password's options.

![NM All Users](%image_url%/procedures/nm-allusers.png)

## There you go

![NM Connected](%image_url%/procedures/nm-vpn-connected.png)
