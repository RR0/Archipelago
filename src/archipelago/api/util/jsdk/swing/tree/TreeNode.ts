export interface TreeNode<T> {

  add<C = any>(subNode: TreeNode<C>): void

  remove(number: number): void

  getChildCount(): number

  getUserObject(): T
}
