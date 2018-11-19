// tslint:disable-next-line:class-name component-class-suffix
export class crypting {


    static encryption(data): any {
        const temp = [];
        for (let i = 0; i < data.length; i++) {
            const k = data.charCodeAt(i);
            temp.push(k + 6);
        }
        return temp;
    }
    static decryption(data): any {
        let temp = '';
        for (let i = 0; i < data.length; i++) {
            temp += String.fromCharCode(data[i] - 6);
        }
        return temp;
    }

}
