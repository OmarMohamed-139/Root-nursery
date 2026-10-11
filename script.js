document.addEventListener('DOMContentLoaded', () => {
    // رابط Google Sheets السحابي
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLNxKxSC35hCR7ofTrxnpIpUO-uqJZKcKzM9lum48-179aeV40_HsjWuPtvxUMz4biAg/exec";

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

    // 2. إشعار الـ Toast السريع
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

    // 3. نافذة تأكيد الإرسال في منتصف الصفحة (Center Modal)
    const confirmModal = document.getElementById('confirmModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalWaBtn = document.getElementById('modalWaBtn');
    let lastRegisteredWaUrl = '';

    function openModal(studentName, waUrl) {
        if (!confirmModal) return;
        document.getElementById('modalTitle').textContent = `تم تسجيل الطالب (${studentName}) بنجاح!`;
        document.getElementById('modalDesc').textContent = 'تم إرسال وحفظ الطلب في قاعدة بيانات المدرسة. نتطلع للقائكم لتثبيت المقعد.';
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

    // إغلاق النافذة عند الضغط خارج البطاقة
    if (confirmModal) {
        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) {
                confirmModal.classList.remove('active');
            }
        });
    }

    // ============================================================
    // 4. قيود الإدخال الصارمة (حروف فقط وحقول أرقام فقط)
    // ============================================================
    const parentNameInput = document.getElementById('parentName');
    const studentNameInput = document.getElementById('studentName');
    const parentIdInput = document.getElementById('parentId');
    const parentPhoneInput = document.getElementById('parentPhone');
    const parentWaInput = document.getElementById('parentWhatsapp');
    const gradeSelect = document.getElementById('gradeApply');
    const dobInput = document.getElementById('studentDob');
    const dobHint = document.getElementById('dobHint');

    // أ. قيود الأسماء: حروف عربية ومسافات فقط (تمنع الأرقام والرموز نهائياً)
    function enforceArabicLettersOnly(e) {
        e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, '');
    }
    if (parentNameInput) parentNameInput.addEventListener('input', enforceArabicLettersOnly);
    if (studentNameInput) studentNameInput.addEventListener('input', enforceArabicLettersOnly);

    // ب. قيود الأرقام: الهوية والهاتف (أرقام فقط)
    function enforceDigitsOnly(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    if (parentIdInput) parentIdInput.addEventListener('input', enforceDigitsOnly);
    if (parentPhoneInput) parentPhoneInput.addEventListener('input', enforceDigitsOnly);

    // ج. قيود الواتساب: أرقام مع السماح بعلامة + فقط في البداية
    if (parentWaInput) {
        parentWaInput.addEventListener('input', (e) => {
            let val = e.target.value;
            let hasPlus = val.startsWith('+');
            let digits = val.replace(/[^0-9]/g, '');
            e.target.value = (hasPlus ? '+' : '') + digits;
        });
    }

    // د. فحص عمر التمهيدي
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

            const pName = parentNameInput.value.trim();
            const pId = parentIdInput.value.trim();
            const pPhone = parentPhoneInput.value.trim();
            const pWa = parentWaInput.value.trim();
            const sName = studentNameInput.value.trim();
            const sDob = dobInput.value;
            const grade = gradeSelect.value;
            const transfer = document.getElementById('hasTransferFile').value;
            const transport = document.getElementById('transportLocation').value;
            const siblings = document.getElementById('siblingsCount').value;

            // التحقق من الحقول
            if (pName.split(' ').filter(w => w.length > 1).length < 3) {
                showToast('يرجى كتابة اسم ولي الأمر ثلاثياً على الأقل بالحروف العربية.', true);
                parentNameInput.focus();
                return;
            }

            if (pId.length !== 9) {
                showToast('رقم الهوية يجب أن يتكون من 9 أرقام بالضبط.', true);
                parentIdInput.focus();
                return;
            }

            if (pPhone.length < 9) {
                showToast('يرجى إدخال رقم هاتف صحيح.', true);
                parentPhoneInput.focus();
                return;
            }

            if (sName.split(' ').filter(w => w.length > 1).length < 2) {
                showToast('يرجى كتابة اسم الطالب ثنائياً أو ثلاثياً بالحروف العربية.', true);
                studentNameInput.focus();
                return;
            }

            if (!sDob) {
                showToast('يرجى اختيار تاريخ ميلاد الطالب.', true);
                dobInput.focus();
                return;
            }

            if (!grade) {
                showToast('يرجى تحديد المرحلة أو الصف المطلوب.', true);
                gradeSelect.focus();
                return;
            }

            const submitBtn = document.getElementById('submitRegBtn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري حفظ وإرسال البيانات...';
            submitBtn.disabled = true;

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

                // إظهار نافذة التأكيد في منتصف الصفحة
                openModal(sName, waUrl);
                registrationForm.reset();
                if (dobHint) dobHint.textContent = 'اختر تاريخ الميلاد بدقة';
            } catch (error) {
                console.error('Error sending data:', error);
                openModal(sName, waUrl);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // تصدير سجلات التسجيل
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

    // 6. تأثير التمرير للـ Navbar
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

    // 7. المساعد الصوتي محمد
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

    function loadVoices() {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        maleVoice = voices.find(v =>
            v.lang.startsWith('ar') && (
                v.name.toLowerCase().includes('male') ||
                v.name.toLowerCase().includes('tarik') ||
                v.name.toLowerCase().includes('shaker') ||
                v.name.toLowerCase().includes('maged')
            )
        ) || voices.find(v => v.lang.includes('ar-EG')) || voices.find(v => v.lang.startsWith('ar'));
    }

    if ('speechSynthesis' in window) {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

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

    function speakMaleReply(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const cleanText = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ar-EG';
        utterance.pitch = 0.85;
        utterance.rate = 0.95;

        if (maleVoice) utterance.voice = maleVoice;

        orbContainer.classList.remove('listening');
        orbContainer.classList.add('speaking');
        if (voiceCaption) voiceCaption.textContent = "محمد بيتكلم معاك...";
        if (botStatus) botStatus.textContent = "بيتكلم...";

        utterance.onend = utterance.onerror = () => {
            orbContainer.classList.remove('speaking');
            if (voiceCaption) voiceCaption.textContent = "اسألني عن الرسوم أو التسجيل!";
            if (botStatus) botStatus.textContent = "متصل ومستعد للكلام";
        };

        window.speechSynthesis.speak(utterance);
    }

    function generateUnifiedMohamedReply(text) {
        const q = text.toLowerCase().trim();

        if (q.includes('تسجيل') || q.includes('اوراق') || q.includes('وثائق') || q.includes('شروط') || q.includes('مطلوب')) {
            return "لتسجيل الطالب محتاجين: هوية ولي الأمر، شهادة ميلاد الطالب، صورة شخصية، وتكلفة حجز المقعد، وملف نقل لو الطالب في صف ثاني فما فوق!";
        }
        if (q.includes('تمهيدي') || q.includes('kg2') || q.includes('كي جي') || q.includes('العمر') || q.includes('مواليد')) {
            return "التمهيدي KG2 للمواليد من 1/2/2021 لحد 30/4/2022، وقسطه 150 شيكل شهرياً، والكتب وبلوزتين 100 شيكل.";
        }
        if (q.includes('مدرسة') || q.includes('صفوف') || q.includes('قسط') || q.includes('رسوم المدرسة') || q.includes('اسعار')) {
            return "المدرسة من أول لرابع قسطها 3500 شيكل شامل الكتب، ولو دفعت مباشر هتاخد خصم وتدفع 3200 ش فقط! والزي 100 ش وبدلة الرياضة 100 ش.";
        }
        if (q.includes('خصم') || q.includes('اخوة') || q.includes('اخوات')) {
            return "عندنا خصم الدفع المباشر 3200 بدل 3500، وخصم الإخوة: اخين خصم 200 ش، 3 إخوة خصم 400 ش، و4 إخوة نص قسط كامل!";
        }
        if (q.includes('مواصلات') || q.includes('باص') || q.includes('كفل حارس') || q.includes('ديرستيا') || q.includes('قيرة') || q.includes('زيتا') || q.includes('جماعين')) {
            return "المواصلات: كفل حارس وديرستيا وحارس 120 شيكل (70 طريق واحد)، قيرة 140 شيكل، وزيتا وجماعين 200 شيكل ذهاباً وإياباً.";
        }
        if (q.includes('تواصل') || q.includes('تليفون') || q.includes('واتس') || q.includes('رقم')) {
            return "تقدر تتصل بينا على 0592998887 أو تكلمنا واتساب على +972 592998887 وصفحتنا Roots private school.";
        }
        if (q.includes('اسمك') || q.includes('مين انت')) {
            return "أنا محمد المساعد الذكي لمدرسة وروضة Roots، تسألني عن أي حاجة تخص المدرسة أو ندردش في أي موضوع!";
        }
        if (q.includes('ازيك') || q.includes('عامل ايه') || q.includes('صباح') || q.includes('مساء')) {
            return "الحمد لله كلو تمام وزي الفل! تحب تستفسر عن شروط القبول ولا الرسوم؟";
        }
        return "أهلاً بيك! أنا محمد معاك في مدرسة وروضة Roots، اسألني عن الرسوم أو خطوط المواصلات أو التسجيل وأنا أجاوبك فوراً!";
    }

    async function getMohamedResponse(userText) {
        appendMessage('user', userText);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText })
            });
            const data = await res.json();
            appendMessage('bot', data.reply);
            speakMaleReply(data.reply);
        } catch (error) {
            const fallback = generateUnifiedMohamedReply(userText);
            appendMessage('bot', fallback);
            speakMaleReply(fallback);
        }
    }

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

    // التعرف الصوتي
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG';
        recognition.continuous = false;

        recognition.onstart = () => {
            isListening = true;
            if (voiceBtn) voiceBtn.classList.add('listening');
            orbContainer.classList.add('listening');
            orbContainer.classList.remove('speaking');
            if (voiceCaption) voiceCaption.textContent = "محمد سامعك دلوقتي.. اتفضل";
            if (botStatus) botStatus.textContent = "بيسمعك...";
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            stopListening();
            getMohamedResponse(transcript);
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
        if (orbContainer) orbContainer.classList.remove('listening');
        if (recognition) {
            try { recognition.stop(); } catch (err) { }
        }
    }
});