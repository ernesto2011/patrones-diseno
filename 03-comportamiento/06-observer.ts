import { COLORS } from "../helpers/colors";

/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer{
    notify(videoTitle: string):void;
}
class YoutubeChannel{
    private subscribers: Observer[]= []
    private name: string;

    constructor(name: string){
        this.name = name
    }
    subscribe(observer:Observer):void{
        this.subscribers.push(observer)
        console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
    }
    unsubscribe(observer:Observer):void{
        this.subscribers = this.subscribers.filter(sub => sub!== observer)
        console.log(`Un suscriptor se ha dado de baja "${this.name}"`);
    }
    uploadVideo (videoTitle:string):void{
        console.log(`Canel ${this.name } ha subdo un nuevo video %c${videoTitle}`, COLORS.green);
        this.subscribers.forEach(subscriber=>{
            subscriber.notify(videoTitle)
        })
    }
}

class Subscriber implements Observer{
    
    constructor(private name:string){}

    notify(videoTitle: string): void {
        console.log(`Notificando a ${this.name} del nuevo video: %c${videoTitle}`, COLORS.cyan);
    }
}

function main(){
    const channel = new YoutubeChannel('Dreams Labs Inc.')
}

main();