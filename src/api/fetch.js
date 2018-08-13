//封装axios
import axios from 'axios'

// axios设置
axios.defaults.timeout = 5000
axios.defaults.baseURL = ""

/**
 * fetch 请求方法
 * @param url
 * @param params 默认是对象
 * @returns {Promise}
 */

export function fetch(url, params= {} ) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  }
  )
}

/**
 * post 请求方法
 * @param url
 * @param data 默认是对象
 * @returns {Promise}
 */

export function post(url, data={}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  }
  )
}
