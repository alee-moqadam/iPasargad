
export class Convert {
  static toObject<T>(value: any[], type?: new () => T): T[];
  static toObject<T>(value: any, type?: new () => T): T;

  static toObject<T>(value: any | any[], type?: new () => T): T | T[] {
    if (Array.isArray(value)) {
      let array = [];
      for (let i = 0; i < value.length; i++) array.push(Convert.toObject(value[i], type));
      return array;
    } else {
      let obj;
      if (type) obj = new type;
      else obj = {};
      for (let k in value) obj[k] = value[k];
      return obj;
    }
  }

  static toEnglishNumber(persianNumber: number | string) {
    return persianNumber.toString().replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  }

  static toEnglishNumber2(numberInput: number | string): string {
    const numMap: { [key: string]: string } = {
      '۰': '0', '١': '1', '۲': '2', '٣': '3', '۴': '4', '٥': '5', '۶': '6', '٧': '7', '۸': '8', '٩': '9',
       '۱': '1', '۳': '3',  '۵': '5',  '۷': '7', '۹': '9'
    };
  
    return numberInput.toString().replace(/[۰-۹٠-٩]/g, d => numMap[d] || d);
  }
  
  

}