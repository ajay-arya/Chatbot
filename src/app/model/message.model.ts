
export class Message    {
    content: string;
    image: string;
    time: Date;
    left: boolean;
    right: boolean;
    constructor( content: string, image: string, time: Date, left: boolean, right: boolean )   {
        this.content = content;
        this.image = image;
        this.time = time;
        this.left = left;
        this.right = right;
     }
}
