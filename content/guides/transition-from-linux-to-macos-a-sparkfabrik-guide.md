## Table of Contents

- [Introduction](#introduction)
- [Understanding macOS: More Unix Than You Might Think](#understanding-macos-more-unix-than-you-might-think)
- [Why macOS?](#why-macos)
  - [Technical Benefits](#technical-benefits)
- [Essential Tools for Linux Users](#essential-tools-for-linux-users)
  - [Shell and Terminal Environment](#shell-and-terminal-environment)
  - [Cloud and Container Tools](#cloud-and-container-tools)
  - [System Utilities](#system-utilities)
  - [GUI Applications](#gui-applications)
- [Keyboard Configuration](#keyboard-configuration)
- [Optimizing Your macOS Experience](#optimizing-your-macos-experience)
  - [Dock Configuration](#dock-configuration)
  - [System Management](#system-management)
  - [Tiling Window Management](#tiling-window-management)
- [Best Practices](#best-practices)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Conclusion](#conclusion)

## Introduction

At SparkFabrik, we've historically embraced both Linux and macOS environments. Recently, we've made the strategic decision to standardize our development environment on macOS across the organization. This guide aims to ease the transition for Linux users and address common concerns while highlighting the practical benefits of this change.

## Understanding macOS: More Unix Than You Might Think

For developers coming from Linux, it's important to understand that macOS is built on Darwin, a Unix-based system. This means that many of the workflows you're familiar with remain largely unchanged:

- Terminal-based operations work similarly, with zsh as the default shell
- Your existing dotfiles can be easily ported over
- Common Unix commands and tools work as expected
- The GUI environment shares many similarities with popular Linux DEs like GNOME or KDE

## Why macOS?

### Technical Benefits

1. **Apple Silicon Advantages**
   - Exceptional performance and energy efficiency
   - Native ARM64 support for development tools
   - Excellent virtualization capabilities
   - Seamless integration between hardware and software

2. **Development Environment Consistency**
   - Standardized hardware and software stack
   - Predictable behavior across devices
   - Reduced configuration drift between team members

3. **Remote Management and Compliance**
   - Centralized device management capabilities
   - Enhanced security features
   - Streamlined compliance implementation
   - Better support for corporate policies

## Essential Tools for Linux Users

### Container Development

Currently, we use Docker Desktop for container development. However, we plan to migrate to Lima (an open-source solution) during 2025. This decision is based on several factors:

- Performance improvements in filesystem operations
- Better resource management
- Open-source nature aligning with our values
- Cost effectiveness

For more details about the rationale behind this migration, see [Docker Performance on macOS in 2025](https://www.paolomainardi.com/posts/docker-performance-macos-2025).

## Essential Tools for Linux Users

Our development environment comes pre-configured with many familiar tools through our [sparkdock](https://github.com/sparkfabrik/sparkdock) provisioner. Here's a comprehensive overview of the key tools and utilities:

### Shell and Terminal Environment

1. **Core Shell Tools**
   - **zsh**: macOS's default shell, offering advanced features like improved tab completion and theming
   - **yadm**: Dotfiles management system, perfect for maintaining consistent configurations across machines
   - **fzf**: Fuzzy finder for command history, files, and more
   - **navi**: Interactive cheatsheet tool for command-line
   - **thefuck**: Magnificent app that corrects your previous console command

2. **Terminal Multiplexing and Collaboration**
   - **tmux**: Terminal multiplexer for managing multiple terminal sessions
   - **tmate**: Instant terminal sharing for pair programming
   - **watch**: Execute a program periodically, showing output fullscreen

### Cloud and Container Tools

1. **Kubernetes Ecosystem**
   - **kubernetes-cli**: The essential kubectl command
   - **k9s**: Terminal UI to manage Kubernetes clusters
   - **kind**: Run local Kubernetes clusters in Docker
   - **kubectx**: Switch between clusters and namespaces
   - **skaffold**: Easy and repeatable Kubernetes development
   - **stern**: Multi pod and container log tailing

2. **Cloud Provider Tools**
   - **awscli**: Amazon Web Services CLI
   - **google-cloud-sdk**: Complete Google Cloud toolkit
   - **docker-credential-helper-ecr**: AWS container registry authentication

### System Utilities

1. **Terminal Enhancement**
   - **jq**: Command-line JSON processor
   - **jless**: Command-line JSON viewer
   - **fastfetch**: System information tool (modern Neofetch alternative)
   - **mactop**: macOS-specific system monitoring

2. **Security and Encryption**
   - **gpg** and **gpg2**: GNU Privacy Guard
   - **pinentry-mac**: Secure passphrase entry dialog

### GUI Applications

Pre-configured applications that enhance the development experience:

1. **Development Environment**
   - **iTerm2**: Advanced terminal emulator
   - **Ghostty**: Modern, GPU-accelerated terminal alternative
     - Faster rendering with GPU acceleration
     - Lower latency compared to iTerm2
     - Wayland native on Linux
     - Simple configuration in TOML format
   - **Visual Studio Code**: Feature-rich code editor
   - **Docker Desktop**: Container management (future migration to Lima planned)

2. **Productivity Tools**
   - **Maccy**: Clipboard manager
   - **MonitorControl**: External display brightness control
   - **CameraController**: Advanced webcam settings

3. **Communication**
   - **Slack**: Team communication
   - **Zoom**: Video conferencing

### Keyboard Configuration

SparkDock includes custom keyboard configurations to improve the development experience, especially for users coming from Linux:

1. **International Layout with AltGr Dead Keys**
   - Based on US keyboard layout
   - Supports additional characters through AltGr (Option) key
   - Includes common programming symbols and international characters
   - Compatible with coding practices and terminal usage
   - Installed automatically in `~/Library/Keyboard Layouts`

2. **Enhanced Navigation Keys**
   The following configurations are automatically installed in `~/Library/KeyBindings/DefaultKeyBinding.dict`:
   ```json
   {
     "\UF729"  = moveToBeginningOfParagraph:;         // home
     "\UF72B"  = moveToEndOfParagraph:;               // end
     "$\UF729" = moveToBeginningOfParagraphAndModifySelection:; // shift-home
     "$\UF72B" = moveToEndOfParagraphAndModifySelection:;       // shift-end
     "^\UF729" = moveToBeginningOfDocument:;          // ctrl-home
     "^\UF72B" = moveToEndOfDocument:;                // ctrl-end
     "^$\UF729" = moveToBeginningOfDocumentAndModifySelection:; // ctrl-shift-home
     "^$\UF72B" = moveToEndOfDocumentAndModifySelection:;       // ctrl-shift-end
   }
   ```
   These bindings provide:
   - Familiar Home/End behavior across the system
   - Consistent text navigation with modifier keys
   - Better compatibility with Linux keyboard habits

### Custom Tools and Scripts

SparkDock also provides several custom utilities:

1. **Proxy Management**
   - `run-dinghy-proxy`: Start the development HTTP proxy
   - `test-dinghy-proxy`: Test proxy connectivity

2. **System Management**
   - `ayse-get-sm`: Serial number retrieval tool

The tools are carefully selected to provide a complete development environment while maintaining familiarity for Linux users. Each tool can be updated via Homebrew, ensuring you always have access to the latest features and security updates.

## Optimizing Your macOS Experience

### Dock Configuration
1. **Position**: Consider moving to the left/right for more vertical space
2. **Auto-hide**: Enable to maximize screen real estate
3. **Size**: Adjust for optimal usability
4. **Minimize dock clutter**: Remove unused applications

### System Management

1. **Caffeinate**: Prevent sleep mode when needed:

   ```bash
   caffeinate -d  # Prevent display sleep
   caffeinate -i  # Prevent system idle sleep
   ```

2. **Package Management with Homebrew**

   Homebrew is the equivalent of apt/apt-get on macOS. Here are the main differences and similarities:

   ```bash
   # apt update                    -> brew update
   # apt upgrade                   -> brew upgrade
   # apt install <package>         > brew install <package>
   # apt remove <package>          -> brew uninstall <package>
   # apt autoremove                -> brew autoremove
   # apt search <term>             -> brew search <term>
   # dpkg -L <package>             -> brew list <package>
   # apt show <package>            -> brew info <package>
   ```

   Key features of Homebrew:

   - Installation in userspace (`/opt/homebrew` on Apple Silicon, `/usr/local` on Intel)
   - Does not require `sudo` for standard operations
   - Manages both CLI tools and GUI applications (via Cask)
   - Support for taps (additional repositories) similar to PPAs
   - Formulas (packages) written in Ruby
   - Bottling system (pre-compiled packages) for faster installations

   Practical examples:

   ```bash
   # System update
   brew update             # Updates package list (like apt update)
   brew upgrade            # Upgrades all packages (like apt upgrade)
   brew upgrade <package>  # Upgrades a specific package

   # Package management
   brew search php         # Searches for packages with "php" in the name
   brew info php@8.2       # Shows information about the package
   brew install php@8.2    # Installs a specific version
   brew uninstall php@8.2  # Removes the package

   # GUI applications with Cask
   brew search --cask chrome    # Searches only among GUI applications
   brew install --cask chrome   # Installs Google Chrome
   brew upgrade --cask          # Upgrades all GUI applications

   # Additional repositories (taps)
   brew tap homebrew/cask-fonts                    # Adds repository for fonts
   brew install --cask font-fira-code-nerd-font    # Installs a font

   # Diagnostics
   brew doctor              # Checks for configuration issues
   brew cleanup             # Removes old versions (like apt clean)
   ```

   Where to find packages:

      1. **Official search**: [formulae.brew.sh](https://formulae.brew.sh)
      2. **GitHub**: [github.com/Homebrew/homebrew-core](https://github.com/Homebrew/homebrew-core) for CLI
      3. **Cask**: [github.com/Homebrew/homebrew-cask](https://github.com/Homebrew/homebrew-cask) for GUI
      4. **API**: `curl -s "https://formulae.brew.sh/api/formula.json"`

   Best practices:

      - Use `brew bundle dump` to create a Brewfile (similar to requirements.txt)
      - Always prefer the Homebrew version of packages over manual installers
      - Use `brew leaves` to see manually installed packages
      - Check `brew deps --tree <package>` to see dependencies

### Tiling Window Management

While not included in sparkdock, these options might interest users coming from tiling window managers:

1. **Amethyst**
   - Open-source
   - Similar to xmonad
   - Highly customizable
   - Install: `brew install --cask amethyst`

2. **Rectangle**
   - Simple but effective
   - Keyboard-driven window management
   - Install: `brew install --cask rectangle`

3. **yabai**
   - Advanced tiling window manager
   - Requires SIP configuration
   - Highly customizable
   - Install: `brew install koekeishiya/formulae/yabai`

4. **AeroSpace**
   - i3-inspired tiling window manager
   - Tree-based window management
   - Fast workspace switching without animations
   - No SIP disable requirement
   - Custom workspace implementation (independent from macOS Spaces)
   - Plain text configuration (dotfiles friendly)
   - Excellent multi-monitor support (i3-like paradigm)
   - CLI-first approach with manpages and shell completion
   - Install: `brew install nikitabobko/tap/aerospace`

## Best Practices

1. **Keep Your System Updated**
   - Regular system updates improve security and performance
   - Use Homebrew's update mechanism for development tools

2. **Backup Strategy**
   - Time Machine for system backups
   - Use git for code and configuration management
   - Store dotfiles with yadm

3. **Performance Optimization**
   - Monitor system resources with Activity Monitor
   - Use mactop (included in sparkdock) for terminal-based monitoring
   - Clean up unused applications and large files regularly

## Common Issues and Solutions

1. **File System Differences**
   - macOS is case-insensitive by default (but can be case-sensitive)
   - Different line endings (use git config core.autocrlf)
   - Hidden files start with a dot (.)

2. **Keyboard Shortcuts**
   - Command (⌘) replaces Control for many operations
   - Option (⌥) provides additional character inputs
   - Custom keyboard layouts available through sparkdock

## Conclusion

The transition to macOS represents a strategic choice that balances development efficiency, system management, and compliance requirements. While change can be challenging, macOS provides a robust Unix-based environment that should feel familiar to Linux users while offering additional benefits for both individual developers and the organization as a whole.

For additional support or questions, please refer to our internal documentation or reach out on `#tech-support`.
