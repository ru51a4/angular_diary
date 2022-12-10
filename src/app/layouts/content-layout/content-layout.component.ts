import {Component} from '@angular/core';
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
  constructor(public global: GlobalService, private router: Router, private api: ApiService) {

    function getRandomInt(min: any, max: any) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    function getBg() {
      fetch(`https://wall.alphacoders.com/api2.0/get.php?method=wallpaper_info&id=${getRandomInt(100000, 999999)}&auth=5319095c1bc840c137ad33138d7f997f`).then(response => response.json())
        .then((data) => {
          if (data?.wallpaper?.url_thumb) {
            setTimeout(() => {
              document.body.style.background = `url('${data.wallpaper.url_thumb}') repeat`;
            }, 700)
          } else {
            getBg();
          }
        });
    }

    getBg();

    document.addEventListener("DOMContentLoaded", () => {
      // @ts-ignore
      document.querySelector("footer").addEventListener('click', event => {
        console.log("asd")
        document.body.style.background = `url(https://thumbs.gfycat.com/PotableEmbarrassedFrenchbulldog-max-1mb.gif) repeat`;
        getBg();
      });

    })
  }

  logout() {
    this.api.logout()
  }
}

