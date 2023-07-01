var arregloAleatorios = [];

async function consumirAPI(id) {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + id).then(
    (r) => r.json()
  );
  return respuesta;
}

const generarAleatorios = () => Math.floor(Math.random() * 5 + 145);

const formarVectorAleatorios = () => {
  let arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(generarAleatorios());
  }
  arregloAleatorios = arr;
};

const obtenerPokemons = async () => {
  var arregloPokemon = [];

  const data1 = await consumirAPI(arregloAleatorios[0]);
  const data2 = await consumirAPI(arregloAleatorios[1]);
  const data3 = await consumirAPI(arregloAleatorios[2]);

  const obj1 = {
    nombre: data1.name,
    id: data1.id,
  };
  const obj2 = {
    nombre: data2.name,
    id: data2.id,
  };
  const obj3 = {
    nombre: data3.name,
    id: data3.id,
  };

  return [obj1, obj2, obj3];
};

async function consumirFachada() {
  formarVectorAleatorios();
  //console.log(arregloAleatorios);
  return await obtenerPokemons();
}

export default consumirFachada;
