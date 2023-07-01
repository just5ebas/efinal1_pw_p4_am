<template>
  <div class="contenedor_recuadro">
    <div class="recuadro">
      <img
        v-if="pokemon.id != undefined"
        :src="
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg` ||
          imagen
        "
        alt="No se puede mostrar la imagen"
      />
      <img v-if="pokemon.id == undefined" :src="imagen" alt="" />
      <label for="">{{ pokemon.nombre || "XXXXXXXX" }}</label>
    </div>
  </div>
</template>

<script>
import imagenNegra from "../store/imagen2.png";

export default {
  data() {
    return {
      imagen: imagenNegra,
    };
  },
  methods: {},
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  display: grid;
}
img {
  width: 250px;
  height: 250px;
}
.contenedor_recuadro {
  display: flex;
  justify-content: center;
  align-items: center;
}
.recuadro{
  display: grid;
  grid-template-rows: repeat(2);
}
</style>