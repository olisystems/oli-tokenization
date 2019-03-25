<template>
  <div id="app">
    <Header/>
    <Tokenization/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tokenization from "./components/Tokenization.vue";

export default {
  name: "app",
  components: {
    Header,
    Tokenization
  }
};
</script>

<style>
html,
body {
  margin: 0;
}

body {
  font-family: "Open Sans", sans-serif;
  background-color: #f3f3f3;
  color: #333333;
}
</style>
