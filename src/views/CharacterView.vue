<template>
  <a @click="$router.go(-1)" class="color-primary">Back</a>
  
    <div class="container">
      <div class="panel">
        <h1 class="title-sw">{{ data.name }}</h1>
        <p>
          Birth year: {{ data.birth_year }}
        </p>
        <p>
          Gender:  {{ data.gender }}
        </p>
        <p>
          Height: {{ data.height }} cm
        </p>
        <p>
          Mass: {{ data.mass }} kg
        </p>
        <p>
          Hair: {{ data.hair_color }}
        </p>
        <p>
          Skin: {{ data.skin_color }}
        </p>
        <p>
          Eye: {{ data.eye_color }}
        </p>


        <h3>Films</h3>
        <MovieTable :data="data.info.films"></MovieTable>
  
        <VehicleTable :data="data.info.vehicles"></VehicleTable>
      </div>
    </div>
  </template>
  
  <script>
  import MovieTable from '../components/MovieTable.vue';
  import VehicleTable from '../components/VehicleTable.vue';
  
  export default {
    name: 'CharacterView',
    inject: ['global'],
    props: ['id'],
    components: {
      MovieTable,
      VehicleTable
    },
      data() {
          return {
              data: {}
          }
      },
    created(){
  
     this.data =  this.global.characters.find((element) => element.id == this.id);
  
     this.data.info = {};

     this.loadData("films");
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
              var people = json;
              const trimmedUrl = url.replace(/\/$/, "");
              const parts = trimmedUrl.split("/");
              const value = parts.pop();
              people["id"] = value;
              this.global[param].push(people);
              this.data.info[param].push(people);
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