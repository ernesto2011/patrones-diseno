import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystem{
    showDetatils(ident?: string): void;
}

class File implements FileSystem{
    private name: string;
    constructor(name: string){
        this.name= name
    }
  showDetatils(ident?: string): void {
    console.log(`${ident}- Archivo: ${this.name}`);
  } 
}

class Folder implements FileSystem{
    private name: string;
    private contents: FileSystem[]= [];

    constructor(name:string){
        this.name= name
    }
    add(component: FileSystem){
        this.contents.push(component)
    }
    showDetatils(ident: string=''): void {
      console.log(`%c${ident}+ Carpeta: ${this.name}`, COLORS.blue);
      this.contents.forEach(component => component.showDetatils(ident+ ' '))
      
    }
}

function main(){
    const file1 = new File('archivo1.txt')
    const file2 = new File('archivo2.txt')
    const file3 = new File('archivo3.txt')
    const file4 = new File('archivo4.txt')
    const file5 = new File('archivo5.txt')

    const folder1 = new Folder('Carpeta 1')

    folder1.add(file1)
    folder1.add(file2)
    const folder2 = new Folder('Carpeta 2')
    folder2.add(file3)

    const folder3 = new Folder('Carpeta 3')
    const folder5 = new Folder('Carpeta 5')
    folder3.add(file4)
    folder2.add(folder3)
    folder3.add(folder5)
    folder5.add(file5)
    const rootFolder = new Folder('Carpeta ROOT')

    rootFolder.add(folder1)
    rootFolder.add(folder2)

    rootFolder.showDetatils();
}

main()