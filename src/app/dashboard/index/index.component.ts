import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IRow } from '../../types/row';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<IRow> = new MatTableDataSource<IRow>([]);

  page = 0;
  rowsPerPage = 10;
  totalRows = 0;

  displayedColumns: string[] = [
    'id',
    'airport',
    'currentTime',
    'departureTime',
    'arrivalTime',
  ];

  constructor() {}

  async ngOnInit() {
    try {
      const url = this.getFlightDataUrl();
      const response: AxiosResponse = await axios.get(url);
      if (response.data) {
        this.dataSource.data = response.data
          .filter(
            (el: any) =>
              el.estArrivalAirport !== null || el.estDepartureAirport !== null
          )
          .map((el: any, i: number) => this.formatFlightObject(el, i + 1));
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getFlightDataUrl = () => {
    var currentTime = Math.floor(Date.now() / 1000); // Get current time in Unix format
    var twoHoursAgo = currentTime - 2 * 60 * 60; // Calculate timestamp for two hours ago
    return `https://opensky-network.org/api/flights/all?begin=${twoHoursAgo}&end=${currentTime}`; // Construct URL for retrieving flight data within the specified time range
  };

  formatFlightObject = (flightObj: any, id: number) => {
    var airport = flightObj.estArrivalAirport || flightObj.estDepartureAirport; // Extract airport information from either estimated arrival or departure airport
    var currentTime = new Date().toLocaleTimeString(); // Get current time as localized string
    var departureTime = new Date(
      flightObj.firstSeen * 1000
    ).toLocaleTimeString(); // Convert firstSeen timestamp to localized departure time
    var arrivalTime = flightObj.lastSeen
      ? new Date(flightObj.lastSeen * 1000).toLocaleTimeString()
      : 'N/A'; // Convert lastSeen timestamp to localized arrival time if available; otherwise, set as "N/A"
    var formattedObj = { airport, currentTime, arrivalTime, departureTime, id }; // Combine extracted information into a formatted object
    return formattedObj; // Return the formatted object
  };
}
