// @flow

export function tribonacci (n: number) : number {
  if (n < 3) return n
  return tribonacci(n - 1) + tribonacci(n - 2) + 2 * tribonacci(n - 3)
}