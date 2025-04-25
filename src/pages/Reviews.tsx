
import React, { useState, useEffect } from 'react';
import { Star, Image, ZoomIn } from 'lucide-react';
import SupabaseNote from '../components/SupabaseNote';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import ImageModal from '../components/ImageModal';

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image_url?: string;
};

const Reviews = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitMessage, setSubmitMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);
  const { toast } = useToast();

  // تحميل التقييمات عند فتح الصفحة
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setReviews(data as Review[]);
        }
      } catch (error) {
        console.error('حدث خطأ أثناء تحميل التقييمات:', error);
        toast({
          title: "خطأ في التحميل",
          description: "لم نتمكن من تحميل التقييمات. حاول مرة أخرى لاحقًا.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [toast]);

  // رفع الصورة عن طريق imgbb
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setImgFile(file);

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    // api key ثابتة كما طلبت
    const apiKey = '5222610832c5f435c11de21a6ea7a686';
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.display_url);
        toast({
          title: "تم رفع الصورة",
          description: "تم رفع الصورة بنجاح!",
          variant: "default"
        });
      } else {
        toast({
          title: "حدث خطأ",
          description: "لم نتمكن من رفع الصورة. حاول مرة أخرى.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من رفع الصورة. حاول مرة أخرى.",
        variant: "destructive"
      });
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setSubmitMessage('برجاء إدخال الاسم والتقييم');
      toast({
        title: "بيانات غير مكتملة",
        description: "برجاء إدخال الاسم والتقييم",
        variant: "destructive"
      });
      return;
    }

    const newReview = {
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      image_url: imageUrl || null,
    };

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select();

      if (error) throw error;

      if (data) {
        setReviews([data[0] as Review, ...reviews]);
        setName('');
        setRating(5);
        setComment('');
        setImageUrl('');
        setImgFile(null);
        toast({
          title: "تم إرسال تقييمك",
          description: "شكرًا لك على إرسال تقييمك!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('خطأ في إرسال التقييم:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال التقييم. حاول مرة أخرى.",
        variant: "destructive"
      });
    }
  }

  const renderStars = (count: number, isInput = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        isInput ? (
          <Star
            key={i}
            className={`cursor-pointer ${i <= (hoverRating || rating) ? 'fill-juice-yellow text-juice-yellow' : 'text-gray-300'}`}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i)}
          />
        ) : (
          <Star
            key={i}
            className={`${i <= count ? 'fill-juice-yellow text-juice-yellow' : 'text-gray-300'}`}
          />
        )
      );
    }
    return stars;
  };

  return (
    <div className="section-container text-right" dir="rtl">
      <h1 className="section-title">تقييمات العملاء</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-theme-transition">
          <h2 className="text-xl font-bold mb-4 dark:text-white">أضف تقييمك</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300">
                الاسم
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 dark:text-gray-300">التقييم</label>
              <div className="flex text-2xl gap-1">
                {renderStars(rating, true)}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block mb-2 text-gray-700 dark:text-gray-300">
                التعليق
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Image size={20} className="inline" /> صورة المنتج (اختياري)
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm mt-1 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-juice-green-dark/10 file:text-juice-green hover:file:bg-juice-green-dark/20 dark:file:bg-juice-green-dark/30 dark:file:text-juice-green"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-xs text-blue-600 mt-1">...جاري رفع الصورة</p>}
              {imageUrl && (
                <div className="mt-2 relative group cursor-pointer inline-block" onClick={() => setSelectedImage({url: imageUrl, alt: "صورة المنتج"})}>
                  <img src={imageUrl} alt="صورة المنتج" className="h-20 rounded-md transition-all duration-300 group-hover:brightness-90" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 rounded-full p-1">
                      <ZoomIn className="text-white h-5 w-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {submitMessage && (
              <div className={`p-2 rounded-lg mb-4 ${submitMessage.includes('برجاء') || submitMessage.includes('خطأ') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {submitMessage}
              </div>
            )}

            <button type="submit" className="btn-juice-primary w-full" disabled={uploading}>
              إرسال التقييم
            </button>
          </form>
        </div>

        {/* قائمة الآراء */}
        <div>
          <h2 className="text-xl font-bold mb-4 dark:text-white">آراء العملاء ({reviews.length})</h2>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">جاري تحميل التقييمات...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-theme-transition">
              <p className="text-gray-500 dark:text-gray-400">لا توجد تقييمات حتى الآن. كن أول من يضيف تقييم!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 animate-theme-transition">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold dark:text-white">{review.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex my-2">{renderStars(review.rating)}</div>
                  {review.image_url && (
                    <div className="relative group cursor-pointer mb-2" onClick={() => setSelectedImage({url: review.image_url!, alt: review.name})}>
                      <img
                        src={review.image_url}
                        alt={review.name}
                        className="h-16 rounded-md transition-all duration-300 group-hover:brightness-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 rounded-full p-1">
                          <ZoomIn className="text-white h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center animate-theme-transition">
        <h2 className="text-xl font-bold mb-2 dark:text-white">نحن نقدر آراءكم!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          تساعدنا تقييماتكم في تحسين خدماتنا باستمرار. شكراً لوقتكم في مشاركة تجربتكم معنا.
        </p>
      </div>

      {/* مكون عرض الصورة المكبرة */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Reviews;
