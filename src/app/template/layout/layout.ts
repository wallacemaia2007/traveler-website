import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layout-props';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthGooleService } from '../../services/auth-goole-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationData } from '../../dialog/confirmation-component/ConfirmationData';
import { ConfirmationComponent } from '../../dialog/confirmation-component/confirmation-component';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  props: LayoutProps = { titulo: '', subTitulo: '' };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: AuthGooleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(() => this.activatedRoute.firstChild !== null),
        map(() => this.obterPropriedadesLayout())
      )
      .subscribe((props: LayoutProps) => (this.props = props));
  }

  obterPropriedadesLayout(): LayoutProps {
    let rotaChildren = this.activatedRoute.firstChild;

    while (rotaChildren?.firstChild) {
      rotaChildren = rotaChildren.firstChild;
    }
    return rotaChildren?.snapshot.data as LayoutProps;
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: {
        title: 'Realizar Logout',
        message: 'Tem certeza que deseja sair?',
        confirmText: 'Sair',
        cancelText: 'Cancelar',
      } as ConfirmationData,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '150ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loginService.logout();
        this.router.navigate(['/']);
      }
    });
  }

  home() {
    this.router.navigate(['/']);
  }
}
