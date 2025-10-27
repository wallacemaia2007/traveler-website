import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layout-props';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit{

  props: LayoutProps = { titulo: '', subTitulo: ''}

  constructor( private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.router.events.pipe(
      filter( () => this.activatedRoute.firstChild !== null), map( () => this.obterPropriedadesLayout())
    ).subscribe( (props: LayoutProps) => this.props = props )

      
  }

  obterPropriedadesLayout(): LayoutProps{
    let rotaChildren = this.activatedRoute.firstChild;

    while(rotaChildren?.firstChild){
      rotaChildren = rotaChildren.firstChild;
    }
    return rotaChildren?.snapshot.data as LayoutProps;
  }

}
