/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Pokemon {


  constructor(public name: string, public type: string, public level: number, public attacks: string[]) {


  }

  // Método para clonar el Pokémon
  clone(): Pokemon {
    return new Pokemon(this.name, this.type, this.level, [...this.attacks])
  }

  displayInfo(): void {
    console.log(
      `Nombre: ${this.name}\nTipo: ${this.type}\nNivel: ${
        this.level
      }\nAtaques: ${this.attacks.join(', ')}`
    );
  }
}


function main(){
  const basePokemon = new Pokemon("Charmander", "Fuego", 1, ["Llamarada", "Arañazo"]);
  const clone1 = basePokemon.clone();
  clone1.name = "Charmeleon";
  clone1.level = 16;
  clone1.attacks.push("Lanzallamas");

  basePokemon.displayInfo(); // Aquí no debe de aparecer "Lanzallamas"
  clone1.displayInfo();
}
main()
// Tarea:
// 1. Crear un Pokémon base.
// 2. Clonar el Pokémon base y modificar algunos atributos en los clones.
// 3. Llamar a displayInfo en cada Pokémon para mostrar sus detalles.

// Ejemplo:
// const basePokemon = new Pokemon("Charmander", "Fuego", 1, ["Llamarada", "Arañazo"]);
// const clone1 = basePokemon.clone();
// clone1.name = "Charmeleon";
// clone1.level = 16;
// clone1.attacks.push("Lanzallamas");

// basePokemon.displayInfo(); // Aquí no debe de aparecer "Lanzallamas"
// clone1.displayInfo();
