<template>
  <div class="header">
    <img class="circular-img" src="../assets/images/logo.png" alt="Oli Logo">

    <div class="title">
      <h1>OLI Tokenization</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  padding: 2rem;
  display: flex;
  background-color: #154360;
  margin: 0;
  justify-content: center;
}

.title {
  color: white;
  text-align: center;
}
.logo,
.title {
  flex-basis: 30%;
}
.circular-img {
  width: 75px;
  height: 75px;
  border-radius: 70%;
}
@media (max-width: 750px) {
  .title {
    font-size: 12px;
    flex-basis: 50%;
  }
}

@media (max-width: 520px) {
  .title {
    font-size: 12px;
    flex: 2;
  }
}
</style>
