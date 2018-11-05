import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, public el: ElementRef, public render: Renderer2) { }

  ngOnInit() {
  }
  login()  {
    const mov = this.el.nativeElement.getElementsByClassName('color')[0];
    const cover = this.el.nativeElement.getElementsByClassName('Acenter')[0];
    
    // this.render.addClass(cover, 'bk');
    this.render.removeClass(cover, 'dis');
    this.render.addClass(mov, 'move');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 500);
  }

}
