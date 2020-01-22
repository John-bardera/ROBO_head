import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('main', {static: true}) mainElement: ElementRef;
  mode: 'face' | 'blue' | 'music' | 'text' = 'face';
  input: string;
  contentId = 0;
  setTimeOutFunc: number;
  keyIsLonely: boolean;
  activate = false;
  noiseDuration: number;
  music: HTMLAudioElement;
  isColor = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.activate = false;
    this.activateFace();
    this.keyIsLonely = false;
    clearTimeout(this.setTimeOutFunc);
    this.setTimeOutFunc = 0;
    console.log(event.key);
    this.input = event.key;
    if (['.', 'Clear', '0'].indexOf(this.input) !== -1) {
      this.clearMusic();
      this.mode = 'face';
      this.contentId = 0;
    } else　if (['1', '2', '3'].indexOf(this.input) !== -1) {
      this.clearMusic();
      this.mode = 'face';
      this.contentId = Number(this.input);
    } else　if (['4', '5', '6', '7', '8', '9'].indexOf(this.input) !== -1) {
      this.clearMusic();
      this.mode = 'text';
      this.contentId = Number(this.input);
    } else if (this.input === 'Enter') {
      this.mode = 'music';
      if (!this.music) {
        const musicId = Math.floor(Math.random() * (12 - 1) + 1);
        this.mainElement.nativeElement.style.backgroundImage = 'url(/assets/img/cover/' + musicId + '.jpg)';
        this.mainElement.nativeElement.style.backgroundSize = '100% 100%';
        this.music = new Audio('/assets/music/' + musicId + '.mp3');
        this.music.load();
        this.music.play();
      }
    } else if (this.input === '+') {
      this.clearMusic();
      this.isColor = true;
    } else if (this.input === '-') {
      this.clearMusic();
      this.isColor = false;
    } else {
      this.clearMusic();
      this.mode = 'blue';
    }

    this.setTimeOutFunc = setTimeout(() => {
      this.activate = false;
      this.activateFace();
      this.keyIsLonely = true;
      this.mode = 'face';
      this.contentId = 0;
      this.clearMusic();
    }, 10000);
  }

  constructor() {
    this.activateFace();
    setInterval(() => {
      this.noiseDuration = Math.random() < 0.4 ? 0 : 1 + Math.random();
    }, 2000);
  }
  activateFace() {
    setTimeout(() => this.activate = true, 10);
  }
  clearMusic() {
    this.mainElement.nativeElement.style.backgroundImage = '';
    this.mainElement.nativeElement.style.backgroundSize = '';
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
  }
}
