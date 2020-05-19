# Exec

Execute and get the output of a shell or bash command in Deno.

**Requires the `--allow-run` flag.**

## Usage

```ts
import { exec } from 'https://deno.land/x/exec/mod.ts'

await exec('deno -V')
// --> deno 1.0.0

await exec(['which', 'deno'])
// --> /usr/local/bin/deno

await exec({
  cmd: ['python', '-c', `import os; print(os.environ['ENV_VAR'])`],
  cwd: './',
  env: {
    ENV_VAR: 'cheers'
  }
})
// --> cheers
```

## License

[MIT](https://github.com/Acathur/exec/blob/master/LICENSE)

Copyright (c) 2020, Acathur
