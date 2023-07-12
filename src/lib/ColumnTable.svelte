<script lang="ts">
	type Size = {
		percentage: number;
		min_size?: string;
		max_size?: string;
	};

	export let sizes: Size[];
	export let gap: number = 40;
</script>

<div class="ColumnTable holder" style="gap: {gap}px;">
	<div
		style="
        width: {sizes[0].percentage}%;
        min-width: {sizes[0].min_size};
        max-width: {sizes[0].max_size};
    "
	>
		<slot name="1" />
	</div>
	<div
		style="
        width: {sizes[1].percentage}%;
        min-width: {sizes[1].min_size};
        max-width: {sizes[1].max_size};
    "
	>
		<slot name="2" />
	</div>
	<div
		style="{sizes.length >= 3
			? `
        width: ${sizes[2].percentage}%;
        min-width: ${sizes[2].min_size};
        max-width: ${sizes[2].max_size};
        `
			: 'display: none;'}
    "
	>
		<slot name="3" />
	</div>
</div>

<style>
	.holder {
		display: flex;
		justify-content: space-between;
	}
</style>
