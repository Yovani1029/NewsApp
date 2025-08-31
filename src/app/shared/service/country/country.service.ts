import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from 'src/app/interfaces/country.page';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data.map((c: any) => ({
        id: c.name,
        name: c.name,
        flag: c.flag
      })))
    );
  }
}
