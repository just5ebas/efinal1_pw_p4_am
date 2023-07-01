<template>
  <div class="container">
    <div class="juego">
      <div v-if="!mensaje1() && !mensaje2()">
        <div class="puntajes">
          <label for="">Puntaje: {{ puntaje }} </label>
          <label for="">Intentos: {{ intentos }}</label>
        </div>
        <div class="recuadros">
          <RecuadroPokemon :pokemon="pokemons[0]" />
          <RecuadroPokemon :pokemon="pokemons[1]" />
          <RecuadroPokemon :pokemon="pokemons[2]" />
        </div>
      </div>

      <button v-if="!mensaje1() && !mensaje2()" @click="jugar()">Jugar</button>

      <div v-show="mensaje1()" class="mensaje_perdio">
        <label for="">Has utilizado tus 5 intentos</label>
        <label for="">El juego ha terminado, intentalo nuevamente</label>
        <button @click="reiniciar()">Nuevo juego</button>
      </div>

      <div v-show="mensaje2()" class="mensaje_gano">
        <label for="">Puntaje: {{ puntaje }}</label>
        <label for="">Felicitaciones, has ganado un premio de $10.000,00</label>
        <button @click="reiniciar()">Nuevo juego</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecuadroPokemon from "./components/RecuadroPokemon.vue";

import consumirFachada from "./helpers/PokemonConsumirAPI";

export default {
  components: {
    RecuadroPokemon,
  },
  data() {
    return {
      pokemons: [
        { nombre: "", id: undefined },
        { nombre: "", id: undefined },
        { nombre: "", id: undefined },
      ],
      puntaje: 0,
      intentos: 5,
    };
  },
  methods: {
    async jugar() {
      const vector = await consumirFachada();
      console.log(vector);
      this.pokemons = vector;
      console.log(this.pokemons);
      this.calcularPuntaje();
    },
    calcularPuntaje() {
      this.intentos--;
      if (
        this.pokemons[0].id == this.pokemons[1].id &&
        this.pokemons[2].id == this.pokemons[1].id
      ) {
        console.log("if");
        this.puntaje += 5;
      } else if (
        this.pokemons[0].id == this.pokemons[1].id ||
        this.pokemons[1].id == this.pokemons[2].id ||
        this.pokemons[0].id == this.pokemons[2].id
      ) {
        console.log("else");
        this.puntaje += 2;
      }
    },
    mensaje1() {
      return this.puntaje < 10 && this.intentos == 0 && !this.mensaje2();
    },
    mensaje2() {
      return this.puntaje >= 10;
    },
    reiniciar() {
      this.pokemons = [
        { nombre: "", id: undefined },
        { nombre: "", id: undefined },
        { nombre: "", id: undefined },
      ];
      this.puntaje = 0;
      this.intentos = 5;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.juegp {
  display: grid;
}
.puntajes {
  display: grid;
  grid-template-columns: repeat(2, 300px);
  margin-left: 21%;
  margin-bottom: 10px;
}
.recuadros {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  margin-bottom: 20px;
}
.mensaje_perdio,
.mensaje_gano {
  display: grid;
  border: 2px solid black;
  padding: 25px;
  font-size: 20px;
}
.mensaje_perdio {
  color: red;
}
.mensaje_gano {
  color: blue;
}
</style>