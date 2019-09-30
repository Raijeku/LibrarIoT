export class Noise {
    static _id: number = 0;
    id: number;
    fecha: string;
    nRuido: number;

    constructor(public noise, public date){this.id = Noise._id++; this.nRuido=noise; this.fecha=date;}
}
