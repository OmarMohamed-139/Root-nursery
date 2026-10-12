document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 0. إعدادات السحابة والروابط
    // ============================================================
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLNxKxSC35hCR7ofTrxnpIpUO-uqJZKcKzM9lum48-179aeV40_HsjWuPtvxUMz4biAg/exec";

    // ============================================================
    // 1. القائمة المتنقلة للشاشات الصغيرة (Mobile Nav)
    // ============================================================
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

    // ============================================================
    // 2. إشعارات التنبيه السريعة (Toast)
    // ============================================================
    const successToast = document.getElementById('successToast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');

    function showToast(message, isError = false) {
        if (!successToast) return;
        if (toastMsg && message) toastMsg.textContent = message;

        if (isError) {
            successToast.style.borderRightColor = '#e53935';
            if (toastIcon) {
                toastIcon.className = 'fa-solid fa-circle-exclamation';
                toastIcon.style.color = '#e53935';
            }
        } else {
            successToast.style.borderRightColor = '#2e7d32';
            if (toastIcon) {
                toastIcon.className = 'fa-solid fa-circle-check';
                toastIcon.style.color = '#2e7d32';
            }
        }

        successToast.classList.add('show');
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 4000);
    }

    // ============================================================
    // 3. نافذة تأكيد الإرسال في منتصف الصفحة (Center Modal)
    // ============================================================
    const confirmModal = document.getElementById('confirmModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalWaBtn = document.getElementById('modalWaBtn');
    let lastRegisteredWaUrl = '';

    function openModal(studentName, waUrl) {
        if (!confirmModal) return;
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        if (modalTitle) modalTitle.textContent = `تم تسجيل الطالب (${studentName}) بنجاح!`;
        if (modalDesc) modalDesc.textContent = 'تم إرسال وحفظ الطلب في قاعدة بيانات المدرسة. نتطلع للقائكم لتثبيت المقعد.';
        lastRegisteredWaUrl = waUrl;
        confirmModal.classList.add('active');
    }

    if (modalCloseBtn && confirmModal) {
        modalCloseBtn.addEventListener('click', () => {
            confirmModal.classList.remove('active');
        });
    }

    if (modalWaBtn) {
        modalWaBtn.addEventListener('click', () => {
            if (lastRegisteredWaUrl) {
                window.open(lastRegisteredWaUrl, '_blank');
            }
            if (confirmModal) confirmModal.classList.remove('active');
        });
    }

    if (confirmModal) {
        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) {
                confirmModal.classList.remove('active');
            }
        });
    }

    // ============================================================
    // 4. قيود الإدخال الصارمة (حروف عربية فقط وأرقام فقط)
    // ============================================================
    const parentNameInput = document.getElementById('parentName');
    const studentNameInput = document.getElementById('studentName');
    const parentIdInput = document.getElementById('parentId');
    const parentPhoneInput = document.getElementById('parentPhone');
    const parentWaInput = document.getElementById('parentWhatsapp');
    const gradeSelect = document.getElementById('gradeApply');
    const dobInput = document.getElementById('studentDob');
    const dobHint = document.getElementById('dobHint');

    // أ. قيود الأسماء: حروف عربية ومسافات فقط
    function enforceArabicLettersOnly(e) {
        e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, '');
    }
    if (parentNameInput) parentNameInput.addEventListener('input', enforceArabicLettersOnly);
    if (studentNameInput) studentNameInput.addEventListener('input', enforceArabicLettersOnly);

    // ب. قيود الأرقام: الهوية والهاتف
    function enforceDigitsOnly(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    if (parentIdInput) parentIdInput.addEventListener('input', enforceDigitsOnly);
    if (parentPhoneInput) parentPhoneInput.addEventListener('input', enforceDigitsOnly);

    // ج. قيود الواتساب: أرقام وسماح بعلامة + في البداية فقط
    if (parentWaInput) {
        parentWaInput.addEventListener('input', (e) => {
            let val = e.target.value;
            let hasPlus = val.startsWith('+');
            let digits = val.replace(/[^0-9]/g, '');
            e.target.value = (hasPlus ? '+' : '') + digits;
        });
    }

    // د. فحص عمر التمهيدي KG2
    function checkKgAge() {
        if (gradeSelect && gradeSelect.value === 'تمهيدي KG2' && dobInput && dobInput.value) {
            const birthDate = new Date(dobInput.value);
            const minDate = new Date('2021-02-01');
            const maxDate = new Date('2022-04-30');

            if (birthDate < minDate || birthDate > maxDate) {
                dobHint.innerHTML = '<span style="color:#e53935;font-weight:700;">تنبيه: مواليد التمهيدي المقبولة رسمياً بين 1/2/2021 و 30/4/2022</span>';
            } else {
                dobHint.innerHTML = '<span style="color:#2e7d32;font-weight:700;">عمر الطفل مطابق تماماً لشروط التمهيدي ✓</span>';
            }
        } else if (dobHint) {
            dobHint.textContent = 'اختر تاريخ الميلاد بدقة';
        }
    }
    if (gradeSelect) gradeSelect.addEventListener('change', checkKgAge);
    if (dobInput) dobInput.addEventListener('change', checkKgAge);

    // ============================================================
    // 5. إرسال وتثبيت طلب التسجيل
    // ============================================================
    const registrationForm = document.getElementById('registrationForm');
    const exportDataBtn = document.getElementById('exportDataBtn');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const pName = parentNameInput ? parentNameInput.value.trim() : '';
            const pId = parentIdInput ? parentIdInput.value.trim() : '';
            const pPhone = parentPhoneInput ? parentPhoneInput.value.trim() : '';
            const pWa = parentWaInput ? parentWaInput.value.trim() : '';
            const sName = studentNameInput ? studentNameInput.value.trim() : '';
            const sDob = dobInput ? dobInput.value : '';
            const grade = gradeSelect ? gradeSelect.value : '';
            const transfer = document.getElementById('hasTransferFile') ? document.getElementById('hasTransferFile').value : '';
            const transport = document.getElementById('transportLocation') ? document.getElementById('transportLocation').value : '';
            const siblings = document.getElementById('siblingsCount') ? document.getElementById('siblingsCount').value : '';

            // التحقق من الحقول
            if (pName.split(' ').filter(w => w.length > 1).length < 3) {
                showToast('يرجى كتابة اسم ولي الأمر ثلاثياً على الأقل بالحروف العربية.', true);
                if (parentNameInput) parentNameInput.focus();
                return;
            }

            if (pId.length !== 9) {
                showToast('رقم الهوية يجب أن يتكون من 9 أرقام بالضبط.', true);
                if (parentIdInput) parentIdInput.focus();
                return;
            }

            if (pPhone.length < 9) {
                showToast('يرجى إدخال رقم هاتف صحيح.', true);
                if (parentPhoneInput) parentPhoneInput.focus();
                return;
            }

            if (sName.split(' ').filter(w => w.length > 1).length < 2) {
                showToast('يرجى كتابة اسم الطالب ثنائياً أو ثلاثياً بالحروف العربية.', true);
                if (studentNameInput) studentNameInput.focus();
                return;
            }

            if (!sDob) {
                showToast('يرجى اختيار تاريخ ميلاد الطالب.', true);
                if (dobInput) dobInput.focus();
                return;
            }

            if (!grade) {
                showToast('يرجى تحديد المرحلة أو الصف المطلوب.', true);
                if (gradeSelect) gradeSelect.focus();
                return;
            }

            const submitBtn = document.getElementById('submitRegBtn');
            let originalBtnText = '';
            if (submitBtn) {
                originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري حفظ وإرسال البيانات...';
                submitBtn.disabled = true;
            }

            const registrationData = {
                id: 'REG-' + Date.now(),
                timestamp: new Date().toLocaleString('ar-EG'),
                parentName: pName,
                parentId: pId,
                parentPhone: pPhone,
                parentWhatsapp: pWa,
                studentName: sName,
                studentDob: sDob,
                gradeApply: grade,
                hasTransferFile: transfer,
                transportLocation: transport,
                siblingsCount: siblings,
                notes: ''
            };

            // حفظ نسخة احتياطية محلية
            let currentRegistrations = JSON.parse(localStorage.getItem('roots_registrations') || '[]');
            currentRegistrations.push(registrationData);
            localStorage.setItem('roots_registrations', JSON.stringify(currentRegistrations));

            // تجهيز رابط الواتساب
            const waText = encodeURIComponent(
                `*طلب تسجيل جديد - مدرسة وروضة Roots*\n` +
                `------------------------------------\n` +
                `👤 *ولي الأمر:* ${pName}\n` +
                `🪪 *رقم الهوية:* ${pId}\n` +
                `📞 *الهاتف:* ${pPhone}\n` +
                `💬 *الواتساب:* ${pWa}\n` +
                `🎓 *اسم الطالب:* ${sName}\n` +
                `📅 *الميلاد:* ${sDob}\n` +
                `🏫 *الصف:* ${grade}\n` +
                `📑 *ملف النقل:* ${transfer}\n` +
                `🚌 *المواصلات:* ${transport}\n` +
                `🎁 *خصم الإخوة:* ${siblings}`
            );
            const waUrl = `https://wa.me/972592998887?text=${waText}`;

            try {
                const formData = new URLSearchParams();
                for (const key in registrationData) {
                    formData.append(key, registrationData[key]);
                }

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });

                openModal(sName, waUrl);
                registrationForm.reset();
                if (dobHint) dobHint.textContent = 'اختر تاريخ الميلاد بدقة';
            } catch (error) {
                console.error('Error sending data:', error);
                openModal(sName, waUrl);
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // تصدير سجلات التسجيل بصيغة CSV/Excel
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            const data = JSON.parse(localStorage.getItem('roots_registrations') || '[]');
            if (data.length === 0) {
                showToast('لا توجد طلبات تسجيل مسجلة في الذاكرة حتى الآن.', true);
                return;
            }

            const headers = [
                'رقم الطلب', 'تاريخ ووقت التسجيل', 'اسم ولي الأمر', 'هوية ولي الأمر',
                'رقم الهاتف', 'الواتساب', 'اسم الطالب', 'تاريخ الميلاد',
                'الصف المسجل به', 'ملف النقل', 'المواصلات', 'خصم الإخوة'
            ];

            const rows = data.map(item => [
                `"${item.id}"`,
                `"${item.timestamp}"`,
                `"${item.parentName}"`,
                `"${item.parentId}"`,
                `"${item.parentPhone}"`,
                `"${item.parentWhatsapp}"`,
                `"${item.studentName}"`,
                `"${item.studentDob}"`,
                `"${item.gradeApply}"`,
                `"${item.hasTransferFile}"`,
                `"${item.transportLocation}"`,
                `"${item.siblingsCount}"`
            ]);

            const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `سجل_تسجيلات_روتس_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // ============================================================
    // 6. تأثير التمرير لشريط التنقل (Navbar Scroll Effect)
    // ============================================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.height = '80px';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            navbar.style.height = '85px';
        }
    });

    // ============================================================
    // 7. المساعد الذكي محمد (أفاتار الولد والحصيلة المعرفية)
    // ============================================================
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const avatarImg = document.getElementById('chatAvatarImg');
    const voiceCaption = document.getElementById('voiceCaption');
    const botStatus = document.getElementById('botStatus');

    let isListening = false;
    let recognition = null;
    let arabicVoice = null;

    function loadVoices() {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        arabicVoice = voices.find(v => v.lang.startsWith('ar') && (v.name.includes('Male') || v.name.includes('Tarik') || v.name.includes('Maged')))
            || voices.find(v => v.lang.startsWith('ar'))
            || voices[0];
    }

    if ('speechSynthesis' in window) {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    if (chatToggleBtn && chatBox) {
        chatToggleBtn.addEventListener('click', () => {
            chatBox.classList.toggle('chat-hidden');
            if (!chatBox.classList.contains('chat-hidden') && userInput) {
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
        if (!chatMessages) return;
        const row = document.createElement('div');
        row.className = `message-row ${sender === 'user' ? 'user-row' : 'bot-row'}`;
        row.innerHTML = `<div class="message ${sender === 'user' ? 'user-message' : 'bot-message'}">${text}</div>`;
        chatMessages.appendChild(row);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function speakReply(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ar-SA';
        utterance.pitch = 1.0;
        utterance.rate = 1.0;

        if (arabicVoice) utterance.voice = arabicVoice;

        if (avatarImg) avatarImg.classList.add('speaking-avatar');
        if (voiceCaption) voiceCaption.textContent = "محمد يتحدث معك الآن...";
        if (botStatus) botStatus.textContent = "يتحدث...";

        utterance.onend = utterance.onerror = () => {
            if (avatarImg) avatarImg.classList.remove('speaking-avatar');
            if (voiceCaption) voiceCaption.textContent = "أنا جاهز لأي استفسار!";
            if (botStatus) botStatus.textContent = "متصل ومستعد للكلام";
        };

        window.speechSynthesis.speak(utterance);
    }

    // الحصيلة المعرفية الموسعة لمحمد باللغة العربية
    function generateMohamedKnowledge(text) {
        const q = text.toLowerCase().trim();

        if (q.includes('اسم') && (q.includes('روتس') || q.includes('roots') || q.includes('ليش') || q.includes('ليه'))) {
            return "سُميت مدرستنا Roots لأن المستقبل القوي يبدأ من جذور قوية! وشعارنا الدائم: Strong roots, bright futures.";
        }
        if (q.includes('ميس ايه') || q.includes('معلمة انجليزي') || q.includes('ايات') || q.includes('ayat')) {
            return "ميس آية (Miss Ayat) هي معلمة اللغة الإنجليزية الرائعة في مدرستنا، وتستقبل طلابنا بأساليب تعليمية وتفاعلية محببة جداً!";
        }
        if (q.includes('تسجيل') || q.includes('اوراق') || q.includes('وثائق') || q.includes('شروط') || q.includes('مطلوب')) {
            return "لتسجيل الطالب نحتاج: صورة هوية ولي الأمر، شهادة ميلاد الطالب الأصلية أو المصدقة، صورة شخصية حديثة، تكلفة حجز المقعد، وملف نقل إذا كان الطالب من الصف الثاني فما فوق.";
        }
        if (q.includes('تمهيدي') || q.includes('kg2') || q.includes('روضة') || q.includes('عمر') || q.includes('مواليد')) {
            return "مرحلة التمهيدي KG2 للمواليد بين 1/2/2021 وحتى 30/4/2022، وقسطها 150 شيكل شهرياً، والكتب وبلوزتين بـ 100 شيكل.";
        }
        if (q.includes('مدرسة') || q.includes('صفوف') || q.includes('قسط') || q.includes('رسوم') || q.includes('اسعار')) {
            return "المدرسة من الصف الأول حتى الرابع قسطها 3500 شيكل سنوياً شامل الكتب المدرسية، ومع خصم الدفع المباشر يصبح 3200 شيكل فقط! والزي المدرسي 100 شيكل، وبدلة الرياضة 100 شيكل.";
        }
        if (q.includes('خصم') || q.includes('اخوة') || q.includes('اخوات')) {
            return "خصوماتنا تشمل: خصم الدفع المباشر (3200 بدل 3500 شيكل)، وخصم الإخوة: طالبان خصم 200 شيكل، 3 إخوة خصم 400 شيكل، و4 إخوة خصم نصف قسط كامل!";
        }
        if (q.includes('مواصلات') || q.includes('باص') || q.includes('كفل حارس') || q.includes('ديرستيا') || q.includes('قيرة') || q.includes('زيتا') || q.includes('جماعين')) {
            return "خطوط الباصات مؤمنة ومنتظمة: كفل حارس وديرستيا وحارس 120 شيكل ذهاباً وإياباً (70 شيكل لاتجاه واحد)، قيرة 140 شيكل، وزيتا وجماعين 200 شيكل.";
        }
        if (q.includes('مكان') || q.includes('عنوان') || q.includes('موقع') || q.includes('فين') || q.includes('وين')) {
            return "تقع مدرسة وروضة Roots الخاصة في بلدة كفل حارس، وتخدم أبناءنا في كافة القرى والمناطق المجاورة.";
        }
        if (q.includes('تواصل') || q.includes('تليفون') || q.includes('واتس') || q.includes('رقم')) {
            return "يمكنك الاتصال بنا على 0592998887 أو مراسلتنا عبر الواتساب على +972 592998887، وصفحتنا على الفيسبوك Roots private school.";
        }
        if (q.includes('اسمك') || q.includes('مين انت') || q.includes('شخصيتك') || q.includes('محمد')) {
            return "أنا محمد، المساعد الذكي وسفير طلاب مدرسة وروضة Roots! أسعد بمساعدتك والإجابة على أي استفسار.";
        }
        if (q.includes('ازيك') || q.includes('عامل ايه') || q.includes('مرحبا') || q.includes('اهلا') || q.includes('صباح') || q.includes('مساء')) {
            return "أهلاً وسهلاً بك! يسعدني وجودك معنا في مدرسة Roots، تحب تسأل عن شروط القبول والتسجيل ولا الرسوم وخطوط الباصات؟";
        }
        return "أهلاً بك! أنا محمد في مدرسة وروضة Roots، اسألني عن الرسوم، شروط التسجيل، أو خطوط المواصلات وسأجيبك فوراً!";
    }

    async function handleChatInput(text) {
        appendMessage('user', text);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            appendMessage('bot', data.reply);
            speakReply(data.reply);
        } catch (error) {
            const fallback = generateMohamedKnowledge(text);
            appendMessage('bot', fallback);
            speakReply(fallback);
        }
    }

    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', () => {
            const val = userInput.value.trim();
            if (val) {
                handleChatInput(val);
                userInput.value = '';
            }
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const val = userInput.value.trim();
                if (val) {
                    handleChatInput(val);
                    userInput.value = '';
                }
            }
        });
    }

    // التعرف الصوتي (Speech Recognition)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ar-SA';
        recognition.continuous = false;

        recognition.onstart = () => {
            isListening = true;
            if (voiceBtn) voiceBtn.classList.add('listening');
            if (avatarImg) avatarImg.classList.add('listening-avatar');
            if (voiceCaption) voiceCaption.textContent = "محمد يستمع إليك الآن...";
            if (botStatus) botStatus.textContent = "يستمع...";
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            stopListening();
            handleChatInput(transcript);
        };

        recognition.onerror = recognition.onend = () => {
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
        if (avatarImg) {
            avatarImg.classList.remove('listening-avatar');
            avatarImg.classList.remove('speaking-avatar');
        }
        if (recognition) {
            try { recognition.stop(); } catch (err) { }
        }
    }
});