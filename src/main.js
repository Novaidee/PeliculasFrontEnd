import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var globalData = {
    films: [],
    characters: [],
    vehicles:[],
    starships:[],
    species:[],
    pilots:[],

    
};

createApp(App).use(store).use(router).provide("global",globalData).mount('#app')
