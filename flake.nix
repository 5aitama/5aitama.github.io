{
	inputs = {
		nixpkgs.url     = "github:NixOS/nixpkgs/nixpkgs-unstable";
		flake-parts.url = "github:hercules-ci/flake-parts";
		git-z.url       = "github:ejpcmac/git-z?ref=v0.2.4";
	};

	outputs = { flake-parts, ... }@inputs:
	flake-parts.lib.mkFlake { inherit inputs; } {
		systems = [
			"aarch64-darwin" 	# macOS arm
			"x86_64-linux"		# linux
		];

		perSystem = { system, inputs', ... }:
		let
			pkgs = import inputs.nixpkgs {
				inherit system;
			};

			node 		= pkgs.nodejs_24;
			jj	 		= pkgs.jujutsu;
			git-z		= inputs'.git-z.packages.git-z;
			git			= pkgs.git;
			corepack 	= pkgs.corepack;

			# Function that make shell script.
			makeShellScript = name: text: let
	          script = pkgs.writeShellScriptBin name text;
	        in script;

			scripts = [
				# Keep jj log in the shell.
		        (makeShellScript "jjw"
		            ''
			            watch --no-title -c 'jj log --no-pager --color always -r ::'
		            ''
				)

				# jj commit with git-z.
		        (makeShellScript "jjz"
		            ''
			            jjz_cmd() {
			                local bookmarks="$(
			                  jj log --no-graph -r 'heads(::@ & bookmarks())' -T 'self.bookmarks()'
			                )"
			                git z commit \
			                  --topic "$bookmarks" \
			                  --command "sh -c \" \
			                    echo -n '\$message' \
			                    | sed 's/^#\(.*\)/JJ:\1/' \
			                    | jj describe $@ --edit --stdin\" \
			                    "
			            }
			            jjz_cmd
		            ''
		        )

			];
		in {
			devShells.default = pkgs.mkShell {
				packages = [
					node
					jj
					git-z
					git
					corepack
				] ++ scripts;

				shellHook = ''
					echo "When"
				'';
			};
		};
	};
}
