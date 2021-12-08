export default {
    state: {
        accounts: {},
        sdk: {},
        provider: null,
        networkType: '',
        metamaskModal: false

    },
    mutations: {

        setAccounts(state, payload) {
            state.accounts = payload
        },
        setMetamaskModal(state, payload) {
            state.metamaskModal = payload
        },
        setSdk(state, payload) {
            state.sdk = payload
        },
        setProvider(state, payload) {
            state.provider = payload
        },
        setNetworkType(state, payload) {
            state.networkType = payload
        },
    },
    actions: {},
    getters: {
        getMetamaskModal(state) {
            return state.metamaskModal
        },
        getSdk(state) {
            return state.sdk
        },
        getProvider(state) {
            return state.provider
        },
        getAccounts(state) {
            return state.accounts
        },
        getNetworkType(state) {
            return state.networkType
        },

    }
}
