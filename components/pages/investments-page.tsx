"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  TrendingDown,
  Star,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bitcoin,
  DollarSign,
  BarChart3,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react"

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.72, change: 2.34, changePercent: 1.33, isFavorite: true },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -1.25, changePercent: -0.87, isFavorite: true },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.56, changePercent: 1.22, isFavorite: false },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, change: 3.12, changePercent: 1.78, isFavorite: true },
  { symbol: "TSLA", name: "Tesla Inc.", price: 177.48, change: -5.67, changePercent: -3.10, isFavorite: false },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, change: 12.45, changePercent: 1.44, isFavorite: true },
]

const crypto = [
  { symbol: "BTC", name: "Bitcoin", price: 67234.50, change: 1245.30, changePercent: 1.89, isFavorite: true },
  { symbol: "ETH", name: "Ethereum", price: 3456.78, change: -45.23, changePercent: -1.29, isFavorite: true },
  { symbol: "SOL", name: "Solana", price: 145.67, change: 8.90, changePercent: 6.51, isFavorite: false },
  { symbol: "ADA", name: "Cardano", price: 0.45, change: 0.02, changePercent: 4.65, isFavorite: true },
  { symbol: "XRP", name: "Ripple", price: 0.52, change: -0.01, changePercent: -1.89, isFavorite: false },
  { symbol: "DOGE", name: "Dogecoin", price: 0.12, change: 0.008, changePercent: 7.14, isFavorite: false },
]

const portfolio = [
  { symbol: "AAPL", name: "Apple Inc.", quantity: 10, avgPrice: 165.00, currentPrice: 178.72, type: "stock" },
  { symbol: "BTC", name: "Bitcoin", quantity: 0.5, avgPrice: 62000, currentPrice: 67234.50, type: "crypto" },
  { symbol: "ETH", name: "Ethereum", quantity: 2, avgPrice: 3200, currentPrice: 3456.78, type: "crypto" },
  { symbol: "NVDA", name: "NVIDIA Corp.", quantity: 5, avgPrice: 750, currentPrice: 875.28, type: "stock" },
]

export function InvestmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showTradeDialog, setShowTradeDialog] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [showBalance, setShowBalance] = useState(true)
  const [favorites, setFavorites] = useState<string[]>(["AAPL", "GOOGL", "AMZN", "NVDA", "BTC", "ETH", "ADA"])

  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0)
  const totalInvested = portfolio.reduce((sum, item) => sum + item.quantity * item.avgPrice, 0)
  const totalProfit = totalPortfolioValue - totalInvested
  const profitPercent = (totalProfit / totalInvested) * 100

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    )
  }

  const openTradeDialog = (asset: any, type: "buy" | "sell") => {
    setSelectedAsset(asset)
    setTradeType(type)
    setShowTradeDialog(true)
  }

  const filteredStocks = stocks.filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCrypto = crypto.filter(c => 
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Investicije</h1>
            <p className="text-muted-foreground">Pratite i trgujte akcijama i kripto valutama</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/30 via-primary/20 to-card border-primary/30 md:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Ukupna vrednost portfolija</p>
                <Badge className={totalProfit >= 0 ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)]" : "bg-destructive/20 text-destructive"}>
                  {totalProfit >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {totalProfit >= 0 ? "+" : ""}{profitPercent.toFixed(2)}%
                </Badge>
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">
                {showBalance ? `$${totalPortfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
              </p>
              <p className={`text-sm ${totalProfit >= 0 ? "text-[oklch(0.7_0.18_150)]" : "text-destructive"}`}>
                {showBalance ? `${totalProfit >= 0 ? "+" : ""}$${totalProfit.toLocaleString("en-US", { minimumFractionDigits: 2 })} profit` : ""}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <p className="text-sm text-muted-foreground">Raspodela</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">Akcije</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">62%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[oklch(0.8_0.15_85)]" />
                    <span className="text-sm text-foreground">Kripto</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">38%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Portfolio */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Moj portfolio</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs text-muted-foreground font-medium p-4">Simbol</th>
                    <th className="text-right text-xs text-muted-foreground font-medium p-4">Količina</th>
                    <th className="text-right text-xs text-muted-foreground font-medium p-4">Prosečna cena</th>
                    <th className="text-right text-xs text-muted-foreground font-medium p-4">Trenutna cena</th>
                    <th className="text-right text-xs text-muted-foreground font-medium p-4">Profit/Gubitak</th>
                    <th className="text-right text-xs text-muted-foreground font-medium p-4">Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((item) => {
                    const profitLoss = (item.currentPrice - item.avgPrice) * item.quantity
                    const profitLossPercent = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100
                    return (
                      <tr key={item.symbol} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === "crypto" ? "bg-[oklch(0.8_0.15_85)]/20" : "bg-primary/20"}`}>
                              {item.type === "crypto" ? <Bitcoin className="w-4 h-4 text-[oklch(0.8_0.15_85)]" /> : <DollarSign className="w-4 h-4 text-primary" />}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{item.symbol}</p>
                              <p className="text-xs text-muted-foreground">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right text-foreground">{item.quantity}</td>
                        <td className="p-4 text-right text-foreground">${item.avgPrice.toLocaleString()}</td>
                        <td className="p-4 text-right text-foreground">${item.currentPrice.toLocaleString()}</td>
                        <td className={`p-4 text-right font-medium ${profitLoss >= 0 ? "text-[oklch(0.7_0.18_150)]" : "text-destructive"}`}>
                          {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)} ({profitLossPercent.toFixed(1)}%)
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => openTradeDialog(item, "buy")}>Kupi</Button>
                            <Button size="sm" variant="secondary" onClick={() => openTradeDialog(item, "sell")}>Prodaj</Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Pretraži akcije i kripto valute..." 
            className="pl-10 bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Market Tabs */}
        <Tabs defaultValue="stocks" className="w-full">
          <TabsList className="bg-card border border-border w-full md:w-auto">
            <TabsTrigger value="stocks" className="flex-1 md:flex-none gap-2">
              <DollarSign className="w-4 h-4" />
              Akcije
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex-1 md:flex-none gap-2">
              <Bitcoin className="w-4 h-4" />
              Kripto
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1 md:flex-none gap-2">
              <Star className="w-4 h-4" />
              Omiljene
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="mt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredStocks.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleFavorite(stock.symbol)}>
                          <Star className={`w-5 h-5 ${favorites.includes(stock.symbol) ? "fill-[oklch(0.8_0.15_85)] text-[oklch(0.8_0.15_85)]" : "text-muted-foreground"}`} />
                        </button>
                        <div>
                          <p className="font-medium text-foreground">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-foreground">${stock.price.toFixed(2)}</p>
                          <p className={`text-xs ${stock.change >= 0 ? "text-[oklch(0.7_0.18_150)]" : "text-destructive"}`}>
                            {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openTradeDialog(stock, "buy")}>Kupi</Button>
                          <Button size="sm" variant="outline" onClick={() => openTradeDialog(stock, "sell")}>Prodaj</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crypto" className="mt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredCrypto.map((coin) => (
                    <div key={coin.symbol} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleFavorite(coin.symbol)}>
                          <Star className={`w-5 h-5 ${favorites.includes(coin.symbol) ? "fill-[oklch(0.8_0.15_85)] text-[oklch(0.8_0.15_85)]" : "text-muted-foreground"}`} />
                        </button>
                        <div>
                          <p className="font-medium text-foreground">{coin.symbol}</p>
                          <p className="text-xs text-muted-foreground">{coin.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-foreground">${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                          <p className={`text-xs ${coin.change >= 0 ? "text-[oklch(0.7_0.18_150)]" : "text-destructive"}`}>
                            {coin.change >= 0 ? "+" : ""}{coin.changePercent.toFixed(2)}%
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openTradeDialog(coin, "buy")}>Kupi</Button>
                          <Button size="sm" variant="outline" onClick={() => openTradeDialog(coin, "sell")}>Prodaj</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {[...stocks.filter(s => favorites.includes(s.symbol)), ...crypto.filter(c => favorites.includes(c.symbol))].map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleFavorite(item.symbol)}>
                          <Star className="w-5 h-5 fill-[oklch(0.8_0.15_85)] text-[oklch(0.8_0.15_85)]" />
                        </button>
                        <div>
                          <p className="font-medium text-foreground">{item.symbol}</p>
                          <p className="text-xs text-muted-foreground">{item.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-foreground">${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                          <p className={`text-xs ${item.change >= 0 ? "text-[oklch(0.7_0.18_150)]" : "text-destructive"}`}>
                            {item.change >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openTradeDialog(item, "buy")}>Kupi</Button>
                          <Button size="sm" variant="outline" onClick={() => openTradeDialog(item, "sell")}>Prodaj</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Trade Dialog */}
      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {tradeType === "buy" ? "Kupi" : "Prodaj"} {selectedAsset?.symbol}
            </DialogTitle>
            <DialogDescription>
              Trenutna cena: ${selectedAsset?.price?.toLocaleString() || selectedAsset?.currentPrice?.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Količina</label>
              <Input type="number" placeholder="0" className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Ukupno</label>
              <Input type="text" placeholder="$0.00" disabled className="bg-secondary border-border" />
            </div>
            <Button className="w-full" onClick={() => setShowTradeDialog(false)}>
              {tradeType === "buy" ? "Potvrdi kupovinu" : "Potvrdi prodaju"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
