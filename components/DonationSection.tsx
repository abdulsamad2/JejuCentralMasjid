"use client";
import Link from "next/link";
import { HeartIcon, HomeIcon } from "@heroicons/react/24/outline";

const quickAmounts = [50, 100, 250, 500, 1000];

export default function DonationSection() {
  const raised = 280000;
  const goal = 800000;
  const progress = Math.round((raised / goal) * 100);

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-24 pb-32 bg-islamic-navy relative">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-islamic-gold rounded-full mb-4">
            <HomeIcon className="w-6 h-6 text-gold-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Build a Permanent Mosque
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">
            Invest in Sadaqah Jariyah - continuous reward that benefits you
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-white mb-1">
              {formatUSD(raised)}
            </div>
            <div className="text-white/70">
              of <span className="text-yellow-300">{formatUSD(goal)}</span> goal
            </div>
          </div>

          <div className="relative h-3 bg-white/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-center text-sm text-yellow-300">
            {progress}% Complete
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
            {quickAmounts.map((amount) => (
              <Link
                key={amount}
                href={`/donate?amount=${amount}`}
                className="bg-white/10 hover:bg-blue-800 rounded-lg p-3 text-center text-white transition-all"
              >
                {formatUSD(amount)}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-medium transition-all"
            >
              <HeartIcon className="w-5 h-5" />
              Donate Now
            </Link>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-white/10 rounded-xl p-6 text-center">
          <p className="text-xl text-yellow-300 font-arabic mb-2">
            صَدَقَةٍ جَارِيَةٍ
          </p>
          <p className="text-white/80 italic text-sm">
            "When a person dies, all their deeds end except three: a continuing
            charity, beneficial knowledge, or a righteous child who prays for
            them."
          </p>
          <p className="text-white/60 text-xs mt-2">- Prophet Muhammad ﷺ</p>
        </div>
      </div>
      
      {/* Visual separator */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-950 to-transparent"></div>
    </section>
  );
}
