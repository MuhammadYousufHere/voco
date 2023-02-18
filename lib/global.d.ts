export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>
// it's a bit more complicated than this, but this is the general idea
// Pick<Task, 'title'>
//Partial<Task>
// everthing else is optional in the type definition of Task except for title which is required

export type Task = {
  title: string
  completed: boolean
  id: string | number
}

type TaskRequiredTitle = RequireOnly<Task, 'title'>
