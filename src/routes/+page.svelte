<script>
	import Box from '$lib/Box.svelte';
	import ImageBox from '$lib/ImageBox.svelte';
	import ColumnTable from '$lib/ColumnTable.svelte';
</script>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38 }]}>
	<div slot="1">
		<Box shadow>
			<h1 class="heading">Ismagil Iskakov</h1>
			<div class="content">
				<p>
					I am a professional procrastinator, but love to learn new things. What languages I know so
					far:
				</p>
				<ul>
					<li>C++</li>
					<li>Python</li>
					<li>JavaScript</li>
					<li>Java</li>
				</ul>
				<p>Also I want to start with Rust.</p>
			</div>
		</Box>
		<Box shadow>
			<h1 class="heading">Education</h1>
			<div class="content">
				<ul>
					<li>High school: Boarding-lycee №1, Almetevsk. ICT orientation.</li>
					<li>University: Innopolis University, Innopolis. Computer science and engineering.</li>
				</ul>
			</div>
		</Box>
	</div>

	<div slot="2">
		<ImageBox
			id="mainpic"
			src="https://sun9-27.userapi.com/impg/Lc2lMiL0D1kyFXQIWPc-YuWd0sjGTfIQT5X15A/Ld039K6nMBg.jpg?size=1600x925&quality=96&sign=eb3924ea005a3b60e42195487ca3ddb8&type=album"
			alt="at the office"
			title="At the office"
			selectable
		/>
		<Box shadow>
			<h1 class="heading">Strengths</h1>
			<div class="content">
				<p>Large experience in googling, the overlooked eye.</p>
			</div>
		</Box>
	</div>
</ColumnTable>

<style>
	p {
		white-space: pre-line;
	}

	ul {
		padding: 1em 0;
		padding-left: 2em;
	}

	.heading {
		margin-bottom: 20px;
		/* margin-left: 15px; */
	}
</style>
