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

    // ============================================================
    // 5. المساعد الصوتي المصري "محمد" (صوت ولد + يتكلم في أي حاجة)
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

    // استخراج أفضل صوت ولد عربي/مصري من النظام
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

    // نطق الرد بصوت ولد مصري وتفعيل أنيميشن الـ Speaking
    function speakMaleReply(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ar-EG'; // لهجة مصرية
        utterance.pitch = 0.82;   // نبرة خشنة لتبدو صوت ولد
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

    // معالجة وإرسال السؤال (سواء عام أو عن الموقع)
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
                    systemInstruction: "أنت شاب مصري اسمك محمد، جدع ودمك خفيف. تحدث دائماً باللهجة المصرية العامية 100% بدون أي فصحى، ردودك قصيرة (جملة أو جملتين) لأنك تتحدث صوتياً، وأجب في أي موضوع يطرحه المستخدم بحرية تامة."
                })
            });
            const data = await res.json();

            document.getElementById('typingIndicator')?.remove();
            appendMessage('bot', data.reply);
            speakMaleReply(data.reply);
        } catch (error) {
            document.getElementById('typingIndicator')?.remove();
            const fallback = generateAnyTopicReply(userText);
            appendMessage('bot', fallback);
            speakMaleReply(fallback);
        }
    }

    // ردود مصرية مفتوحة لأي موضوع
    function generateAnyTopicReply(text) {
        const q = text.toLowerCase().trim();

        if (q.includes('اسمك') || q.includes('مين انت')) {
            return "أنا محمد يا غالي! شاب مصري وصاحبك هنا، كلمني في أي حاجة تحبها وأنا في خدمتك.";
        }
        if (q.includes('ازيك') || q.includes('عامل ايه') || q.includes('اخبارك') || q.includes('مساء') || q.includes('صباح')) {
            return "الحمد لله كله فل وزي العسل يا باشا! أنت طمني عنك وعن يومك؟";
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
            return "الكورة في مصر دي مزاج عالي يا عم! قولي بقى أنت بتشجع مين؟";
        }
        if (q.includes('اكل') || q.includes('جعان') || q.includes('طبيخ') || q.includes('مطعم')) {
            return "والله فتحت نفسي، مفيش أحسن من طبق كشري متحبش شطة ودقة أو حواوشي سخن دلوقتي!";
        }
        if (q.includes('برمجة') || q.includes('بايثون') || q.includes('كود') || q.includes('كمبيوتر')) {
            return "البرمجة دي المتعة كلها! شغال على مشروع جديد ولا لسه بتتعلم؟";
        }
        if (q.includes('حضانة') || q.includes('روتس') || q.includes('roots')) {
            return "حضانة روتس دي بيتي التاني، بنعلم الأطفال هنا بأحدث تقنيات الذكاء الاصطناعي وبطرق ممتعة جداً!";
        }
        if (q.includes('شكرا') || q.includes('تسلم') || q.includes('حبيبي')) {
            return "حبيبي يا صاحبي، الشكر لله ده أنا معاك في أي وقت دايماً!";
        }

        const generalReplies = [
            "والله فكرة جامدة وكلامك في الجون يا صاحبي! تحب نتكلم فيها أكتر؟",
            "سؤال حلو جداً ويستاهل نقعد ندردش فيه بمزاج، قولي إيه أكتر حاجة شاغلة بالك؟",
            "أنا معاك في كل كلمة بتقولها، كمل أنا سامعك ومتابعك باهتمام!",
            "كلام مظبوط يا غالي، قولي تفاصيل أكتر عن اللي في دماغك!"
        ];
        return generalReplies[Math.floor(Math.random() * generalReplies.length)];
    }

    // إرسال بالضغط على الزر أو مفتاح Enter
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

    // تفعيل التعرف الصوتي باللهجة المصرية
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