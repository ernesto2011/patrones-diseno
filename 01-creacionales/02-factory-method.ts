import { COLORS } from "../helpers/colors.ts";

/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */
interface Hamburger{
    prepare(): void;
}

class ChickenHamburger implements Hamburger{
  prepare(): void {
    console.log("Preparando una hamburguesa de %cpollo", COLORS.pink);
  }
}
class BeefHamburger implements Hamburger{
  prepare(): void {
    console.log("Preparando una hamburguesa de %cres", COLORS.brown);
  }
}
class BeanHamburger implements Hamburger{
  prepare(): void {
    console.log("Preparando una hamburguesa de %cfrijoles", COLORS.white);
  }
}

abstract class Restaurant {
    protected abstract createHamburger(): Hamburger;

    orderHamburger():void{
        const hamburger = this.createHamburger();

        hamburger.prepare()
    }
}

class ChickenRestaurant extends Restaurant {
    override createHamburger(): Hamburger {
      return new ChickenHamburger()
    }
}
class BeefRestaurant extends Restaurant {
    override createHamburger(): Hamburger {
      return new BeefHamburger()
    }
}
class BeanRestaurant extends Restaurant {
    override createHamburger(): Hamburger {
      return new BeanHamburger()
    }
}

let restaurant: Restaurant;
function main(){
    const burgerType = prompt('¿Qué tipo de hamburguesa quieres? (chicken/beef/bean)')

    switch(burgerType){
        case 'chicken':
            restaurant = new ChickenRestaurant();
        break;
        case 'beef':
            restaurant = new BeefRestaurant();
        break;
        case 'bean':
            restaurant = new BeanRestaurant();
        break;
        default:
            throw new Error('No tenemos esa opción \nPor favor solo selecciona: \n* pollo \n* carne');
            
    }
    restaurant.orderHamburger()
}
main()