'use client'

export type Language = 'en' | 'hi'

type TranslationKeys =
//booking-component
  | 'welcomeMessage'
  | 'helpMessage'
  | 'bookingTickets'
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
  | 'totalAmount'
  | 'qrCode'
  | 'paymentInstructions'
  | 'completePayment'
  | 'selectCity'
  | 'ticketPrice'
  | 'searchCity'
  | 'searchMuseum'
  | 'enterTicketCount'
  | 'paymentError'
  | 'paymentFailed'
  | 'paymentSuccessful'
  | 'errorInitializingPayment'
  | 'paymentNotInitialized'
  | 'processingPayment'
  | 'redirecting'
  | 'gotopayment'
  | 'yourTicket'
  | 'proceedToPayment'
  | 'payment'
  | 'enterDetails'
  | 'selectTickets'
  | 'selectMuseum'
  | 'downloadTicket'
  |'confirmBooking'
  |'noMuseumsFound'
  |'errorFetchingMuseums'
  |'errorSearchingCities'
  |'events'
  |'eventsDescription'
  |'gallery'
  |'galleryDescription'
  |'culture'
  |'cultureDescription'
  |'learning'
  |'learningDescription'
  |'mainMenuPrompt'
  | 'mainMenuPrompt'
  | 'goBack'
  |'backtopayment'
//events-component
  |'noEventsYet'
  |'search'
  |'searchPlaceholder'
  |'errorFetchingEvents'
  |'entityNotFound'
  |'noEventsFound'
  |'noDescription'
  |'enterCity'

export const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    welcomeMessage: 'Welcome to the Museum Chatbot! How can I assist you today?',
    helpMessage: 'I can help you with booking tickets. What would you like to do?',
    bookingTickets: 'Book Tickets',
    typeMessage: 'Type your message...',
    send: 'Send',
    museumPrompt: 'Great! Which museum would you like to visit?',
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
    totalAmount: "Total Amount",
    qrCode: "QR Code",
    paymentInstructions: "Please follow the instructions to complete the payment.",
    completePayment: "Complete Payment",
    selectCity: "Select a city",
    ticketPrice: "Ticket Price",
    searchCity: "Search City",
    searchMuseum: "Search Museum",
    enterTicketCount: "Enter Ticket Count",
    paymentError: "Payment Error",
    paymentFailed: "Payment Failed",
    paymentSuccessful: "Payment Successful",
    errorInitializingPayment: "Error initializing payment",
    paymentNotInitialized: "Payment not initialized",
    processingPayment: "Processing Payment",
    redirecting: "Redirecting",
    gotopayment: "Go to payment",
    yourTicket: "Your Ticket",
    proceedToPayment: "Proceed to Payment",
    payment: "Payment",
    enterDetails: "Enter Details",
    selectTickets: "Select Tickets",
    selectMuseum: "Select Museum",
    downloadTicket: "Download Ticket",
    confirmBooking: "Confirm Booking",
    noMuseumsFound: "No museums found",
    errorFetchingMuseums: "Error fetching museums",
    errorSearchingCities: "Error searching cities",
    gallery: "Gallery",
    galleryDescription: "Explore the gallery of the museum.",
    culture: "Culture",
    cultureDescription: "Learn about the culture and heritage.",
    learning: "Learning",
    learningDescription: "Discover educational resources and programs.",
    mainMenuPrompt: "What would you like to do?",
    goBack: "Go Back",
    backtopayment: "Back to Payment",
    noEventsYet: "No events yet", 
    search: "Search", 
    searchPlaceholder: "Search for events",
    errorFetchingEvents: "Error fetching events",
    entityNotFound: "Entity not found",
    noEventsFound: "No events found",
    noDescription: "No description available",
    events: "Events",
    eventsDescription: "Check out the latest events happening at the museum.",
    enterCity: "Enter City",
 

  },
  hi: {
    welcomeMessage: 'म्यूजियम चैटबॉट में आपका स्वागत है! मैं आज आपकी कैसे सहायता कर सकता हूँ?',
    helpMessage: 'मैं आपको टिकट बुक करने में मदद कर सकता हूं। आप क्या करना चाहेंगे?',
    bookingTickets: 'टिकट बुक करें',
    typeMessage: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    museumPrompt: 'बहुत अच्छा! आप किस संग्रहालय का दौरा करना चाहेंगे?',
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
    totalAmount: "कुल राशि",
    qrCode: "क्यूआर कोड",
    paymentInstructions: "भुगतान पूरा करने के लिए कृपया निर्देशों का पालन करें।",
    completePayment: "भुगतान पूरा करें",
    selectCity: "एक शहर चुनें",
    ticketPrice: "टिकट की कीमत",
    searchCity: "शहर खोजें",
    searchMuseum: "संग्रहालय खोजें",
    enterTicketCount: "टिकट गणना दर्ज करें",
    paymentError: "भुगतान त्रुटि",
    paymentFailed: "भुगतान विफल",
    paymentSuccessful: "भुगतान सफल",
    errorInitializingPayment: "भुगतान की त्रुटि",
    paymentNotInitialized: "भुगतान शुरू नहीं हुआ",
    processingPayment: "भुगतान प्रक्रिया",
    redirecting: "पुनर्निर्देशित कर रहा है",
    gotopayment: "भुगतान पर जाएं",
    yourTicket: "आपका टिकट",
    proceedToPayment: "भुगतान करें",
    payment: "भुगतान",
    enterDetails: "विवरण दर्ज करें",
    selectTickets: "टिकट चुनें",
    selectMuseum: "संग्रहालय चुनें",
    downloadTicket: "टिकट डाउनलोड करें",
    confirmBooking: "बुकिंग की पुष्टि करें",
    noMuseumsFound: "कोई संग्रहालय नहीं मिला",
    errorFetchingMuseums: "संग्रहालयों को लाने में त्रुटि",
    errorSearchingCities: "शहरों की खोज में त्रुटि",
    events: "आयोजन",
    eventsDescription: "म्यूजियम में हो रहे नवीनतम आयोजनों की जांच करें।",
    gallery: "गैलरी",
    galleryDescription: "म्यूजियम की गैलरी की खोज करें।",
    culture: "संस्कृति",
    cultureDescription: "संस्कृति और धरोहर के बारे में जानें।",
    learning: "शिक्षा",
    learningDescription: "शैक्षिक संसाधनों और कार्यक्रमों की खोज करें।",
    mainMenuPrompt: "आप क्या करना चाहेंगे?",
    goBack: "वापस जाएं",
    backtopayment: "भुगतान पर वापस जाएं",  
    noEventsYet: "अब तक कोई आयोजन नहीं है",
    search: "खोजें",
    searchPlaceholder: "आयोजनों के लिए खोजें",
    errorFetchingEvents: "आयोजनों को लाने में त्रुटि",
    entityNotFound: "एंटिटी नहीं मिली",
    noEventsFound: "कोई आयोजन नहीं मिला",
    noDescription: "कोई विवरण उपलब्ध नहीं है",
    enterCity: "शहर दर्ज करें",
    
  }
}

export function useTranslations(language: Language) {
  return (key: TranslationKeys) => translations[language][key]
}