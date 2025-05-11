import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'John', email: 'john.mail.com' },
    { id: 2, username: 'Jon', email: 'jon@1.mail.com' },
    { id: 3, username: 'Jan', email: 'j@nss.mail.com' },
  ];
  findAll() {
    return this.users;
  }
}
