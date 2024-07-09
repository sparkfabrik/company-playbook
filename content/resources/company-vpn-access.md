# Company VPN Access Procedure

## Requesting VPN Access

To access the company VPN system, follow these steps:

1. **Join the #support Slack Channel**:
   - Open your Slack application.
   - Navigate to the internal channel named `#support`.
   - Post a request message indicating your need for VPN access.

2. **Receiving the Configuration File**:
   - The support team will respond to your request with an `.ovpn` configuration file. This file contains all the necessary settings to connect to the VPN.

## Choosing a VPN Client

The company VPN uses OpenVPN, which is compatible with various open-source VPN clients. Below are recommended clients for MacOS and Linux:

### MacOS
- **Tunnelblick**: A free, open-source VPN client designed for use with OpenVPN. Download it from [Tunnelblick's official website](https://tunnelblick.net/).

### Linux
- **Gnome Network Manager**: A popular network management tool that supports VPN connections. It is often pre-installed on many Linux distributions using the GNOME desktop environment.

## Configuring Your VPN Client

### MacOS

1. **Install Tunnelblick**:
   - Download and install Tunnelblick from the [official website](https://tunnelblick.net/).

2. **Import the .ovpn File**:
   - Open Tunnelblick.
   - Locate the import option and select the `.ovpn` file provided by the support team.

### Linux (Gnome Network Manager)

1. **Install OpenVPN Plugin for Network Manager**:
   - Open a terminal and run the following command to install the OpenVPN plugin:
   
     ```
     sudo apt-get install network-manager-openvpn-gnome
     ```

2. **Import the .ovpn File**:
   - Open the Gnome Network Settings.
   - Go to the VPN section and click the "+" button to add a new VPN.
   - Select "Import from file..." and choose the `.ovpn` file provided by the support team.

### Adjusting Cipher Settings

In case of connection issues, you might need to adjust the cipher settings in the `.ovpn` file. Ensure that the following cipher configuration is included:

```
cipher AES-128-CBC
ncp-ciphers AES-128-CBC
```

- Open the `.ovpn` file in a text editor.
- Verify or add the above lines to the file.
- Save the file and re-import it into your VPN client if necessary.

## Connecting to the VPN

1. **Launch the VPN Client**:
   - Open your installed VPN client application.

2. **Select the Configuration Profile**:
   - Choose the profile that corresponds to the imported `.ovpn` file.

3. **Connect**:
   - Click the connect button within your VPN client.
   - Wait for the client to establish a secure connection to the company network.

## VPN Server Location

The company VPN server is currently running on Google Cloud Platform (GCP) in the europe-west-3 region, which is located in the Netherlands.

## Troubleshooting

If you encounter any issues during the setup or connection process, please reach out to the #support channel on Slack for further assistance. The support team is available to help resolve any configuration or connection problems you may experience.

By following these steps, you will be able to securely access the company network via the VPN, ensuring your remote work capabilities are uninterrupted and secure.