import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICalcCdbRequestDto } from '../dtos/calc-cdb-request.dto';
import { ICalcCdbResponseDto } from '../dtos/calc-cdb-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async calcCdb(data: ICalcCdbRequestDto): Promise<Observable<ICalcCdbResponseDto[]>> {
    return this.http.post<ICalcCdbResponseDto[]>(`${environment.baseUrl}/cdb`, data);
  }
}
