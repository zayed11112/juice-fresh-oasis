
import React, { useState } from 'react';
import { Phone, CreditCard, Copy, Check, ExternalLink } from 'lucide-react';

const Payment = () => {
  const [copied, setCopied] = useState(false);
  const [showUSSD, setShowUSSD] = useState(false);

  const vodafoneCashNumber = "01018773855";
  const ussdCode = `*9*7*${vodafoneCashNumber}*$#`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="section-container text-right" dir="rtl">
      <h1 className="section-title dark:text-white">الدفع</h1>

      <div className="max-w-4xl mx-auto">
        {/* بطاقة الدفع بفودافون كاش */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden mb-8 animate-theme-transition border border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full opacity-20 transform translate-x-16 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-800 rounded-full opacity-20 transform -translate-x-12 translate-y-10"></div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                <img src="/assets/فودافون كاش.png" alt="فودافون كاش" className="h-10 ml-3" />
                الدفع بواسطة فودافون كاش
              </h2>
              <div className="bg-white/20 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center ml-2">1</span>
                  طريقة الدفع:
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300 mr-10">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    قم بفتح تطبيق فودافون كاش
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    اختر "الدفع لمحفظة"
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    أدخل الرقم التالي
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center shadow-inner">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">رقم المحفظة</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400 tracking-wider">{vodafoneCashNumber}</p>
                    <button
                      onClick={() => copyToClipboard(vodafoneCashNumber)}
                      className="bg-gray-200 dark:bg-gray-600 p-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      title="نسخ الرقم"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                    </button>
                  </div>

                  <button
                    onClick={() => setShowUSSD(!showUSSD)}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline focus:outline-none"
                  >
                    {showUSSD ? 'إخفاء كود USSD' : 'عرض كود USSD'}
                  </button>

                  {showUSSD && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">كود USSD للدفع المباشر</p>
                      <div className="flex items-center justify-center gap-2">
                        <p className="font-mono text-lg font-bold text-red-600 dark:text-red-400">{ussdCode}</p>
                        <button
                          onClick={() => copyToClipboard(ussdCode)}
                          className="bg-gray-200 dark:bg-gray-600 p-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                          title="نسخ الكود"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href={`tel:${ussdCode}`}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full max-w-xs"
                  >
                    <img src="/assets/فودافون كاش.png" alt="فودافون كاش" className="h-6" />
                    <span className="font-bold">الدفع الآن</span>
                    <ExternalLink className="h-4 w-4 mr-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات الاتصال */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center animate-theme-transition shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 text-juice-green mr-2" />
            <p className="text-gray-600 dark:text-gray-300">لاستفسارات الدفع، يرجى التواصل على</p>
          </div>
          <p className="text-xl font-bold text-juice-green-dark dark:text-juice-green">01224350190</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
