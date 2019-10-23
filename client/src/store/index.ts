import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    // server side
    marsLog: [],
    activeAccomplishmentCards: [],
    chat: Array<string>(),
    upkeep: 100,
    phaseTime: 300,
    round: 1,
    players: [],
    playerResources: {},

    // client side
    investments: {},
    layout: 'primary-layout',


    //this will be merged with the global investmens
    //at the end of each round.
    localInvestments:{
      government: 0,
      legacy: 0,
      upkeep: 0,
      finace: 0,
      science: 0,
      culture: 0,
    },
  },
  mutations: {
    SET_LAYOUT(state:any, payload:any) {
      state.layout = payload;
    },
    SET_LOCAL_INVESTMENT(state:object,payload:object){
      state.localInvestments[payload.name] = payload.amount;

    },
    SET_ACCS(state, payload){
      //payload is an array of numbers
      //for all the numbers
        //activecards.push(Data(number))
    },
    ADD_TO_CHAT(state, payload) {
      this.state.chat.push(payload);
    },
  },
  getters: {
    layout(state:any) {
      return state.layout;
    },
  },
  actions: {
    addToLocalInvestment(context,payload){
      context.commit('SET_LOCAL_INVESTMENT',payload);
    },
    sendChatMsg(context, message) {
      context.commit('ADD_TO_CHAT', message);
    },
  },
});
