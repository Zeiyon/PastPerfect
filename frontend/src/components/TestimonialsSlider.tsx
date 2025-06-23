import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Photographer",
    company: "Studio Creative",
    content: "PastPerfect has revolutionized my workflow. I can now restore old family photos in minutes instead of hours. The quality is incredible and it's completely free!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Content Creator",
    company: "Digital Media Pro",
    content: "I use PastPerfect for upscaling my YouTube thumbnails. The AI enhancement is mind-blowing - my old 720p images now look like they were shot in 4K.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Archivist",
    company: "Heritage Foundation",
    content: "We've been digitizing historical documents and photos. PastPerfect's restoration capabilities have helped us preserve priceless memories that were fading away.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Designer",
    company: "Pixel Perfect Studio",
    content: "The before/after results are incredible. I've tried many upscaling tools, but PastPerfect gives the best quality while being completely free. It's a game-changer.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Family Historian",
    company: "Genealogy Research",
    content: "I've restored hundreds of family photos from the 1920s-1950s. The face restoration feature is particularly amazing - it brings my ancestors back to life.",
    rating: 5
  }
]

export default function TestimonialsSlider() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See what our users are saying about PastPerfect
            </p>
          </motion.div>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-orange-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 text-orange-500/20 w-8 h-8" />
                  <p className="text-slate-300 leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
} 