export default class Task {
  private args: Deno.RunOptions
  private output: string = ""

  constructor(cmd: string[]) {
    this.args = {
      cmd: cmd,
      stdout: "piped",
      stderr: "piped",
    }
  }

  async run(): Promise<boolean> {
    const process = Deno.run(this.args)

    const stdoutInterval = setInterval(async () => {
      let buf = new Uint8Array(500);
      await process.stdout?.read(buf)
      const message = new TextDecoder().decode(buf)
      this.output += message
    }, 0)
      
    const { code } = await process.status()

    await process.close();
    await clearInterval(stdoutInterval)

    if (code === 0) {  
      return true
    } else {
      const rawError = await process.stderrOutput();
      const errorString = new TextDecoder().decode(rawError);
      this.output += errorString;
      return false
    }
  }

  getOutput(): string {
    return this.output
  }

  getArgs(): Deno.RunOptions {
    return this.args
  }
}