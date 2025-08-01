/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }
    public static getInstance(): DragonBalls{
        if(!DragonBalls.instance){
            DragonBalls.instance = new DragonBalls()
            console.log('%cLas esferas del Dragón han sido creadas', COLORS.orange); 
        }
        return DragonBalls.instance;
    }

    collectBall(): void {
        if(this.ballsCollected<7){
            this.ballsCollected++;
            console.log(`Pelota recolectada. Total de esferas: ${this.ballsCollected}`);
            return
        }
        console.log('Ya se han recolectado las 7 esferas del Dragón! invoca a ShenLong');
    }
    summonShenglong(){
        if(this,this.ballsCollected ===7){
            console.log('Shenglong ha sido invocado, Pide tu deseo!');
            this.ballsCollected = 0;
            return
        }
        console.log(`\nAún faltan ${7 - this.ballsCollected} esferas para poder invocar a Shenglong`);
    }

}
function main(){
    const gokuDragonBalls = DragonBalls.getInstance();

    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();

    gokuDragonBalls.summonShenglong();
    const vegetaDrafonBalls = DragonBalls.getInstance()
    vegetaDrafonBalls.collectBall();
    vegetaDrafonBalls.collectBall();
    vegetaDrafonBalls.collectBall();
    vegetaDrafonBalls.collectBall();   
    
    gokuDragonBalls.summonShenglong();

    vegetaDrafonBalls.summonShenglong();
}
main()