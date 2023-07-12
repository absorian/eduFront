<script lang="ts">
	export let shadow: boolean = false;
</script>

<div class="Box" class:shadow>
	<slot />
</div>

<style>
	div {
		background-color: white;
		border-radius: var(--round-main);
		padding: 25px 30px;
		margin-bottom: 25px;
	}
</style>
