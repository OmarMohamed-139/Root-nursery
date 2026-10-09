document.addEventListener('DOMContentLoaded', () => {
    // القائمة المتنقلة للموبايل
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

        // إغلاق القائمة عند النقر على أي رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // معالجة نموذج الاستفسارات وإظهار رسالة النجاح
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

    // تحميل تفاصيل البرنامج ومحتوى الكورسات ديناميكياً في صفحة program-details.html
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('program');

    if (programId) {
        const pageTitle = document.getElementById('pageTitle');
        const progAge = document.getElementById('progAge');
        const progTitle = document.getElementById('progTitle');
        const progDesc = document.getElementById('progDesc');
        const progGoals = document.getElementById('progGoals');
        const progCoursesList = document.getElementById('progCoursesList');

        // مصفوفة تحتوي على بيانات وبرامج وكورسات كل مسار (يمكنك تعديلها وإضافة محتويات مستقبلية بسهولة هنا)
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

            // حقن قوائم محتوى الكورسات ديناميكياً
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

    // تأثير تغيير لون شريط التنقل عند التمرير
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.height = '80px';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            navbar.style.height = '90px';
        }
    });
});
const GEMINI_API_KEY = "ضع_هنا_API_KEY_الخاص_بك";

// تعليمات وسياق حضانة Roots
const SYSTEM_INSTRUCTION = `
أنت المساعد الذكي الرسمي لـ "حضانة Roots" (Roots Nursery).
مهمتك: الرد على استفسارات أولياء الأمور بلباقة واحترافية وبلهجة ودودة باللغة العربية.

معلومات الحضانة:
- الرؤية: دمج أساليب التربية الحديثة مع تقنيات التعلم القائمة على الذكاء الاصطناعي (AI) لتنمية مهارات الأطفال العقلية والإبداعية.
- ساعات العمل: الأحد إلى الخميس من 7:30 صباحاً حتى 4:00 عصراً (الجمعة والسبت عطلة).
- البرامج العمرية:
  1. الحضانات الصغرى (Toddlers) من سنة لسنتين.
  2. ما قبل التمهيدي (Pre-School) من سنتين لـ 3 سنوات.
  3. الروضة وتأهيل المدرسة (Kindergarten) من 3 لـ 5 سنوات ومخصصة لتأهيل المقابلات المدرسية واللغات والبرمجة.
- التواصل: هاتف/واتساب +20 100 000 0000، إيميل info@rootsnursery.com، العنوان: شارع الرئيسية بجوار النادي.

قواعد: لا تخترع أسعاراً محددة للمصروفات، اطلب منهم بلطف التواصل عبر الواتساب للأمور المالية أو حجز زيارة.
`;

// سجل المحادثة للحفاظ على سياق النقاش
let conversationHistory = [];

const chatToggle = document.getElementById("ai-chat-toggle");
const chatBox = document.getElementById("ai-chat-box");
const chatClose = document.getElementById("ai-chat-close");
const sendBtn = document.getElementById("ai-send-btn");
const userInput = document.getElementById("ai-user-input");
const messagesContainer = document.getElementById("ai-chat-messages");

// فتح وإغلاق الصندوق
chatToggle.addEventListener("click", () => chatBox.classList.toggle("chat-hidden"));
chatClose.addEventListener("click", () => chatBox.classList.add("chat-hidden"));

// إرسال الرسالة
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // إظهار رسالة المستخدم
  appendMessage(text, "user-message");
  userInput.value = "";
  conversationHistory.push({ role: "user", parts: [{ text: text }] });

  // مؤشر جاري الكتابة
  const loadingDiv = appendMessage("جاري الرد...", "bot-message");

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.3
        }
      })
    });

    const data = await response.json();
    loadingDiv.remove();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const reply = data.candidates[0].content.parts[0].text;
      appendMessage(reply, "bot-message");
      conversationHistory.push({ role: "model", parts: [{ text: reply }] });
    } else {
      appendMessage("عذراً، حدث خطأ أثناء معالجة الرد، يرجى المحاولة لاحقاً.", "bot-message");
    }
  } catch (error) {
    loadingDiv.remove();
    appendMessage("تعذر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.", "bot-message");
  }
}

function appendMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = `message ${className}`;
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return msg;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});