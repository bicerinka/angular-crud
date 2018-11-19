import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
    regions: Array = [];

    constructor(private comment: CommentService) {
    }

    ngOnInit() {
        const obj = this.comment.getStatRegions();
        for (let key in obj) {
            obj[key] > 5 && this.regions.push({
                name: key,
                count: obj[key],
                hide: true,
            });
        }
    }

    showCity(region: string, i: number): void {
      if (!this.regions[i].city) {
          const obj = this.comment.getStatCity(region);
          this.regions[i].city = [];
          for (let key in obj) {
              this.regions[i].city.push({
                  name: key,
                  count: obj[key],
              });
          }
      }
    }

}
