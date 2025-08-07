import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
    on(){
        console.log('Proyector enccendido');
    }
    turnOff(){
        console.log('Proyecto apagado');
    }
}

class SoundSystem{
    on(){
        console.log('Sisetem de sonido encendido');
    }
    off(){
        console.log('Sistema de sonido apagado'); 
    }
}
class VideoPlayer {
    on(){
        console.log('Video player encendido');
    }
    play(movie: string){
        console.log(`Reproduciendo %c${movie}`, COLORS.blue);
    }
    stop(){
        console.log('Pelicula detenida');
    }
    off(){
        console.log('Video player apagado');
    }
}

class PopcornMaker {
    poppingPopcorn(){
        console.log('Haciendo palomitas');
    }
    turnOffPopcorn(){
        console.log('Apagando las maquina de palomitas');
    }
}
interface HomeTheaterFacadeOptions{
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popcornMaker: PopcornMaker
}
class HomeTheaterFacade {
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    }:HomeTheaterFacadeOptions){
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker
    }
    watchMovie(movie: string):void{
        console.log('%cPreparando para ver las pelicula', COLORS.blue);
        this.projector.on();
        this.soundSystem.on()
        this.popcornMaker.poppingPopcorn()
        this.videoPlayer.on()
        this.videoPlayer.play(movie)
        console.log('%cDisfrute la pelicula', COLORS.green);
        
    }
        endWatchMovie():void{
        console.log('%cddeteniendo la pelicual', COLORS.blue);
        this.projector.turnOff()
        this.soundSystem.off()
        this.popcornMaker.turnOffPopcorn()
        this.videoPlayer.stop()
        this.videoPlayer.off()
        console.log('%cSistema apagado', COLORS.green);
        
    }
}

async function main(){
    const projector = new Projector()
    const soundSystem = new SoundSystem()
    const videoPlayer = new VideoPlayer()
    const popcornMaker = new PopcornMaker()
    
    const movie = new HomeTheaterFacade({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    })
    movie.watchMovie('Lord of the rings ')
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    movie.endWatchMovie()
}

main()