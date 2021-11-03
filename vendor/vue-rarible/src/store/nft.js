export default {
    state: {
        accounts: {},
        sdk: {},
        provider: null

    },
    mutations: {

        setAccounts(state, payload) {
            state.accounts = payload
        },
        setSdk(state, payload) {
            state.sdk = payload
        },
        setProvider(state, payload) {
            state.provider = payload
        },
    },
    actions: {

    },
    getters: {

        getSdk(state){
            return  state.sdk
        },
        getProvider(state){
            return  state.provider
        },
        getAccounts(state){
            return  state.accounts
        }
    }
}
