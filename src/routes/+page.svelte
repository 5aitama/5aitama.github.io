<script lang="ts">
	import me from '$lib/images/me.png';
    import githubLogo from '$lib/images/github-mark.svg?raw';
	import linkedIn from '$lib/images/linkedin.svg?raw';

	let imgElement: HTMLDivElement;
	let highlightElement: HTMLDivElement;

	function onMouseMove(ev: MouseEvent) {		
		const bounds = imgElement.getBoundingClientRect();
		
		// Normalized position of the mouse (from -1 to +1)
		// on each axis (x and y).
		const posNorm = {
			x: (1 - (window.innerWidth - ev.pageX) / window.innerWidth) * 2 - 1,
			y: Math.max(((window.innerHeight - ev.pageY) / window.innerHeight) * 2 - 1, 0.25),
		};
		
		// The position of the mouse relative to the image.
		const p = {
			x: bounds.x - ev.clientX + bounds.width / 2,
			y: bounds.y - ev.clientY + bounds.height / 2,
		};

		// Apply the rotations (to have a card effect)
		imgElement.style.transform = `rotateY(${posNorm.x * 8}deg) rotateX(${posNorm.y * 8}deg)`;
		
		// Apply the shadow (more realistic)
		imgElement.style.boxShadow = `${-posNorm.x * 15}px ${posNorm.y * 25 + 15}px 20px rgba(0, 0, 0, 0.06)`;
		
		// The shiny effect
		highlightElement.style.background = `radial-gradient(circle at ${p.x}px ${p.y}px, #ffffff55, #00000000)`;
	}

</script>

<svelte:head>
	<title>Alexis サイタマ</title>
	<!-- <meta name="description" content="Svelte demo app" /> -->
</svelte:head>

<svelte:document on:mousemove={onMouseMove}></svelte:document>

<section>
	<div class="img" style="background-image: url({me});" bind:this={imgElement}>
		<div class="desc">
			<h1>Alexis</h1>
		</div>
		<div bind:this={highlightElement} class="highlight"></div>
	</div>

	<div class="socials">
		<a class="icon" target="_blank" href="https://github.com/5aitama"><span>{@html githubLogo}</span></a>
		<a class="icon" target="_blank" href="https://www.linkedin.com/in/alexis-g-7a121314a/"><span>{@html linkedIn}</span></a>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.img {
		position: relative;
		height: 380px;
		width: 280px;
		box-shadow: -25px 25px 20px rgba(0, 0, 0, 0.1);
		background: black;
		transform: rotate3d(0);
		transform-style: preserve-3d;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		border: 8px solid rgb(255, 255, 255);
		border-bottom-width: 60px;
		border-radius: 3px;
	}

	.highlight {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.desc {
		position: absolute;
		bottom: -54px;
		font-family: Breathing;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%) rotateZ(-7deg);
		width: 100%;
	}

	h1 {
		margin: 0;
		font-size: 2.4rem;
		color: rgb(27, 27, 27);
	}

	.socials {
		display: flex;
		flex-direction: row;
		margin-top: 40px;
	}

	.socials > * {
		margin: 0 10px
	}

	a.icon span{
		display: block;
		width: 40px;
		height: 40px;
		fill: rgb(128, 128, 128);
		transition: fill ease-in-out 250ms, transform ease-in-out 250ms;
	}

	a.icon:hover span {
		transform: translateY(-3px);
		fill: rgb(32, 32, 32);
	}
</style>
