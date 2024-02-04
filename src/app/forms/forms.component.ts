import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslatedWord } from '../models/translatedword';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category';
import Language from '../models/Language';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule, CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, RouterModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
  name: string = ""
  words: TranslatedWord[] = []
  isEdit: boolean = false;
  id: number = -1;

  showAddWord: boolean = false;
  origin: string = '';
  target: string = '';
  constructor(private service: CategoryService, private router: Router, private activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    // http://localhost:4200/edit/2
    // path: "edit/:id"
    this.activeRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        const category = this.service.get(+params['id']);
        if (category) {
          this.name = category.name;
          this.words = category.words;
          this.id = category.id;
          this.isEdit = true;
        }
      }
    })
  }

  onShowAddWord(){
    this.showAddWord = true;
  }
  addWord(){
    this.words.push(new TranslatedWord(this.origin, this.target));
    this.origin = '';
    this.target = '';
    this.showAddWord = false;
  }
  deleteWord(index: number){
    this.words.splice(index, 1);
  }
  save() {
    if(this.name.length === 0 || this.words.length == 0){

      return;
    }
    const cat = new Category(this.id, this.name, Language.ENGLISH, Language.HEBREW);
    cat.words = this.words
    if (this.isEdit) {
      this.service.update(cat);
    } else {
      this.service.add(cat)
    }

    this.router.navigate(["/"])
  }

}
