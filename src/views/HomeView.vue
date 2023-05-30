<template>
  <div>
    <img alt="logo" src="../assets/icon.png" class="icon-sw" />
    <div class="container">
      <MovieTable :data="data"></MovieTable>
    </div>
  </div>
</template>

<script>
import MovieTable from "../components/MovieTable.vue";

export default {
  name: "HomeView",
  inject: ["global"],
  components: {
    MovieTable,
  },

  data() {
    return {
      data: [],
    };
  },

  created() {
    /*Films */
    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((json) => {
        var films = json.results;

        this.data = films;
        this.global.films = films;

        this.data.map((obj, index) => {
          return { ...obj, position: index + 1 };
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.icon-sw {
  width: 300px;
}

.container{
  margin: 10px;
}

</style>
