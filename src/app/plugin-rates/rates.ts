export class Rates {
  constructor(
    public base: string,
    public date: string,
    public rates: {[key:string]:number}) { }
}

