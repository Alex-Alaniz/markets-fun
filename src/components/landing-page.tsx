'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, LayoutGrid, LineChart, Activity, Trophy, Bell, DollarSign, Users, Star, Menu } from 'lucide-react'
import LoginModal from '@/components/login-modal' // Import the LoginModal component
import BurgerMenu from './burger-menu' // Import the BurgerMenu component
import { ThemeProvider } from "next-themes" // Import ThemeProvider

const featuredMarkets = [
  { id: 1, title: '2024 Election Forecast', image: '/K&T.png?height=150&width=150', color: 'bg-indigo-600', action: 'View' },
  { id: 2, title: '2024 Presidential Election', image: '/PE24.webp?height=150&width=150', color: 'bg-rose-600', action: 'Bet now' },
  { id: 3, title: 'U.S. Recession in 2024?', image: '/USR.jpg?height=150&width=150', color: 'bg-amber-600', action: 'Bet now' },
  { id: 4, title: 'Trade Elections', image: '/TE24.avif?height=150&width=150', color: 'bg-emerald-600', action: 'Add funds', subtitle: 'Add funds to start trading today' },
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
    title: 'Favorite to win on MarkeFun week after debate?',
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

interface Market {
  icon: string;
  title: string;
  options: Array<{ name: string; probability: number }>;
  totalBet: string;
  traders: number;
  isMonthly: boolean;
}

const MarketCard = ({ market }: { market: Market }) => (
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false) // State for modal visibility

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-[#192631] dark:text-white">
      <header className="border-b border-gray-200 dark:border-[#2C3444]">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                </svg>
                <span className="text-xl font-bold font-heading">MarkeFun</span>
              </div>
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input className="pl-10 bg-white border-[#2C3444] w-full text-white placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600" placeholder="Search markets" />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-white"><LayoutGrid className="mr-2 h-4 w-4" /> Markets</Button>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-white"><LineChart className="mr-2 h-4 w-4" /> Election</Button>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-white"><Activity className="mr-2 h-4 w-4" /> Activity</Button>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-white"><Trophy className="mr-2 h-4 w-4" /> Ranks</Button>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-white"onClick={() => setIsLoginModalOpen(true)}>Log In</Button>
              <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white"onClick={() => setIsLoginModalOpen(true)}>Sign Up</Button>
              <BurgerMenu />
            </div>
          </div>
        </header>

        <nav className="bg-w-100 dark:bg-[#192631] py-2">
          <div className="container mx-auto px-4 flex items-center space-x-4 overflow-x-auto">
            <span className="text-red-500 font-semibold whitespace-nowrap">LIVE</span>
            {['All', 'New', 'Politics', 'Crypto', 'Sports', 'Pop Culture', 'Business', 'Science'].map((item) => (
              <Button key={item} variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 whitespace-nowrap dark:text-gray-300 dark:hover:text-white">{item}</Button>
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
                    <div className="mr-2">
                      <span className="font-semibold">{activity.user[0]}</span> {/* Display the first letter of the user's name */}
                    </div>
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
                      <div className="mr-2">
                        <span className="font-semibold">{trader.name[0]}</span> {/* Display the first letter of the trader's name */}
                      </div>
                      <span>{trader.name}</span>
                    </div>
                    <span>{trader.volume}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-900 text-white dark:text-gray-300 py-8">
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
              <p>&copy; 2023 MarkeFun. All rights reserved. Demo version by <a href="https://x.com/AlexDotEth" target="_blank" className="text-muted-foreground hover:text-foreground">Alex Alaniz</a></p>
            </div>
          </div>
        </footer>

        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    </ThemeProvider>
  )
}