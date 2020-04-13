
import Task from './task.ts'

// example of running a task
export default async function run(args: string[]) {
  const task = new Task(args)

  setInterval(() => {
    const output = task.getOutput();
    output && console.log(output)
  }, 1000);

  const isSuccess = await task.run()

  if (isSuccess) {
    console.log(
      task.getOutput(),
      "================================ \n",
      " 👍 Task executed successfully \n",
      "================================"
    )
  } else {
    console.log(
      task.getOutput(),
      "================================ \n",
      "   👎 Task execution failed \n",
      "================================"
    )
  }
}
