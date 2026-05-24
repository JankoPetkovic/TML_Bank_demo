"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Phone,
  MapPin,
  Send,
  Bot,
  User,
  HelpCircle,
  Clock,
  ChevronRight,
  Search,
  Building2,
  Navigation,
  Mail,
  ExternalLink,
} from "lucide-react"

const faqItems = [
  {
    question: "Kako da promenim PIN za karticu?",
    answer: "PIN možete promeniti na bilo kom bankomatu TML Banke, kroz mobilnu aplikaciju u sekciji 'Kartice' ili posetom najbliže ekspoziture. Za promenu kroz aplikaciju: Kartice → Izaberite karticu → Promeni PIN."
  },
  {
    question: "Koji su limiti za plaćanje karticom?",
    answer: "Dnevni limit za plaćanje je 500.000 RSD, a mesečni 2.000.000 RSD. Limite možete prilagoditi kroz mobilnu aplikaciju ili kontaktiranjem korisničke podrške."
  },
  {
    question: "Kako da zatvorim račun?",
    answer: "Za zatvaranje računa potrebno je posetiti najbližu ekspozturu sa ličnom kartom. Pre zatvaranja, račun mora biti u pozitivnom stanju bez aktivnih kredita ili drugih obaveza."
  },
  {
    question: "Kako funkcioniše AI kredit na klik?",
    answer: "Naš AI sistem analizira vašu kreditnu istoriju, prihode i navike potrošnje u realnom vremenu. Odluka se donosi za samo 15 minuta, a sredstva su dostupna istog dana nakon odobrenja."
  },
  {
    question: "Šta su loyalty poeni i kako ih koristim?",
    answer: "Loyalty poeni se stiču korišćenjem usluga banke, preporukama prijatelja i redovnim plaćanjima. Možete ih zameniti za cashback, kupone kod partnera ili prelazak u viši tier sa boljim benefitima."
  },
  {
    question: "Kako da aktiviram mobilno bankarstvo?",
    answer: "Preuzmite TML Banka aplikaciju, registrujte se koristeći broj kartice i OTP kod koji ćete dobiti na telefon. Nakon verifikacije, postavite PIN i biometrijsku autentifikaciju."
  },
]

const branches = [
  { name: "TML Banka - Centar", address: "Knez Mihailova 15, Beograd", distance: "0.5 km", hours: "08:00 - 18:00" },
  { name: "TML Banka - Novi Beograd", address: "Bulevar Mihajla Pupina 10, Novi Beograd", distance: "3.2 km", hours: "09:00 - 17:00" },
  { name: "TML Banka - Vračar", address: "Svetog Save 25, Beograd", distance: "2.1 km", hours: "08:00 - 18:00" },
]

interface Message {
  id: number
  type: "user" | "bot"
  text: string
  timestamp: Date
}

const botResponses: Record<string, string> = {
  "stanje": "Vaše trenutno raspoloživo stanje je 342,567.89 RSD. Da li vam mogu pomoći sa nečim drugim?",
  "kredit": "Za informacije o kreditima, preporučujem da posetite stranicu 'Kredit na klik' gde možete izračunati mesečnu ratu i odmah poslati zahtev. Naš AI sistem odobrava kredite za samo 15 minuta!",
  "kartica": "Za sve upite vezane za kartice (blokada, limit, PIN), možete koristiti opcije u mobilnoj aplikaciji ili nas kontaktirati na 0800 123 456.",
  "pomoć": "Mogu vam pomoći sa:\n• Informacije o stanju računa\n• Kreditni kalkulator\n• Blokada kartice\n• Lokacije ekspozitura\n• FAQ pitanja\n\nŠta vas interesuje?",
  "default": "Hvala na pitanju! Za detaljnije informacije, preporučujem da kontaktirate naš call centar na 0800 123 456 (besplatan poziv) ili posetite najbližu ekspozturu. Da li mogu još nešto da vam pomognem?"
}

export function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Zdravo! Ja sam TML AI Asistent. Kako vam mogu pomoći danas? Možete me pitati o stanju računa, kreditima, karticama ili bilo čemu drugom.",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase()
      let response = botResponses.default

      if (lowerInput.includes("stanje")) response = botResponses.stanje
      else if (lowerInput.includes("kredit")) response = botResponses.kredit
      else if (lowerInput.includes("kartic")) response = botResponses.kartica
      else if (lowerInput.includes("pomoć") || lowerInput.includes("pomoc") || lowerInput.includes("help")) response = botResponses.pomoć

      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        text: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Korisnička podrška</h1>
          <p className="text-muted-foreground">Kako vam možemo pomoći danas?</p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/30 via-primary/20 to-card border-primary/30 cursor-pointer hover:border-primary/50 transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">AI ChatBot</p>
                <p className="text-sm text-muted-foreground">Instant odgovori 24/7</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border cursor-pointer hover:border-primary/50 transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.7_0.18_150)]/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[oklch(0.7_0.18_150)]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Call Centar</p>
                <p className="text-sm text-[oklch(0.7_0.18_150)] font-medium">0800 123 456</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border cursor-pointer hover:border-primary/50 transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.8_0.15_85)]/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[oklch(0.8_0.15_85)]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email podrška</p>
                <p className="text-sm text-muted-foreground">podrska@tmlbanka.rs</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI ChatBot */}
          <Card className="bg-card border-border h-[600px] flex flex-col">
            <CardHeader className="border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">TML AI Asistent</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[oklch(0.7_0.18_150)]" />
                    <CardDescription>Online</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        message.type === "user" ? "bg-primary/20" : "bg-[oklch(0.7_0.18_170)]/20"
                      }`}>
                        {message.type === "user" ? (
                          <User className="w-4 h-4 text-primary" />
                        ) : (
                          <Bot className="w-4 h-4 text-[oklch(0.7_0.18_170)]" />
                        )}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-secondary text-foreground rounded-tl-none"
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-[10px] mt-1 ${message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {message.timestamp.toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[oklch(0.7_0.18_170)]/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-[oklch(0.7_0.18_170)]" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border shrink-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Napišite poruku..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="bg-input border-border"
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card border-border h-[600px] flex flex-col">
            <CardHeader className="border-b border-border shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.8_0.15_85)]/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[oklch(0.8_0.15_85)]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Česta pitanja (FAQ)</CardTitle>
                  <CardDescription>Pronađite brze odgovore</CardDescription>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Pretraži pitanja..."
                  className="pl-10 bg-input border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFaq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4 bg-secondary/30">
                        <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Branches */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Najbliže ekspoziture</CardTitle>
                  <CardDescription>Pronađite najbližu poslovnicu</CardDescription>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Navigation className="w-4 h-4" />
                Prikaži na mapi
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {branches.map((branch, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{branch.name}</p>
                      <p className="text-sm text-muted-foreground">{branch.address}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {branch.distance}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {branch.hours}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call Center Info */}
        <Card className="bg-gradient-to-r from-[oklch(0.7_0.18_150)]/20 via-card to-primary/20 border-[oklch(0.7_0.18_150)]/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.7_0.18_150)]/20 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-[oklch(0.7_0.18_150)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Call Centar - Besplatan poziv</h3>
                  <p className="text-2xl font-bold text-[oklch(0.7_0.18_150)]">0800 123 456</p>
                  <p className="text-sm text-muted-foreground">Dostupni pon-pet: 08:00-20:00, sub: 09:00-15:00</p>
                </div>
              </div>
              <Button className="bg-[oklch(0.7_0.18_150)] hover:bg-[oklch(0.65_0.18_150)] text-[oklch(0.1_0_0)] gap-2">
                <Phone className="w-4 h-4" />
                Pozovi odmah
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
