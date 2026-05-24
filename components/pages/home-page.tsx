"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  TrendingDown,
  Receipt,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Zap,
  Calendar,
  CreditCard,
} from "lucide-react"

const recentTransactions = [
  { id: 1, name: "Maxi Market", amount: -2450, date: "Danas", category: "Kupovina", icon: ShoppingBag },
  { id: 2, name: "Plata - IT Solutions", amount: 185000, date: "22. Maj", category: "Prihod", icon: ArrowDownRight },
  { id: 3, name: "Netflix pretplata", amount: -1499, date: "20. Maj", category: "Pretplata", icon: Receipt },
  { id: 4, name: "Gorivo - NIS", amount: -5800, date: "19. Maj", category: "Transport", icon: TrendingDown },
  { id: 5, name: "Telenor račun", amount: -2999, date: "18. Maj", category: "Računi", icon: Receipt },
]

const upcomingBills = [
  { id: 1, name: "Struja - EPS", amount: 4200, dueDate: "28. Maj", status: "pending" },
  { id: 2, name: "Infostan", amount: 8500, dueDate: "01. Jun", status: "pending" },
  { id: 3, name: "Internet - SBB", amount: 2999, dueDate: "05. Jun", status: "scheduled" },
  { id: 4, name: "Osiguranje vozila", amount: 3200, dueDate: "10. Jun", status: "pending" },
]

export function HomePage() {
  const balance = 342567.89
  const monthlySpending = 45230
  const monthlyBudget = 80000
  const spendingPercentage = (monthlySpending / monthlyBudget) * 100

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Dobrodošli nazad,</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Marko Petrović</h1>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Gold član
          </Badge>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary/30 via-primary/20 to-card border-primary/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-1 flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Raspoloživo stanje
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  {balance.toLocaleString("sr-RS", { minimumFractionDigits: 2 })} <span className="text-2xl">RSD</span>
                </h2>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-[oklch(0.7_0.18_150)] text-[oklch(0.1_0_0)] border-0">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12.5%
                  </Badge>
                  <span className="text-sm text-muted-foreground">u odnosu na prošli mesec</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 md:flex-none gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Pošalji
                </Button>
                <Button variant="secondary" className="flex-1 md:flex-none gap-2">
                  <ArrowDownRight className="w-4 h-4" />
                  Primi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Monthly Spending */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Prosečna mesečna potrošnja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {monthlySpending.toLocaleString("sr-RS")} RSD
                  </span>
                  <span className="text-sm text-muted-foreground">od {monthlyBudget.toLocaleString("sr-RS")}</span>
                </div>
                <Progress value={spendingPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {spendingPercentage.toFixed(0)}% budžeta iskorišćeno
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Brze akcije
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Kredit</span>
                </Button>
                <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                  <Receipt className="w-5 h-5" />
                  <span className="text-xs">Računi</span>
                </Button>
                <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                  <ArrowUpRight className="w-5 h-5" />
                  <span className="text-xs">Transfer</span>
                </Button>
                <Button variant="secondary" className="h-auto py-3 flex-col gap-1">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs">Planiraj</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Insight */}
          <Card className="bg-gradient-to-br from-[oklch(0.7_0.18_170)]/20 to-card border-[oklch(0.7_0.18_170)]/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[oklch(0.7_0.18_170)] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Preporuka
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-3">
                Na osnovu vaše potrošnje, možete uštedeti do <strong>8,500 RSD</strong> mesečno prebacivanjem računa na automatsko plaćanje.
              </p>
              <Button variant="outline" size="sm" className="w-full border-[oklch(0.7_0.18_170)]/50 text-[oklch(0.7_0.18_170)]">
                Saznaj više
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Prethodne kupovine
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Vidi sve
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentTransactions.map((transaction) => {
                  const Icon = transaction.icon
                  const isPositive = transaction.amount > 0
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isPositive ? "bg-[oklch(0.7_0.18_150)]/20" : "bg-secondary"
                        }`}>
                          <Icon className={`w-5 h-5 ${isPositive ? "text-[oklch(0.7_0.18_150)]" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.name}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${isPositive ? "text-[oklch(0.7_0.18_150)]" : "text-foreground"}`}>
                        {isPositive ? "+" : ""}{transaction.amount.toLocaleString("sr-RS")} RSD
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bills */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Računi za plaćanje
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Vidi sve
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {upcomingBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[oklch(0.8_0.15_85)]/20 flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-[oklch(0.8_0.15_85)]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{bill.name}</p>
                        <p className="text-xs text-muted-foreground">Rok: {bill.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {bill.amount.toLocaleString("sr-RS")} RSD
                      </span>
                      <Button size="sm" variant={bill.status === "scheduled" ? "secondary" : "default"}>
                        {bill.status === "scheduled" ? "Zakazano" : "Plati"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
