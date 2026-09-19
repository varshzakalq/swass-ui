import { LanguageCode } from '../types';

export interface TranslationSet {
  ministryBadge: string;
  subMinistry: string;
  appTitle: string;
  greetingMorning: string;
  greetingSub: string;
  listenBtn: string;
  listening: string;
  abhaTitle: string;
  abhaVerified: string;
  abhaNumber: string;
  abhaAddressLabel: string;
  showCard: string;
  closeCard: string;
  
  // Actions
  actionUpload: string;
  actionUploadSub: string;
  actionRecords: string;
  actionRecordsSub: string;
  actionDoctor: string;
  actionDoctorSub: string;
  actionSaathi: string;
  actionSaathiSub: string;

  // Sections
  tipsTitle: string;
  tipsSub: string;
  recordsTitle: string;
  recordsSub: string;
  ayushRemediesTitle: string;
  ayushRemediesSub: string;

  // Status
  statusNormal: string;
  statusAttention: string;
  statusHigh: string;
  statusActive: string;

  // Read aloud helper
  voiceGreeting: string;
  voiceAbhaRead: string;
  voiceHelpBanner: string;

  // Upload modal
  uploadTitle: string;
  uploadDesc: string;
  takePhoto: string;
  chooseFile: string;
  blurCheck: string;
  blurPassed: string;
  docIdentified: string;
  analyzingWithAyush: string;
  readAloudReport: string;
  uploadSuccess: string;
  sampleReports: string;

  // Doctor Console
  doctorConsole: string;
  patientView: string;
  hospitalName: string;
  docGreeting: string;
  patientsToday: string;
  pendingConsent: string;
  syncedRecords: string;
  sendFhirBundle: string;
  viewScope: string;
  sentSuccess: string;

  // Saathi AI
  saathiTitle: string;
  saathiSubtitle: string;
  saathiPlaceholder: string;
  quickQuestions: string[];
  speakNow: string;
  voiceSend: string;
  close: string;
  callHelp: string;
  emergencyTitle: string;
}

export const translations: Record<LanguageCode, TranslationSet> = {
  hi: {
    ministryBadge: 'आयुष मंत्रालय, भारत सरकार',
    subMinistry: 'आयुर्वेद • योग • यूनानी • सिद्ध • होम्योपैथी',
    appTitle: 'स्वास्थ्य साथी',
    greetingMorning: 'नमस्ते, रमेश जी',
    greetingSub: 'सभी रिपोर्ट सुरक्षित हैं।',
    listenBtn: 'सुनें',
    listening: 'सुन रहे हैं...',
    abhaTitle: 'आभा स्वास्थ्य पत्र',
    abhaVerified: 'सत्यापित एवं सुरक्षित',
    abhaNumber: 'आभा संख्या',
    abhaAddressLabel: 'आभा पता: ramesh@abdm',
    showCard: 'कार्ड दिखाएं',
    closeCard: 'कार्ड बंद करें',
    
    actionUpload: 'रिपोर्ट फोटो लें',
    actionUploadSub: 'कैमरा या फाइल से',
    actionRecords: 'स्वास्थ्य रिकॉर्ड्स',
    actionRecordsSub: '४ सुरक्षित रिपोर्ट',
    actionDoctor: 'आयुष केंद्र',
    actionDoctorSub: 'नजदीकी आरोग्य मंदिर',
    actionSaathi: 'आयुष साथी',
    actionSaathiSub: 'बोलकर पूछें',

    tipsTitle: 'दैनिक स्वास्थ्य सुझाव',
    tipsSub: 'आयुष दिनचर्या',
    recordsTitle: 'हालिया रिपोर्ट',
    recordsSub: 'जांच विवरण',
    ayushRemediesTitle: 'आयुष नुस्खे',
    ayushRemediesSub: 'घरेलू उपचार',

    statusNormal: 'सामान्य (Normal)',
    statusAttention: 'ध्यान दें (Attention)',
    statusHigh: 'ज्यादा (High)',
    statusActive: 'चालू दवा (Active)',

    voiceGreeting: 'नमस्ते रमेश जी! आपके सभी स्वास्थ्य रिकॉर्ड सुरक्षित हैं।',
    voiceAbhaRead: 'यह आपका आभा कार्ड है। नंबर 14-2211-8890-4471 है।',
    voiceHelpBanner: 'सुनने के लिए किसी भी बटन पर 🔊 दबाएं।',

    uploadTitle: 'रिपोर्ट की फोटो लें',
    uploadDesc: 'कागज सीधा रखें',
    takePhoto: '📷 कैमरा',
    chooseFile: '📂 गैलरी',
    blurCheck: 'जांच हो रही है...',
    blurPassed: '✓ फोटो साफ है',
    docIdentified: 'ब्लड शुगर (खून जांच)',
    analyzingWithAyush: 'सरल अर्थ तैयार हो रहा है...',
    readAloudReport: '🔊 रिपोर्ट सुनें',
    uploadSuccess: 'रिपोर्ट सुरक्षित जुड़ गई!',
    sampleReports: 'नमूना चुनें:',

    doctorConsole: 'डॉक्टर कंसोल',
    patientView: 'मरीज दृश्य',
    hospitalName: 'आयुष आरोग्य मंदिर, नई दिल्ली',
    docGreeting: 'डॉ. राधिका अय्यर (HPR)',
    patientsToday: 'आज के मरीज',
    pendingConsent: 'सहमति लंबित',
    syncedRecords: 'FHIR रिकॉर्ड्स',
    sendFhirBundle: 'FHIR बंडल भेजें',
    viewScope: 'दायरा देखें',
    sentSuccess: '✓ सुरक्षित FHIR रिकॉर्ड्स भेजे गए।',

    saathiTitle: '🌿 आयुष साथी',
    saathiSubtitle: 'बोलकर या लिखकर पूछें',
    saathiPlaceholder: 'पूछें या माइक दबाएं...',
    quickQuestions: [
      'मेरी शुगर 168 है, क्या खाऊं?',
      'घुटने के दर्द में कौन सा तेल लगाएं?',
      'काढ़ा कैसे बनाएं?',
      'दवा की खुराक बताएं'
    ],
    speakNow: '🎙️ बोलिए, सुन रहे हैं...',
    voiceSend: 'भेजें',
    close: 'बंद करें',
    callHelp: '📞 आयुष 14443',
    emergencyTitle: 'आपातकालीन'
  },
  en: {
    ministryBadge: 'Ministry of Ayush, Govt. of India',
    subMinistry: 'Ayurveda • Yoga • Unani • Siddha • Homoeopathy',
    appTitle: 'Swasthya Saathi',
    greetingMorning: 'Namaste, Ramesh ji',
    greetingSub: 'All records are secure.',
    listenBtn: 'Listen',
    listening: 'Listening...',
    abhaTitle: 'ABHA Health Card',
    abhaVerified: 'Verified via ABDM',
    abhaNumber: 'ABHA Number',
    abhaAddressLabel: 'ABHA Address: ramesh@abdm',
    showCard: 'Show Card',
    closeCard: 'Close Card',
    
    actionUpload: 'Take Photo',
    actionUploadSub: 'Camera or file',
    actionRecords: 'Health Records',
    actionRecordsSub: '4 safe records',
    actionDoctor: 'Ayush Centers',
    actionDoctorSub: 'Nearby wellness centers',
    actionSaathi: 'Ayush Saathi',
    actionSaathiSub: 'Ask by voice',

    tipsTitle: 'Daily Health Tips',
    tipsSub: 'Ayush wellness',
    recordsTitle: 'Recent Records',
    recordsSub: 'Test summaries',
    ayushRemediesTitle: 'Ayush Remedies',
    ayushRemediesSub: 'Home wellness',

    statusNormal: 'Normal',
    statusAttention: 'Attention',
    statusHigh: 'High',
    statusActive: 'Active',

    voiceGreeting: 'Namaste Ramesh ji! Your health records are safe.',
    voiceAbhaRead: 'This is your ABHA card. Number is 14-2211-8890-4471.',
    voiceHelpBanner: 'Tap 🔊 on any card to listen.',

    uploadTitle: 'Take Photo of Report',
    uploadDesc: 'Keep document flat',
    takePhoto: '📷 Camera',
    chooseFile: '📂 Gallery',
    blurCheck: 'Checking photo...',
    blurPassed: '✓ Photo is sharp',
    docIdentified: 'Blood Sugar Report',
    analyzingWithAyush: 'Preparing summary...',
    readAloudReport: '🔊 Listen to Summary',
    uploadSuccess: 'Report linked successfully!',
    sampleReports: 'Pick sample:',

    doctorConsole: 'Doctor Console',
    patientView: 'Patient View',
    hospitalName: 'Ayush Arogya Mandir, New Delhi',
    docGreeting: 'Dr. Radhika Iyer (HPR)',
    patientsToday: 'Patients Today',
    pendingConsent: 'Pending Consent',
    syncedRecords: 'FHIR Records',
    sendFhirBundle: 'Send FHIR Bundle',
    viewScope: 'View Scope',
    sentSuccess: '✓ Encrypted FHIR sent.',

    saathiTitle: '🌿 Ayush Saathi',
    saathiSubtitle: 'Ask by voice or typing',
    saathiPlaceholder: 'Ask question or tap mic...',
    quickQuestions: [
      'Sugar is 168, what should I eat?',
      'Remedy for knee joint stiffness?',
      'How to make herbal Kadha?',
      'When to take my medicine?'
    ],
    speakNow: '🎙️ Speak now, listening...',
    voiceSend: 'Send',
    close: 'Close',
    callHelp: '📞 Ayush 14443',
    emergencyTitle: 'Emergency'
  },
  ta: {
    ministryBadge: 'ஆயுஷ் அமைச்சகம், இந்திய அரசு',
    subMinistry: 'ஆயுர்வேதம் • யோகா • யுனானி • சித்தா • ஹோமியோபதி',
    appTitle: 'சுவஸ்திய சாதி',
    greetingMorning: 'வணக்கம், ரமேஷ் அவர்களே',
    greetingSub: 'உங்கள் மருத்துவ ஆவணங்கள் அனைத்தும் பத்திரமாக உள்ளன.',
    listenBtn: 'கேட்க அழுத்தவும்',
    listening: 'கேட்கிறது...',
    abhaTitle: 'உங்கள் ஆபா (ABHA) மருத்துவ அட்டை',
    abhaVerified: 'சரிபார்க்கப்பட்டு இணைக்கப்பட்டது',
    abhaNumber: 'ஆபா எண்',
    abhaAddressLabel: 'முகவரி: ramesh@abdm',
    showCard: 'மருத்துவமனையில் காட்டவும்',
    closeCard: 'அட்டையை மூடவும்',
    
    actionUpload: 'பரிசோதனை சீட்டை படம் பிடிக்கவும்',
    actionUploadSub: 'கேமரா மூலம் எளிதாக பதிவேற்றவும்',
    actionRecords: 'எனது மருத்துவ பதிவுகள்',
    actionRecordsSub: '4 அறிக்கைகள் சேமிக்கப்பட்டுள்ளன',
    actionDoctor: 'ஆயுஷ் மருத்துவரை பார்க்க',
    actionDoctorSub: 'அருகிலுள்ள அரசு ஆயுஷ் மையம்',
    actionSaathi: 'சாதியிடம் பேசி கேட்கவும்',
    actionSaathiSub: 'உங்கள் தாய்மொழியில் கேள்வி கேட்கலாம்',

    tipsTitle: 'இன்றைய இயற்கை நலக் குறிப்புகள்',
    tipsSub: 'பாரம்பரிய சித்த மற்றும் ஆயுர்வேத வழிகள்',
    recordsTitle: 'உங்கள் அண்மைக்கால பதிவுகள்',
    recordsSub: 'எளிய விளக்கங்களுடன் உங்கள் அறிக்கைகள்',
    ayushRemediesTitle: 'பாரம்பரிய கைவைத்தியம்',
    ayushRemediesSub: 'துளசி, மஞ்சள், நெல்லிக்காய் மற்றும் பிராணாயாமம்',

    statusNormal: 'இயல்பானது (Normal)',
    statusAttention: 'கவனம் தேவை',
    statusHigh: 'அதிக அளவு (மருத்துவரை பார்க்கவும்)',
    statusActive: 'தற்போதைய மருந்து',

    voiceGreeting: 'வணக்கம் ரமேஷ் அவர்களே! சுவஸ்திய சாதி உங்களை வரவேற்கிறது. உங்கள் உடல்நலம் பாதுகாப்பாக உள்ளது.',
    voiceAbhaRead: 'இது உங்கள் 14 இலக்க ஆபா அடையாள அட்டை. எண் 14-2211-8890-4471.',
    voiceHelpBanner: 'உரையைப் படிக்க சிரமமாக இருந்தால், ஒலிபெருக்கி பொத்தானை அழுத்தினால் அது வாசிக்கும்.',

    uploadTitle: 'மருத்துவ சீட்டை படம் எடுக்கவும்',
    uploadDesc: 'வெளிச்சத்தில் தாளை நேராக வைக்கவும்',
    takePhoto: '📷 கேமராவை திறக்கவும்',
    chooseFile: '📂 படத்தைத் தேர்வு செய்க',
    blurCheck: 'படத்தின் தரம் சரிபார்க்கப்படுகிறது...',
    blurPassed: '✓ படம் தெளிவாகவும் படிக்கக்கூடியதாகவும் உள்ளது',
    docIdentified: 'கண்டறியப்பட்டது: ரத்த சர்க்கரை பரிசோதனை',
    analyzingWithAyush: 'எளிய விளக்கம் தயார் செய்யப்படுகிறது...',
    readAloudReport: '🔊 அறிக்கையை தமிழில் கேட்கவும்',
    uploadSuccess: 'அறிக்கை ஆபா கணக்குடன் வெற்றிகரமாக இணைக்கப்பட்டது!',
    sampleReports: 'மாதிரி அறிக்கையை சோதிக்க:',

    doctorConsole: 'மருத்துவர் பலகை (ABDM)',
    patientView: 'நோயாளி பார்வை (எளிமையானது)',
    hospitalName: 'ஆயுஷ் ஆரோக்கிய மந்திர், புது தில்லி',
    docGreeting: 'காலை வணக்கம், மருத்துவர் ராதிகா ஐயர்',
    patientsToday: 'இன்றைய நோயாளிகள்',
    pendingConsent: 'நிலுவையில் உள்ள ஒப்புதல்கள்',
    syncedRecords: 'FHIR இணைப்புகள்',
    sendFhirBundle: 'FHIR தரவு அனுப்பவும்',
    viewScope: 'அனுமதி விவரம்',
    sentSuccess: '✓ பாதுகாப்பான FHIR தரவு அனுப்பப்பட்டது.',

    saathiTitle: '🌿 சாதி குரல் உதவியாளர்',
    saathiSubtitle: 'தமிழில் பேசி சந்தேகங்களை தீர்க்கவும்',
    saathiPlaceholder: 'கேள்வி கேளுங்கள் அல்லது மைக்கை அழுத்தவும்...',
    quickQuestions: [
      'சர்க்கரை அளவு 168 உள்ளது, என்ன உணவு சாப்பிடலாம்?',
      'மூட்டு வலிக்கு எளிய எண்ணெய் என்ன?',
      'கபசுர குடிநீர் எப்படி தயாரிப்பது?'
    ],
    speakNow: '🎙️ இப்போது பேசுங்கள், கேட்கிறோம்...',
    voiceSend: 'அனுப்பு',
    close: 'மூடு',
    callHelp: '📞 ஆயுஷ் உதவி 14443',
    emergencyTitle: 'அவசர உதவி'
  },
  te: {
    ministryBadge: 'ఆయుష్ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
    subMinistry: 'ఆయుర్వేదం • యోగా • యునాని • సిద్ధ • హోమియోపతి',
    appTitle: 'స్వాస్థ్య సాథీ',
    greetingMorning: 'నమస్కారం, రమేష్ గారు',
    greetingSub: 'మీ ఆరోగ్య రికార్డులు మరియు మందుల చీటీలు సురక్షితంగా ఉన్నాయి.',
    listenBtn: 'వినడానికి నొక్కండి',
    listening: 'వింటున్నాము...',
    abhaTitle: 'మీ ఆభా (ABHA) ఆరోగ్య కార్డు',
    abhaVerified: 'ధృవీకరించబడింది',
    abhaNumber: 'ఆభా సంఖ్య',
    abhaAddressLabel: 'ఆభా చిరునామా: ramesh@abdm',
    showCard: 'ఆసుపత్రి కౌంటర్ వద్ద చూపించండి',
    closeCard: 'కార్డును మూసివేయండి',
    
    actionUpload: 'రిపోర్టు ఫోటో తీయండి',
    actionUploadSub: 'కెమెరా ద్వారా సులభంగా అప్‌లోడ్ చేయండి',
    actionRecords: 'నా పాత రిపోర్టులు',
    actionRecordsSub: '4 రిపోర్టులు భద్రంగా ఉన్నాయి',
    actionDoctor: 'ఆయుష్ వైద్యాధికారి',
    actionDoctorSub: 'సమీప ప్రభుత్వ ఆయుష్ కేంద్రం',
    actionSaathi: 'సాథీతో మాట్లాడండి',
    actionSaathiSub: 'మీ మాతృభాషలో ఏదైనా అడగండి',

    tipsTitle: 'ఈ రోజు ఆరోగ్య చిట్కాలు',
    tipsSub: 'ఆయుర్వేద గృహ చికిత్సలు & దినచర్య',
    recordsTitle: 'మీ ఇటీవలి పరీక్షల ఫలితాలు',
    recordsSub: 'సులభమైన వివరణలతో మీ రికార్డులు',
    ayushRemediesTitle: 'సాంప్రదాయ ఆయుష్ చిట్కాలు',
    ayushRemediesSub: 'తులసి, పసుపు, ఉసిరి మరియు ప్రాణాయామం',

    statusNormal: 'అంతా బాగుంది (Normal)',
    statusAttention: 'శ్రద్ధ వహించండి',
    statusHigh: 'ఎక్కువగా ఉంది (డాక్టర్‌ను సంప్రదించండి)',
    statusActive: 'ప్రస్తుత మందులు',

    voiceGreeting: 'నమస్కారం రమేష్ గారు! స్వాస్థ్య సాథీకి స్వాగతం. మీ ఆరోగ్యం బాగుందా?',
    voiceAbhaRead: 'ఇది మీ 14 అంకెల ఆభా హెల్త్ కార్డు. నంబర్ 14-2211-8890-4471.',
    voiceHelpBanner: 'మీరు చదవలేకపోతే, స్పీకర్ బటన్ నొక్కితే అది చదివి వినిపిస్తుంది.',

    uploadTitle: 'పరీక్ష రిపోర్టు ఫోటో తీయండి',
    uploadDesc: 'కాగితాన్ని మంచి వెలుతురులో నిటారుగా ఉంచండి',
    takePhoto: '📷 కెమెరా తెరవండి',
    chooseFile: '📂 గ్యాలరీ నుండి ఎంచుకోండి',
    blurCheck: 'ఫోటో స్పష్టత తనిఖీ జరుగుతోంది...',
    blurPassed: '✓ ఫోటో స్పష్టంగా ఉంది',
    docIdentified: 'గుర్తించబడింది: రక్తంలో చక్కెర పరీక్ష',
    analyzingWithAyush: 'సులభమైన వివరణ సిద్ధమవుతోంది...',
    readAloudReport: '🔊 రిపోర్టును తెలుగులో వినండి',
    uploadSuccess: 'మీ రికార్డు విజయవంతంగా భద్రపరచబడింది!',
    sampleReports: 'నమూనా రిపోర్టును పరీక్షించండి:',

    doctorConsole: 'డాక్టర్ కన్సోల్ (ABDM)',
    patientView: 'రోగి వీక్షణ (సులభమైనది)',
    hospitalName: 'ఆయుష్ ఆరోగ్య మందిరం, న్యూఢిల్లీ',
    docGreeting: 'శుభోదయం, డా. రాధిక అయ్యర్',
    patientsToday: 'ఈ రోజు రోగులు',
    pendingConsent: 'పెండింగ్ ఆమోదాలు',
    syncedRecords: 'FHIR రికార్డులు',
    sendFhirBundle: 'FHIR డేటా పంపండి',
    viewScope: 'పరిధి చూడండి',
    sentSuccess: '✓ భద్రపరచిన FHIR డేటా పంపబడింది.',

    saathiTitle: '🌿 సాథీ వాయిస్ సహాయకుడు',
    saathiSubtitle: 'తెలుగులో మాట్లాడి సమాధానాలు పొందండి',
    saathiPlaceholder: 'ప్రశ్నను ఇక్కడ అడగండి లేదా మైక్ నొక్కండి...',
    quickQuestions: [
      'షుగర్ 168 ఉంది, ఏమి తినాలి?',
      'కీళ్ల నొప్పులకు మంచి నూనె ఏమిటి?',
      'తులసి కషాయం ఎలా చేసుకోవాలి?'
    ],
    speakNow: '🎙️ ఇప్పుడు మాట్లాడండి, వింటున్నాము...',
    voiceSend: 'పంపు',
    close: 'మూసివేయి',
    callHelp: '📞 ఆయుష్ హెల్ప్‌లైన్ 14443',
    emergencyTitle: 'అత్యవసర సహాయం'
  },
  bn: {
    ministryBadge: 'আয়ুষ মন্ত্রক, ভারত সরকার',
    subMinistry: 'আয়ুর্বেদ • যোগ • ইউনানি • সিদ্ধ • হোমিওপ্যাথি',
    appTitle: 'স্বাস্থ্য সাথী',
    greetingMorning: 'নমস্কার, রমেশ বাবু',
    greetingSub: 'আপনার সমস্ত স্বাস্থ্য পরীক্ষার রিপোর্ট ও প্রেসক্রিপশন সুরক্ষিত আছে।',
    listenBtn: 'শুনে নিন',
    listening: 'শুনছি...',
    abhaTitle: 'আপনার আভা (ABHA) স্বাস্থ্য পরিচয়পত্র',
    abhaVerified: 'যাচাইকৃত ও সংযুক্ত',
    abhaNumber: 'আভা নম্বর',
    abhaAddressLabel: 'আভা ঠিকানা: ramesh@abdm',
    showCard: 'হাসপাতাল কাউন্টারে দেখান',
    closeCard: 'কার্ড বন্ধ করুন',
    
    actionUpload: 'রিপোর্টের ছবি তুলুন',
    actionUploadSub: 'ক্যামেরা দিয়ে সরাসরি যোগ করুন',
    actionRecords: 'আমার পুরনো রিপোর্ট',
    actionRecordsSub: '৪টি রিপোর্ট জমা আছে',
    actionDoctor: 'আয়ুষ কেন্দ্র ও ডাক্তার',
    actionDoctorSub: 'কাছের সরকারি আয়ুষ কেন্দ্র',
    actionSaathi: 'সাথীকে মুখে বলুন',
    actionSaathiSub: 'নিজের ভাষায় প্রশ্ন জিজ্ঞাসা করুন',

    tipsTitle: 'আজকের প্রাকৃতিক স্বাস্থ্য টিপস',
    tipsSub: 'আয়ুর্বেদিক ঘরোয়া পরিচর্যা ও নিয়ম',
    recordsTitle: 'আপনার সাম্প্রতিক রিপোর্ট',
    recordsSub: 'সহজ ভাষায় আপনার স্বাস্থ্য বিবরণ',
    ayushRemediesTitle: 'দাদি-নানির আয়ুষ টোটকা',
    ayushRemediesSub: 'তুলসী, হলুদ, আমলকী ও প্রাণায়াম',

    statusNormal: 'সব স্বাভাবিক (Normal)',
    statusAttention: 'একটু যত্ন নিন',
    statusHigh: 'মাত্রা বেশি (ডাক্তার দেখান)',
    statusActive: 'চলতি ওষুধ',

    voiceGreeting: 'নমস্কার রমেশ বাবু! স্বাস্থ্য সাথীতে আপনাকে স্বাগত। আপনার স্বাস্থ্য কেমন আছে?',
    voiceAbhaRead: 'এটি আপনার ১৪ সংখ্যার আভা কার্ড। নম্বর হলো ১৪-২২১১-৮৮৯০-৪৪৭১।',
    voiceHelpBanner: 'পড়তে অসুবিধা হলে যে কোনো কার্ডের স্পিকার বোতামটি চাপুন, আমরা পড়ে শোনাব।',

    uploadTitle: 'রিপোর্ট বা প্রেসক্রিপশনের ছবি নিন',
    uploadDesc: 'কাগজটি ভালো আলোয় সোজা করে রাখুন',
    takePhoto: '📷 ক্যামেরা খুলুন',
    chooseFile: '📂 ফাইল বাছুন',
    blurCheck: 'ছবির মান পরীক্ষা করা হচ্ছে...',
    blurPassed: '✓ ছবি সম্পূর্ণ স্পষ্ট ও পাঠযোগ্য',
    docIdentified: 'শনাক্ত হয়েছে: রক্তের সুগার রিপোর্ট',
    analyzingWithAyush: 'সহজ ভাষায় অর্থ তৈরি করা হচ্ছে...',
    readAloudReport: '🔊 বাংলায় রিপোর্টটি শুনুন',
    uploadSuccess: 'রিপোর্টটি সফলভাবে যুক্ত হয়েছে!',
    sampleReports: 'নমুনা রিপোর্ট পরীক্ষা করুন:',

    doctorConsole: 'ডাক্তার কনসোল (ABDM)',
    patientView: 'রোগী ভিউ (সহজ)',
    hospitalName: 'আয়ুষ আরোগ্য মন্দির, নতুন দিল্লি',
    docGreeting: 'সুপ্রভাত, ডাঃ রাধিকা আইয়ার',
    patientsToday: 'আজকের রোগী',
    pendingConsent: 'বাকি সম্মতি',
    syncedRecords: 'FHIR রেকর্ডস',
    sendFhirBundle: 'FHIR ডেটা পাঠান',
    viewScope: 'অনুমতি দেখুন',
    sentSuccess: '✓ সুরক্ষিত FHIR রেকর্ড পাঠানো হয়েছে।',

    saathiTitle: '🌿 সাথী ভয়েস সহায়ক',
    saathiSubtitle: 'বাংলায় মুখে বলুন বা লিখে প্রশ্ন করুন',
    saathiPlaceholder: 'প্রশ্ন লিখুন বা মাইক চাপুন...',
    quickQuestions: [
      'সুগার ১৬৮ এসেছে, কী খাওয়া উচিত?',
      'হাঁটুর ব্যথায় কোন তেল ভালো?',
      'তুলসীর ক্বাথ কীভাবে বানাব?'
    ],
    speakNow: '🎙️ এখন কথা বলুন, শুনছি...',
    voiceSend: 'পাঠান',
    close: 'বন্ধ করুন',
    callHelp: '📞 আয়ুষ হেল্পলাইন ১৪৪৪৩',
    emergencyTitle: 'জরুরি সাহায্য'
  },
  mr: {
    ministryBadge: 'आयुष मंत्रालय, भारत सरकार',
    subMinistry: 'आयुर्वेद • योग • युनानी • सिद्ध • होमिओपॅथी',
    appTitle: 'स्वास्थ्य साथी',
    greetingMorning: 'नमस्कार, रमेश जी',
    greetingSub: 'तुमचे सर्व वैद्यकीय अहवाल आणि औषधांच्या चिठ्ठ्या सुरक्षित आहेत.',
    listenBtn: 'ऐका',
    listening: 'ऐकत आहे...',
    abhaTitle: 'तुमचे आभा (ABHA) आरोग्य ओळखपत्र',
    abhaVerified: 'प्रमाणित आणि जोडलेले',
    abhaNumber: 'आभा क्रमांक',
    abhaAddressLabel: 'आभा पत्ता: ramesh@abdm',
    showCard: 'रुग्णालय काउंटरवर दाखवा',
    closeCard: 'कार्ड बंद करा',
    
    actionUpload: 'अहवालाचा फोटो काढा',
    actionUploadSub: 'कॅमेरा किंवा गॅलरीतून जोडा',
    actionRecords: 'माझे जुने अहवाल',
    actionRecordsSub: '४ अहवाल जतन केले आहेत',
    actionDoctor: 'आयुष केंद्र व डॉक्टर',
    actionDoctorSub: 'जवळचे सरकारी आयुष आरोग्य मंदिर',
    actionSaathi: 'साथीला बोलून विचारा',
    actionSaathiSub: 'तुमच्या भाषेत कोणताही प्रश्न',

    tipsTitle: 'आजचे नैसर्गिक आरोग्य सल्ले',
    tipsSub: 'आयुर्वेदिक घरगुती उपचार व दिनचर्या',
    recordsTitle: 'तुमचे अलीकडील अहवाल',
    recordsSub: 'सोप्या भाषेत अहवालाचा अर्थ समजून घ्या',
    ayushRemediesTitle: 'आजीबाईचा पारंपरिक बटवा',
    ayushRemediesSub: 'तुळस, हळद, आवळा आणि प्राणायाम',

    statusNormal: 'सर्व सामान्य आहे (Normal)',
    statusAttention: 'थोडे लक्ष द्या',
    statusHigh: 'प्रमाण जास्त आहे (डॉक्टरांचा सल्ला घ्या)',
    statusActive: 'चालू औषध',

    voiceGreeting: 'नमस्कार रमेश जी! स्वास्थ्य साथीमध्ये आपले स्वागत आहे. आपले आरोग्य कसे आहे?',
    voiceAbhaRead: 'हे आपले १४ अंकी आभा हेल्थ कार्ड आहे. क्रमांक १४-२२११-८८९०-४४७१ असा आहे.',
    voiceHelpBanner: 'वाचण्यास अडचण येत असल्यास स्पीकरचे बटण दाबा, आम्ही वाचून दाखवू.',

    uploadTitle: 'अहवाल किंवा चिठ्ठीचा फोटो घ्या',
    uploadDesc: 'कागद चांगल्या प्रकाशात सरळ धरा',
    takePhoto: '📷 कॅमेरा सुरू करा',
    chooseFile: '📂 गॅलरीतून निवडा',
    blurCheck: 'फोटोची स्पष्टता तपासत आहे...',
    blurPassed: '✓ फोटो स्पष्ट आणि वाचण्यायोग्य आहे',
    docIdentified: 'ओळखले: रक्त साखर तपासणी (Blood Sugar)',
    analyzingWithAyush: 'सोप्या भाषेतील अर्थ तयार होत आहे...',
    readAloudReport: '🔊 अहवाल मराठीत ऐका',
    uploadSuccess: 'अहवाल यशस्वीरीत्या आभा कार्डशी जोडला गेला आहे!',
    sampleReports: 'चाचणीसाठी नमुना निवडा:',

    doctorConsole: 'डॉक्टर कन्सोल (ABDM)',
    patientView: 'रुग्ण दृश्य (सोपे)',
    hospitalName: 'आयुष आरोग्य मंदिर, नवी दिल्ली',
    docGreeting: 'शुभ प्रभात, डॉ. राधिका अय्यर',
    patientsToday: 'आजचे रुग्ण',
    pendingConsent: 'प्रलंबित परवानग्या',
    syncedRecords: 'FHIR नोंदी',
    sendFhirBundle: 'FHIR डेटा हस्तांतरित करा',
    viewScope: 'स्वीकृत व्याप्ती पहा',
    sentSuccess: '✓ एनक्रिप्टेड FHIR बंडल थेट पाठवले गेले.',

    saathiTitle: '🌿 साथी आवाज सहाय्यक',
    saathiSubtitle: 'मराठीत बोलून किंवा टाईप करून विचारा',
    saathiPlaceholder: 'येथे विचारा किंवा माइक दाबा...',
    quickQuestions: [
      'माझी साखर १६८ आहे, मी काय खावे?',
      'गुडघेदुखीवर कोणता घरगुती उपाय करावा?',
      'प्रतिकारशक्तीसाठी काढा कसा बनवायचा?'
    ],
    speakNow: '🎙️ आता बोला, आम्ही ऐकत आहोत...',
    voiceSend: 'पाठवा',
    close: 'बंद करा',
    callHelp: '📞 आयुष हेल्पलाइन १४४४३',
    emergencyTitle: 'तातडीची मदत'
  }
};
