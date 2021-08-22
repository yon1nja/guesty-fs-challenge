<template>
  <div class="snackbar-container">
    <div class="snackbar">
      <span>{{message}}</span>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            require: true
        },
       
    }
}
</script>
<style  scoped>
.snackbar {
  position: fixed;
  background-color: #343a40;
  color: #f5f5f5;
  width: 400px;
  height: 40px;
  transition: visibility 100ms linear;
  border-radius: 5px;
  display:flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  left: 50px;
}
</style>