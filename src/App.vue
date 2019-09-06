<template>
  <v-app>
    <v-toolbar app>
      <v-btn flat to="/">Students List</v-btn>
      <v-btn flat to="/NewStudent">New Student</v-btn>
    </v-toolbar>
    <v-content>
      <br>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import store from './store';
import NewStudent from "./components/NewStudent";
import Students from "./components/Students";
import EditStudent from "./components/EditStudent";


export default {
  name: "App",
  components: {
    NewStudent,
    Students,
    EditStudent
  },
  data() {
    return {
      //
    };
  },
  async created() {
    // 1. Để code query backend ở đây vì, component App này chỉ render 1 lần 
    // 2. store.state.students lúc đầu là [], sau 1 tgian nó có data, nhưng các component đã load xong r.
    // 3. Vì store.state.students ko phải props hay data nên khi nó thay đổi đâu trigger load lại
    // 4. Đọc data từ store.state.student chỉ 1 lần ban đầu thôi (khi load component Students)
    store.state.students = (await axios.get('http://localhost:3000/students')).data;
  }
};
</script>
