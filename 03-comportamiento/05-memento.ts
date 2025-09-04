/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */
import {COLORS} from '../helpers/colors.ts'
class gameMemento {
    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string) {
        this.level = level;
        this.health = health;
        this.position = position;
    }
    getLevel() {
        return this.level
    }
    gethealth() {
        return this.health
    }
    getPosition() {
        return this.position
    }
}
class Game {
    private level: number  = 1;
    private health: number = 100;
    private position: string = 'inicio';

    constructor() {

        console.log(`
            Jugando en el nivel ${this.level}
            Salud: ${this.health}
            Posición: ${this.position}
            `);

    }
    save() {
        return new gameMemento(this.level, this.health, this.position)
    }
    play(level:number, health: number, postion:string):void{
        this.level= level;
        this.position = this.position;
        this.health = health;
        console.log(`
            Jugando en el nivel ${this.level}
            salud: ${this.health}
            posición: ${this.position}
        `);
    }
    restore(memento:gameMemento):void{
        this.level= memento.getLevel();
        this.health = memento.gethealth();
        this.position = memento.getPosition();

        console.log(`
            %cProgreso restaurado
            %cnivel: ${this.level}
            salud: ${this.health}
            posición: ${this.position}
        `, COLORS.yellow, COLORS.blue);
    }

}
class GameHistory {
    private mementos: gameMemento[] = [];
    push(memento: gameMemento) {
        this.mementos.push(memento)
    }
    pop():gameMemento | undefined{
        return this.mementos.pop()
    }
}

function main(){
     const game = new Game();
     const history = new GameHistory();
     history.push(game.save())

     game.play(2,90, 'Bosque encantado');
     history.push(game.save());
    
     game.play(3, 70,'Cueva obscura');
     history.push(game.save());

     game.play(4, 50, 'Castilo del dragon');
     console.log('%cEstado actual', COLORS.green);
     game.restore(history.pop()!)
     console.log('\n%cDespues de restaurar el ultimo estado guardado', COLORS.cyan);
     
     
}

main()