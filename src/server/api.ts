import express from "express";
import bodyParser from "body-parser";
console.log('AAAAAAAAAAaa')
import { Repository } from '../model/task/repository';
console.log('BBBBBBBBBBBBBBBB')
import { ITask } from "src/model/task/task";

/**
 * APIの設定
 */
export interface IConfig {
  ListenHost: string;
  WebRoot: string;
}

/**
 * API
 */
export class API {
  private app: express.Express;
  private repository: Repository;
  private conf: IConfig;

  constructor(conf: IConfig) {
    // タスクレポジトリを持つ
    this.repository = new Repository();
    // Expressのインスタンスを作成
    this.app = express();
    // 設定
    this.conf = conf;
    this.routing();
  }

  /**
   * サーバーの起動
   */
  public Run = () => {
    this.app.listen(this.conf.ListenHost)
  }

  /**
   * Expressのルーティング設定
   */
  private routing() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // GETの場合タスクのリストを返す
    this.app.get('/api/tasks', this.list);
    // POSTの場合タスクを登録する
    this.app.post('/api/tasks', this.create);
    // フロントエンドのHTMLを提供する
    this.app.use('/', express.static(this.conf.WebRoot));
  }

  /**
   * タスクの一覧
   */
  private list = (req: express.Request, res: express.Response) => {
    const tasks = this.repository.ListTasks();
    res.json(tasks);
  }

  /**
   * タスクの追加
   */
  private create = (req: express.Request, res: express.Response) => {
    const task: ITask = req.body;
    const id = this.repository.AddTask(task);
    res.json({ id });
  }
}
