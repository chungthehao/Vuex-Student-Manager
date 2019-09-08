<template>
  <div>
    <v-flex sm8 offset-sm2>
      <!-- {{ $store.getters.isLoaded }} -->
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>

        <div class="text-xs-center py-5" v-if=" ! isLoaded">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>

        <v-form v-else>
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field :value="student.firstName" @input="update($event, 'firstName', student.id)" label="First Name" required></v-text-field>
                <v-text-field :value="student.lastName" @input="update($event, 'lastName', student.id)" label="Last Name" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br>
    <Students/>
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      findStudent: 'findStudent',
      isLoaded: 'isLoaded'
    }),
    // Ko để trong created hook, mà để ở computed để nó trigger khi data ở store đã về từ server
    student() {
      const student = this.findStudent(this.$route.params.id);
      return student ? student : {};// {} rỗng này để ko sinh lỗi khi mới vô students ở store chưa về kịp từ server
    }
    // firstName() {
    //   const student = this.findStudent(this.$route.params.id);
    //   return student ? student.firstName : '';
    // },
    // lastName() {
    //   const student = this.findStudent(this.$route.params.id);
    //   return student ? student.lastName : ''; 
    // },
  },

  methods: {
    submit() {
      this.$store.dispatch('editStudent', { 
        id: this.$route.params.id, 
        studentData: { firstName: this.student.firstName, lastName: this.student.lastName } 
      });
    },
    update(value, property, id) {
      //console.log($event);
      this.$store.commit('UPDATE_STUDENT', {
        id,
        property,
        value //$event.target.value
      });
    }
  },
  components: {
      Students
  }
};
</script>