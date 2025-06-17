import { Component, OnInit } from '@angular/core';

interface SaleRecord {
  id: string;
  [key: string]: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sales: SaleRecord[] = [];
  filteredSales: SaleRecord[] = [];
  search = '';
  sortField: string | null = null;
  sortAsc = true;

  showModal = false;
  editRecord: SaleRecord | null = null;
  newRecord: SaleRecord = { id: '' };

  API_URL = 'http://localhost:4000/api/sales';

  ngOnInit() {
    this.fetchSales();
  }

  async fetchSales() {
    try {
      const res = await fetch(this.API_URL);
      const data = await res.json();
      this.sales = data;
      this.applyFilterSort();
    } catch (error) {
      console.error('Fetch sales error:', error);
    }
  }

  applyFilterSort() {
    // Filter by search
    this.filteredSales = this.sales.filter(record => {
      if (!this.search) return true;
      return Object.values(record).some(val =>
        String(val).toLowerCase().includes(this.search.toLowerCase())
      );
    });

    // Sort
    if (this.sortField) {
      this.filteredSales.sort((a, b) => {
        if (a[this.sortField!] < b[this.sortField!]) return this.sortAsc ? -1 : 1;
        if (a[this.sortField!] > b[this.sortField!]) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }
  }

  onSearchChange() {
    this.applyFilterSort();
  }

  onSort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.applyFilterSort();
  }

  openModal(record: SaleRecord | null) {
    this.editRecord = record;
    this.newRecord = record ? { ...record } : { id: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async saveRecord() {
    try {
      if (!this.newRecord.id) {
        alert('Please enter an ID for the record');
        return;
      }

      if (this.editRecord) {
        // PUT update
        await fetch(`${this.API_URL}/${this.newRecord.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newRecord)
        });
      } else {
        // POST new
        await fetch(this.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newRecord)
        });
      }
      this.showModal = false;
      this.fetchSales();
    } catch (error) {
      console.error('Save record error:', error);
    }
  }

  async deleteRecord(id: string) {
    if (!confirm('Delete this record?')) return;
    try {
      await fetch(`${this.API_URL}/${id}`, { method: 'DELETE' });
      this.fetchSales();
    } catch (error) {
      console.error('Delete record error:', error);
    }
  }

  getKeys(): string[] {
    if (this.sales.length > 0) {
      return Object.keys(this.sales[0]);
    }
    return [];
  }
}
