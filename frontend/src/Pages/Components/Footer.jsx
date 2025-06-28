import React from 'react';
import { 
  Phone,
  Mail,
  Clock,
  Heart,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Order Tracking', href: '/track' },
      { name: 'FAQs', href: '/faq' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refunds' }
    ],
    business: [
      { name: 'Partner with Us', href: '/partner' },
      { name: 'Restaurant Registration', href: '/restaurant-signup' },
      { name: 'Delivery Jobs', href: '/delivery-jobs' },
      { name: 'Corporate Orders', href: '/corporate' }
    ]
  };

  return (
    <footer style={{ backgroundColor: '#7B4019' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: '#FF7D29' }}
                >
                  DD
                </div>
                <h3 className="text-2xl font-bold text-white">Dish Dash</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Delivering happiness, one meal at a time. Fresh ingredients, 
                fast delivery, and unforgettable flavors right to your doorstep.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>1-800-DISH-DASH</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>support@dishdash.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#FF7D29' }}
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#FFBF78' }}
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#FF7D29' }}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Business</h4>
              <ul className="space-y-2">
                {footerLinks.business.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> 

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-gray-300 text-sm">
              {footerLinks.legal.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="text-gray-300 text-sm flex items-center space-x-2">
              <span>&copy; {currentYear} Dish Dash. All rights reserved.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for food lovers.</span>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-600 py-6 text-center">
          <h4 className="text-white font-semibold mb-4">Download Our App</h4>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
            <button 
              className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;