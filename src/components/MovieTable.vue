<template>
  <input type="text" v-model="filtro" @blur="filtrarTabla" placeholder="Filtrar">
     <table>
      <thead>
        <tr>
          <th>🗲</th>
          <th>Film</th>
          <th>Name</th>
        <!--  <th>Descripción</th>-->
          <th>Director</th>
          <th>Release</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in moviesFiltered" :key="post.episode_id">
          <td class="text-center" data-label="🗲">
            <router-link :to="`/film/${post.episode_id}`" :id="post.episode_id">
              <a href="#" class="button">
                Show
              </a>
            </router-link>
          </td>
          <td class="text-center" data-label="Pelicula">{{ post.episode_id }}</td>
          <td data-label="Nombre">{{ post.title }}</td>
      <!--    <td data-label="Descripción">{{ post.opening_crawl }}</td>  -->
          <td data-label="Director">{{ post.director }}</td>
          <td data-label="Estreno">{{ post.release_date }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  name: 'MovieTable',
  props: ['data'],
  data() {
    return {
      filtro: ''
    };
  },
  computed: {
    moviesFiltered() {
      if (this.filtro === '') {
        return this.data;
      } else {
        const filtroLowerCase = this.filtro.toLowerCase();
        return this.data.filter(movie => {
          return movie.title.toLowerCase().includes(filtroLowerCase) || movie.director.toLowerCase().includes(filtroLowerCase);
        });
      }
    }
  },
  methods: {
    filtrarTabla() {
      // No es necesario implementar nada aquí ya que se utiliza una computed property
      // para filtrar los datos en la tabla
    }
  }
}
</script>

<style scoped>

table {
  border-collapse: collapse;
 /* margin: 100px; */
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

