import type { MetadataRoute } from 'next'

const DISALLOW = ['/admin', '/api/']

// Explicitly welcome the major search + AI crawlers, including the Korean
// engines (Naver's Yeti, Daum) and AI assistants that answer visitor
// questions (Gemini via Google-Extended, ChatGPT via GPTBot, Claude,
// Perplexity). The wildcard already allows them; being explicit documents
// intent and survives future default changes.
const FRIENDLY_BOTS = [
  'Googlebot',
  'Yeti', // Naver
  'Daum', // Daum/Kakao
  'Bingbot',
  'Google-Extended', // Gemini training/answers
  'GPTBot', // OpenAI
  'OAI-SearchBot', // ChatGPT search
  'ClaudeBot', // Anthropic
  'Claude-Web',
  'PerplexityBot',
  'Applebot',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...FRIENDLY_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: 'https://jejumasjid.kr/sitemap.xml',
  }
}
