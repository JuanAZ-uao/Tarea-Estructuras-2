let arr1 = [1, 2, 3];
arr1.push(4, 5);
console.log('push():', arr1);

let arr2 = [1, 2, 3, 4];
let ultimoElemento = arr2.pop();
console.log('pop():', arr2, 'Eliminado:', ultimoElemento);

let arr3 = [1, 2, 3, 4];
let primerElemento = arr3.shift();
console.log('shift():', arr3, 'Eliminado:', primerElemento);

let arr4 = [3, 4, 5];
arr4.unshift(1, 2);
console.log('unshift():', arr4);

let arr5 = [1, 2, 3, 4, 5];
arr5.splice(2, 1, 'a', 'b');
console.log('splice():', arr5);

let arr6 = [1, 2, 3, 4];
arr6.reverse();
console.log('reverse():', arr6);

let arr7 = [3, 1, 4, 1, 5, 9];
arr7.sort((a, b) => a - b);
console.log('sort():', arr7);

let arr8 = [1, 2, 3, 4];
arr8.fill(0, 1, 3);
console.log('fill():', arr8);

let arr9 = [1, 2, 3, 4, 5];
arr9.copyWithin(0, 3);
console.log('copyWithin():', arr9);

let arr10 = [1, 2];
let arr11 = [3, 4];
let resultado1 = arr10.concat(arr11, [5, 6]);
console.log('concat():', resultado1);

let arr12 = [1, 2, 3, 4, 5];
let resultado2 = arr12.slice(1, 4);
console.log('slice():', resultado2);

let arr13 = ['Hola', 'Mundo', 'JavaScript'];
let resultado3 = arr13.join(' ');
console.log('join():', resultado3);

let arr14 = [1, 2, 3];
console.log('toString():', arr14.toString());

let arr15 = [1, 2, 3, 4, 3];
console.log('indexOf():', arr15.indexOf(3));

let arr16 = [1, 2, 3, 4, 3];
console.log('lastIndexOf():', arr16.lastIndexOf(3));

let arr17 = [1, 2, 3, 4];
console.log('includes():', arr17.includes(3));

let arr18 = [1, 2, 3];
console.log('forEach():');
arr18.forEach((elemento, indice) => {
    console.log(`  Índice ${indice}: ${elemento}`);
});

let arr19 = [1, 2, 3, 4];
let resultado4 = arr19.map(x => x * 2);
console.log('map():', resultado4);

let arr20 = [1, 2, 3, 4, 5, 6];
let resultado5 = arr20.filter(x => x % 2 === 0);
console.log('filter():', resultado5);

let arr21 = [1, 2, 3, 4, 5];
let resultado6 = arr21.find(x => x > 3);
console.log('find():', resultado6);

let arr22 = [1, 2, 3, 4, 5];
let resultado7 = arr22.findIndex(x => x > 3);
console.log('findIndex():', resultado7);

let arr23 = [1, 2, 3, 4, 5];
let resultado8 = arr23.findLast ? arr23.findLast(x => x > 3) : 'No soportado';
console.log('findLast():', resultado8);

let arr24 = [1, 2, 3, 4, 5];
let resultado9 = arr24.findLastIndex ? arr24.findLastIndex(x => x > 3) : 'No soportado';
console.log('findLastIndex():', resultado9);

let arr25 = [1, 2, 3, 4];
let resultado10 = arr25.reduce((acumulador, actual) => acumulador + actual, 0);
console.log('reduce():', resultado10);

let arr26 = [1, 2, 3, 4];
let resultado11 = arr26.reduceRight((acumulador, actual) => acumulador + actual, 0);
console.log('reduceRight():', resultado11);

let arr27 = [1, 2, 3, 4];
let resultado12 = arr27.some(x => x > 3);
console.log('some():', resultado12);

let arr28 = [1, 2, 3, 4];
let resultado13 = arr28.every(x => x > 0);
console.log('every():', resultado13);

console.log('Array.isArray():', Array.isArray([1, 2, 3]));
console.log('Array.isArray():', Array.isArray('string'));

let resultado14 = Array.from('Hola');
console.log('Array.from():', resultado14);

let resultado15 = Array.of(1, 2, 3, 4);
console.log('Array.of():', resultado15);

let arr29 = [1, [2, 3], [4, [5, 6]]];
let resultado16 = arr29.flat(2);
console.log('flat():', resultado16);

let arr30 = [1, 2, 3];
let resultado17 = arr30.flatMap(x => [x, x * 2]);
console.log('flatMap():', resultado17);

let arr31 = [1, 2, 3, 4, 5];
console.log('at():', arr31.at ? arr31.at(-1) : 'No soportado');

let arr32 = [1, 2, 3, 4, 5];
console.log('length:', arr32.length);

let arr33 = ['a', 'b', 'c'];
console.log('keys():', [...arr33.keys()]);

let arr34 = ['a', 'b', 'c'];
console.log('values():', [...arr34.values()]);

let arr35 = ['a', 'b', 'c'];
console.log('entries():');
for (let [indice, valor] of arr35.entries()) {
    console.log(`  ${indice}: ${valor}`);
}

console.log('\n=== EJEMPLOS PRÁCTICOS ===\n');

let arrDuplicados = [1, 2, 2, 3, 4, 4, 5];
let sinDuplicados = [...new Set(arrDuplicados)];
console.log('Eliminar duplicados:', sinDuplicados);

let personas = [
    { nombre: 'Ana', edad: 25 },
    { nombre: 'Juan', edad: 17 },
    { nombre: 'María', edad: 30 }
];
let adultos = personas
    .filter(p => p.edad >= 18)
    .map(p => p.nombre);
console.log('Adultos:', adultos);

let numeros = [1, 2, 3, 4, 5];
let suma = numeros.reduce((a, b) => a + b, 0);
console.log('Suma total:', suma);

let productos = [
    { nombre: 'Manzana', categoria: 'Fruta' },
    { nombre: 'Zanahoria', categoria: 'Verdura' },
    { nombre: 'Banana', categoria: 'Fruta' }
];
let agrupados = productos.reduce((acc, producto) => {
    if (!acc[producto.categoria]) {
        acc[producto.categoria] = [];
    }
    acc[producto.categoria].push(producto.nombre);
    return acc;
}, {});
console.log('Agrupados:', agrupados);

let valores = [5, 2, 8, 1, 9, 3];
let maximo = Math.max(...valores);
let minimo = Math.min(...valores);
console.log('Máximo:', maximo, 'Mínimo:', minimo);

let rango = Array.from({ length: 5 }, (_, i) => i + 1);
console.log('Rango:', rango);

let arrMezclar = [1, 2, 3, 4, 5];
let mezclado = [...arrMezclar].sort(() => Math.random() - 0.5);
console.log('Mezclado:', mezclado);

function dividirEnChunks(array, tamaño) {
    const chunks = [];
    for (let i = 0; i < array.length; i += tamaño) {
        chunks.push(array.slice(i, i + tamaño));
    }
    return chunks;
}
let arrChunks = [1, 2, 3, 4, 5, 6, 7, 8];
console.log('Chunks:', dividirEnChunks(arrChunks, 3));

