export interface TreeNode<T> {
  add(subNode: TreeNode<T>): void

  remove(number: number): void

  getChildCount(): number

  getUserObject(): T
}
