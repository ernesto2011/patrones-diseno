import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
interface Ability{
     use(): void;
}

 class SwordAttack implements Ability{
    use(): void {
      console.log('Ataca con una %cespada ferozmente', COLORS.blue);
    }
 }
 class MagicSpell implements Ability{
    use(): void {
      console.log('lanza un %chechizo poderoso', COLORS.green);
    }
 }
  class FireBall implements Ability{
    use(): void {
      console.log('lanza una %Bola de fuego', COLORS.red);
    }
 }
 class AxeAttack implements Ability{
    use(): void {
      console.log('Ataca con un %chacha rapidamente', COLORS.violet);
      
    }
 }

 abstract class Character {
    protected ability: Ability;

    constructor(ability:Ability){
        this.ability = ability
    }
    setAbility(ability:Ability):void{
        this.ability = ability
    }
    abstract performAbility(): void;
 }

 class Warrior extends Character {
    override performAbility(): void {
      console.log('\nEl guerrero esta listo para luchar');
      this.ability.use()
    }
 }
  class Mage extends Character {
    override performAbility(): void {
      console.log('\nEl mago esta listo para luchar');
      this.ability.use()
    }
 }

 function main(){
    const warrior = new Warrior(new SwordAttack());
    warrior.performAbility()

    warrior.setAbility(new AxeAttack())
    warrior.performAbility()

    const mage = new Mage(new MagicSpell())
    mage.performAbility();
 }

 main()