<template>
  <v-flex sm8 offset-sm2>
    <v-card>
      {{students}}
      <v-toolbar dark>
        <v-toolbar-title>Students</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="(student, index) in $store.getters.students" :key="index" :to="'editStudent/' + index">
          <v-list-tile-content>
            <v-list-tile-title v-text="student.fullName"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },

  // computed: {
  //   students() {
  //     return this.$store.state.students;
  //   }
  // },

  computed: mapState({
    // students: state => state.students // Cách 1
    students: 'students' // Cách 2
  })
};
</script>