import { v4 as uuid } from 'uuid';
import { UserService } from './UserService';

jest.mock('../repositories/UserRepository')
const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
  const mockUser = {
    user_id: uuid(),
    name: 'Algum usuário',
    email: 'test@dio.ex'
  }

  const userService = new UserService({
    userRepository: mockUserRepository,
    name: 'Algum usuário',
    email: 'test@dio.ex'
  })

  it ('Deve retornar o usuário, quando for salvo', async () => {
    mockUserRepository.save = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    const user = await userService.createUser()
    expect(user).toHaveProperty('user_id')
    expect(user).toMatchObject({
      name: 'Algum usuário',
      email: 'test@dio.ex'
    })
  })
})