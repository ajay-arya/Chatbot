
export class Message    {
    content: string;
    image: string;
    time: Date;
    constructor( content: string, image: string, time: Date)   { 
        this.content = content;
        this.image = image;
        this.time = time;
     }
}