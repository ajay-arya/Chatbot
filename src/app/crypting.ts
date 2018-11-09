import { OnInit } from "@angular/core";
import { Component } from "@angular/core";


@Component({
    selector: 'app-signup'
})
export class crypting implements OnInit {
    
    constructor() { }

    ngOnInit() { }

    static encryption(data): any {
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            var k = data.charCodeAt(i);
            temp.push(k + 6);
        }
        return temp;
    }
    static decryption(data): any {
        var temp = '';
        for (var i = 0; i < data.length; i++) {
            temp += String.fromCharCode(data[i] - 6);
        }
        return temp;
    }

}
