<template>
  <div class="container">
    <div class="filters">
      <div class="date">
      from:
      <input v-model="startDate" type="date" format="dd/mm/yyyy">
      <input v-model="startTime" type="time">
      to:
      <input v-model="endDate" type="date">
      <input v-model="endTime" type="time">

      </div>
      <div class="actions">
        <button @click="fetchJobList">reload</button>
      </div>
     

    </div>
    <data-table :headers="statusHeaders" :data="jobList" v-on:snackbar="snackbar" :page="page" :itemsPerPage="itemsPerPage" v-on:updateList="this.fetchJobList">
      <template v-slot:created_at="item">
        {{
          formatDate(item.item.value, { lang: "he-IL", timeZone: item.item.timezone }) 
        }}</template
      >
      <template v-slot:last_triggred="item">
        {{
          item.item.value > 0 ? formatDate(item.item.value, { lang: "he-IL", timeZone: item.item.timezone }) : 'Never Triggred'
        }}</template
      >
      <template v-slot:schedule_date="item">
        {{
          formatDate(item.item.value, { lang: "he-IL", timeZone: item.item.timezone }) 
        }}</template
      >
      <template v-slot:recurrence="item"> {{ parseRecurrenceToHumanString(item.item.value) }}</template>
      <template v-slot:body="item"> {{ item.item.value }}</template>
        
    </data-table>
    <div class="pagination" style="display: flex; justify-content:flex-end; margin: 25px;">
    page:&nbsp;<span @click="page > 0 ? page-- : ''" :style="{cursor: page == 0 ? 'not-allowed' : 'pointer'}"> &#8592; </span>&nbsp; {{ page }}&nbsp; <span @click="(page+1)*itemsPerPage < jobList.length ? page++: ''" :style="{cursor: (page+1)*itemsPerPage > jobList.length ? 'not-allowed' : 'pointer'}"> &#8594; </span>
    </div>
    <snackbar :message="snackbarMessage" :style="{visibility: snackbarVisiblity ? 'visible' : 'hidden'}"/>
  </div>
</template>

<script>
import axios from "axios";
import dataTable from "../components/data-table.vue";
import snackbar from '../components/snackbar.vue'
import cronstrue from 'cronstrue';


export default {
  components: { dataTable,snackbar },
  data() {
    return {
      jobList: [],
      snackbarMessage: '',
      snackClass: '',
      snackbarVisiblity: false,
      page:0,
      itemsPerPage:10,
      statusHeaders: [
        { text: "Definition ID", value: "jobId", width: "10%" ,slotable: false},
        { text: "Started at", value: "created_at", width: "10%",slotable: true },
        { text: "Last Triggered at", value: "last_triggred", width: "10%",slotable: true },
        { text: "Next Occurrence", value: "schedule_date", width: "10%",slotable: true },
        { text: "Recurrence", value: "recurrence", width: "15%" ,slotable: true},
        { text: "Status", value: "isEnabled", width: "5%",slotable: false },
        { text: "Timezone", value: "timezone", width: "20%",slotable: false },
        { text: "Body", value: "body", width: "15%",slotable: true },
        { text: "Actions", value: "actions", width: "5%",slotable: false },
      ],
      startDate: new Date().toLocaleDateString('fr-CA'),
      startTime: new Date().toLocaleTimeString('he-IL'),
      endDate: new Date(2021,8,23,0,0,0).toLocaleDateString('fr-CA'),
      endTime: new Date(2021,8,23,12).toLocaleTimeString('he-IL')
    };
  },
  methods: {
    async fetchJobList() {
      let res = await axios.get(`${process.env.VUE_APP_API_URL}/timeframe/${new Date(`${this.startDate} ${this.startTime}`).getTime()}/${new Date(`${this.endDate} ${this.endTime}`).getTime()}`,{headers:{token:1}});
      this.jobList = this.flattenData(res.data)
      this.page = 0
      // this.jobList = res.data;
    },
    flattenData(data) {
      let newData = [];
      let keys = Object.keys(data)
      keys.forEach(k => {
        let innerKeys = Object.keys(data[k]);
        innerKeys.forEach(iK => {
          newData.push(data[k][iK])
        })
      })
      return newData

    },
    formatDate(date, timezone) {
      return (
        new Date(date).toLocaleDateString(timezone.lang, {
          timeZone: timezone.timeZone,
        }) +
        "-" +
        new Date(date).toLocaleTimeString(timezone.lang, {hour12:false,
          timeZone: timezone.timeZone,
        })
      );
      
    },
    parseRecurrenceToHumanString(recurrence) {
      return cronstrue.toString(recurrence,{ use24HourTimeFormat: true });
    },
    snackbar(message,cssclass) {
      console.log(cssclass)
      this.snackbarMessage = message;
      this.snackClass = cssclass;
      if(!this.snackbarVisiblity) {
        this.snackbarVisiblity = true;
        setTimeout(() => {
          this.snackbarVisiblity = false
        },5000)
      }
    }
  },

  mounted() {
    this.fetchJobList();
  },
};
</script>

<style scoped>
@import "../styles/components/card.css";
@import "../styles/components/job-viewer.css";
</style>