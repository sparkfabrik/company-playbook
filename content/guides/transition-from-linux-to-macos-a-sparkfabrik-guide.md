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
- [SparkDock Task Management with sjust](#sparkdock-task-management-with-sjust)
- [Application Shortcuts with skhd](#application-shortcuts-with-skhd)
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

### Custom Tools and Scripts

SparkDock also provides several custom utilities:

1. **Proxy Management**
   - `run-dinghy-proxy`: Start the development HTTP proxy
   - `test-dinghy-proxy`: Test proxy connectivity

2. **System Management**
   - `ayse-get-sm`: Serial number retrieval tool

The tools are carefully selected to provide a complete development environment while maintaining familiarity for Linux users. Each tool can be updated via Homebrew, ensuring you always have access to the latest features and security updates.

## SparkDock Task Management with sjust

SparkDock now includes **sjust**, a powerful task runner wrapper around the [`just`](https://github.com/casey/just) command runner that provides a consistent framework for managing development tasks across projects.

### What is sjust?

`sjust` integrates with SparkDock to provide pre-configured recipes (tasks) that streamline common development workflows. These recipes are defined in a simple, readable format and can be executed from any project directory.

### Key Features

- **Cross-platform compatibility**: Works consistently across macOS, Linux, and Windows
- **Simple syntax**: Uses a straightforward DSL for defining tasks
- **Live reload**: Configuration can be updated without restarting
- **Language agnostic**: Tasks can be written in any scripting language (bash, Python, Node.js, etc.)
- **Directory independence**: Can be invoked from any subdirectory within a project

### Available Commands

The sjust tool comes with a comprehensive set of default recipes for common development tasks. You can view all available commands by running:

```bash
sjust --list
```

The default recipes include the following organized task groups:

**System Management (`[group('system')]`)**
- `device-info`: Display system information with SparkFabrik ASCII art and hardware details
- `clear-dns-cache`: Clear DNS cache on macOS (requires sudo)
- `upgrade-system`: Update all system packages via Homebrew
- `system-cleanup`: Interactive system cleanup to free up disk space (Homebrew + Docker cleanup)

**Docker Operations (`[group('docker')]`)**
- `start-http-proxy`: Start the dinghy-http-proxy container for .loc domain development
- `docker-ps`: List running Docker containers with formatted output
- `docker-prune`: Clean up unused Docker resources to free disk space
- `docker-restart`: Restart Docker Desktop application

**Maintenance (`[group('maintenance')]`)**
- `upgrade-sparkdock`: Update SparkDock to the latest version from the repository

### Task Examples

Here are some common usage examples:

```bash
# Display system information with SparkFabrik branding
sjust device-info

# Start the local development proxy for .loc domains
sjust start-http-proxy

# Clean up system and free disk space (interactive)
sjust system-cleanup

# Quick Docker cleanup
sjust docker-prune

# Update SparkDock installation
sjust upgrade-sparkdock

# Restart Docker when having connection issues
sjust docker-restart
```

### Usage Examples

```bash
# List all available recipes
sjust --list

# Run a specific task
sjust <task-name>

# Get help for a specific task
sjust --show <task-name>

# Run tasks with arguments
sjust <task-name> <arguments>
```

### Integration with SparkDock

sjust is automatically configured during the SparkDock provisioning process and integrates seamlessly with other development tools in the stack. The recipes are designed to work with:

- **Docker and container workflows**: Streamlined commands for managing Docker containers, networks, and the local development proxy
- **Local development proxy**: Direct integration with dinghy-http-proxy for .loc domain management (`start-http-proxy`)
- **System maintenance**: Automated cleanup and update procedures for both Homebrew packages and Docker resources
- **SparkDock ecosystem**: Self-updating capabilities to keep the development environment current

**Key Integration Features:**

1. **Unified Development Proxy**: The `start-http-proxy` task sets up the dinghy-http-proxy container that enables accessing local projects via `.loc` domains (e.g., `myproject.sparkfabrik.loc`)

2. **System Health**: Tasks like `system-cleanup` and `docker-prune` help maintain optimal system performance by cleaning up unused resources

3. **Version Management**: The `upgrade-sparkdock` task ensures your development environment stays current with the latest improvements

4. **Docker Integration**: Specialized commands for Docker operations that work seamlessly with SparkFabrik's container-based development workflow

**Common Workflow Examples:**
```bash
# Daily development startup
sjust start-http-proxy      # Start local development proxy
sjust docker-ps             # Check running containers

# System maintenance routine
sjust upgrade-system         # Update Homebrew packages
sjust upgrade-sparkdock      # Update SparkDock itself
sjust system-cleanup         # Clean up unused resources

# Troubleshooting
sjust clear-dns-cache       # Fix DNS resolution issues
sjust docker-restart        # Restart Docker when having issues
```

For detailed information about each task, you can explore specific commands with:
```bash
sjust --show <task-name>
```

The recipes are designed to be consistent across the SparkFabrik development ecosystem while being customizable for project-specific needs.

## Application Shortcuts with skhd

SparkDock includes **skhd** (Simple Hotkey Daemon), a lightweight and responsive hotkey daemon for macOS that allows you to create custom keyboard shortcuts for launching applications and executing system commands.

### What is skhd?

skhd addresses one of the most common frustrations when transitioning from Linux to macOS: the lack of simple, customizable keyboard shortcuts for launching applications. While macOS provides some built-in shortcuts, they're limited and don't offer the flexibility that Linux tiling window managers provide.

### Key Features

- **Lightweight and fast**: Focuses on responsiveness and performance
- **Simple configuration**: Uses a straightforward text-based DSL
- **Live reload**: Configuration changes are applied immediately without restart
- **Flexible key combinations**: Supports complex modifier combinations including the Super (Cmd) key

### Default Configuration

SparkDock pre-configures skhd with commonly used shortcuts that will feel familiar to Linux users:

```bash
# Open iTerm2 (equivalent to Super+Enter in many Linux WMs)
cmd - return : osascript -e 'tell application "iTerm2" to create window with default profile command ""' || open -na iTerm

# Open new Chrome instance (equivalent to Super+Shift+Enter)
cmd + shift - return : open -n -a "Google Chrome"
```

### Customization

You can customize skhd by editing the configuration file located at:
- `~/.config/skhd/skhdrc` (preferred)
- `~/.skhdrc` (alternative)

### Usage Benefits

skhd brings several workflow improvements:

1. **Consistent shortcuts across systems**: Use the same keyboard shortcuts on both Linux and macOS
2. **Fast application launching**: Quickly spawn new terminal windows or application instances
3. **Improved productivity**: Reduce reliance on dock/spotlight for common actions
4. **Familiar workflow**: Maintain muscle memory from Linux tiling window managers

### Starting skhd

skhd is automatically configured to start at login through SparkDock. You can also manually control it:

```bash
# Start skhd service
brew services start skhd

# Stop skhd service
brew services stop skhd

# Restart skhd service (useful after config changes)
brew services restart skhd
```

For more detailed information about configuring and using skhd, including advanced scenarios and troubleshooting, see Paolo Mainardi's comprehensive guide: [How to open apps with keyboard shortcuts on macOS with skhd](https://www.paolomainardi.com/posts/macos-apps-shortcuts-skhd/).

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

With the addition of powerful tools like sjust for task management and skhd for keyboard shortcuts, the development experience on macOS becomes even more streamlined and familiar to users coming from Linux environments.

For additional support or questions, please refer to our internal documentation or reach out on `#tech-support`.
