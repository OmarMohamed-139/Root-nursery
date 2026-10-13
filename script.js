document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 0. إعدادات السحابة والروابط (إرسال البيانات لـ Google Sheets)
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

    function enforceArabicLettersOnly(e) {
        e.target.value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, '');
    }
    if (parentNameInput) parentNameInput.addEventListener('input', enforceArabicLettersOnly);
    if (studentNameInput) studentNameInput.addEventListener('input', enforceArabicLettersOnly);

    function enforceDigitsOnly(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    if (parentIdInput) parentIdInput.addEventListener('input', enforceDigitsOnly);
    if (parentPhoneInput) parentPhoneInput.addEventListener('input', enforceDigitsOnly);

    if (parentWaInput) {
        parentWaInput.addEventListener('input', (e) => {
            let val = e.target.value;
            let hasPlus = val.startsWith('+');
            let digits = val.replace(/[^0-9]/g, '');
            e.target.value = (hasPlus ? '+' : '') + digits;
        });
    }

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
    // 5. إرسال وتثبيت طلب التسجيل (Google Sheets Integration)
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

            let currentRegistrations = JSON.parse(localStorage.getItem('roots_registrations') || '[]');
            currentRegistrations.push(registrationData);
            localStorage.setItem('roots_registrations', JSON.stringify(currentRegistrations));

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
});