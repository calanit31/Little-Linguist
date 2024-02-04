import { Injectable } from '@angular/core';
import {Category} from '../models/Category';
import Language from '../models/Language';
import { TranslatedWord } from '../models/translatedword';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = new Map<number, Category>();
  nextId = 0;

  constructor(){
    this.categories.set(1, new Category(1,'colors', Language.ENGLISH, Language.HEBREW))
    this.categories.set(2, new Category(2,'animals',  Language.ENGLISH, Language.HEBREW))
    this.categories.set(3, new Category(3,'numbers', Language.ENGLISH, Language.HEBREW))
    this.categories.get(1)!.words.push(new TranslatedWord("yellow", "צהוב"));
    this.categories.get(1)!.words.push(new TranslatedWord("green", "ירוק"));
    this.categories.get(1)!.words.push(new TranslatedWord("blue", "כחול"));
    this.categories.get(2)!.words.push(new TranslatedWord("dog", "כלב"));
    this.categories.get(2)!.words.push(new TranslatedWord("cat", "חתול"));
    this.categories.get(2)!.words.push(new TranslatedWord("bird", "ציפור"));
    this.categories.get(3)!.words.push(new TranslatedWord("one", "אחת"));
    this.categories.get(3)!.words.push(new TranslatedWord("two", "שתים"));
    this.categories.get(3)!.words.push(new TranslatedWord("three", "שלוש"));
  }
  List(): Category[] {
    return Array.from(this.categories.values());
  }
  get(id: number): Category |undefined {
    return this.categories.get(id);
  }
  delete(id: number): void{
    this.categories.delete(id);
  }
  update(category:Category): void{
    if(this.categories.has(category.id)){
      this.categories.set(category.id,category);
    }
  }

   add(newCategoryData: Category) : void {
    newCategoryData.id = this.nextId;
    console.log('shdffdgfdg');
    
    this.categories.set(this.nextId, newCategoryData);
    this.nextId++;
    }
  }

