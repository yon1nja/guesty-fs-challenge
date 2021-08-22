<template>
  <div>
    <table>
      <tr>
        <th style="cursor:pointer;" @click="sort(header.value)" v-for="header in headers" :key="header.value" :width="header.width">
          <span>
            {{ header.text }}
            <template v-if="currentSort== header.value">

            <span class="sort-direction" v-if="currentSortDir == 'desc' && currentSort == header.value">&#8593;</span>
            <span class="sort-direction" v-else>&#8595;</span>
            </template>
          </span>
        </th>
      </tr>
      <tr v-for="(item, index) in sortedData.slice(page*itemsPerPage,page*itemsPerPage+itemsPerPage)" :key="index">
        <td
          v-for="header in headers"
          :key="header.value"
          :style="{ width: header.width }"
        >
          <span>
            <template v-for="slotable in slotableFilters">
              <slot
                v-if="header.value === slotable.value"
                :name="slotable.value"
                v-bind:item="{value: item[header.value],timezone: item.timezone}"
              ></slot>
            </template>
            <slot v-if="header.value === 'actions'" name="actions">
              <div style="display: flex; flex-direction: column">
                <button
                  :disabled="!item.isEnabled"
                  :class="!item.isEnabled ? 'btn-disabled' : ''"
                  @click="triggerJob(item.jobId, item.schedule_date)"
                >
                  Trigger
                </button>
                <button
                  class="btn-success"
                  @click="activateJob(item.jobId, item.schedule_date)"
                  v-if="!item.isEnabled"
                >
                  Activate
                </button>
                <button
                  class="btn-danger"
                  @click="disableJob(item.jobId, item.schedule_date)"
                  v-else
                >
                  Disable
                </button>
              </div>
            </slot>
            <span v-if="notSlotableFilters.find(n => n.value === header.value)">{{ item[header.value] }}</span>
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    page: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    }
  },
  data() {
      return {
          currentSort:'jobId',
          currentSortDir:'asc'
      }
  },
  methods: {
    async triggerJob(jobId, timestamp) {
      await axios.post(
        `${process.env.VUE_APP_API_URL}/trigger/${jobId}/${timestamp}`,{},{headers:{token: 1}}
      );
      this.$emit("updateList");
      this.$emit("updateJob",{jobId,timestamp})
      this.$emit("snackbar", `Job #${jobId} has been triggred`);
    },
    async activateJob(jobId, timestamp) {
      await axios.put(`${process.env.VUE_APP_API_URL}/enable/${jobId}/${timestamp}`,{},{headers:{token: 1}});
      this.$emit("updateList");
      this.$emit("snackbar", `Job #${jobId} has been activated`);
    },
    async disableJob(jobId, timestamp) {
      await axios.put(
        `${process.env.VUE_APP_API_URL}/disable/${jobId}/${timestamp}`,{},{headers:{token: 1}}
      );
      this.$emit("updateList");
      this.$emit("snackbar", `Job #${jobId} has been disabled`);
    },
    sort(s) {
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
  }
  },
  computed: {
    slotableFilters() {
      return this.headers.filter((h) => h.slotable);
    },
    notSlotableFilters() {
        return this.headers.filter((h) => !h.slotable);
    },
    sortedData() {
        let temp = this.data
        console.log(this.data)
    return temp.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
  },
};
</script>

<style scoped>
table {
  border-spacing: 0 !important;
  border-collapse: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
tr:hover {
  background-color: rgba(223, 230, 233, 0.4);
}
tr {
  height: 60px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
th {
  display: flex;
  justify-content: space-between;
}
th span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}
td > * {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow:hidden;
  flex-wrap:wrap;
}
.sort-direction {
    position: absolute;
    top: 15px;
}
</style>