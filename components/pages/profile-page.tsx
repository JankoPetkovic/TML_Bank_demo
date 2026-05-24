"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  QrCode,
  Gift,
  Star,
  Trophy,
  ChevronRight,
  Copy,
  Share2,
  CheckCircle2,
  Crown,
  Sparkles,
  Ticket,
  Percent,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowRight,
  Lock,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const loyaltyTiers = [
  { name: "Bronze", minPoints: 0, maxPoints: 999, cashback: 0.5, color: "oklch(0.6 0.1 50)" },
  { name: "Silver", minPoints: 1000, maxPoints: 4999, cashback: 1, color: "oklch(0.7 0 0)" },
  { name: "Gold", minPoints: 5000, maxPoints: 14999, cashback: 2, color: "oklch(0.8 0.15 85)" },
  { name: "Platinum", minPoints: 15000, maxPoints: 49999, cashback: 3, color: "oklch(0.65 0.1 250)" },
  { name: "Diamond", minPoints: 50000, maxPoints: Infinity, cashback: 5, color: "oklch(0.7 0.18 170)" },
]

const coupons = [
  { id: 1, partner: "Tempo Supermarket", discount: "10%", minPurchase: 3000, validUntil: "30. Jun 2024", pointsCost: 500 },
  { id: 2, partner: "Sport Vision", discount: "15%", minPurchase: 5000, validUntil: "15. Jul 2024", pointsCost: 750 },
  { id: 3, partner: "dm Drogerie", discount: "20%", minPurchase: 2000, validUntil: "31. Maj 2024", pointsCost: 400 },
  { id: 4, partner: "Gigatron", discount: "5%", minPurchase: 10000, validUntil: "01. Aug 2024", pointsCost: 1000 },
  { id: 5, partner: "Maxi", discount: "8%", minPurchase: 2500, validUntil: "20. Jun 2024", pointsCost: 350 },
]

const rewardHistory = [
  { id: 1, action: "Plaćanje karticom", points: 45, date: "Danas", type: "earned" },
  { id: 2, action: "Kupon - dm Drogerie", points: -400, date: "22. Maj", type: "spent" },
  { id: 3, action: "Preporuka prijatelja", points: 500, date: "20. Maj", type: "earned" },
  { id: 4, action: "Mesečna nagrada", points: 100, date: "01. Maj", type: "earned" },
  { id: 5, action: "Cashback bonus", points: 250, date: "28. Apr", type: "earned" },
]

export function ProfilePage() {
  const [showQrDialog, setShowQrDialog] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const userProfile = {
    name: "Marko Petrović",
    email: "marko.petrovic@email.com",
    phone: "+381 64 123 4567",
    memberSince: "Januar 2022",
    accountNumber: "265-1234567-89",
    affiliateCode: "TML-MARKO-2024",
  }

  const currentPoints = 6750
  const currentTier = loyaltyTiers.find(t => currentPoints >= t.minPoints && currentPoints <= t.maxPoints) || loyaltyTiers[0]
  const nextTier = loyaltyTiers[loyaltyTiers.indexOf(currentTier) + 1]
  const progressToNextTier = nextTier 
    ? ((currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100

  const referralCount = 5
  const referralEarnings = 2500

  const copyAffiliateCode = () => {
    navigator.clipboard.writeText(userProfile.affiliateCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-primary/30 via-primary/20 to-card border-primary/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/50">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">MP</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{userProfile.name}</h1>
                  <Badge className="bg-[oklch(0.8_0.15_85)]/20 text-[oklch(0.8_0.15_85)] border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    {currentTier.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{userProfile.email}</p>
                <p className="text-sm text-muted-foreground">{userProfile.phone}</p>
                <p className="text-sm text-muted-foreground mt-1">Član od: {userProfile.memberSince}</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Podešavanja
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty & Affiliate Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Affiliate Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                Affiliate Program
              </CardTitle>
              <CardDescription>Pozovite prijatelje i zaradite loyalty poene</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="aspect-square max-w-[200px] mx-auto bg-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setShowQrDialog(true)}
              >
                <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2ZmZiIvPjxnIGZpbGw9IiMxYTIzN2UiPjxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PHJlY3QgeD0iMTYwIiB5PSIzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PHJlY3QgeD0iMzIiIHk9IjE2MCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PHJlY3QgeD0iMTEyIiB5PSIxMTIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPjxyZWN0IHg9IjE2MCIgeT0iMTYwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiLz48cmVjdCB4PSIxOTIiIHk9IjE5MiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+PC9nPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">Vaš affiliate kod</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-lg px-4 py-3 font-mono text-center text-foreground">
                    {userProfile.affiliateCode}
                  </div>
                  <Button variant="outline" size="icon" onClick={copyAffiliateCode}>
                    {copiedCode ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{referralCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Preporučenih prijatelja</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-[oklch(0.8_0.15_85)]" />
                    <span className="text-2xl font-bold text-foreground">{referralEarnings}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Zarađeni poeni</p>
                </div>
              </div>
              <Button className="w-full gap-2">
                <Share2 className="w-4 h-4" />
                Podeli sa prijateljima
              </Button>
            </CardContent>
          </Card>

          {/* Loyalty Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[oklch(0.8_0.15_85)]" />
                Loyalty Program
              </CardTitle>
              <CardDescription>Vaš status i napredak</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Status */}
              <div className="bg-gradient-to-br from-[oklch(0.8_0.15_85)]/20 to-transparent rounded-xl p-4 border border-[oklch(0.8_0.15_85)]/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.8_0.15_85)]/20 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-[oklch(0.8_0.15_85)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{currentTier.name} Tier</p>
                      <p className="text-sm text-[oklch(0.8_0.15_85)]">{currentTier.cashback}% cashback</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">{currentPoints.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">poena</p>
                  </div>
                </div>

                {nextTier && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Do {nextTier.name} tiera</span>
                      <span className="text-foreground font-medium">
                        {(nextTier.minPoints - currentPoints).toLocaleString()} poena
                      </span>
                    </div>
                    <Progress value={progressToNextTier} className="h-2" />
                  </div>
                )}
              </div>

              {/* Tier Benefits */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Benefiti vašeg tiera</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Percent className="w-4 h-4 text-[oklch(0.7_0.18_150)]" />
                    <span className="text-sm text-foreground">{currentTier.cashback}% Cashback</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Ekskluzivni kuponi</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Gift className="w-4 h-4 text-[oklch(0.8_0.15_85)]" />
                    <span className="text-sm text-foreground">Rođendanski bonus</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-[oklch(0.65_0.2_30)]" />
                    <span className="text-sm text-foreground">Prioritetna podrška</span>
                  </div>
                </div>
              </div>

              {/* All Tiers */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Svi nivoi</p>
                <div className="flex gap-1">
                  {loyaltyTiers.map((tier, index) => {
                    const isActive = tier.name === currentTier.name
                    const isUnlocked = currentPoints >= tier.minPoints
                    return (
                      <div
                        key={tier.name}
                        className={`flex-1 p-2 rounded-lg text-center transition-all ${
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : isUnlocked 
                              ? "bg-secondary text-foreground" 
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-[10px] font-medium">{tier.name}</p>
                        {!isUnlocked && <Lock className="w-3 h-3 mx-auto mt-1 opacity-50" />}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Coupons and History */}
        <Tabs defaultValue="coupons" className="w-full">
          <TabsList className="bg-card border border-border w-full md:w-auto">
            <TabsTrigger value="coupons" className="flex-1 md:flex-none gap-2">
              <Ticket className="w-4 h-4" />
              Kuponi
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1 md:flex-none gap-2">
              <TrendingUp className="w-4 h-4" />
              Istorija poena
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coupons" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Dostupni kuponi partnera</CardTitle>
                <CardDescription>Zamenite loyalty poene za kupone kod naših partnera</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{coupon.partner}</p>
                          <p className="text-sm text-muted-foreground">
                            Min. kupovina: {coupon.minPurchase.toLocaleString()} RSD
                          </p>
                          <p className="text-xs text-muted-foreground">Važi do: {coupon.validUntil}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge className="bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] text-lg font-bold border-0">
                            {coupon.discount}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{coupon.pointsCost} poena</p>
                        </div>
                        <Button 
                          size="sm" 
                          disabled={currentPoints < coupon.pointsCost}
                          className="gap-1"
                        >
                          Preuzmi
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Istorija loyalty poena</CardTitle>
                <CardDescription>Pregled svih zarađenih i potrošenih poena</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {rewardHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.type === "earned" ? "bg-[oklch(0.7_0.18_150)]/20" : "bg-[oklch(0.65_0.2_30)]/20"
                        }`}>
                          {item.type === "earned" ? (
                            <TrendingUp className="w-5 h-5 text-[oklch(0.7_0.18_150)]" />
                          ) : (
                            <Ticket className="w-5 h-5 text-[oklch(0.65_0.2_30)]" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${
                        item.type === "earned" ? "text-[oklch(0.7_0.18_150)]" : "text-[oklch(0.65_0.2_30)]"
                      }`}>
                        {item.type === "earned" ? "+" : ""}{item.points} poena
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Account Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Informacije o nalogu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Broj računa</p>
                <p className="font-mono text-foreground">{userProfile.accountNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{userProfile.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="text-foreground">{userProfile.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Član od</p>
                <p className="text-foreground">{userProfile.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Vaš Affiliate QR Kod</DialogTitle>
            <DialogDescription className="text-center">
              Skenirajte ovaj kod da se registrujete sa preporukom
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="w-64 h-64 bg-white rounded-xl p-4">
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2ZmZiIvPjxnIGZpbGw9IiMxYTIzN2UiPjxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PHJlY3QgeD0iMTYwIiB5PSIzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PHJlY3QgeD0iMzIiIHk9IjE2MCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PHJlY3QgeD0iMTEyIiB5PSIxMTIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPjxyZWN0IHg9IjE2MCIgeT0iMTYwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiLz48cmVjdCB4PSIxOTIiIHk9IjE5MiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+PC9nPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg text-foreground">{userProfile.affiliateCode}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Za svaku preporuku dobijate 500 loyalty poena!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
