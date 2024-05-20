import { Injectable, NotFoundException } from '@nestjs/common';
import data from './users.mock';

@Injectable()
export default class UsersService {
  public findAll() {
    return data;
  }

  public find(id: number) {
    const entry = data.find((d) => d.id == id);
    if (!entry) {
      throw new NotFoundException();
    }
    return entry;
  }

  public findByName(name: string) {
    const entry = data.find((d) => d.name == name);
    if (!entry) {
      throw new NotFoundException();
    }
    return entry;
  }
}
