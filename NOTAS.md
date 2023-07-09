## ReactJS con TypeScript

**useState** usa un genérico:

```js
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

se puede ver un genérico como un parametro(que es el tipo que asignamos) que se le pasa
a la función, el cual se le asignará como tipo a los parametro y a lo que retorna la función

**Los types y las interfaces deben crearse para hacer la representacion de la unidad minima, es decir en lugar de crear un type de array de items creamos un type para item**

### Tipos para eventos y callbacks listeners

```js
<button onClick={addNewFox}>Add new fox</button>
```

cuando se le hace hover al attr onClick mostrará el tipo que debe tener el handler:
**MouseEventHandler<HTMLButtonElement>**
de esta forma teendremos acceso a todas las propiedades y tipado del objeto **event**

#### NOTA: para explorar mas del tipado de la librería que estamos usando debemos hacer hover y ver la definicion de la funcion

### useRef hook

```js
  // se debe indicar al generic el tipo del elemento con el que trabajaremos e iniclizarlo
  // con este tipado podremos tener el autocompletados para la img gracias a TS
  const node = useRef<HTMLImageElement>(null)
```

### Componentes (genéricos) que extienden elementos del DOM.


### Creando tipos propios para la aplicación

* siempre se deben crear en un archivo con extension *.d.ts ejemplo app.d.ts
* Idealmente corresponden a entidades del contexto de la aplicación, ex: Usuario, Producto
* Usar "I" al inicio del nombre para indicar el tipo es global(es una convención)
* No Abusar de ellos. Podrían crecer sin control
* Empieza con tipos locales y expórtalos

## Trabajando con librerías que extienden el objeto window
## Crear tipos para librerías sin tipado

* crear carpeta llamada @types
* dentro de @types crear carpeta con el nombre de la librería
* crear archivo **index.d.ts**
* si queremos tipar a una librería:

```js
declare module "lodash" {
    export function random( lower: number, upper: number): number;
}
```
* si queremos extender el objeto window:

```js
enum PlausibleEvents {
    ADD_FOX = 'add_fox',
    REMOVE_FOX = 'remove_fox',
}

type Options={
    callback?: () => void;
    props: Record<string, string | number | undefined>;
}

interface Window {
    plausible: (event:PlausibleEvents, options?:Options) => void;
}
```