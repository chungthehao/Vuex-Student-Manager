<template>
  <v-flex sm8 offset-sm2>

    {{ $store.getters.findStudent(2) }}

    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Students</v-toolbar-title>
      </v-toolbar>

      <div class="text-xs-center py-5" v-if=" ! $store.getters.isLoaded">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>

      <v-list v-else>
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