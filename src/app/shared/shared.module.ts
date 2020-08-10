
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const materialModules = [
    MatInputModule,
    MatRadioModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
];

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ...materialModules,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ...materialModules,
    ],
    entryComponents: [],
})
export class SharedModule { }
