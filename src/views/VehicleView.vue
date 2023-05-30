<template>
  <a @click="$router.go(-1)" class="color-primary">Back</a>
  
    <div class="container">
      <div class="panel">
        <h1 class="title-sw">{{ data.name }}</h1>
        <p>
         Model: {{ data.model }}
        </p>
        <p>
          Manufacturer: {{ data.manufacturer }}
        </p>
        <p>
          Vehicle class: {{ data.vehicle_class }}
        </p>
        <p>
          capacity: {{ data.cargo_capacity }}
        </p>
        <p>
          Max atmosphering speed: {{ data.max_atmosphering_speed }}
        </p>

        <p>
          Crew: {{ data.crew }}
        </p>

        <p>
          Passengers: {{ data.passengers }}
        </p>
        <p>
          Consumables: {{ data.consumables }}
        </p>
        <p>
         Cost in credits: {{ data.cost_in_credits }}
        </p>

        <h3>Peliculas</h3>
        <MovieTable :data="data.info.films"></MovieTable>
  
        <CharactersTable msg="Pilotos" :data="data.info.pilots"></CharactersTable>
      </div>
    </div>
  </template>
  
  <script>
  import MovieTable from '../components/MovieTable.vue';
  import CharactersTable from '../components/CharactersTable.vue';
  
  export default {
    name: 'VehicleView',
    inject: ['global'],
    props: ['id'],
    components: {
      MovieTable,
      CharactersTable
    },
      data() {
          return {
              data: {}
          }
      },
    created(){
  
     this.data =  this.global.vehicles.find((element) => element.id == this.id);
  
     this.data.info = {};

     this.loadData("pilots");
     this.loadData("films");
  
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