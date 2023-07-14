<script lang="ts">
	import { onMount } from 'svelte';
	import { formatDistanceToNow } from 'date-fns';

	import Box from '$lib/Box.svelte';
	import ImageBox from '$lib/ImageBox.svelte';
	import Button from '$lib/Button.svelte';
	import ColumnTable from '$lib/ColumnTable.svelte';

	const my_email = 'i.iskakov@innopolis.university';

	const comic_url = new URL('https://fwd.innopolis.university/api/comic');
	const hw2_url = new URL('https://fwd.innopolis.university/api/hw2');
	const hw2_params = new URLSearchParams([['email', my_email]]).toString();

	type ImageData = {
		src: string;
		alt: string;
		title: string;
	};

	let data: ImageData;
	let date_published: string;

	onMount(() => {
		request_comic_id();
	});

	function request_comic_id() {
		fetch(`${hw2_url.origin}${hw2_url.pathname}?${hw2_params}`, { method: 'GET' })
			.then((response) => response.text())
			.then((res) => {
				console.log(`Retrieved id: ${res}`);
				request_comic(res);
			});
	}

	function request_comic(id: string) {
		fetch(
			`${comic_url.origin}${comic_url.pathname}?${new URLSearchParams([['id', id]]).toString()}`,
			{ method: 'GET' }
		)
			.then((response) => response.json())
			.then((res) => {
				console.log(`Retrieved comic:`);
				console.log(res);

				data = {
					src: res.img,
					alt: res.alt,
					title: res.safe_title
				};
				date_published = `Published ${formatDistanceToNow(
					new Date(res.year, res.month, res.day)
				)} ago`;
			});
	}
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
		<ImageBox id="comic" {...data} selectable sharp_edges />
	</Box>
	<Box slot="2">
		<h1 class="heading">Comic page</h1>
		<div>
			<Button type="button" appearence="inverse" on:click={request_comic_id}>Refresh</Button>
			<span>{date_published}</span>
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
