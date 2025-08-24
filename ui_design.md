
# AI-DOC UI/UX Design Specifications

## Design Philosophy
- **Healthcare-focused**: Calming, trustworthy, professional
- **Accessibility-first**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first approach
- **Empathetic**: Warm, supportive user experience

## Color Palette
- **Primary Blue**: #2563EB (trust, medical professionalism)
- **Secondary Green**: #059669 (health, wellness)
- **Accent Teal**: #0891B2 (calm, soothing)
- **Background**: #F8FAFC (light mode), #0F172A (dark mode)
- **Text Primary**: #1E293B (light mode), #F1F5F9 (dark mode)
- **Text Secondary**: #64748B (light mode), #94A3B8 (dark mode)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

## Typography
- **Primary Font**: Inter (clean, readable)
- **Secondary Font**: Poppins (headings, friendly)
- **Font Sizes**:
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

## Key Pages & Components

### 1. Landing Page
- **Hero Section**: 
  - Compelling headline: "Your Personal AI Doctor - Understanding Your Health in Your Language"
  - Subtitle explaining the service
  - CTA button: "Get Started Free"
  - Hero image: Diverse people with medical reports
- **Features Section**: 3-column layout showcasing key features
- **How It Works**: Step-by-step process (Upload → Translate → Understand → Chat)
- **Trust Indicators**: Security badges, disclaimers
- **Footer**: Links, contact info

### 2. Authentication Pages
- **Login/Register**: 
  - Clean, centered form
  - Social login options
  - Language selector
  - Medical-themed background pattern
  - Clear privacy policy links

### 3. Dashboard
- **Header**: 
  - Logo, user avatar, notifications, language switcher
  - Quick stats: Reports uploaded, languages supported
- **Main Content**:
  - Welcome message with user's name
  - Quick upload button (prominent)
  - Recent reports grid/list
  - Health tips carousel
- **Sidebar**: Navigation menu, user profile, settings

### 4. Report Upload
- **Drag & Drop Zone**: 
  - Large, prominent area
  - Visual feedback on hover/drag
  - Supported file types clearly indicated
  - Progress bar during upload
- **File Preview**: Thumbnail/preview of uploaded file
- **Language Selection**: Dropdown for target language
- **Processing Status**: Real-time updates with animations

### 5. Report Detail View
- **Header**: Report title, date, status
- **Tabs**: 
  - Original Content
  - Translated Content
  - Medical Explanation
  - Health Tips
  - Chat with AI Doctor
- **Content Areas**: 
  - Clean typography
  - Highlighted medical terms
  - Expandable sections
- **Action Buttons**: Download, Share, Delete

### 6. Chat Interface
- **Chat Window**: 
  - WhatsApp-style message bubbles
  - User messages (right, blue)
  - AI messages (left, gray)
  - Typing indicators
  - Timestamps
- **Input Area**: 
  - Text input with send button
  - Emoji picker
  - Voice input button (future)
- **Quick Actions**: Predefined questions/prompts

## Interactive Elements

### Micro-interactions
- **Button Hover**: Subtle scale (1.05x) and shadow
- **Card Hover**: Lift effect with shadow
- **Loading States**: Skeleton screens, spinners
- **Form Validation**: Real-time feedback with icons
- **File Upload**: Drag feedback, progress animations

### Animations
- **Page Transitions**: Smooth fade/slide effects
- **Modal Animations**: Scale in/out
- **List Animations**: Staggered item appearance
- **Success States**: Checkmark animations

## Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Accessibility Features
- **Keyboard Navigation**: Full tab support
- **Screen Reader**: Proper ARIA labels
- **High Contrast**: Alternative color scheme
- **Font Scaling**: Support for 200% zoom
- **Focus Indicators**: Clear visual focus states

## Component Library Structure
```
components/
├── ui/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Spinner.jsx
│   └── Badge.jsx
├── layout/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
├── forms/
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── UploadForm.jsx
├── features/
│   ├── ReportCard.jsx
│   ├── ChatMessage.jsx
│   ├── FileUpload.jsx
│   └── LanguageSelector.jsx
└── pages/
    ├── Landing.jsx
    ├── Dashboard.jsx
    ├── ReportDetail.jsx
    └── Chat.jsx
```

This design system ensures a cohesive, professional, and user-friendly experience across all touchpoints of the AI-DOC application.

