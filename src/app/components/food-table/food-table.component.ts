import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.scss']
})
export class FoodTableComponent implements OnInit {
  foods: any[] = [];
  searchTerm: string = '';
  sortKey: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  startDate: string = '';
  endDate: string = '';
  showAddForm: boolean = false;
  newFood: any = { Product: '', TotalPrice: 0, OrderDate: '' };
  editFood: any = null;

  itemsPerPageOptions: number[] = [5, 10, 20, 50];
  itemsPerPage: number = 10;
  currentPage: number = 5;

  constructor(private foodService: FoodService) {}

  async ngOnInit() {
    await this.loadFoods();
  }

  async loadFoods() {
  const params: any = {};
  if (this.searchTerm) params.search = this.searchTerm;
  if (this.sortKey) {
    params.sort = this.sortKey;
    params.direction = this.sortDirection;
  }
  if (this.startDate && this.endDate) {
    params.start = this.startDate;
    params.end = this.endDate;
  }

  const response = await this.foodService.getFoods(params);
  this.foods = response || [];  // ✅ ดึง array ออกมาใช้งาน

  this.foods = this.foods.map(food => {
    if (typeof food.OrderDate === 'number') {
      food.OrderDateString = this.convertExcelDate(food.OrderDate);
    } else {
      food.OrderDateString = food.OrderDate; 
    }
    return food;
  });

  this.currentPage = 1;
}

  openAddForm() {
    this.showAddForm = true;
    this.newFood = { Product: '', TotalPrice: 0, OrderDate: '' };
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newFood = { Product: '', TotalPrice: 0, OrderDate: '' };
  }

  async addFood() {
    if (!this.newFood.Product || !this.newFood.TotalPrice || !this.newFood.OrderDate) {
      alert('Please fill all fields.');
      return;
    }

    await this.foodService.addFood(this.newFood);
    this.showAddForm = false;
    await this.loadFoods();
  }

  openEditForm(food: any) {
    this.editFood = { ...food };
  }

  async updateFood() {
    if (!this.editFood.Product || !this.editFood.TotalPrice || !this.editFood.OrderDate) {
      alert('Please fill all fields.');
      return;
    }

    await this.foodService.updateFood(this.editFood.id, this.editFood);
    this.editFood = null;
    await this.loadFoods();
  }

  async deleteFood(id: string) {
    if (confirm('Are you sure you want to delete this record?')) {
      await this.foodService.deleteFood(id);
      await this.loadFoods();
    }
  }

  async filterByDate() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    await this.loadFoods();
  }

  async searchFoods() {
    await this.loadFoods();
  }

  async sortBy(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    await this.loadFoods();
  }

  convertExcelDate(serial: number | undefined | null): string {
  if (serial == null || isNaN(serial)) {
    return '';
  }
  const utc_days = serial - 25569;
  const utc_value = utc_days * 86400 * 1000;
  const date = new Date(utc_value);

  if (isNaN(date.getTime())) {
    return '';
  }
    return date.toISOString().split('T')[0];
  }

  getTotalSales(): number {
    return this.foods.reduce((sum, food) => sum + food.TotalPrice, 0);
  }

  getAveragePrice(): number {
    return this.foods.length > 0 ? this.getTotalSales() / this.foods.length : 0;
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }

  get paginatedFoods() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.foods.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.foods.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
  }
  getPagesToShow(): number[] {
  const total = this.totalPages;
  const current = this.currentPage;
  const maxPages = 5;
  let startPage: number, endPage: number;

  if (total <= maxPages) {
    startPage = 1;
    endPage = total;
  } else {
    startPage = current - 2;
    endPage = current + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = 5;
    }
    if (endPage > total) {
      endPage = total;
      startPage = total - 4;
    }
  }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
