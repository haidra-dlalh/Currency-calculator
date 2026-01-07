// عناصر التنقل بين الصفحات
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// وظيفة تبديل الصفحات
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // إزالة الفئة النشطة من جميع الروابط
        navLinks.forEach(item => item.classList.remove('active'));
        
        // إضافة الفئة النشطة للرابط المختار
        link.classList.add('active');
        
        // إخفاء جميع الصفحات
        pages.forEach(page => page.classList.remove('active'));
        
        // إظهار الصفحة المختارة
        const pageId = link.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        
        // تحديث الحسابات عند تغيير الصفحة
        calculateOldCurrency();
        calculateNewCurrency();
        calculateBothCurrencies();
    });
});

// حساب العملة القديمة
function calculateOldCurrency() {
    const values = [500, 1000, 2000, 5000];
    let total = 0;
    
    values.forEach(value => {
        const input = document.getElementById(`old-${value}`);
        const count = parseInt(input.value) || 0;
        total += count * value;
    });
    
    document.getElementById('old-total').textContent = 
        `المجموع: ${total.toLocaleString('ar-SY')} ليرة سورية قديمة`;
}

// حساب العملة الجديدة
function calculateNewCurrency() {
    const values = [10, 25, 50, 100, 200, 500];
    let total = 0;
    
    values.forEach(value => {
        const input = document.getElementById(`new-${value}`);
        const count = parseInt(input.value) || 0;
        total += count * value;
    });
    
    document.getElementById('new-total').textContent = 
        `المجموع: ${total.toLocaleString('ar-SY')} ليرة سورية جديدة`;
}

// حساب العملتين معًا والتحويل
function calculateBothCurrencies() {
    // العملة القديمة
    const oldValues = [500, 1000, 2000, 5000];
    let oldTotal = 0;
    
    oldValues.forEach(value => {
        const input = document.getElementById(`both-old-${value}`);
        const count = parseInt(input.value) || 0;
        oldTotal += count * value;
    });
    
    // العملة الجديدة
    const newValues = [10, 25, 50, 100, 200, 500];
    let newTotal = 0;
    
    newValues.forEach(value => {
        const input = document.getElementById(`both-new-${value}`);
        const count = parseInt(input.value) || 0;
        newTotal += count * value;
    });
    
    // تحويل العملة القديمة إلى جديدة (حذف صفرين)
    const convertedOld = oldTotal / 100;
    
    // المجموع الإجمالي بالعملة الجديدة
    const totalInNewCurrency = newTotal + convertedOld;
    
    // تحويل العملة الجديدة إلى قديمة (إضافة صفرين)
    const convertedNew = newTotal * 100;
    
    // المجموع الإجمالي بالعملة القديمة
    const totalInOldCurrency = oldTotal + convertedNew;
    
    // تحديث النتائج في المربعات الصغيرة
    document.getElementById('both-total-old').textContent = 
        `${oldTotal.toLocaleString('ar-SY')} ل.س`;
        
    document.getElementById('both-total-converted').textContent = 
        `${convertedOld.toLocaleString('ar-SY')} ل.س جديدة`;
        
    document.getElementById('both-total-new').textContent = 
        `${newTotal.toLocaleString('ar-SY')} ل.س جديدة`;
    
    // تحديث النتائج الإجمالية
    document.getElementById('both-total-new-summary').textContent = 
        `المجموع الإجمالي: ${totalInNewCurrency.toLocaleString('ar-SY')} ليرة سورية جديدة (بعد تحويل العملة القديمة)`;
        
    document.getElementById('both-total-old-summary').textContent = 
        `المجموع الإجمالي: ${totalInOldCurrency.toLocaleString('ar-SY')} ليرة سورية قديمة (بعد تحويل العملة الجديدة)`;
}

// إضافة مستمعات الأحداث لحقول الإدخال في الصفحة الأولى
document.querySelectorAll('#page1 input').forEach(input => {
    input.addEventListener('input', calculateOldCurrency);
    input.addEventListener('change', calculateOldCurrency);
});

// إضافة مستمعات الأحداث لحقول الإدخال في الصفحة الثانية
document.querySelectorAll('#page2 input').forEach(input => {
    input.addEventListener('input', calculateNewCurrency);
    input.addEventListener('change', calculateNewCurrency);
});

// إضافة مستمعات الأحداث لحقول الإدخال في الصفحة الثالثة
document.querySelectorAll('#page3 input').forEach(input => {
    input.addEventListener('input', calculateBothCurrencies);
    input.addEventListener('change', calculateBothCurrencies);
});

// تهيئة الحسابات عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    calculateOldCurrency();
    calculateNewCurrency();
    calculateBothCurrencies();
});