'use client'

export type Language = 'en' | 'hi'

type TranslationKeys =
  | 'welcomeMessage'
  | 'helpMessage'
  | 'bookingTickets'
  | 'gallery'
  | 'events'
  | 'learning'
  | 'culture'
  | 'goBack'
  | 'typeMessage'
  | 'send'
  | 'museumPrompt'
  | 'ticketCountPrompt'
  | 'detailsPrompt'
  | 'thankYouMessage'
  | 'name'
  | 'age'
  | 'preferredDate'
  | 'preferredTime'
  | 'email'
  | 'mobile'
  | 'submitDetails'
  | 'bookingDetails'
  | 'goToBillPayment'
  | 'back'
  | 'eventsDescription'
  | 'galleryDescription'
  | 'learningDescription'
  | 'cultureDescription'
  | 'cityPrompt'
  | 'mumbai'
  | 'delhi'
  | 'bangalore'
  | 'kolkata'
  | 'nationalMuseum'
  | 'indianMuseum'
  | 'salarJungMuseum'
  | 'csmVastuSangrahalaya'
  | 'ticketOptions'
  | 'confirmBooking'
  | 'paymentOptions'
  | 'creditCard'
  | 'debitCard'
  | 'netBanking'
  | 'upi'
  | 'paymentSuccessful'
  | 'downloadTicket'
  | 'upcomingEvents'
  | 'pastEvents'
  | 'eventDetails'
  | 'registerForEvent'
  | 'virtualTour'
  | 'audioGuide'
  | 'exhibitionHighlights'
  | 'educationalPrograms'
  | 'workshops'
  | 'guidedTours'
  | 'schoolVisits'
  | 'artForms'
  | 'historicalPeriods'
  | 'culturalDiversity'
  | 'traditionalCrafts'
  | 'totalAmount'
  |'qrCode'
  |'paymentInstructions'
  |'completePayment'
  |'payWithCredit'
  |'payWithDebit'
  |'payWithNetBanking'
  |'payWithUPI'
  |'paymentMethodSelected'
  |'selectCity'
  |'ticketPrice'
  |'citySuggestions'
  |'museumSuggestions'
  |'cardNumber'
  |'cvv'
  |'submitPayment'
  |'bankName'
  |'ifscCode'
  |'upiId'
  |'mobileNumber'
  |'citySearchResults'
  |'bookingPrompt'
  |'invalidCity'
  |'invalidMuseum'
  |'enterCity'
  |'search'
  |'errorFetchingMuseums'
  |'errorSearchingCities'
  |'museumDetails'
  |'citySuggestions'
  |'description'
  |'notAvailable'
  |'inception'
  |'address'
  |'website'
  |'invalidLanguage'
  |'museumList'
  |'noMuseumsFound'
  |'cityNotFound'
  |'searchMuseum'
  |'searchCity'
  |'mainMenuPrompt'
  |'popularCities'
  |'matchingMuseums'
  |'ticketSuggestions'
  |'totalPrice'
  |'bookingConfirmed'
  |'invalidticketcount'
  |'enterPaymentDetails'
  |'tickets'
  |'enterTicketCount'
  |'selectPreferredCity'
  |'paymentError'
  |'paymentFailed'
  |'paymentCancelled'
  |'askAboutMuseums'


export const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    welcomeMessage: 'Welcome to the Museum Chatbot! How can I assist you today?',
    helpMessage: 'I can help you with booking tickets, exploring our gallery, checking events, learning programs, or discovering Indian culture. What would you like to do?',
    bookingTickets: 'Book Tickets',
    gallery: 'Gallery',
    events: 'Events',
    learning: 'Learning & Outreach',
    culture: 'Indian Culture',
    goBack: 'Go Back',
    typeMessage: 'Type your message...',
    send: 'Send',
    museumPrompt: 'Great! Which museum would you like to visit in',
    ticketCountPrompt: 'How many tickets would you like to book?',
    detailsPrompt: 'Please provide your details for the booking:',
    thankYouMessage: 'Thank you for your booking. Here are your details:',
    name: 'Name',
    age: 'Age',
    preferredDate: 'Preferred Date',
    preferredTime: 'Preferred Time',
    email: 'Email',
    mobile: 'Mobile Number',
    submitDetails: 'Submit Details',
    bookingDetails: 'Booking Details',
    goToBillPayment: 'Proceed to Payment',
    back: 'Back',
    eventsDescription: 'Discover our exciting lineup of events and exhibitions.',
    galleryDescription: 'Explore our vast collection of artworks and artifacts.',
    learningDescription: 'Engage with our educational programs and community initiatives.',
    cultureDescription: 'Immerse yourself in the rich tapestry of Indian culture.',
    cityPrompt: 'Please select a city:',
    mumbai: 'Mumbai',
    delhi: 'Delhi',
    bangalore: 'Bangalore',
    kolkata: 'Kolkata',
    nationalMuseum: 'National Museum',
    indianMuseum: 'Indian Museum',
    salarJungMuseum: 'Salar Jung Museum',
    csmVastuSangrahalaya: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
    ticketOptions: 'Ticket Options',
    confirmBooking: 'Confirm Booking',
    paymentOptions: 'Payment Options',
    creditCard: 'Credit Card',
    debitCard: 'Debit Card',
    netBanking: 'Net Banking',
    upi: 'UPI',
    paymentSuccessful: 'Payment Successful',
    downloadTicket: 'Download Ticket',
    upcomingEvents: 'Upcoming Events',
    pastEvents: 'Past Events',
    eventDetails: 'Event Details',
    registerForEvent: 'Register for Event',
    virtualTour: 'Virtual Tour',
    audioGuide: 'Audio Guide',
    exhibitionHighlights: 'Exhibition Highlights',
    educationalPrograms: 'Educational Programs',
    workshops: 'Workshops',
    guidedTours: 'Guided Tours',
    schoolVisits: 'School Visits',
    artForms: 'Art Forms',
    historicalPeriods: 'Historical Periods',
    culturalDiversity: 'Cultural Diversity',
    traditionalCrafts: 'Traditional Crafts',
    totalAmount: "Total Amount",
    qrCode: "QR Code",
    paymentInstructions: "Please follow the instructions to complete the payment.",
    completePayment: "Complete Payment",
    payWithCredit: 'Pay with Credit Card',
    payWithDebit: 'Pay with Debit Card',
    payWithNetBanking: 'Pay with Net Banking',
    payWithUPI: 'Pay with UPI',
    paymentMethodSelected: "Payment method selected:",
    selectCity: "Select a city",
    ticketPrice: "Ticket Price",
    citySuggestions: "Here are some city suggestions",
    museumSuggestions: "Here are some museum suggestions",
    cardNumber: 'Card Number',
    cvv: "CVV",
    submitPayment: "Submit Payment",
    bankName: "Bank Name",
    ifscCode: "IFSC Code",
    upiId: "UPI ID",
    mobileNumber: "Mobile Number",
    citySearchResults: "City Search",
    bookingPrompt: "What would you like",
    invalidCity: "Invalid City",
    invalidMuseum: "Invalid Museum",
    enterCity: "choose city",
    search: "Search",
    errorFetchingMuseums: "Error fetching",
    errorSearchingCities: "Error searching",
    museumDetails: "Museum Details",  
    description: "Description",
    notAvailable: "Not Available",
    inception: "Inception",
    address: "Address",
    website: "Website",
    invalidLanguage: "Invalid Language",
    museumList: "Museum List",
    noMuseumsFound: "No Museums Found",
    cityNotFound: "City Not Found",
    searchCity: "Search City",
    searchMuseum: "Search Museum",
    mainMenuPrompt: "namaste! Select a preferred language:",
    popularCities: "Popular Cities",
    matchingMuseums: "Matching Museums",
    ticketSuggestions: "Ticket Suggestions",
    totalPrice: "Total Price",
    bookingConfirmed: "Booking Confirmed",
    invalidticketcount: "Invalid Ticket Count",
    enterPaymentDetails: "Enter Payment Details",
    tickets: "Tickets",
    enterTicketCount: "Enter Ticket Count",
    selectPreferredCity: "Select Preferred City",
    paymentError: "Payment Error",
    paymentFailed: "Payment Failed",
    paymentCancelled: "Payment Cancelled",
    askAboutMuseums: "Ask about museums",
  },
  hi: {
    welcomeMessage: 'म्यूजियम चैटबॉट में आपका स्वागत है! मैं आज आपकी कैसे सहायता कर सकता हूँ?',
    helpMessage: 'मैं आपको टिकट बुक करने, हमारी गैलरी का पता लगाने, कार्यक्रम जांचने, सीखने के कार्यक्रमों या भारतीय संस्कृति की खोज करने में मदद कर सकता हूं। आप क्या करना चाहेंगे?',
    bookingTickets: 'टिकट बुक करें',
    gallery: 'गैलरी',
    events: 'कार्यक्रम',
    learning: 'शिक्षा और आउटरीच',
    culture: 'भारतीय संस्कृति',
    goBack: 'वापस जाएं',
    typeMessage: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    museumPrompt: 'बहुत अच्छा! आप किस संग्रहालय का दौरा करना चाहेंगे',
    ticketCountPrompt: 'आप कितने टिकट बुक करना चाहेंगे?',
    detailsPrompt: 'कृपया बुकिंग के लिए अपना विवरण प्रदान करें:',
    thankYouMessage: 'आपकी बुकिंग के लिए धन्यवाद। यहां आपका विवरण है:',
    name: 'नाम',
    age: 'उम्र',
    preferredDate: 'पसंदीदा तिथि',
    preferredTime: 'पसंदीदा समय',
    email: 'ईमेल',
    mobile: 'मोबाइल नंबर',
    submitDetails: 'विवरण जमा करें',
    bookingDetails: 'बुकिंग विवरण',
    goToBillPayment: 'भुगतान के लिए आगे बढ़ें',
    back: 'वापस',
    eventsDescription: 'हमारे रोमांचक कार्यक्रमों और प्रदर्शनियों की लाइनअप का पता लगाएं।',
    galleryDescription: 'कलाकृतियों और कलाकृतियों के हमारे विशाल संग्रह का अन्वेषण करें।',
    learningDescription: 'हमारे शैक्षिक कार्यक्रमों और सामुदायिक पहलों के साथ जुड़ें।',
    cultureDescription: 'भारतीय संस्कृति के समृद्ध ताने-बाने में खुद को डुबोएं।',
    cityPrompt: 'कृपया एक शहर चुनें:',
    mumbai: 'मुंबई',
    delhi: 'दिल्ली',
    bangalore: 'बैंगलोर',
    kolkata: 'कोलकाता',
    nationalMuseum: 'राष्ट्रीय संग्रहालय',
    indianMuseum: 'भारतीय संग्रहालय',
    salarJungMuseum: 'सालार जंग संग्रहालय',
    csmVastuSangrahalaya: 'छत्रपति शिवाजी महाराज वास्तु संग्रहालय',
    ticketOptions: 'टिकट विकल्प',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    paymentOptions: 'भुगतान विकल्प',
    creditCard: 'क्रेडिट कार्ड',
    debitCard: 'डेबिट कार्ड',
    netBanking: 'नेट बैंकिंग',
    upi: 'यूपीआई',
    paymentSuccessful: 'भुगतान सफल',
    downloadTicket: 'टिकट डाउनलोड करें',
    upcomingEvents: 'आगामी कार्यक्रम',
    pastEvents: 'पिछले कार्यक्रम',
    eventDetails: 'कार्यक्रम विवरण',
    registerForEvent: 'कार्यक्रम के लिए पंजीकरण करें',
    virtualTour: 'वर्चुअल टूर',
    audioGuide: 'ऑडियो गाइड',
    exhibitionHighlights: 'प्रदर्शनी हाइलाइट्स',
    educationalPrograms: 'शैक्षिक कार्यक्रम',
    workshops: 'कार्यशालाएं',
    guidedTours: 'गाइडेड टूर',
    schoolVisits: 'स्कूल यात्राएं',
    artForms: 'कला रूप',
    historicalPeriods: 'ऐतिहासिक काल',
    culturalDiversity: 'सांस्कृतिक विविधता',
    traditionalCrafts: 'पारंपरिक शिल्प',
    totalAmount: "कुल राशि",
    qrCode: "क्यूआर कोड",
    paymentInstructions: "भुगतान पूरा करने के लिए कृपया निर्देशों का पालन करें।",
    completePayment: "भुगतान पूरा करें",
    payWithCredit: 'क्रेडिट कार्ड से भुगतान करें',
    payWithDebit: 'डेबिट कार्ड से भुगतान करें',
    payWithNetBanking: 'नेट बैंकिंग से भुगतान करें',
    payWithUPI: 'यूपीआई से भुगतान करें',
    paymentMethodSelected: "भुगतान विधि चयनित:",
    selectCity: "एक शहर चुनें",
    ticketPrice: "टिकट की कीमत",
    citySuggestions: "यहां कुछ शहर सुझाव हैं",
    museumSuggestions: "यहां कुछ संग्रहालय सुझाव हैं",
    cardNumber: 'कार्ड नंबर',
    cvv:"सीवीवी",
    submitPayment: "भुगतान सबमिट करें",
    bankName: "बैंक का नाम",
    ifscCode: "IFSC कोड",
    upiId: "UPI आईडी",
    mobileNumber: "मोबाइल नंबर",
    citySearchResults: "शहर खोज",
    bookingPrompt: "आप क्या करना चाहेंगे",
    invalidCity: "अवैध शहर",
    invalidMuseum: "अवैध संग्रहालय",
    enterCity: "शहर चुनें",
    search: "खोजें",
    errorFetchingMuseums: "म्यूजियम खोजने में त्रुटि",
    errorSearchingCities: "शहर खोजने में त्रुटि",
    museumDetails: "संग्रहालय विवरण",
    description: "विवरण",
    notAvailable: "उपलब्ध नहीं",
    inception: "संस्थापन",
    address: "पता",
    website: "वेबसाइट",
    invalidLanguage: "अमान्य भाषा",
    museumList: "संग्रहालय सूची",
    noMuseumsFound: "कोई संग्रहालय नहीं मिला",
    cityNotFound: "शहर नहीं मिला",
    searchCity: "शहर खोजें",
    searchMuseum: "संग्रहालय खोजें",
    mainMenuPrompt: "नमस्ते! एक पसंदीदा भाषा चुनें:",
    popularCities: "लोकप्रिय शहर", 
    matchingMuseums: "मिलान संग्रहालय",
    ticketSuggestions: "टिकट सुझाव",
    totalPrice: "कुल मूल्य",
    bookingConfirmed: "बुकिंग की पुष्टि हो गई",
    invalidticketcount: "अमान्य टिकट गणना",
    enterPaymentDetails: "भुगतान विवरण दर्ज करें",
    tickets: "टिकटें",
    enterTicketCount: "टिकट गणना दर्ज करें",
    selectPreferredCity: "पसंदीदा शहर चुनें",
    paymentError: "भुगतान त्रुटि",
    paymentFailed: "भुगतान विफल",
    paymentCancelled: "भुगतान रद्द",
    askAboutMuseums: "संग्रहालय के बारे में पूछें",


  }
}

export function useTranslations(language: Language) {
  return (key: TranslationKeys) => translations[language][key]
}