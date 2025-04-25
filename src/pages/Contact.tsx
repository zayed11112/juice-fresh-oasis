
import React from 'react';
import { MapPin, Phone, Clock, CreditCard } from 'lucide-react';

const Contact = () => {
  return (
    <div className="section-container text-right" dir="rtl">
      <h1 className="section-title dark:text-white">تواصل معنا</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-theme-transition">
            <div className="bg-juice-green text-white p-4">
              <h2 className="text-xl font-bold">معلومات الاتصال</h2>
            </div>
            <div className="p-6">
              <div className="mb-6 flex items-start">
                <Phone className="text-juice-green-dark dark:text-juice-green mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">رقم الهاتف:</h3>
                  <p className="text-xl text-juice-green-dark dark:text-juice-green font-bold">01224350190</p>
                </div>
              </div>

              <div className="mb-6 flex items-start">
                <MapPin className="text-juice-green-dark dark:text-juice-green mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">العنوان:</h3>
                  <p className="text-gray-700 dark:text-gray-300">المساعيد - دوران شبرا - أمام مسجد عمرو بن العاص</p>
                </div>
              </div>

              <div className="mb-6 flex items-start">
                <CreditCard className="text-juice-orange-dark dark:text-juice-orange mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">رقم الدفع (فودافون كاش):</h3>
                  <p className="text-xl text-juice-orange-dark dark:text-juice-orange font-bold">01018773855</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-juice-green-dark dark:text-juice-green mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">ساعات العمل:</h3>
                  <p className="text-gray-700 dark:text-gray-300">يوميا من 9 صباحاً حتى 2 منتصف الليل</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-theme-transition">
            <div className="bg-juice-orange text-white p-4">
              <h2 className="text-xl font-bold">موقعنا</h2>
            </div>
            <div className="p-0 h-full min-h-[300px] relative overflow-hidden">
              <a
                href="https://maps.app.goo.gl/4G1iZit4gf1piA8T9"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-center p-4"
              >
                <div>
                  <MapPin className="w-12 h-12 text-juice-orange mx-auto mb-2" />
                  <p className="text-lg font-bold dark:text-white">اضغط هنا لعرض الموقع على خرائط جوجل</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">المساعيد - دوران شبرا - أمام مسجد عمرو بن العاص</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center animate-theme-transition">
          <h2 className="text-xl font-bold mb-2 dark:text-white">نحن في انتظار طلباتكم!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            يمكنكم التواصل معنا في أي وقت للاستفسار عن المنتجات أو تقديم الطلبات.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
