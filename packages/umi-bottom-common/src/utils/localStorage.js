/**
 * note: 封装 localstorage 的 setItem() 与 getItem() 方法
 * 
 * setItem(key, value) 对 value 值进行加密
 * getItem(key)  对 value 值进行解密并返回
 * 
 * 对称加密算法：aes192
 * 加密文档详见：http://nodejs.cn/api/crypto.html
 */
import crypto from 'crypto'

const secretKey = 'octopus'

/**
 * 获取 localstorage，解密
 */
function getItem (key) {
    // 01 对键进行加密
    const cipher = crypto.createCipher('aes192', secretKey)
    let encryptedKey = cipher.update(JSON.stringify(key), 'utf8', 'hex')
    encryptedKey += cipher.final('hex')

    // 02 根据加密的键获取值，此时值处于加密状态
    const value = localStorage.getItem(encryptedKey)
    if (!value) return ''

    // 03 对值进行解密
    const decipher = crypto.createDecipher('aes192', secretKey)
    let decrypted = decipher.update(value, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    // 04 此时值是字符串类型，处理字符串转数组类型
    try {
        return JSON.parse(decrypted)
    } catch (error) {
        // 字符串不能进行 JSON.parse() 处理，下一行直接返回
    }

    return decrypted
}

/**
 * 设置 localstorage，加密
 */
function setItem (key, value) {
    // 对键进行加密
    const cipher = crypto.createCipher('aes192', secretKey)
    let encryptedKey = cipher.update(JSON.stringify(key), 'utf8', 'hex')
    encryptedKey += cipher.final('hex')

    // 对值进行加密
    // attention：每次加密都要重新创建一个 cipher 对象，对键和值加密的加密对象不能共用一个
    const cipher2 = crypto.createCipher('aes192', secretKey)
    let encryptedValue = cipher2.update(JSON.stringify(value), 'utf8', 'hex')
    encryptedValue += cipher2.final('hex')

    localStorage.setItem(encryptedKey, encryptedValue)
}

export {
    getItem,
    setItem,
}