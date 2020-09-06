/**
 * タスク
 */
export interface ITask {
  id: number,
  text: string,
  done?: boolean // ?がついているとオプション扱い
}
