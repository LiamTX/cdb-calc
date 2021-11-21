import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input()
  items: any[] = [];

  displayedColumns: string[] = ['Data', 'Preço unitario'];
  // exampleDatabase: ExampleHttpDatabase | null;
  // @ts-ignore
  data: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.data = new MatTableDataSource(this.items);
    // this.data.paginator = this.paginator;
    this.resultsLength = this.items.length;
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

}
