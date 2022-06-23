'use strict';

//sequelize をモジュールとして読み込む
const { Sequelize, DataTypes } = require('sequelize');

//DBの設定を渡したうえで チャットサービスを表すデータベースのオブジェクトを作成
const sequelize = new Sequelize(
  'postgres://postgres:postgres@db/nn_chat',
  {
    logging: false  //sequelize が出すログの設定をオフ
  }
);

//データベースの形式を、sequelizeの形式にしたがって記述
const Post = sequelize.define(
  'Post', //投稿はPostという名で定義
  {
    id: {  //主キー
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {  //投稿内容
      type: DataTypes.TEXT
    },
    postedBy: {  //投稿したユーザー名
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,  //テーブルの名前を固定（ここでは上の方で設定したPostで固定）
    timestamps: true  //createdAtとupdatedAtを自動的に追加
  }
);

Post.sync();  //定義をしたPostというオブジェクト自体をデータベースに適用して同期
module.exports = Post;  //Postをモジュールとしてエキスポート