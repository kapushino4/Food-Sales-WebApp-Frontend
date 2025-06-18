import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MOCK_FOOD_DATA } from '../mock-data/mock-food-data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:3001/api/foods';
  private useMock = true; 

  constructor(private http: HttpClient) {}

  async getFoods(params?: any): Promise<any[]> {
    if (this.useMock) {
      let data = MOCK_FOOD_DATA;
      if (params) {
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          data = data.filter(item => item.Product.toLowerCase().includes(searchLower));
        }
        if (params.start && params.end) {
          const startDate = new Date(params.start);
          const endDate = new Date(params.end);
          data = data.filter(item => {
            const orderDate = new Date(item.OrderDate);
            return orderDate >= startDate && orderDate <= endDate;
          });
        }
        if (params.sort) {
          type FoodItem = typeof MOCK_FOOD_DATA[number];
          const [sortKey, sortDir] = params.sort.split(':'); 
          data = data.sort((a: FoodItem, b: FoodItem) => {
            const key = sortKey as keyof FoodItem;
            if (a[key] < b[key]) return sortDir === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortDir === 'asc' ? 1 : -1;
            return 0;
          });
        }
      }
      return Promise.resolve(data);
    } else {
      let httpParams = new HttpParams();
      if (params) {
        if (params.search) httpParams = httpParams.set('search', params.search);
        if (params.sort) httpParams = httpParams.set('sort', params.sort);
        if (params.start) httpParams = httpParams.set('start', params.start);
        if (params.end) httpParams = httpParams.set('end', params.end);
      }
      return this.http.get<any>(this.apiUrl, { params: httpParams }).toPromise()
        .then(result => Array.isArray(result.data) ? result.data : []);
    }
  }

  addFood(food: any): Promise<any> {
    if (this.useMock) {
      console.warn('Mock addFood:', food);
      return Promise.resolve({ success: true });
    }
    return this.http.post<any>(this.apiUrl, food).toPromise();
  }

  updateFood(id: string, food: any): Promise<any> {
    if (this.useMock) {
      console.warn('Mock updateFood:', id, food);
      return Promise.resolve({ success: true });
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, food).toPromise();
  }

  deleteFood(id: string): Promise<any> {
    if (this.useMock) {
      console.warn('Mock deleteFood:', id);
      return Promise.resolve({ success: true });
    }
    return this.http.delete<any>(`${this.apiUrl}/${id}`).toPromise();
  }
}
