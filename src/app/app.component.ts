import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './services/api.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  investmentDate: Date = new Date();
  cdbRate: number = 0;
  currentDate: Date = new Date();

  loading = false;

  // @ts-ignore
  chart: Chart;

  haveData: boolean = false;
  items: any[] = [];

  @ViewChild('graphic', { static: true })
  // @ts-ignore
  element: ElementRef;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    Chart.register(...registerables);
  }

  calcCdb() {
    if (this.cdbRate == 0) {
      this.toastr.warning('Preencha o cdb rate!', 'Ops', {
        positionClass: 'toast-top-center'
      });
      return
    }

    this.loading = true;

    const payload = {
      investmentDate: format(this.investmentDate, 'yyyy-MM-dd'),
      cdbRate: this.cdbRate,
      currentDate: format(this.currentDate, 'yyyy-MM-dd')
    }

    this.apiService.calcCdb(payload).then(resp => {
      resp.subscribe(data => {
        if (data.length != 0) {
          this.haveData = true;
        }

        this.items = data;

        this.createChartGraphic()
        this.loading = false;
      }, err => {
        console.log(err);
        this.loading = true;
      });
    });
  }

  createChartGraphic() {
    if (this.chart) {
      this.chart.destroy();
    }
    
    let labels = [];
    let datas = [];

    for (let item of this.items) {
      labels.push(item.date);
      datas.push(item.unitPrice);
    }

    this.chart = new Chart(this.element.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Data',
            backgroundColor: 'red',
            data: datas,
            borderColor: 'red'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Grafico da pesquisa'
          }
        }
      },
    });


  }
}
