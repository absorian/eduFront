<script lang="ts">
	export let id: string;
	export let src: string;
	export let alt: string;
	export let title: string = '';

	export let shadow: boolean = false;
	export let selectable: boolean = false;
	export let sharp_edges: boolean = false;
</script>

<div class="ImageBox imgbox" class:shadow>
	{#if selectable}
		<input type="checkbox" {id} class="selectimghelper" />
		<label for={id} class="selectableimglabel">
			<img class="selectableimg" class:sharp_edges {src} {alt} />
		</label>
		<img class="selectableimgdouble" class:sharp_edges {src} {alt} />
	{:else}
		<img class="selectableimg" class:sharp_edges {src} {alt} />
	{/if}
	<p>{title}</p>
</div>

<style>
	.sharp_edges {
		border-radius: 0 !important;
	}

	.imgbox {
		background-color: var(--accent-light-tint);
		border-radius: var(--round-main);
		margin-bottom: 25px;
	}
	.imgbox > p {
		padding: 10px 30px;
		padding-bottom: 20px;
	}
	.imgbox img {
		border-radius: var(--round-main);
		max-width: 100%;
		max-height: 400px;
	}

	.selectableimgdouble {
		display: none;
	}

	.selectableimg {
		transition: transform 250ms ease-in-out;

		opacity: 1;
	}

	.selectableimglabel {
		transition: opacity 250ms ease-in-out, background-color 300ms ease-in-out;

		display: flex;
		border-radius: var(--round-main);
		line-height: 0;
		justify-content: center;
	}

	.selectimghelper {
		display: none;
	}

	:not(.selectimghelper:checked) + .selectableimglabel > .selectableimg:hover {
		/* transform: scale(0.99, 0.99); */
		transform: scale(1.005, 1.005);
	}

	:not(.selectimghelper:checked) + .selectableimglabel:hover {
		opacity: 0.9;
	}

	.selectimghelper:checked + .selectableimglabel {
		opacity: 1;

		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 0;

		transform: translate(-50%, -50%);
		position: fixed;
		top: 50%;
		left: 50%;

		width: 100%;
		height: 100%;
		z-index: 100;
	}

	.selectimghelper:checked + .selectableimglabel > .selectableimg {
		transform: scale(1, 1);

		max-height: none;
		height: 70vmin;
		width: auto;

		margin: auto;
	}

	.selectimghelper:checked + .selectableimglabel + .selectableimgdouble {
		margin: 0 auto;
		display: block;
	}
</style>
