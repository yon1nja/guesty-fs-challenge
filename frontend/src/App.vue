<template>
  <div id="app">
    <JobsViewer></JobsViewer>
    <div>
    
    </div>
  </div>
</template>

<script>
import JobsViewer from './components/jobs-viewer.vue'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    JobsViewer,
  }
}
</script>

<style>
@import './styles/global.css';
</style>
