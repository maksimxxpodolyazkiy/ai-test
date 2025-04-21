import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

interface Expense {
  category: string;
  amount: number;
}

@Component({
  selector: 'expense-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="max-width:600px;margin:auto;padding:1rem;">
      <h1>Expense Calculator</h1>

      <table class="table" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr><th style="text-align:left;">Category</th><th style="text-align:right;">Amount ($)</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of expenses()">
            <td>{{ e.category }}</td>
            <td style="text-align:right;">{{ e.amount | number:'1.0-0' }}</td>
          </tr>
        </tbody>
      </table>

      <div class="add-expense" style="display:flex;gap:0.5rem;margin-top:1rem;">
        <input placeholder="Category" [(ngModel)]="newCategory" style="flex:1 1 auto;padding:0.25rem 0.5rem;">
        <input placeholder="Amount" type="number" [(ngModel)]="newAmount" style="width:120px;padding:0.25rem 0.5rem;">
        <button (click)="addExpense()" style="padding:0.25rem 0.75rem;">Add</button>
      </div>

      <button (click)="calculate()" style="margin-top:1rem;padding:0.5rem 1.25rem;">Calculate</button>

      <div *ngIf="showResults()" class="results" style="margin-top:1.5rem;">
        <h2>Results</h2>
        <p><strong>Total:</strong> {{ total() | number:'1.0-0' }} $</p>
        <p><strong>Average per day:</strong> {{ averageDaily() | number:'1.0-0' }} $</p>
        <h3>Top 3 expenses</h3>
        <ol>
          <li *ngFor="let e of top3()">{{ e.category }} ({{ e.amount | number:'1.0-0' }} $)</li>
        </ol>
      </div>
    </div>
  `,
  styles: []
})
export class ExpenseCalculatorComponent {
  expenses = signal<Expense[]>([
    { category: 'Groceries', amount: 15000 },
    { category: 'Rent', amount: 40000 },
    { category: 'Transportation', amount: 5000 },
    { category: 'Entertainment', amount: 10000 },
    { category: 'Communication', amount: 2000 },
    { category: 'Gym', amount: 3000 },
  ]);

  newCategory: string = '';
  newAmount: number | null = null;

  addExpense() {
    if (!this.newCategory || this.newAmount == null || isNaN(this.newAmount)) {
      return;
    }
    this.expenses.update(exp => [...exp, { category: this.newCategory.trim(), amount: this.newAmount! }]);
    this.newCategory = '';
    this.newAmount = null;
  }

  total = computed(() => this.expenses().reduce((sum, e) => sum + e.amount, 0));
  averageDaily = computed(() => this.total() / 30);
  top3 = computed(() => [...this.expenses()].sort((a, b) => b.amount - a.amount).slice(0, 3));

  showResults = signal(false);
  calculate() {
    this.showResults.set(true);
  }
}

bootstrapApplication(ExpenseCalculatorComponent)
  .catch(err => console.error(err));
