<script>
	import { base } from "$app/paths";
	import Button from '$lib/Button.svelte';

	const stickyOffset = 25; // space between content and header
	const headerHeight = 86;
	let scrollPos = 0;
</script>

<svelte:head>
	<link rel="icon" href="{base}/icons/favicon.png" />
	<meta name="author" content="Ismagil Iskakov">
</svelte:head>

<svelte:window bind:scrollY={scrollPos} />

<header>
	<div class="headercontent {scrollPos > stickyOffset ? 'sticky' : 'shadow'}">
		<nav>
			<Button appearence="solid" href="https://www.youtube.com/watch?v=eLYhnBaWOzc">Products</Button
			>
			<Button appearence="transparent" href="{base}/messenger">Messenger</Button>
			<Button appearence="transparent" href="{base}/comic">Comic</Button>
		</nav>
		<Button href="{base}/" appearence="transparent">
			<img class="headerlogo" src="{base}/icons/ism_logo.png" alt="logo" />
		</Button>
	</div>
</header>

<div id="contents">
	<main style="margin-top: {stickyOffset + headerHeight}px;">
		<slot />
	</main>

	<footer class="shadow">
		<Button appearence="transparent" href="https://github.com/absorian">
			<img id="gh-link" class="contactico" src="{base}/icons/github-mark.png" alt="github" />
		</Button>
		<Button appearence="transparent" href="https://t.me/telegram">
			<img id="tg-link" class="contactico" src="{base}/icons/telegram.png" alt="telegram" />
		</Button>
		<Button appearence="transparent" href="mailto:ismagil@innopolis.university">
			<img id="email" class="contactico" src="{base}/icons/mail.png" alt="email" />
		</Button>
		<Button appearence="transparent" href="https://www.youtube.com/watch?v=y7r6PAkFRfU">
			<img class="contactico" src="{base}/icons/linkedin-logo.png" alt="linkedIn" />
		</Button>
		<Button appearence="transparent" href="https://www.instagram.com/ism.gallery">
			<img class="contactico" src="{base}/icons/Instagram-icon.png" alt="instagram" />
		</Button>
	</footer>
</div>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
			Cantarell, 'Helvetica Neue', sans-serif;
		--accent-col: rgb(255, 172, 70);
		--accent-light-col: rgb(253, 201, 138);
		--accent-darker-col: rgb(230, 158, 71);
		--background-col: rgb(246, 246, 246);
		--background-second-col: rgb(255, 235, 209);
		--accent-light-tint: rgba(255, 235, 209, 0.6);

		--round-main: 1.4em;
		/* --main-width: 1200px; */
		--main-width: 80em;
	}

	:global(html, body) {
		position: relative;
		width: 100%;
		height: 100%;
	}

	:global(body) {
		background-color: var(--background-col);
		padding: 0 40px;
	}

	#contents {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	main {
		flex-grow: 1;
		flex-shrink: 0;

		margin: 0 auto;
		max-width: var(--main-width);
	}

	footer {
		flex-grow: 0;
		flex-shrink: 1;

		max-width: var(--main-width);
		margin: 0 auto;
		width: 100%;

		/* margin-top: auto; */

		border-radius: var(--round-main) var(--round-main) 0 0;
		background-color: white;
		padding: 20px 30px;

		display: flex;
		justify-content: center;
	}

	footer > :global(.Button) {
		margin-left: 30px;
	}

	.contactico {
		max-height: 3em;
	}

	header {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		width: 100%;
		padding: 0 40px;
		z-index: 99;
	}

	.headercontent {
		background-color: white;
		border-radius: 0 0 var(--round-main) var(--round-main);
		padding: 20px 30px;
		display: flex;
		justify-content: space-between;

		max-width: var(--main-width);
		margin: 0 auto;

		transition: all 250ms ease-out;
	}

	.headercontent.sticky {
		box-shadow: 0 0 20px #0000001a;
		transform: scale(1.005, 1.01);
	}

	.headercontent > nav {
		margin: auto 0;
		display: inline-block;
	}

	.headercontent > nav > :global(.Button) {
		text-align: center;
		margin: auto 0;
		margin-right: 60px;
	}

	.headercontent > :global(.Button) {
		margin-left: auto;
	}

	.headerlogo {
		max-width: 3em;
	}

	:global(:not(img).shadow) {
		box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.01);
	}
	:global(img.shadow) {
		filter: drop-shadow(0 0 0.5em rgba(0, 0, 0, 0.05));
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(::-webkit-scrollbar) {
		width: 7px;
		height: 7px;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--background-col);
		border-radius: 5px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: var(--accent-light-col);
		border-radius: 5px;
	}
</style>
