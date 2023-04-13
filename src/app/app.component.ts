import { Component, HostListener } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder, private appService: AppService) {}

  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })

  carItems = [
    {
      name: "Lamborghini Huracan Spyder",
      image: "car1.png",
      transmission: "автомат",
      engine: 5.2,
      year: 2019,
    },
    {
      name: "Chevrolet Corvette",
      image: "car2.png",
      transmission: "автомат",
      engine: 6.2,
      year: 2017,
    },
    {
      name: "Ferrari California",
      image: "car3.png",
      transmission: "автомат",
      engine: 3.9,
      year: 2010,
    },
    {
      name: "Lamborghini Urus",
      image: "car4.png",
      transmission: "автомат",
      engine: 4.0,
      year: 2019,
    },
    {
      name: "Audi R8",
      image: "car5.png",
      transmission: "автомат",
      engine: 5.2,
      year: 2018,
    },
    {
      name: "Chevrolet Camaro",
      image: "car6.png",
      transmission: "автомат",
      engine: 2.0,
      year: 2019,
    },
    {
      name: "Maserati Quattroporte",
      image: "car7.png",
      transmission: "автомат",
      engine: 5.2,
      year: 2019,
    },
    {
      name: "Dodge Challenger",
      image: "car8.png",
      transmission: "автомат",
      engine: 6.4,
      year: 2019,
    },
    {
      name: "Nissan GT-R",
      image: "car9.png",
      transmission: "автомат",
      engine: 3.8,
      year: 2019,
    }
  ];

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name});
    }
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.1 * window.scrollY) + 'px'};
  }

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService.sendQuery(this.priceForm.value)
        .subscribe({
          next: (res: any) => {
            alert(res.message);
            this.priceForm.reset();
          },
          error: (res: any) => {
            alert(res.error.message);
          }
        });
    }
  }
}
