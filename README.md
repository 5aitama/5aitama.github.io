# Portfolio

My personal portfolio and CV website showcasing my professional experience and technical skills. Built with modern web technologies to demonstrate my embedded systems expertise, graphics programming capabilities, and web development skills.

## About

I'm an embedded systems developer with strong expertise in Rust and low-level programming. This portfolio highlights my work in embedded systems development, graphics programming with wgpu, and web development.

## Tech Stack

- **Framework**: Svelte
- **Languages**: TypeScript, HTML, CSS
- **Dev Environment**: Nix flakes for reproducible development setup

## Getting Started

### Prerequisites

This project requires Nix with flakes enabled. Make sure you have Nix installed on your system.

### Step 1: Set up the Development Environment

Clone the repository :
```bash
git clone git@github.com:5aitama/5aitama.github.io.git
```

Before running any project commands, you need to activate the Nix development environment. There are two ways to do this:

#### Option A: Using direnv (Recommended)

direnv automatically loads the development environment when you enter the project directory.

1. Install and configure direnv (see the [direnv setup guide](#setting-up-direnv) below)
2. Navigate to the project directory:
```bash
   cd portfolio
```
3. Allow direnv for this project (first time only):
```bash
   direnv allow
```

The environment will now load automatically whenever you enter the project folder.

#### Option B: Manual activation

Manually enter the development shell each time:
```bash
nix develop
```

### Step 2: Install Dependencies

Once the development environment is active, install the project dependencies:
```bash
pnpm i
```

This command installs all the project dependencies defined in `package.json`. pnpm (performant npm) is a fast, disk-efficient package manager that creates a non-flat `node_modules` structure.

### Step 3: Start Development

Run the development server:
```bash
pnpm run dev
```

This starts the local development server with hot module replacement (HMR). Your changes will be reflected in the browser automatically. The server typically runs on `http://localhost:5173` (or another port if 5173 is occupied).

### Additional Commands

**Build for production**:
```bash
pnpm run build
```
Creates an optimized production build of your portfolio.

**Preview production build**:
```bash
pnpm run preview
```
Serves the production build locally for testing.

---

## Setting up direnv

direnv is a tool that automatically loads and unloads environment variables when you enter or leave a directory. It works seamlessly with Nix flakes to activate development environments automatically.

### Installation

#### macOS

**Using Homebrew** (recommended):
```bash
brew install direnv
```

**Using Nix**:
```bash
nix profile install nixpkgs#direnv
```

#### Linux

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install direnv
```

**Fedora**:
```bash
sudo dnf install direnv
```

**Arch Linux**:
```bash
sudo pacman -S direnv
```

**Using Nix** (works on any Linux distro):
```bash
nix profile install nixpkgs#direnv
```

### Shell Configuration

After installation, you need to hook direnv into your shell. Add the appropriate line to your shell's configuration file:

#### Bash

Add to `~/.bashrc`:
```bash
eval "$(direnv hook bash)"
```

Then reload:
```bash
source ~/.bashrc
```

#### Zsh

Add to `~/.zshrc`:
```bash
eval "$(direnv hook zsh)"
```

Then reload:
```bash
source ~/.zshrc
```

#### Fish

Add to `~/.config/fish/config.fish`:
```fish
direnv hook fish | source
```

Then reload:
```fish
source ~/.config/fish/config.fish
```

### Setup for Nix Flakes

#### Step 1: Create `.envrc` file

In your project directory, create a `.envrc` file:
```bash
echo "use flake" > .envrc
```

For Nix flakes with specific outputs, you can specify:
```bash
echo "use flake .#devShell" > .envrc
```

#### Step 2: Allow direnv

The first time you enter a directory with a `.envrc` file, direnv will block it for security. You need to allow it:
```bash
direnv allow
```

#### Step 3: Verify

When you `cd` into the directory, you should see direnv loading the environment:
```
direnv: loading ~/project/.envrc
direnv: using flake
...
direnv: export +AR +AS +CC ...
```

### Usage

Once set up:

- **Enter directory**: Environment loads automatically
- **Leave directory**: Environment unloads automatically
- **Modify `.envrc`**: Run `direnv allow` again
- **Modify `flake.nix`**: direnv detects changes and reloads automatically
