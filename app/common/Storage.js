import React from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import AV from '../service/AVService';


var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')

});

storage.sync = {
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  user(params) {
    let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
    console.log('sync starts');
    fetch('user/', {
      method: 'GET',
      body: 'id=' + id,
      ...extraFetchOptions,
    }).then(response => {
      return response.json();
    }).then(json => {
      //console.log(json);
      if (json && json.user) {
        storage.save({
          key: 'user',
          id,
          data: json.user
        });

        if (someFlag) {
          // 根据syncParams中的额外参数做对应处理
        }

        // 成功则调用resolve
        resolve && resolve(json.user);
      }
      else {
        // 失败则调用reject
        reject && reject(new Error('data parse error'));
      }
    }).catch(err => {
      console.warn(err);
      reject && reject(err);
    });
  },

  event(params) {

  }
};

global.storage = storage;
