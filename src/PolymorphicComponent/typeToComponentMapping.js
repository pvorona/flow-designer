import { Task } from '../Task'
import { Condition } from '../Condition'
import { Placeholder } from '../Placeholder'

export const typeToComponentMapping = {
  bot: Task,
  human: Task,
  condition: Condition,
  placeholder: Placeholder,
}