<script lang="ts">
	import type { ImageData } from "$lib/ImageBox"

	export let data: { img: ImageData; date: string };

	import Box from '$lib/Box.svelte';
	import ImageBox from '$lib/ImageBox.svelte';
	import Button from '$lib/Button.svelte';
	import ColumnTable from '$lib/ColumnTable.svelte';
</script>

<svelte:head>
	<title>Comic</title>
	<meta name="description" content="Getting (random) single comic from university api">
</svelte:head>

<ColumnTable
	sizes={[
		{ percentage: 62, min_size: '500px' },
		{ percentage: 38, min_size: '360px', max_size: '450px' }
	]}
>
	<Box slot="1">
		<ImageBox id="comic" {...data.img} selectable sharp_edges />
	</Box>
	<Box slot="2">
		<h1 class="heading">Comic page</h1>
		<div>
			<!-- <Button type="button" appearence="inverse" on:click={}>Refresh</Button> --> 
			<span>{data.date}</span>
		</div>
	</Box>
</ColumnTable>

<!-- For css selection, as I didn't figured how to select component in-scope -->

<style>
	/* span + :global(.Box) {
        min-width: 500px;
    } */

	.heading {
		margin-bottom: 20px;
	}
	div {
		display: flex;
		justify-content: space-between;
		gap: 20px;

		margin-bottom: 15px;
	}
	div > span {
		margin: auto 0;
	}
</style>
