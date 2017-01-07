const User = require('../models/user.js');

/**
 * 根据用户名列表查找用户列表
 * @param {Array} names 姓名数组
 * @returns {Array} users 用户数组
 */
exports.getUsersByNames = async(names) => {
  if (!names) {
    return [];
  }
  return await User.findAll({
    where: {
      name: names,
    },
  });
};

exports.getUserById = async(id) => {
  if (!id) {
    return [];
  }
  return await User.findById(id);
};

exports.getUserByEmail = async(email) => {
  if (!email) {
    return {};
  }
  return await User.findOne({
    where: {
      email: email
    }
  });
};

exports.getUserByName = async(name) => {
  if (!name) {
    return {};
  }
  return await User.findOne({
    where: {
      name: name
    }
  });
};

exports.createUser = async(user) => {
  if (!user) {
    return {};
  }
  return await User.create(user);
};

exports.updateUser = async(id, info) => {
  if (!id || !info) {
    return {};
  }

  return await User.update(
    info,
    {
      where: {id: id}
    });
};

exports.addIntegration = async(id, integration)=> {
  if (!id || !integration) {
    return {};
  }

  let user = await User.findById(id);
  return await User.update(
    {
      integration: integration + user.integration,
    },
    {
      where: {id: id}
    });
}