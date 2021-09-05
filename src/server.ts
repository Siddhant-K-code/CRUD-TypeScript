import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { PostController } from "./controller/post.controller"; // import the post controller

class Server {
  private postController: PostController = new PostController;
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  /**
   * To configure the server port number, default is 3001
   */
  public configuration() {
    this.app.set("port", process.env.PORT || 3001);
    this.app.use(express.json());
  }

  /**
   * To Configure the the server routes, names, entities.
   */
  public async routes() {
    await createConnection({
      host: "localhost",
      type: "postgres",
      port: 5434, // default port
      username: "task", // username of postgres
      password: "task", // password of postgres
      database: "task",
      entities: ["build/database/entities/**/*.js"],
      synchronize: true,
      name: "task", // name of the database
    });

    this.postController = new PostController();

    this.app.get("/", (req: Request, res: Response) => {
      res.send("All Good :D");
    });

    this.app.use(`/api/tasks/`, this.postController.router); // Configure the new routes of the controller post
  }

  /**
   * It will listen the server, and it will start the server on the given port
   */
  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is Running on the ${this.app.get("port")} !`);
    });
  }
}

const server = new Server();
server.start();
