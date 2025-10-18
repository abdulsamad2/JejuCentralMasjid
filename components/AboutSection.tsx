import { UserGroupIcon, BookOpenIcon, HeartIcon, HomeIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: UserGroupIcon,
    title: 'Community Unity',
    description: 'Bringing together Muslims from diverse backgrounds - students, professionals, visitors, and families living in Jeju Island.',
  },
  {
    icon: BookOpenIcon,
    title: 'Islamic Education',
    description: 'Providing Quran classes, Islamic studies, and Arabic language learning for all ages and skill levels.',
  },
  {
    icon: HeartIcon,
    title: 'Support Services',
    description: 'Offering counseling, marriage guidance, funeral services, and community support for those in need.',
  },
  {
    icon: HomeIcon,
    title: 'Permanent Home Needed',
    description: 'Currently operating from a temporary location while seeking donations for a permanent mosque building.',
  },
]

export default function AboutSection() {
  return (
    <section className="py-20 bg-islamic-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">About Central Jeju Mosque</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Central Jeju Mosque serves as the spiritual heart of the Muslim community on Jeju Island, 
            providing essential religious services, educational programs, and community support in a 
            welcoming and inclusive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-islamic-green/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-islamic-green" />
                </div>
                <h3 className="text-xl font-bold text-islamic-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-islamic-navy mb-6">Our Mission</h3>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  To provide a spiritual sanctuary where Muslims can gather for worship, 
                  learning, and community building while maintaining strong ties to Islamic 
                  values and traditions.
                </p>
                <p className="leading-relaxed">
                  We strive to create an inclusive environment that welcomes Muslims from 
                  all backgrounds and supports the diverse needs of students, tourists, 
                  workers, and families residing on Jeju Island.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-islamic-navy mb-6">Our Vision</h3>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  To establish a permanent, purpose-built mosque facility that can adequately 
                  serve our growing community with dedicated spaces for men and women, 
                  educational facilities, and community halls.
                </p>
                <p className="leading-relaxed">
                  We envision a center that not only serves religious needs but also acts 
                  as a cultural bridge, fostering understanding between the Muslim community 
                  and our Korean neighbors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}