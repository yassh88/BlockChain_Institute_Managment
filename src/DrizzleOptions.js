import SuperAdmin from './abis/SuperAdmin.json'
import Institute from './abis/Institute.json'

const options = {
  contracts: [SuperAdmin, Institute],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.01:7545'
    }
  }
}

export default options;