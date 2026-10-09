document.addEventListener('DOMContentLoaded', () => {
    // 1. القائمة المتنقلة للموبايل
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. نموذج الاستفسارات العادي
    const inquiryForm = document.getElementById('inquiryForm');
    const successToast = document.getElementById('successToast');

    if (inquiryForm && successToast) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successToast.classList.add('show');
            inquiryForm.reset();
            setTimeout(() => {
                successToast.classList.remove('show');
            }, 4000);
        });
    }

    // 3. تفاصيل البرامج
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('program');

    if (programId) {
        const pageTitle = document.getElementById('pageTitle');
        const progAge = document.getElementById('progAge');
        const progTitle = document.getElementById('progTitle');
        const progDesc = document.getElementById('progDesc');
        const progGoals = document.getElementById('progGoals');
        const progCoursesList = document.getElementById('progCoursesList');

        const programsData = {
            'toddlers': {
                title: 'برنامج الحضانات الصغرى (Toddlers)',
                age: 'من سنة إلى سنتين',
                desc: 'رعاية فائقة وأنشطة حسية تعتمد على الأساليب الذكية لتحفيز الاستماع والتركيز المبكر.',
                goals: 'يركز هذا البرنامج على توفير بيئة دافئة وآمنة للرضع والصغار، مع تقديم ألعاب حسية وتنسيق بصري حركي مدعوم بأساليب التوجيه الحديثة وبناء الروتين الصحي.',
                modules: [
                    {
                        title: 'الوحدة الأولى: الاستكشاف الحسي والبصري',
                        duration: 'الشهر 1 - 3',
                        topics: ['تمارين التتبع البصري بالأضواء الذكية', 'الألعاب الحسية للملمس والأصوات', 'الاستجابة للمثيرات الصوتية الهادئة']
                    },
                    {
                        title: 'الوحدة الثانية: التآزر الحركي وبناء الروتين',
                        duration: 'الشهر 4 - 6',
                        topics: ['التنسيق بين اليد والعين عبر ألعاب مبسطة', 'تثبيت روتين النوم والطعام الصحي', 'جلسات تفاعل اجتماعي مبكرة مع الأقران']
                    },
                    {
                        title: 'الوحدة الثالثة: الاستماع والتواصل الأولي',
                        duration: 'الشهر 7 - 12',
                        topics: ['سماع الأناشيد الإيقاعية لتحفيز النطق', 'التعرف على الصور البسيطة والمحسوسة', 'تنمية مهارات الثقة والأمان النفسي']
                    }
                ]
            },
            'preschool': {
                title: 'برنامج ما قبل التمهيدي (Pre-School)',
                age: 'من 2 إلى 3 سنوات',
                desc: 'التعرف التفاعلي على الحروف والأرقام باستخدام أدوات تعليمية ذكية وممتعة تعزز الإبداع.',
                goals: 'يساعد هذا البرنامج الطفل على استكشاف العالم من حوله، وتأسيس مبدئي ذكي في اللغات، وتنمية مهارات التخاطب الذكي والفنون والأشغال التفاعلية.',
                modules: [
                    {
                        title: 'الوحدة الأولى: الحروف العربية والإنجليزية التفاعلية',
                        duration: 'المستوى الأساسي',
                        topics: ['التعرف على أصوات وأشكال الحروف بالذكاء الاصطناعي', 'ألعاب تلوين وتشكيل الحروف بالصلصال', 'تكوين الحصيلة اللغوية الأولى (أكثر من 100 كلمة)']
                    },
                    {
                        title: 'الوحدة الثانية: الأرقام والعد المنطقي المبكر',
                        duration: 'المستوى المتوسط',
                        topics: ['العد التفاعلي من 1 إلى 10 باستخدام الألعاب الذكية', 'فهم مفاهيم (كبير / صغير، كثير / قليل)', 'الألغاز الهندسية الخشبية وتجميع الأشكال']
                    },
                    {
                        title: 'الوحدة الثالثة: التخاطب والفنون الإبداعية',
                        duration: 'المستوى المتقدم',
                        topics: ['التعبير عن المشاعر والاحتياجات بجمل صحيحة', 'جلسات الرسم والتصميم اليدوي الحر', 'القصص التفاعلية المغروسة بالقيم والأخلاق']
                    }
                ]
            },
            'kindergarten': {
                title: 'برنامج الروضة وتأهيل المدرسة (Kindergarten)',
                age: 'من 3 إلى 5 سنوات',
                desc: 'إعداد شامل ومتقدم للمقابلة المدرسية باستخدام مناهج الذكاء الاصطناعي لتنمية التفكير النقدي.',
                goals: 'إعداد أكاديمي متين في القراءة والكتابة المتقدمة، مقدمة في الرياضيات والعلوم المبسطة، وتدريب مكثف ومحاكى للمقابلات المدرسية.',
                modules: [
                    {
                        title: 'الوحدة الأولى: القراءة والكتابة المتقدمة (تأسيس قوي)',
                        duration: 'الترم الأول',
                        topics: ['قراءة وكتابة الكلمات الثلاثية والرباعية بطلاقة', 'قواعد الإملاء المبسطة وتكوين الجمل', 'القصص القصيرة ومهارات الاستيعاب القرائي']
                    },
                    {
                        title: 'الوحدة الثانية: مبادئ البرمجة والمنطق الرقمي',
                        duration: 'الترم الثاني',
                        topics: ['مفاهيم التفكير الخوارزمي المبسط للأطفال (Coding basics)', 'حل الألغاز الذكية المعتمدة على الأنماط', 'أساسيات استخدام الحاسب والتقنية بأمان']
                    },
                    {
                        title: 'الوحدة الثالثة: التأهيل الشامل للمقابلات المدرسية',
                        duration: 'المرحلة النهائية',
                        topics: ['المحاكاة الكاملة لاختبارات القبول بالمدارس الدولية', 'مهارات العرض والثقة بالنفس أمام الجمهور', 'العمل الجماعي وحل المشكلات البسيطة']
                    }
                ]
            }
        };

        if (programsData[programId]) {
            const data = programsData[programId];
            if (pageTitle) pageTitle.textContent = data.title + ' - حضانة Roots';
            if (progTitle) progTitle.textContent = data.title;
            if (progAge) progAge.textContent = data.age;
            if (progDesc) progDesc.textContent = data.desc;
            if (progGoals) progGoals.textContent = data.goals;

            if (progCoursesList && data.modules) {
                progCoursesList.innerHTML = data.modules.map(mod => `
                    <div class="course-module-card">
                        <div class="module-header">
                            <h4><i class="fa-solid fa-book-open"></i> ${mod.title}</h4>
                            <span class="module-badge">${mod.duration}</span>
                        </div>
                        <ul class="module-topics">
                            ${mod.topics.map(topic => `<li><i class="fa-solid fa-circle"></i> ${topic}</li>`).join('')}
                        </ul>
                    </div>
                `).join('');
            }
        }
    }

    // 4. شريط التنقل
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.height = '80px';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
                navbar.style.height = '90px';
            }
        });
    }

    // 5. تشغيل المساعد الصوتي
    initVoiceChatbot();
});

// ==========================================
// محرك الذكاء الصوتي المدمج (Offline Native AI)
// ==========================================

function getLocalBotReply(userText) {
    const text = userText.toLowerCase().trim();

    // التحية
    if (text.includes("ازيك") || text.includes("عامل ايه") || text.includes("مرحبا") || text.includes("اهلا") || text.includes("سلام")) {
        return "أهلاً بك! أنا بخير وسعيد بالتحدث معك. أنا المساعد الذكي لحضانة Roots، كيف أستطيع مساعدتك اليوم؟";
    }

    // المميزات
    if (text.includes("مميز") || text.includes("ليه اختار") || text.includes("ميزه") || text.includes("عن الحضانة") || text.includes("مين انتو")) {
        return "تتميز حضانة Roots بدمج التربية الحديثة مع تقنيات الذكاء الاصطناعي، ورعاية فردية لكل طفل، مع بيئة آمنة وكاميرات مراقبة وأنشطة تفاعلية لتنمية التفكير المبكر.";
    }

    // البرامج والمراحل العمرية
    if (text.includes("برامج") || text.includes("برنامج") || text.includes("سن") || text.includes("اعمار") || text.includes("عمر") || text.includes("مراحل")) {
        return "نقدم ثلاثة برامج تعليمية: برنامج الحضانات الصغرى من سنة إلى سنتين، برنامج ما قبل التمهيدي من سنتين إلى ثلاث سنوات، وبرنامج الروضة والتأهيل المدرسي من ثلاث إلى خمس سنوات.";
    }

    // مواعيد العمل
    if (text.includes("مواعيد") || text.includes("ساعات") || text.includes("وقت") || text.includes("تفتح") || text.includes("تقفل") || text.includes("ايام")) {
        return "مواعيد العمل لدينا من الأحد إلى الخميس، من الساعة السابعة والنصف صباحاً حتى الرابعة عصراً، ويومي الجمعة والسبت عطلة رسمية.";
    }

    // الأسعار والمصروفات
    if (text.includes("سعر") || text.includes("اسعار") || text.includes("مصاريف") || text.includes("فلوس") || text.includes("تكلف") || text.includes("بكام")) {
        return "تختلف المصروفات بحسب البرنامج والمستوى، يمكنك التواصل مع إدارة الحضانة عبر الواتساب على رقم 01000000000 لمعرفة كافة التفاصيل وعروض التسجيل.";
    }

    // العنوان والموقع
    if (text.includes("عنوان") || text.includes("مكان") || text.includes("فين") || text.includes("موقعك")) {
        return "مقر حضانة Roots يقع في الشارع الرئيسي بجوار النادي، ويسعدنا جداً استقبالكم لزيارة الحضانة والتعرف عليها عن قرب.";
    }

    // التقديم والتسجيل
    if (text.includes("تقديم") || text.includes("تسجيل") || text.includes("اشترك") || text.includes("احجز")) {
        return "يمكنك التقديم عبر ملء نموذج الاستفسارات في أسفل الصفحة، أو زيارتنا مباشرة في مقر الحضانة، أو التواصل معنا عبر الهاتف لحجز المقابلة.";
    }

    // رد عام ذكي
    return "أهلاً بك في حضانة Roots! نحن نقدم برامج تعليمية حديثة للأطفال من عمر سنة حتى خمس سنوات بالدمج مع أدوات الذكاء الاصطناعي. يمكنك سؤالي عن البرامج، المواعيد، أو كيفية التقديم!";
}

// التحكم بحالة الأفاتار البصري
function setOrbState(state, captionText) {
    const orb = document.getElementById('voice-orb');
    const caption = document.getElementById('voice-caption');
    const statusText = document.getElementById('agent-status-text');

    if (orb) {
        orb.classList.remove('listening', 'speaking');
        if (state !== 'idle') orb.classList.add(state);
    }
    if (caption && captionText) caption.innerText = captionText;

    if (statusText) {
        if (state === 'listening') statusText.innerText = "جاري الاستماع لصوتك...";
        else if (state === 'speaking') statusText.innerText = "المساعد يتحدث الآن...";
        else statusText.innerText = "جاهز للاستماع والتحدث";
    }
}

// نطق الرد الصوتي باللغة العربية مع الأفاتار
function speakVoiceResponse(text) {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
        setOrbState('speaking', 'المساعد يجيبك صوتياً الآن...');
    };

    utterance.onend = () => {
        setOrbState('idle', 'اضغط على المايك لبدء محادثة جديدة');
    };

    utterance.onerror = () => {
        setOrbState('idle', 'اضغط على المايك لبدء محادثة جديدة');
    };

    window.speechSynthesis.speak(utterance);
}

function initVoiceChatbot() {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const micBtn = document.getElementById('mic-btn');

    if (chatToggleBtn) chatToggleBtn.addEventListener('click', toggleChat);
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);
    if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);

    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-SA';
        recognition.continuous = false;
        recognition.interimResults = false;

        micBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();

            if (micBtn.classList.contains('listening')) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                } catch (err) {
                    console.error(err);
                }
            }
        });

        recognition.onstart = () => {
            micBtn.classList.add('listening');
            setOrbState('listening', 'تفضل، أنا أستمع إليك الآن...');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (userInput) {
                userInput.value = transcript;
                handleSendMessage();
            }
        };

        recognition.onerror = () => {
            micBtn.classList.remove('listening');
            setOrbState('idle', 'حدث خطأ في التقاط الصوت، حاول مجدداً');
        };

        recognition.onend = () => {
            micBtn.classList.remove('listening');
        };
    } else if (micBtn) {
        micBtn.style.display = 'none';
    }
}

function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
        chatBox.classList.toggle('chat-hidden');
        if (!chatBox.classList.contains('chat-hidden')) {
            const userInput = document.getElementById('user-input');
            if (userInput) userInput.focus();
        } else {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setOrbState('idle', 'اضغط على المايك وابدأ الحديث مع حضانة Roots');
        }
    }
}

function appendMessage(text, type) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return null;

    const row = document.createElement('div');
    row.className = `message-row ${type}-row`;
    row.innerHTML = `<div class="${type}-message message">${text}</div>`;

    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return row;
}

function handleSendMessage() {
    const userInput = document.getElementById('user-input');
    if (!userInput) return;

    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    setOrbState('speaking', 'جاري التفكير وتوليد الرد الصوتي...');
    const loadingRow = appendMessage('جاري التفكير...', 'bot');

    setTimeout(() => {
        if (loadingRow) loadingRow.remove();
        const reply = getLocalBotReply(text);
        appendMessage(reply, 'bot');
        speakVoiceResponse(reply);
    }, 600);
}