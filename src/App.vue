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
    // - Lúc này, sửa trực tiếp state trong store, lẽ ra phải qua mutations (commit)
    // (state trong store REACTIVE)
    // - Comment đoạn code dưới để giả sử server chậm hoặc data chưa về store,...

    const res = await axios.get('http://localhost:3000/students');
    const students = res.data;
    this.$store.commit('SET_STUDENTS', students);

    //this.$store.state.students = (await axios.get('http://localhost:3000/students')).data; // mutate the state in the store directly: bad practice
  }
};
</script>
