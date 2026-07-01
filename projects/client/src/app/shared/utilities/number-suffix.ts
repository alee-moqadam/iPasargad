import { commaSeparate } from "./helpers";


export function numberSuffix(value){
    let abs = Math.abs(Math.round(value));
    const rounder = 1000;
    const isNegative = value < 0; // will also work for Negetive numbers
    value = Math.abs(Math.round(value));
    let key = '';

    // it's told not to use K just like tsetmc
    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 }
    ];

    if (value < 1_000_000) {
      return commaSeparate(value);
    } else if (value < 1_000_000_000) {
      let reduced = abs / powers[3].value;
      reduced = Math.round(reduced * rounder) / rounder;
      abs = reduced;
      key = powers[3].key;
    } else if (value < 1_000_000_000_000) {
      let reduced = abs / powers[2].value;
      reduced = Math.round(reduced * rounder) / rounder;
      abs = reduced;
      key = powers[2].key;
    } else {
      let reduced = abs / powers[1].value;
      reduced = Math.round(reduced * rounder) / rounder;
      key = powers[1].key;
      return (isNegative ? '-' : '') + commaSeparate(reduced) + ' ' + key;
    } 

    return (isNegative ? '-' : '') + abs + ' ' + key;
}