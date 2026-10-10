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

    // 2. معالجة نموذج الاستفسارات
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

    // 3. تأثير التمرير للـ Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.height = '80px';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            navbar.style.height = '90px';
        }
    });

    // 4. تحميل تفاصيل البرنامج ومحتوى الكورسات ديناميكياً في صفحة program-details.html
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('program');

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

    if (programId && programsData[programId]) {
        const pageTitle = document.getElementById('pageTitle');
        const progAge = document.getElementById('progAge');
        const progTitle = document.getElementById('progTitle');
        const progDesc = document.getElementById('progDesc');
        const progGoals = document.getElementById('progGoals');
        const progCoursesList = document.getElementById('progCoursesList');

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

    // ============================================================
    // 5. المساعد الصوتي المصري "محمد" (الحضانة + أي موضوع عام)
    // ============================================================
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const orbContainer = document.getElementById('orbContainer');
    const voiceCaption = document.getElementById('voiceCaption');
    const botStatus = document.getElementById('botStatus');

    let isListening = false;
    let recognition = null;
    let maleVoice = null;

    // استخراج صوت رجل مصري/عربي
    function loadVoices() {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        maleVoice = voices.find(v =>
            v.lang.startsWith('ar') && (
                v.name.toLowerCase().includes('male') ||
                v.name.toLowerCase().includes('tarik') ||
                v.name.toLowerCase().includes('shaker') ||
                v.name.toLowerCase().includes('naayf') ||
                v.name.toLowerCase().includes('maged') ||
                v.name.toLowerCase().includes('bassam')
            )
        ) || voices.find(v => v.lang.includes('ar-EG')) || voices.find(v => v.lang.startsWith('ar'));
    }

    if ('speechSynthesis' in window) {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // فتح وإغلاق صندوق المحادثة
    if (chatToggleBtn && chatBox) {
        chatToggleBtn.addEventListener('click', () => {
            chatBox.classList.toggle('chat-hidden');
            if (!chatBox.classList.contains('chat-hidden')) {
                userInput.focus();
            }
        });

        if (closeChatBtn) {
            closeChatBtn.addEventListener('click', () => {
                chatBox.classList.add('chat-hidden');
                stopListening();
                window.speechSynthesis.cancel();
            });
        }
    }

    function appendMessage(sender, text) {
        const row = document.createElement('div');
        row.className = `message-row ${sender === 'user' ? 'user-row' : 'bot-row'}`;
        row.innerHTML = `<div class="message ${sender === 'user' ? 'user-message' : 'bot-message'}">${text}</div>`;
        chatMessages.appendChild(row);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // نطق الرد بصوت ولد مصري
    function speakMaleReply(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ar-EG';
        utterance.pitch = 0.82; // صوت خشن
        utterance.rate = 0.95;

        if (maleVoice) utterance.voice = maleVoice;

        orbContainer.classList.remove('listening');
        orbContainer.classList.add('speaking');
        voiceCaption.textContent = "محمد بيتكلم معاك...";
        if (botStatus) botStatus.textContent = "بيتكلم...";

        utterance.onend = () => {
            orbContainer.classList.remove('speaking');
            voiceCaption.textContent = "اضغط على المايك وكلمني في أي حاجة!";
            if (botStatus) botStatus.textContent = "متصل ومستعد للكلام";
        };

        utterance.onerror = () => {
            orbContainer.classList.remove('speaking');
            voiceCaption.textContent = "اضغط على المايك وكلمني في أي حاجة!";
            if (botStatus) botStatus.textContent = "متصل ومستعد للكلام";
        };

        window.speechSynthesis.speak(utterance);
    }

    // إرسال السؤال ومعالجة الرد
    async function getMohamedResponse(userText) {
        appendMessage('user', userText);

        const typingRow = document.createElement('div');
        typingRow.className = 'message-row bot-row';
        typingRow.id = 'typingIndicator';
        typingRow.innerHTML = '<div class="message bot-message"><i class="fa-solid fa-spinner fa-spin"></i> بفكر في الرد...</div>';
        chatMessages.appendChild(typingRow);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userText,
                    systemInstruction: `أنت شاب مصري اسمك محمد، ذكي ودمك خفيف وتتحدث باللهجة المصرية العامية 100% بدون أي فصحى.
- أنت المساعد الذكي لموقع حضانة Roots وملم بكل تفاصيلها (البرامج: Toddlers من 1-2 سنة، Pre-School من 2-3 سنوات، Kindergarten من 3-5 سنوات، التعلم بالذكاء الاصطناعي، الأنشطة، المواعيد من 7:30 لـ 4:00 عصراً من الأحد للخميس).
- في نفس الوقت أنت قادر ومستعد للدردشة في أي موضوع عام يطرحه المستخدم (كورة، برمجة، نكت، أكل، أسئلة عامة).
- اجعل ردودك مختصرة دائماً في جملة أو جملتين لأنك تتحدث صوتياً.`
                })
            });
            const data = await res.json();

            document.getElementById('typingIndicator')?.remove();
            appendMessage('bot', data.reply);
            speakMaleReply(data.reply);
        } catch (error) {
            document.getElementById('typingIndicator')?.remove();
            const fallback = generateUnifiedMohamedReply(userText);
            appendMessage('bot', fallback);
            speakMaleReply(fallback);
        }
    }

    // محرك الردود الذكي: يغطي الحضانة بالتفصيل وأي موضوع عام
    function generateUnifiedMohamedReply(text) {
        const q = text.toLowerCase().trim();

        // 1. أسئلة حضانة Roots
        if (q.includes('برنامج') || q.includes('برامج') || q.includes('اعمار') || q.includes('سن') || q.includes('مراحل')) {
            return "عندنا 3 برامج ممتازة في حضانة روتس: الحضانات الصغرى من سنة لسنتين، وما قبل التمهيدي من 2 لـ 3 سنوات، والروضة وتأهيل المدارس من 3 لـ 5 سنين بالذكاء الاصطناعي!";
        }
        if (q.includes('تودلر') || q.includes('صغرى') || q.includes('سنة') || q.includes('رضع') || q.includes('toddler')) {
            return "برنامج الصغار (Toddlers) من سنة لسنتين بيركز على الرعاية الفردية والألعاب الحسية وبناء الروتين وتنمية التركيز المبكر.";
        }
        if (q.includes('تمهيدي') || q.includes('كي جي') || q.includes('preschool') || q.includes('سنتين')) {
            return "برنامج ما قبل التمهيدي من سن سنتين لـ 3 سنين، بنعلمهم فيه الحروف والأرقام بطرق تفاعلية ذكية وتنمية التخاطب والفنون.";
        }
        if (q.includes('روضة') || q.includes('مدرسة') || q.includes('مقابلة') || q.includes('انترفيو') || q.includes('kindergarten')) {
            return "برنامج الروضة من 3 لـ 5 سنين بيأهل الطفل تماماً لاختبارات القبول بالمدارس، مع مبادئ البرمجة والتفكير المنطقي والقراءة المتقدمة.";
        }
        if (q.includes('ذكاء اصطناعي') || q.includes('تكنولوجيا') || q.includes('كمبيوتر') || q.includes('ai')) {
            return "في حضانة روتس بنوظف الذكاء الاصطناعي لتخصيص مسار تعليمي يناسب قدرات كل طفل، وألعاب ذكية تفاعلية تنمي ذكائه من صغره!";
        }
        if (q.includes('عنوان') || q.includes('مكان') || q.includes('فين') || q.includes('موقع')) {
            return "حضانة Roots موجودة في شارع الرئيسية بجوار النادي، وتشرفنا بزيارتك في أي وقت!";
        }
        if (q.includes('مواعيد') || q.includes('ساعات') || q.includes('شغالين') || q.includes('وقت')) {
            return "مواعيد الحضانة من الأحد للخميس، بنبدأ من 7:30 الصبح لحد 4:00 عصراً.";
        }
        if (q.includes('مصاريف') || q.includes('سعر') || q.includes('تكلفة') || q.includes('فلوس') || q.includes('اشتراك')) {
            return "سيب بياناتك ورقم تليفونك في استمارة التواصل اللي تحت، وإدارة الحضانة هتتواصل معاك فوراً بتفاصيل المصاريف والخصومات المتاحة.";
        }
        if (q.includes('تواصل') || q.includes('تليفون') || q.includes('رقم') || q.includes('واتس')) {
            return "تقدر تكلمنا على التليفون والواتساب على رقم +20 100 000 0000 أو تضغط على علامة الواتساب اللي على الشمال!";
        }
        if (q.includes('نشاط') || q.includes('انشطة') || q.includes('بتعملوا ايه')) {
            return "أنشطتنا متنوعة جداً: لغات، رسم وتصميم تفاعلي، تمارين رياضية، موسيقى وأناشيد هادفة، ومفاهيم مبسطة للتفكير الذكي.";
        }

        // 2. موضوعات عامة ودردشة مفتوحة
        if (q.includes('اسمك') || q.includes('مين انت')) {
            return "أنا محمد يا باشا! المساعد الصوتي هنا وصاحبك الجدع، تسألني عن الحضانة أو ندردش في أي حاجة، أنا جاهز!";
        }
        if (q.includes('ازيك') || q.includes('عامل ايه') || q.includes('اخبارك') || q.includes('صباح') || q.includes('مساء')) {
            return "الحمد لله تمام وزي الفل يا غالي! أنت طمني عنك وإيه أخبار يومك؟";
        }
        if (q.includes('نكتة') || q.includes('ضحكني') || q.includes('هزار')) {
            const jokes = [
                "مرة واحد بخيل أبوه مات عيط بعين واحدة علشان الدموع متخلصش!",
                "واحد كسلان دخل سباق جري ركب تاكسي علشان يوصل الأول!",
                "مرة كمبيوتر عطش، جابوله كباية رام يشربها!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        if (q.includes('كورة') || q.includes('اهلي') || q.includes('زمالك') || q.includes('ماتش')) {
            return "الكورة في مصر مزاج عالي يا عم! قولي بقى أنت بتشجع مين؟";
        }
        if (q.includes('اكل') || q.includes('جعان') || q.includes('طبيخ') || q.includes('كشري')) {
            return "والله فتحت نفسي، مفيش أحسن من طبق كشري متحبش شطة ودقة أو حواوشي سخن دلوقتي!";
        }
        if (q.includes('شكرا') || q.includes('تسلم') || q.includes('حبيبي')) {
            return "حبيبي يا غالي الشكر لله، ده أنا في خدمتك دايماً في أي حاجة تحتاجها!";
        }

        // 3. ردود ذكية مفتوحة لأي سؤال آخر
        const generalReplies = [
            "والله فكرة جامدة وكلامك في الجون يا صاحبي! تحب نتكلم فيها أكتر؟",
            "سؤال حلو جداً ويستاهل نقعد ندردش فيه بمزاج، قولي إيه أكتر حاجة شاغلة بالك؟",
            "أنا معاك في كل كلمة بتقولها وسامعك كويس، قولي تفاصيل أكتر عن اللي في دماغك!",
            "يا سيدي كلام مظبوط جداً، قولي رأيك إيه في النقطة دي بالظبط؟"
        ];
        return generalReplies[Math.floor(Math.random() * generalReplies.length)];
    }

    // إرسال بالزر أو Enter
    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', () => {
            const val = userInput.value.trim();
            if (val) {
                getMohamedResponse(val);
                userInput.value = '';
            }
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const val = userInput.value.trim();
                if (val) {
                    getMohamedResponse(val);
                    userInput.value = '';
                }
            }
        });
    }

    // التعرف الصوتي باللهجة المصرية
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isListening = true;
            if (voiceBtn) voiceBtn.classList.add('listening');
            orbContainer.classList.add('listening');
            orbContainer.classList.remove('speaking');
            voiceCaption.textContent = "محمد سامعك دلوقتي.. اتكلم براحتك";
            if (botStatus) botStatus.textContent = "بيسمعك...";
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            stopListening();
            getMohamedResponse(transcript);
        };

        recognition.onerror = () => {
            stopListening();
            voiceCaption.textContent = "الصوت مكنش واضح، جرب تدوس ع المايك تاني!";
            if (botStatus) botStatus.textContent = "متصل ومستعد للكلام";
        };

        recognition.onend = () => {
            stopListening();
        };

        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                if (chatBox.classList.contains('chat-hidden')) {
                    chatBox.classList.remove('chat-hidden');
                }
                if (isListening) {
                    stopListening();
                } else {
                    try {
                        window.speechSynthesis.cancel();
                        recognition.start();
                    } catch (err) {
                        recognition.stop();
                    }
                }
            });
        }
    }

    function stopListening() {
        isListening = false;
        if (voiceBtn) voiceBtn.classList.remove('listening');
        if (orbContainer) orbContainer.classList.remove('listening');
        if (recognition) {
            try { recognition.stop(); } catch (err) { }
        }
    }
});