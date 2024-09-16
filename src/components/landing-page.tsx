'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, LayoutGrid, LineChart, Activity, Trophy, Bell, DollarSign, Users, Star } from 'lucide-react'

const featuredMarkets = [
  { id: 1, title: '2024 Election Forecast', image: '/placeholder.svg?height=150&width=150', color: 'bg-indigo-600', action: 'View' },
  { id: 2, title: '2024 Presidential Election', image: '/placeholder.svg?height=150&width=150', color: 'bg-rose-600', action: 'Bet now' },
  { id: 3, title: 'U.S. Recession in 2024?', image: '/placeholder.svg?height=150&width=150', color: 'bg-amber-600', action: 'Bet now' },
  { id: 4, title: 'Trade Elections', image: '/placeholder.svg?height=150&width=150', color: 'bg-emerald-600', action: 'Add funds', subtitle: 'Add funds to start trading today' },
]

const marketCategories = ['Top', 'For You', 'New', 'Breaking News', 'US Election', 'NFL', 'Emmys', 'Mention Markets', 'Middle East', 'Swing States', 'Polling', 'Economy', 'Kamala', 'Ukraine']

const markets = [
  {
    id: 1,
    title: 'Presidential Election Winner 2024',
    icon: '🏛️',
    options: [
      { name: 'Kamala Harris', probability: 50 },
      { name: 'Donald Trump', probability: 49 },
      { name: 'Ron DeSantis', probability: 1 },
      { name: 'Other', probability: 0 },
    ],
    totalBet: '$921.7m',
    traders: 79375,
    isMonthly: false,
  },
  {
    id: 2,
    title: 'Popular Vote Winner 2024',
    icon: '🗳️',
    options: [
      { name: 'Kamala Harris', probability: 75 },
      { name: 'Donald Trump', probability: 24 },
      { name: 'Other', probability: 1 },
    ],
    totalBet: '$205.6m',
    traders: 701,
    isMonthly: false,
  },
  {
    id: 3,
    title: 'Fed Interest Rates: September 2024',
    icon: '📊',
    options: [
      { name: '50+ bps decrease', probability: 56 },
      { name: '25 bps decrease', probability: 42 },
      { name: 'No Change', probability: 2 },
    ],
    totalBet: '$39.6m',
    traders: 614,
    isMonthly: true,
  },
  {
    id: 4,
    title: 'Will there be another debate?',
    icon: '🎙️',
    options: [
      { name: 'Yes', probability: 33 },
      { name: 'No', probability: 67 },
    ],
    totalBet: '$718.7k',
    traders: 90,
    isMonthly: false,
  },
  {
    id: 5,
    title: 'What will Trump say during X space?',
    icon: '🐦',
    options: [
      { name: 'Crypto 5+', probability: 67 },
      { name: 'Bitcoin 5+ times', probability: 34 },
      { name: 'Other', probability: 9 },
    ],
    totalBet: '$537.5k',
    traders: 95,
    isMonthly: false,
  },
  {
    id: 6,
    title: 'Fact Check: Suspect registered D or R?',
    icon: '🔍',
    options: [
      { name: 'Democrat', probability: 52 },
      { name: 'Republican', probability: 48 },
    ],
    totalBet: '$85.9k',
    traders: 70,
    isMonthly: false,
  },
  {
    id: 7,
    title: 'Fact check: Was it a rogue actor?',
    icon: '🎭',
    options: [
      { name: 'Yes', probability: 95 },
      { name: 'No', probability: 5 },
    ],
    totalBet: '$20.8k',
    traders: 18,
    isMonthly: false,
  },
  {
    id: 8,
    title: 'Fed rate cut by...?',
    icon: '💰',
    options: [
      { name: 'September 18', probability: 98 },
      { name: 'November 7', probability: 99 },
      { name: 'December 18', probability: 99 },
    ],
    totalBet: '$24.7m',
    traders: 296,
    isMonthly: false,
  },
  {
    id: 9,
    title: 'Super Bowl Champion 2025',
    icon: '🏈',
    options: [
      { name: 'Chiefs', probability: 16 },
      { name: '49ers', probability: 13 },
      { name: 'Eagles', probability: 9 },
      { name: 'Bills', probability: 8 },
    ],
    totalBet: '$51.0m',
    traders: 262,
    isMonthly: false,
  },
  {
    id: 10,
    title: 'Favorite to win on Polymarket week after debate?',
    icon: '🏆',
    options: [
      { name: 'Kamala', probability: 73 },
      { name: 'Trump', probability: 27 },
    ],
    totalBet: '$1.9m',
    traders: 126,
    isMonthly: false,
  },
  {
    id: 11,
    title: 'Electoral College Margin of Victory in Presidential Election?',
    icon: '🗳️',
    options: [
      { name: 'GOP by 215+', probability: 2 },
      { name: 'GOP by 155-214', probability: 3 },
      { name: 'GOP by 105-154', probability: 5 },
      { name: 'GOP by 55-104', probability: 8 },
    ],
    totalBet: '$35.2m',
    traders: 239,
    isMonthly: false,
  },
  {
    id: 12,
    title: 'Balance of Power: 2024 Election',
    icon: '⚖️',
    options: [
      { name: 'Republicans sweep', probability: 32 },
      { name: 'D Prez, R Senate, D House', probability: 29 },
      { name: 'Democrats sweep', probability: 20 },
    ],
    totalBet: '$13.9m',
    traders: 114,
    isMonthly: false,
  },
]

const recentActivity = [
  { id: 1, user: 'User1', action: 'bought Yes at 50¢', market: 'Will any other Democrat Politician win the popular vote in the 2024 Presidential Election?', time: '42s ago' },
  { id: 2, user: 'User2', action: 'sold No at 99¢', market: 'Will Kamala Harris win the 2024 US Presidential Election?', time: '1m ago' },
  { id: 3, user: 'User3', action: 'bought Yes at 5¢', market: 'Will AOC win the popular vote in the 2024 Presidential Election?', time: '2m ago' },
  { id: 4, user: 'User4', action: 'sold No at 100¢', market: 'Will Bill Haley win the 2024 US Presidential Election?', time: '3m ago' },
]

const topVolume = [
  { id: 1, name: 'TheGuru', volume: '$14,937,908' },
  { id: 2, name: 'JustKen', volume: '$11,024,832' },
  { id: 3, name: '50-Pence', volume: '$7,300,982' },
  { id: 4, name: 'CryptoQueen', volume: '$5,687,321' },
  { id: 5, name: 'PredictKing', volume: '$4,321,098' },
]

const MarketCard = ({ market }) => (
  <Card className="bg-card border-border">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{market.icon}</span>
          <CardTitle className="text-lg font-heading">{market.title}</CardTitle>
        </div>
        {market.options.length === 2 && (
          <div className="text-muted-foreground text-sm">
            {market.options[0].probability}% chance
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <ScrollArea className="h-32 mb-4">
        {market.options.map((option, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span className="text-sm">{option.name}</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${option.probability}%` }}
                />
              </div>
              <span className="text-sm font-medium">{option.probability}%</span>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" className="px-2 py-1 h-auto text-xs">Yes</Button>
                <Button variant="outline" size="sm" className="px-2 py-1 h-auto text-xs">No</Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4" />
          <span>{market.totalBet}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>{market.traders}</span>
        </div>
        {market.isMonthly && <span className="text-xs">Monthly</span>}
        <Star className="h-4 w-4" />
      </div>
    </CardContent>
  </Card>
)

export function LandingPageComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-2xl font-bold font-heading">Polymarket</span>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10 bg-input border-input w-full" placeholder="Search markets" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm"><LayoutGrid className="mr-2 h-4 w-4" /> Markets</Button>
            <Button variant="ghost" size="sm"><LineChart className="mr-2 h-4 w-4" /> Election</Button>
            <Button variant="ghost" size="sm"><Activity className="mr-2 h-4 w-4" /> Activity</Button>
            <Button variant="ghost" size="sm"><Trophy className="mr-2 h-4 w-4" /> Ranks</Button>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">$0.00</span>
              <span className="text-muted-foreground">$0.00</span>
            </div>
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <nav className="bg-muted py-2">
        <div className="container mx-auto px-4 flex items-center space-x-4">
          <span className="text-destructive font-semibold">LIVE</span>
          {['All', 'New', 'Politics', 'Crypto', 'Sports', 'Pop Culture', 'Business', 'Science'].map((item) => (
            <Button key={item} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">{item}</Button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {featuredMarkets.map((market) => (
            <Card key={market.id} className={`${market.color} text-primary-foreground overflow-hidden`}>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-heading text-xl font-bold mb-2">{market.title}</h3>
                  {market.subtitle && <p className="text-sm mb-4">{market.subtitle}</p>}
                </div>
                <div className="flex justify-between items-end">
                  <Button variant="secondary" className="text-primary bg-primary-foreground hover:bg-secondary">{market.action}</Button>
                  <img src={market.image} alt={market.title} className="w-16 h-16 object-cover" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ScrollArea className="whitespace-nowrap rounded-md mb-8">
          <div className="flex space-x-2 p-2">
            {marketCategories.map((category) => (
              <Button key={category} variant="secondary" size="sm" className="flex-shrink-0">
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        <Button variant="outline" className="w-full mb-8">View all</Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center mb-4">
                  <Avatar className="mr-2">
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm"><span className="font-semibold">{activity.user}</span> {activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.market}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Top Volume This Week</CardTitle>
            </CardHeader>
            <CardContent>
              {topVolume.map((trader) => (
                <div key={trader.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarFallback>{trader.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{trader.name}</span>
                  </div>
                  <span>{trader.volume}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Markets</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Politics</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Crypto</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Sports</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pop Culture</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2023 Polymarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}