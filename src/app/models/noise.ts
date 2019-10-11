export class Noise {
    id: number;
    date: string;
    ruido: number;

    constructor(public identification, public noise, public fecha){this.id = identification; this.ruido=noise; this.date=fecha;}
}
 