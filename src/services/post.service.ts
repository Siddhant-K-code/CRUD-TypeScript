import { getConnection } from 'typeorm';
import { PostEntity } from '.././database/entities/post.entity';
import { PostRepository } from '.././respository/post.repository';

export class PostService {
  private postRepository: PostRepository;

  constructor(){
    this.postRepository = getConnection("task").getCustomRepository(PostRepository);
  }

  public index = async () => {
    const tasks = await this.postRepository.find()
    return tasks;
  }

  public create = async (post: PostEntity) => {
    const newTask = await this.postRepository.save(post);
    return newTask;
  }

  public update =  async(post: PostEntity, id: number) => {
    const updatedTask = await this.postRepository.update(id, post);
    return updatedTask;
  }

  public delete = async (id: number) => {
    const deletedTask = await this.postRepository.delete(id);
    return deletedTask;
  }
}