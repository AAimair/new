import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALLE4kBqqbXiQyybK+BrKhvx4j9Z2HysQb4PmdAET5m7SZKFhob+7JW1sdeut76NQ374mGQtw4eMT0up5zQWq1ECAwEAAQ==';

const privateKey = 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAssTiQGqpteJDLJsr4GsqG/HiP1nYfKxBvg+Z0ARPmbtJkoWGhv7slbWx1663vo1DfviYZC3Dh4xPS6nnNBarUQIDAQABAkAs5AXQmTg+pS+rHtgYxbBQTiA7OkuDmxnzKSW9t6dpedNOl3bvTTFbCN/jnZaqgglbtwoQtH6ghu2nmGyoBCzFAiEA7UJF2I0t+WLsgyIi8RzaUZsU3lzz3v7DEf4qY3eaGX8CIQDA49w5T9JW/A6vvGoH/sH9Q+idVPr2+6f+fwqv/ECDLwIgLq3hTA/KwcwiuFIZCdMhaPjYDD/Bg1ggTQPylwtK+EUCIQCiNDrx+vzPZwDWqSOk+4eX+a4398lfPnqj2aNcIE0DwwIgPqJSx8E7SjeQ6YedRIaKtMC6fRv9RW9CAGN3NOPThIw=';

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

