import { Component, OnInit } from '@angular/core';
import {  faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fainstagram = faInstagram;
  faGithub= faGithub;
  constructor() { }

  ngOnInit(): void {
  }

}
