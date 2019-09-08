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
        },
        UPDATE_STUDENT(state, { id, property, value }) {
            const student = state.students.find(s => s.id === Number(id));
            student[property] = value;
        }
    },
    actions: {
        async getStudents(context) {
            const res = await axios.get('http://localhost:3000/students');
            const students = res.data;
            context.commit('SET_STUDENTS', students);
        },
        async submitNewStudent(context, newStudentData) {
            const res = await axios.post("http://localhost:3000/students", newStudentData);
            const newStudentRecord = res.data;
            context.commit('ADD_STUDENT', newStudentRecord);
        },
        async editStudent(context, { id, studentData }) {
            await axios.put(
                `http://localhost:3000/students/${id}`, 
                studentData
            );
        }
    }
})