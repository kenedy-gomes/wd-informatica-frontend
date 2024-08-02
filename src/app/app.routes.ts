import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ContatoComponent} from './contato/contato.component';
import {SobreComponent} from './sobre/sobre.component';
import { PlanosComponent } from './planos/planos.component';
import { PainelComponent } from './painel/painel.component';
import { ListagemAdminComponent } from './admin/listagem-admin/listagem-admin.component';
import { PerfilComponent } from './perfil/perfil.component';
import {PlanDetailComponent} from './plan-detail/plan-detail.component';
import {SolicitacaoPlanoComponent} from './solicitacao-plano/solicitacao-plano.component';
import {MensagensComponent} from './mensagens/mensagens.component';

import {AuthGuard} from "./auth-guard";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contato', component: ContatoComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    { path: 'planos', component: PlanosComponent, canActivate: [AuthGuard] },
    { path: 'plan/:id', component: PlanDetailComponent, canActivate: [AuthGuard] },
    { path: 'admin/painel', component: PainelComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'admin/listagem', pathMatch: 'full' },
            { path: 'admin/listagem', component: ListagemAdminComponent, canActivate: [AuthGuard]},
            { path: 'admin/solicitacao', component: SolicitacaoPlanoComponent, canActivate: [AuthGuard]},
            { path: 'admin/mensagens', component: MensagensComponent, canActivate: [AuthGuard]}
    ]
}
      
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
