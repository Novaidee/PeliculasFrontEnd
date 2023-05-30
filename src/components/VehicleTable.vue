<template>
  <div v-if="data.length > 1">
    <h3>Vehículos</h3>
    
    <div>
        <select v-model="numItemsInPage" @change="actualPage(this.value)">
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </select>
        <button  class="button-2" @click="backPage()">&lt;</button>
        <span class="numPag">
          <input type="number" v-model="currentPage" @input="actualPage(this.value)">
          </span>
        <button class="button-2" @click="nextPage()">&gt;</button>     
      </div>

     <table>
      <thead>
        <tr>
          <th>🗲</th>
          <th>Name</th>
          <th>Model</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in list" :key="post.id">
          <td class="text-center" data-label="🗲">
            <router-link :to="`/vehicle/${post.id}`" :id="post.id">
              <a href="#" class="button">
                Show
              </a>
            </router-link>
          </td>
          <td class="text-center" data-label="Nombre">{{ post.name }}</td>
          <td class="text-center" data-label="Modelo">{{ post.model }}</td>
          <td class="text-center" data-label="Velocidad">{{ post.max_atmosphering_speed }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CharactersTable',
  props: ['data'],
  data() {
    return {
      numItemsInPage: 5,
      currentPage: 1,
      list: [],
    }
  },
  methods: {

    numPageTotal(){
      return Math.ceil(this.data.length/this.numItemsInPage)    
    },

    getData(){       
      this.list = this.data.slice((this.currentPage-1)*this.numItemsInPage,this.currentPage*this.numItemsInPage);
    },

    actualPage(){     
          this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
          this.currentPage = this.currentPage > this.numPageTotal() ? this.numPageTotal() : this.currentPage;

          this.getData();         
    },

    nextPage(){
        if((this.currentPage + 1) <= this.numPageTotal()){
          this.currentPage++;
          this.getData();
        }
    },

    backPage(){
      if(this.currentPage > 1){
        this.currentPage--;
        this.getData();
      }
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style scoped>
/*Table*/
table {
  border-collapse: collapse;
  margin: 10px;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 15px;
  max-width: 400px;
}


th {
  background-color: #fee819;
  color: black;
  text-align: center;
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 14%;
  background-color: #fee819;
  border: none;
  text-decoration: none;
  color:black
}

.text-center{
  text-align: center;
}

h3 {
  color: #fee819;
  margin-top: 80px;
}

</style>

<style scoped>
/*Pagination*/
.button-2 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border-radius: 14%;
  background-color: #fee819;
  border: none;
  text-decoration: none;
  color:black
}

.numPag{
  margin-left: 10px;
  margin-right: 10px;

}

input{
  text-align: center;
  width: 50px;
  color: #fee819;
  background: black;
  border: 0 solid black;
}

select{
  text-align: center;
  width: 50px;
  color: #fee819;
  background: black;
  border: 0 solid black;
  margin-right:15px
}

</style>

<style scoped>
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #fee819;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  .text-center{
  text-align: right;
}

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}

</style>

