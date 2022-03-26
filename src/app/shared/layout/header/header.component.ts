import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome(): void {
    window.location.href = 'http://ec2-3-85-128-140.compute-1.amazonaws.com/home'
  }
}
