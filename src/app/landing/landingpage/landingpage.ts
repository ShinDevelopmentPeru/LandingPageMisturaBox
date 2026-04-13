import { Component } from '@angular/core';
import { Intro } from '../../components/landing/intro/intro';
import { Navbar } from '../../components/shared/navbar/navbar';
import { Footer } from '../../components/shared/footer/footer';
import { Howitworks } from '../../components/landing/howitworks/howitworks';
import { Boxes } from '../../components/landing/boxes/boxes';
import { Products } from '../../components/landing/products/products';
import { Testimonials } from '../../components/landing/testimonials/testimonials';
import { Bannerfinal } from '../../components/landing/bannerfinal/bannerfinal';

@Component({
  selector: 'app-landingpage',
  imports: [
    Intro,
    Navbar,
    Footer,
    Howitworks,
    Boxes,
    Products,
    Testimonials,
    Bannerfinal

],
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.css',
})
export class Landingpage {

}
