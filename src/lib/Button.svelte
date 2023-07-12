<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | 'link' = 'link';
	export let href: string = '';
	export let appearence: 'solid' | 'inverse' | 'transparent';
</script>

{#if type === 'link'}
	<a {href} class="Button btn {appearence}" on:click>
		<slot />
	</a>
{:else}
	<button {type} class="Button btn {appearence}" on:click>
		<slot />
	</button>
{/if}

<style>
	.btn {
		text-align: center;
		border: 0;
		background-color: transparent;

		border-radius: 35px;
		padding: 9px 10px;

		cursor: pointer;

		max-height: inherit;
		max-width: inherit;
		/* font-weight: 600; */

		line-height: 1.2em;
		font-size: 0.9em;
	}

	.btn:focus {
		border: none;
	}

	.btn.solid {
		border: 2px solid var(--accent-col);
		color: white;
		background-color: var(--accent-col);
	}
	.btn.solid:hover {
		border-color: var(--accent-darker-col);
		color: white;
		background-color: var(--accent-darker-col);
	}

	.btn.inverse {
		border: 2px solid var(--accent-col);
		color: var(--accent-col);
		background-color: white;
	}
	.btn.inverse:hover {
		color: white;
		background-color: var(--accent-col);
	}
	.btn.inverse:active {
		border-color: var(--accent-darker-col);
		color: white;
		background-color: var(--accent-darker-col);
	}

	.btn.transparent {
		padding: 0 0;

		color: grey;
		background-color: transparent;
	}
	.btn.transparent:hover {
		color: rgb(185, 185, 185);
	}

	a {
		text-decoration: none;
		display: inline-block;
	}
</style>
