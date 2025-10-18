# Central Jeju Mosque Website

A modern, responsive website for the Central Jeju Mosque (مسجد جيجو المركزي) built with Next.js, React, TypeScript, and Tailwind CSS.

## 🕌 About

This website serves the Muslim community in Jeju Island, South Korea, providing essential information and services including:

- **Prayer Times**: Accurate prayer schedules for Jeju Island with Qibla direction
- **Community Services**: Educational programs, counseling, marriage services, and community support
- **Events**: Community calendar with religious events, educational programs, and social gatherings
- **Halal Food Guide**: Directory of halal restaurants and grocery stores in Jeju
- **Donation Platform**: Support for building a permanent mosque facility
- **Contact Information**: Easy access to mosque services and community support

## 🚀 Features

### 📱 Modern Design
- Fully responsive design optimized for all devices
- Islamic-inspired color scheme with green, gold, and navy blue
- Beautiful typography with Arabic font support (Amiri)
- Smooth animations and transitions using Framer Motion

### 🕐 Prayer Times
- Real-time prayer times calculated for Jeju Island (33.4996°N, 126.5312°E)
- Qibla direction indicator (292° NW to Makkah)
- Monthly prayer schedule table
- Next prayer countdown timer

### 🏛️ Community Features
- Comprehensive service directory (education, counseling, translation, etc.)
- Event calendar with registration functionality
- Halal food restaurant and grocery store listings
- Korean phrases for halal dining inquiries

### 💳 Donation System
- Multiple donation categories (building fund, facilities, community programs)
- Progress tracking for fundraising goals
- Multiple payment methods (card, bank transfer, crypto)
- Recurring donation options

### 📞 Contact & Support
- Multi-channel contact options (phone, email, in-person)
- Service-specific email addresses
- Emergency contact information
- Contact form with category selection

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Fonts**: Inter (main), Amiri (Arabic)
- **Animations**: CSS transitions and transforms

## 🎨 Design System

### Color Palette
```css
/* Islamic Green */
--islamic-green: #00A859;

/* Islamic Gold */
--islamic-gold: #D4AF37;

/* Islamic Navy */
--islamic-navy: #1B365D;

/* Islamic Cream */
--islamic-cream: #F7F3E9;
```

### Typography
- **Primary Font**: Inter (modern, clean)
- **Arabic Font**: Amiri (traditional Islamic calligraphy style)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

## 📁 Project Structure

```
JejuCentralMasjid/
├── app/
│   ├── contact/
│   │   └── page.tsx          # Contact page
│   ├── donate/
│   │   └── page.tsx          # Donation page
│   ├── events/
│   │   └── page.tsx          # Events calendar
│   ├── halal-food/
│   │   └── page.tsx          # Halal food guide
│   ├── prayer-times/
│   │   └── page.tsx          # Prayer times
│   ├── services/
│   │   └── page.tsx          # Community services
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── AboutSection.tsx      # About mosque section
│   ├── DonationSection.tsx   # Donation call-to-action
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Homepage hero section
│   ├── Navbar.tsx           # Navigation header
│   ├── PrayerTimesWidget.tsx # Prayer times display
│   └── ServicesSection.tsx   # Services overview
├── public/
│   └── assets/
│       └── jeju-masjid-logo.png
└── package.json
```

## 🚦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 📱 Pages Overview

### 🏠 Homepage (`/`)
- Hero section with mosque information and donation call-to-action
- Current prayer times widget
- About section with mission and vision
- Services overview
- Donation appeal with progress tracking

### 🕐 Prayer Times (`/prayer-times`)
- Today's prayer schedule with Islamic calendar
- Monthly prayer timetable
- Qibla direction and distance to Makkah
- Prayer calculation methodology information

### 🏛️ Community Services (`/services`)
- Detailed service descriptions (education, counseling, translation, etc.)
- Contact information for each service
- Regular program schedules
- Volunteer opportunities

### 📅 Events (`/events`)
- Upcoming events with registration
- Event categories and filtering
- Monthly calendar view
- Past events archive
- Event proposal submission

### 🥘 Halal Food (`/halal-food`)
- Restaurant directory with ratings and details
- Halal grocery store listings
- Korean phrases for dining inquiries
- Halal dining tips and guidelines

### 📞 Contact (`/contact`)
- Contact form with service categories
- Direct contact information
- Office hours and location details
- Emergency contact numbers

### 💝 Donate (`/donate`)
- Donation form with multiple categories
- Progress tracking for building fund
- Payment method selection
- Recurring donation options
- Impact statements and Islamic quotes

## 🎯 Key Features Implemented

### ✅ Completed
- [x] Responsive design for all screen sizes
- [x] Islamic-themed UI with appropriate colors and typography
- [x] Prayer times calculation for Jeju Island
- [x] Comprehensive service directory
- [x] Event management system
- [x] Halal food guide with Korean phrases
- [x] Multi-category donation system
- [x] Contact forms and information
- [x] SEO-optimized page structure
- [x] Accessibility considerations

### 🔄 Future Enhancements
- [ ] Real-time prayer time API integration
- [ ] Event registration backend
- [ ] Payment gateway integration
- [ ] User authentication system
- [ ] Admin dashboard for content management
- [ ] Email newsletter signup
- [ ] Multi-language support (Korean, Arabic)
- [ ] Prayer time notifications
- [ ] Islamic calendar integration

## 🌟 Special Considerations

### Islamic Guidelines
- Appropriate Islamic imagery and patterns
- Arabic text integration with proper fonts
- Halal dietary information and guidelines
- Islamic calendar and prayer time accuracy
- Modest design appropriate for religious context

### Cultural Sensitivity
- Korean language support for local integration
- Understanding of Jeju Island's unique culture
- Respectful representation of Islamic practices
- Bridge-building between Muslim and Korean communities

### Community Needs
- Support for students, workers, and visitors
- Temporary location awareness with permanent building goals
- Multi-generational community considerations
- Emergency and crisis support information

## 📧 Contact Information

**Central Jeju Mosque**
- Email: info@jejumasjid.org
- Phone: +82-64-123-4567
- Location: Jeju Island, South Korea

---

Built with ❤️ for the Muslim community in Jeju Island