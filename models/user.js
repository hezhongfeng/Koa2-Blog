/**
 * Created by Administrator on 2016/5/26.
 */
'use strict';
import Client from 'mysql-pro'
const dbconfig = require('../config/database.json');
const client = new Client(dbconfig);

const User = module.exports = {};

/**
 * Returns User details (convenience wrapper for single User details).
 *
 * @param   {number} id - User id or undefined if not found.
 * @returns {Object} User details.
 */
User.get = async(name) => {
  try {
    var result = await client.query("select * from user where name = ?;", [name])
    console.log(result);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}


User.createUser = async(userInfo) => {
  try {
    console.log('数据库操作');
    let result = await client.query("select * from user where email = ?;", [userInfo.email]);
    //console.log(result.length===0);
    if (result.length === 0) {
      return await client.query("insert into user (name,password,email,gender,signature) values (?,?,?,?,?);",
        [userInfo.name,
          userInfo.password,
          userInfo.email,
          userInfo.gender,
          userInfo.signature]);
      //insert into后跳转到登录界面，或者直接是用户界面
    }
    return 'repeat';
  } catch (errors) {
    console.log(errors);
    return 'db_error';
    // if (err.Error === 'ER_DUP_ENTRY')
    //   console.log('邮箱重复');
  }
}

// /**
//  * Returns Users with given field matching given value.
//  *
//  * @param   {string}        field - Field to be matched.
//  * @param   {string!number} value - Value to match against field.
//  * @returns {Object[]}      Users details.
//  */
// User.getBy = function*(field, value) {
//   try {
//
//     const sql = `Select * From User Where ${field} = ? `;
//
//     const result = yield global.db.query(sql, value);
//     const users = result[0];
//
//     return users;
//
//   } catch (e) {
//     switch (e.code) {
//       case 'ER_BAD_FIELD_ERROR': throw ModelError(403, 'Unrecognised User field '+field);
//       default: throw ModelError(500, e.message);
//     }
//   }
// };
//
//
// /**
//  * Creates new User record.
//  *
//  * @param   {Object} values - User details.
//  * @returns {number} New user id.
//  * @throws  Error on validation or referential integrity errors.
//  */
// User.insert = function*(values) {
//   try {
//
//     const result = yield global.db.query('Insert Into User Set ?', values);
//     //console.log('User.insert', result.insertId, new Date); // eg audit trail?
//     return result[0].insertId;
//
//   } catch (e) {
//     switch (e.code) {
//       // recognised errors for User.update - just use default MySQL messages for now
//       case 'ER_BAD_NULL_ERROR':
//       case 'ER_NO_REFERENCED_ROW_2':
//       case 'ER_NO_DEFAULT_FOR_FIELD':
//         throw ModelError(403, e.message); // Forbidden
//       case 'ER_DUP_ENTRY':
//         throw ModelError(409, e.message); // Conflict
//       default:
//         throw ModelError(500, e.message); // Internal Server Error
//     }
//   }
// };
//
//
// /**
//  * Update User details.
//  *
//  * @param  {number} id - User id.
//  * @param  {Object} values - User details.
//  * @throws Error on referential integrity errors.
//  */
// User.update = function*(id, values) {
//   try {
//
//     yield GLOBAL.db.query('Update User Set ? Where UserId = ?', [values, id]);
//     //console.log('User.update', id, new Date); // eg audit trail?
//
//   } catch (e) {
//     switch (e.code) {
//       case 'ER_BAD_NULL_ERROR':
//       case 'ER_DUP_ENTRY':
//         // recognised errors for User.update - just use default MySQL messages for now
//         throw ModelError(403, e.message); // Forbidden
//       default:
//         throw ModelError(500, e.message); // Internal Server Error
//     }
//   }
// };
//
//
// /**
//  * Delete User record.
//  *
//  * @param  {number} id - User id.
//  * @throws Error
//  */
// User.delete = function*(id) {
//   try {
//
//     yield GLOBAL.db.query('Delete From User Where UserId = ?', id);
//     //console.log('User.delete', id, new Date); // eg audit trail?
//
//   } catch (e) {
//     switch (e.code) {
//       default:
//         throw ModelError(500, e.message); // Internal Server Error
//     }
//   }
// };


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
