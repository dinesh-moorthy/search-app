import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() type: 'error' | 'warning' = 'error';
  @Input() message = 'Page not found !!!';

  constructor() {}

  ngOnInit(): void {}
}
