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
        })),

        findStudent: state => id => state.students.find(s => s.id === Number(id)),

        isLoaded: state => !! state.students.length
    },
    mutations: {
        SET_STUDENTS(state, students) {
            state.students = students;
        },
        ADD_STUDENT(state, newStudent) {
            state.students.push(newStudent);
        }
    },
    actions: {
        async getStudents(context) {
            const res = await axios.get('http://localhost:3000/students');
            const students = res.data;
            context.commit('SET_STUDENTS', students);
        }
    }
})