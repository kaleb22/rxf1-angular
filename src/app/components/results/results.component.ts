import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResult } from 'src/app/model/iresult';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit  {

  constructor() { }

  @Input() title: string;
  @Input() set setResults(results: IResult[]) {
    this.results = results;
    this.dataSource = new MatTableDataSource<IResult>(results);
    this.dataSource.paginator = this.paginator;

    if(results[0].points) {
      this.showStandings = true;
    } else {
      this.showStandings = false;
    }
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columnsStanding = ['points', 'position', 'driver-name', 'constructor']
  columnsToDisplay = ['position', 'driver-name', 'constructor'];
  dataSource: MatTableDataSource<IResult>;
  results: IResult[];
  showStandings: boolean;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
