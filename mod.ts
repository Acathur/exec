export type ExecOptions = Omit<Deno.RunOptions, 'stdout' | 'stderr'>

const removeTrailingLineBreak = (str: string) => {
	return str.replace(/\n$/, '')
}

export const exec = async (cmd: string | string[] | ExecOptions) => {
	let opts: Deno.RunOptions

	if (typeof cmd === 'string') {
		opts = {
			cmd: cmd.split(' ')
		}
	}
	else if (Array.isArray(cmd)) {
		opts = {
			cmd
		}
	}
	else {
		opts = cmd
	}

	opts.stdout = 'piped'
	opts.stderr = 'piped'

	const process = Deno.run(opts)
	const decoder = new TextDecoder()
	const { success } = await process.status()

	if (!success) {
		const msg = process.stderr && removeTrailingLineBreak(decoder.decode(await Deno.readAll(process.stderr)))

		process.close()

		throw new Error(msg || 'exec: failed to execute command')
	}

	return removeTrailingLineBreak(decoder.decode(await process.output()))
}
