import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
    execute(): void;
}

class Light {
    turnOn(): void{
        console.log('%cLa luz esta encendida', COLORS.yellow);
    }
    turnOff(): void{
        console.log('%cLa luz esta apagada', COLORS.blue);
    }
}

class Fan {
    on(): void {
        console.log('%c El ventilador esta encendido', COLORS.green);
    }
    off(): void {
        console.log('%cEl ventilador esta apagado', COLORS.blue);
    }
}

class LigthOnCommand implements Command {
    constructor(private light: Light){}
    execute(): void {
        this.light.turnOn()
    }
}

class LightOffCommand implements Command{
    constructor(private light: Light){}
    execute(): void {
      this.light.turnOff()
    }
}
class FanOnCommand implements Command{
    constructor(private fan: Fan){}
    execute(): void {
      this.fan.on()
    }
}
class FanOFFCommand implements Command{
    constructor(private fan: Fan){}
    execute(): void {
      this.fan.off()
    }
}

class RemoteControl{
    private commands:Record<string, Command> ={};

    setCommand(button: string, command:Command){
        this.commands[button] = command;
    }
    pressButton(button:string): void{
        if(this.commands[button]){
            this.commands[button].execute()
            return
        }
        console.log('%cNo se ha asignado un comando a ese botón', COLORS.red);
    }
}

function Main(){
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan()

    const ligthOnCommand = new LigthOnCommand(light);
    const lightOffCommand = new LightOffCommand(light);

    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOFFCommand(fan);

    remoteControl.setCommand('1', ligthOnCommand);
    remoteControl.setCommand('2', lightOffCommand);
    remoteControl.setCommand('3', fanOnCommand);
    remoteControl.setCommand('4', fanOffCommand);

    let coninueProgram = true;
    
    do{
        console.clear();
        const pressedButton = prompt(
            `Presiona un botón de l control:
                1. Encender luz
                2. Apagar luz
                3. encender ventilador
                4. Apagar ventilador

                Boton:
            `
        ) ?? ''

        remoteControl.pressButton(pressedButton);
        const continueProgramResponse = prompt(
            `\n¿Deseas continuar? (y/n):
            `)?.toLowerCase()
        if(continueProgramResponse === 'n') coninueProgram = false
    }while(coninueProgram)

}

Main()