<template>
 
  <a @click="$router.go(-1)" class="color-primary">Back</a>
  <div class="container">
    <div class="panel">
      <h1 class="title-sw">{{ data.title }}</h1>
      <h4>{{ data.release_date }}</h4>
      <p>
        {{ data.opening_crawl }}
      </p>

      <h3>Director</h3>
      <p>
        {{ data.director }}
      </p>

      <h3>Producer</h3>
      <p>
        {{ data.producer }}
      </p>

      <CharactersTable msg="Characters" :data="data.info.characters"></CharactersTable>

      <VehicleTable :data="data.info.vehicles"></VehicleTable>
    </div>
  </div>
</template>

<script>
import CharactersTable from '../components/CharactersTable.vue';
import VehicleTable from '../components/VehicleTable.vue';

export default {
  name: 'FilmView',
  inject: ['global'],
  props: ['episodeId'],
  components: {
    CharactersTable,
    VehicleTable
  },
    data() {
        return {
            data: {}
        }
    },
  created(){

   this.data =  this.global.films.find((element) => element.episode_id == this.episodeId);

   this.data.info = {};

   this.loadData("characters");
   this.loadData("vehicles");

  },
  methods: {
    loadData(param) {
    
    this.data.info[param] = [];

    this.data[param].forEach(url => {    
    var exist = this.global[param].find((element) => element.url == url);

    if(exist != undefined){
        const trimmedUrl = url.replace(/\/$/, "");
        const parts = trimmedUrl.split("/");
        const value = parts.pop();
        exist["id"] = value;

        this.data.info[param].push(exist);
    }else{
        fetch(url)
        .then(response => response.json())
        .then((json) => {
            var item = json;

            const trimmedUrl = url.replace(/\/$/, "");
            const parts = trimmedUrl.split("/");
            const value = parts.pop();
            item["id"] = value;

            this.global[param].push(item);
            this.data.info[param].push(item);
        })
    }
   });

}
  }
}



</script>

<style scoped>
.title-sw {
  color: #fee819;
  font-size: 50px;
}

.color-primary {
  color: #fee819;
}

.panel {
  position: absolute;
  left: 15%;
  width: 70%;
  font-size: 26px;
}

.container {
  position: relative;
  margin-top: 50px;
}

h3 {
  color: #fee819;
  margin-top: 80px;
}
</style>