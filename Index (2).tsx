import { useState } from "react";
import { ExpenseDialog } from "@/components/ExpenseDialog";
import { BudgetCard } from "@/components/BudgetCard";
import { TransactionList } from "@/components/TransactionList";
import { SpendingChart } from "@/components/SpendingChart";
import { Wallet, TrendingDown, DollarSign } from "lucide-react";

interface Expense {
id: string;
amount: number;
category: string;
description: string;
date: string;
}

const INITIAL_BUDGETS = [
{ category: "Groceries", icon: "🛒", budget: 500, key: "groceries" },
{ category: "Dining Out", icon: "🍽️", budget: 300, key: "dining" },
{ category: "Transport", icon: "🚗", budget: 200, key: "transport" },
{ category: "Entertainment", icon: "🎬", budget: 150, key: "entertainment" },
{ category: "Shopping", icon: "🛍️", budget: 250, key: "shopping" },
{ category: "Other", icon: "📌", budget: 100, key: "other" },
];

const Index = () => {
const [expenses, setExpenses] = useState<Expense[]>([]);

const handleAddExpense = (expense: Omit<Expense, "id">) => {
const newExpense = {
...expense,
id: Date.now().toString(),
};
setExpenses([newExpense, ...expenses]);
};

// Calculate spending by category
const spendingByCategory = expenses.reduce((acc, expense) => {
acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
return acc;
}, {} as Record<string, number>);

const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
const totalBudget = INITIAL_BUDGETS.reduce((sum, budget) => sum + budget.budget, 0);

// Prepare chart data
const chartData = Object.entries(spendingByCategory).map(([name, value]) => ({
name,
value,
color: "",
}));

return (
<div className="min-h-screen bg-background">
<header className="border-b border-border bg-card">
<div className="container mx-auto px-4 py-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="p-2 bg-gradient-to-br from-primary to-primary-glow rounded-xl">
<Wallet className="h-6 w-6 text-primary-foreground" />
</div>
<div>
<h1 className="text-2xl font-bold text-foreground">SpendWise</h1>
<p className="text-sm text-muted-foreground">Track your expenses smartly</p>
</div>
</div>
<ExpenseDialog onAddExpense={handleAddExpense} />
</div>
</div>
</header>

<main className="container mx-auto px-4 py-8">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-card rounded-xl p-6 border border-border shadow-sm">
<div className="flex items-center gap-3 mb-2">
<div className="p-2 bg-primary/10 rounded-lg">
<DollarSign className="h-5 w-5 text-primary" />
</div>
<p className="text-sm text-muted-foreground">Total Budget</p>
</div>
<p className="text-3xl font-bold text-foreground">₹{totalBudget.toFixed(2)}</p>
</div>

<div className="bg-card rounded-xl p-6 border border-border shadow-sm">
<div className="flex items-center gap-3 mb-2">
<div className="p-2 bg-destructive/10 rounded-lg">
<TrendingDown className="h-5 w-5 text-destructive" />
</div>
<p className="text-sm text-muted-foreground">Total Spent</p>
</div>
<p className="text-3xl font-bold text-foreground">₹{totalSpent.toFixed(2)}</p>
</div>

<div className="bg-card rounded-xl p-6 border border-border shadow-sm">
<div className="flex items-center gap-3 mb-2">
<div className="p-2 bg-success/10 rounded-lg">
<Wallet className="h-5 w-5 text-success" />
</div>
<p className="text-sm text-muted-foreground">Remaining</p>
</div>
<p className="text-3xl font-bold text-foreground">
₹{(totalBudget - totalSpent).toFixed(2)}
</p>
</div>
</div>

<div className="mb-8">
<h2 className="text-xl font-semibold text-foreground mb-4">Budget Overview</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{INITIAL_BUDGETS.map((budget) => (
<BudgetCard
key={budget.key}
category={budget.category}
icon={budget.icon}
spent={spendingByCategory[budget.key] || 0}
budget={budget.budget}
/>
))}
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<SpendingChart data={chartData} />
<TransactionList transactions={expenses} />
</div>
</main>
</div>
);
};

export default Index;