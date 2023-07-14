<script lang="ts">
	import { /* onMount, */ tick } from 'svelte';
	import insertTextAtCursor from 'insert-text-at-cursor';

	import Box from '$lib/Box.svelte';
	import Button from '$lib/Button.svelte';
	import Message from '$lib/Message.svelte';
	import ColumnTable from '$lib/ColumnTable.svelte';

	import { io } from 'socket.io-client';

	type Message = {
		username: string;
		content: string;
	};
	const socket = io('https://fwd.innopolis.university');

	let message_list_element: HTMLElement;
	let message_list: Message[] = [];
	let form_msg: Message = {
		username: '',
		content: ''
	};

	const scrollToBottom = async (elem: HTMLElement) => {
		// waiting for the message to actually be added
		await tick();
		// for whatever freaking reason it crashes without '?', however scrolling is performed
		elem?.scrollTo({ top: elem.scrollHeight, behavior: 'smooth' });
	};

	// for (let i = 0; i < 10; i++) {
	//     message_list = [...message_list, {username: "Username", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}]
	// }

	socket.on('chat message', async (msg: Message) => {
		message_list = [...message_list, msg];

		scrollToBottom(message_list_element);
	});

	function sendMessage() {
		if (!form_msg.username || !form_msg.content) return;

		socket.emit('chat message', form_msg);
		form_msg.content = '';
	}

	function handleTextboxEnter(e: KeyboardEvent) {
		if (e.code !== 'Enter') return;
		if (!e.ctrlKey) {
			e.preventDefault();
			sendMessage();
		} else {
			insertTextAtCursor(e.target as HTMLTextAreaElement, '\n');
		}
	}
</script>

<svelte:head>
	<title>Messenger</title>
	<meta name="description" content="Simple messenger built using socket.io">
</svelte:head>

<ColumnTable
	sizes={[
		{ percentage: 62, min_size: '38vw' },
		{ percentage: 38, min_size: '300px' }
	]}
>
	<Box slot="1" shadow>
		<h1 class="heading">Messages (lab 3)</h1>
		<div id="msg_list" bind:this={message_list_element}>
			{#each message_list as { username, content }}
				<Message {username} {content} />
			{/each}
			{#if !message_list.length}
				<div class="nomsg"><span class="hint">Nothing to see, unless you type!</span></div>
			{/if}
		</div>
	</Box>
	<Box slot="2" shadow>
		<form id="msg_form" on:submit|preventDefault={sendMessage}>
			<input
				bind:value={form_msg.username}
				class="input_user shadow"
				type="text"
				placeholder="User"
				minlength="2"
				autocomplete="off"
				required
			/>
			<span
				bind:innerText={form_msg.content}
				on:keypress={handleTextboxEnter}
				tabindex="0"
				class="input_content shadow"
				role="textbox"
				contenteditable="true"
			/>
			<div>
				<Button type="submit" appearence="solid">send</Button>
				<span class="hint">Ctrl+Enter -> Newline</span>
			</div>
		</form>
	</Box>
</ColumnTable>

<style>
	.nomsg {
		text-align: center;
	}
	.hint {
		color: rgb(170, 170, 170);
	}

	#msg_form > div > span {
		margin-left: 1em;
	}

	#msg_form {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	#msg_list {
		min-height: 10vh;
		max-height: 60vh;
		overflow-y: auto;
	}

	.heading {
		margin-bottom: 20px;
		/* margin-left: 15px; */
	}

	.input_user {
		font-size: medium;
		border: none;
		border-bottom: 2px solid var(--accent-col);
		padding: 0.7em 1em;
	}

	.input_content {
		font-size: medium;
		border: 2px solid var(--accent-col);

		border-radius: var(--round-main);
		padding: 0.7em 1em;
		max-width: 400px;
		/* margin-right: 15px; */
	}
	.input_user::placeholder {
		font-size: medium;
		color: rgb(219, 219, 219);
	}
	.input_content:empty::before {
		font-size: medium;
		content: 'Message';
		color: rgb(219, 219, 219);
	}

	#msg_form > :global(:focus) {
		outline: none !important;
	}
	#msg_form > :global(.Button) {
		margin-right: auto;
		min-width: 6em;
	}
</style>
