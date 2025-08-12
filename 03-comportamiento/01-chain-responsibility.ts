import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler{
    setNext(handler:Handler):Handler;
    handle(request:string):void;
}
abstract class BaseHandler implements Handler{
    private nextHandler?: Handler;
  setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }
  handle(request: string): void {
    if(this.nextHandler){
        this.nextHandler.handle(request)
    }
  }
}
class BasicSupport extends BaseHandler{
    override handle(request: string): void {
      if(request=== 'basic'){
        console.log('%cSoporte básico: Resolviendo problema básico', COLORS.green);
        return
      }
      console.log('%cSoporte básico: Pasando el problema a soporte avanzado', COLORS.red);
      super.handle(request)
    }
}
class AdvancedSupport extends BaseHandler{
    override handle(request: string): void {
      if(request=== 'advanced'){
        console.log('Soporte avanzado: %cResolviendo problema avanzado', COLORS.yellow);
        return
      }
      console.log('%cSoporte avanzado: Pasando el problema a soporte experto', COLORS.red);
      super.handle(request)
    }
}
class ExpertSupport extends BaseHandler{
    override handle(request: string): void {
      if(request=== 'expert'){
        console.log('Soporte experto: %cResolviendo problema para expertos', COLORS.pink);
        return
      }
      console.log('%cSoporte experto: No se puedo resolver el problema!!!!!', COLORS.violet);
      super.handle(request)
    }
}

function main(){
    const basicSupport = new BasicSupport();
    const advancedSupport = new AdvancedSupport();
    const expertSupport = new ExpertSupport()

    basicSupport.setNext(advancedSupport).setNext(expertSupport)
    basicSupport.handle('advancedccd')

}

main()