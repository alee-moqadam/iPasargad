import { NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-animated-background',
  standalone: true,
  imports: [NgFor],
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss']
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
  squares: number[] = [];
  colors: string[] = ['#f9fcff', '#ebf5ff', '#f1f8ff', '#ffffff00', '#ffffff00', '#ffffff00'];
  colorStyles: string[] = [];
  opacityStyles: number[] = [];
  intervalIds: ReturnType<typeof setInterval>[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.squares = Array.from({ length: 1000 }, (_, i) => i + 1);
    this.colorStyles = Array(this.squares.length).fill('#ffffff00');
    this.opacityStyles = Array(this.squares.length).fill(1); 
  }

  ngOnInit(): void {
    this.squares.forEach((_, index) => {
      this.opacityStyles[index] = this.calculateOpacity(index);
      const intervalId = setInterval(() => this.changeColor(index), this.getRandomInterval());
      this.intervalIds[index] = intervalId; 
    });
  }

  ngOnDestroy(): void {
    this.intervalIds.forEach(intervalId => clearInterval(intervalId));
  }

  changeColor(index: number): void {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.colorStyles[index] = randomColor; 
    this.cdr.detectChanges();
  }

  getRandomInterval(): number {
    return Math.floor(Math.random() * 5000) + 1000;
  }

  calculateOpacity(index: number): number {
    const maxOpacity = 1;
    const minOpacity = 0.5;
    const totalSquares = this.squares.length - 1;

    return maxOpacity - ((maxOpacity - minOpacity) * index) / totalSquares;
  }
}
