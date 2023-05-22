import axios from 'axios'
import axiosRetry from 'axios-retry'

//set axios retry
axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
       return retryCount * 1000
    }
})

export const callAxios = async (config: any) => {
    try{
        const {data} = await axios(config)
        return Promise.resolve(data)
    }catch(err){
        console.log(err,'error from the callAxios function')
        return Promise.reject(err)
    }
}