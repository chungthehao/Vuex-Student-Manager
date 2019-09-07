import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        students: [], // a list of students
    },
    getters: {
        students: state => state.students.map(s => ({
            ...s,
            fullName: `${s.firstName} ${s.lastName}`
        }))
    }
})