'use strict';
const fs = require('fs');
const config = require("../config/cloudinary.json");
const cloudinary = require('cloudinary');
cloudinary.config(config);

exports.upload = async(path)=> {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(path, function (result) {
      console.log(result);
      //异步删除下载的图片文件,这里假设不只有一个文件
      fs.readdir('./uploads', (err, files)=> {
        if (err) {
          console.error(err);
        }
        for (let fileName of files) {
          //删除除了说明文件的所有文件，也就是这里的图片缓存
          if(fileName!=='readme.md'){
            fs.unlink('./uploads/' + fileName, (err)=> {
              if (err) {
                console.error(err);
              }
            });
          }
        }
      });

      //传出上传结果
      resolve(result);
    });
  });
}