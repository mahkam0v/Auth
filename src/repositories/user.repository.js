import { AppDataSource } from "../config/db.js";
import { UserEntity } from "../entities/UserEntity.js";

const userRepository = AppDataSource.getRepository(UserEntity);

export const findAllUsers = async () => {
  return await userRepository.find({
    order: { id: "DESC" }
  });
};

export const findUserById = async (id) => {
  return await userRepository.findOneBy({ id });
};

export const createUser = async (userData) => {
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
};

export const deleteUserById = async (id) => {
  const userToDelete = await userRepository.findOneBy({ id });
  if (userToDelete) {
    return await userRepository.remove(userToDelete);
  }
  return null;
};