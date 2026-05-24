"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Calculator,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Brain,
  FileText,
  ChevronRight,
} from "lucide-react"

export function CreditPage() {
  const [amount, setAmount] = useState(500000)
  const [months, setMonths] = useState(24)
  const [showAiPopup, setShowAiPopup] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Simplified loan calculation (demo purposes)
  const interestRate = 8.99 // Annual interest rate
  const monthlyRate = interestRate / 100 / 12
  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - amount

  const handleSubmit = () => {
    setShowAiPopup(true)
    setTimeout(() => {
      setShowAiPopup(false)
      setShowSuccessDialog(true)
    }, 3000)
  }

  const features = [
    { icon: Zap, title: "Brzo odobrenje", description: "Odgovor za 15 minuta" },
    { icon: Shield, title: "Bez skrivenih troškova", description: "Transparentni uslovi" },
    { icon: TrendingUp, title: "Fleksibilne rate", description: "Prilagođeno vama" },
  ]

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge className="bg-primary/20 text-primary border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Kredit na klik</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Izračunajte vašu mesečnu ratu i pošaljite zahtev za kredit u samo nekoliko klikova
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Calculator */}
          <Card className="bg-card border-border lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Kalkulator kredita
              </CardTitle>
              <CardDescription>
                Podesite iznos i period otplate prema vašim potrebama
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Amount Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Iznos kredita</Label>
                  <span className="text-2xl font-bold text-primary">
                    {amount.toLocaleString("sr-RS")} RSD
                  </span>
                </div>
                <Slider
                  value={[amount]}
                  onValueChange={([value]) => setAmount(value)}
                  min={50000}
                  max={3000000}
                  step={10000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>50.000 RSD</span>
                  <span>3.000.000 RSD</span>
                </div>
              </div>

              {/* Months Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Period otplate</Label>
                  <span className="text-2xl font-bold text-primary">
                    {months} meseci
                  </span>
                </div>
                <Slider
                  value={[months]}
                  onValueChange={([value]) => setMonths(value)}
                  min={6}
                  max={84}
                  step={6}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 meseci</span>
                  <span>84 meseca</span>
                </div>
              </div>

              {/* Quick Select Amounts */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Brzi izbor</Label>
                <div className="flex flex-wrap gap-2">
                  {[100000, 250000, 500000, 1000000, 2000000].map((val) => (
                    <Button
                      key={val}
                      variant={amount === val ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(val)}
                    >
                      {(val / 1000).toLocaleString("sr-RS")}k
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-gradient-to-br from-primary/30 via-primary/20 to-card border-primary/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Vaša mesečna rata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <p className="text-5xl font-bold text-foreground">
                  {Math.round(monthlyPayment).toLocaleString("sr-RS")}
                </p>
                <p className="text-lg text-muted-foreground">RSD / mesečno</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Iznos kredita</span>
                  <span className="text-foreground font-medium">
                    {amount.toLocaleString("sr-RS")} RSD
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ukupna kamata</span>
                  <span className="text-foreground font-medium">
                    {Math.round(totalInterest).toLocaleString("sr-RS")} RSD
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ukupno za otplatu</span>
                  <span className="text-foreground font-medium">
                    {Math.round(totalPayment).toLocaleString("sr-RS")} RSD
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nominalna kamatna stopa</span>
                  <span className="text-foreground font-medium">{interestRate}%</span>
                </div>
              </div>

              <Button className="w-full h-12 text-lg gap-2" onClick={handleSubmit}>
                Pošalji zahtev
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Klikom na dugme prihvatate uslove korišćenja
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Info Banner */}
        <Card className="bg-gradient-to-r from-[oklch(0.7_0.18_170)]/20 via-card to-primary/20 border-[oklch(0.7_0.18_170)]/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[oklch(0.7_0.18_170)]/20 flex items-center justify-center shrink-0">
                <Brain className="w-8 h-8 text-[oklch(0.7_0.18_170)]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  AI/ML Brzo Odobrenje Kredita
                </h3>
                <p className="text-sm text-muted-foreground">
                  Naš napredni AI sistem analizira vašu kreditnu istoriju, prihode i navike potrošnje 
                  kako bi vam ponudio najbolje uslove kredita. Odluka za samo 15 minuta!
                </p>
              </div>
              <Button variant="outline" className="shrink-0 border-[oklch(0.7_0.18_170)]/50 text-[oklch(0.7_0.18_170)]">
                Saznaj više
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Potrebna dokumentacija
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Lična karta",
                "Potvrda o zaposlenju",
                "Platni listić (poslednja 3)",
                "Izvod iz banke",
              ].map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                  <CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" />
                  <span className="text-sm text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Popup */}
      <Dialog open={showAiPopup} onOpenChange={setShowAiPopup}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <div className="flex flex-col items-center py-8 gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Brain className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary/50 border-t-primary animate-spin" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">AI Analiza u toku...</h3>
              <p className="text-sm text-muted-foreground">
                Naš AI sistem analizira vaš zahtev za kredit
              </p>
            </div>
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" />
                Provera kreditne istorije
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" />
                Analiza prihoda
              </div>
              <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
                <Clock className="w-4 h-4" />
                Procena rizika...
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[oklch(0.7_0.18_150)]/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[oklch(0.7_0.18_150)]" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Zahtev uspešno poslat!</DialogTitle>
            <DialogDescription className="text-center">
              Vaš zahtev za kredit je primljen. Očekujte odgovor u roku od 15 minuta na vašu email adresu.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Broj zahteva</span>
              <span className="font-mono text-foreground">#KRD-2024-{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Traženi iznos</span>
              <span className="text-foreground">{amount.toLocaleString("sr-RS")} RSD</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => setShowSuccessDialog(false)}>
            Razumem
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
