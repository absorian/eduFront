<script lang="ts">
	export let username: string;
	export let content: string;
</script>

<div>
	<h3>{username}</h3>
	<p>{content}</p>
</div>

<style>
	div {
		padding-right: 15px;
		padding-bottom: 15px;

		display: flex;
		flex-direction: column;
	}
	p {
		white-space: pre-line;
		padding-left: 15px;
	}
	h3 {
		max-width: 62%;
		padding-left: 15px;
		padding-bottom: 10px;

		border: none;
		border-bottom: 2px solid var(--accent-col);
		margin-bottom: 15px;
	}
</style>
