import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
    SharedModule,
    MatProgressSpinnerModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
