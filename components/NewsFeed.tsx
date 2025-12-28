import React from 'react';
import Icon from './Icon';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
}

const featuredArticle: Article = {
  id: '1',
  title: '5 Smart Ways to Save on Groceries in 2024',
  excerpt: 'Rising food costs are affecting every family. Here are practical strategies to cut your bill without sacrificing nutrition.',
  category: 'Tips & Tricks',
  date: 'Oct 24, 2023',
  imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop',
  author: 'Minh Nguyen'
};

const articles: Article[] = [
  {
    id: '2',
    title: 'Vietnam Economic Outlook: Q4 2023',
    excerpt: 'Experts predict a steady recovery in the retail sector as the holiday season approaches.',
    category: 'Market News',
    date: 'Oct 23, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2670&auto=format&fit=crop',
    author: 'Finance Team'
  },
  {
    id: '3',
    title: 'Understanding the New Education Tax Credits',
    excerpt: 'How the latest government policy changes can help reduce your family\'s tax burden.',
    category: 'Policy',
    date: 'Oct 22, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop',
    author: 'Sarah Le'
  },
  {
    id: '4',
    title: 'Gold Prices Hit Record High',
    excerpt: 'Is now the right time to invest in gold? We analyze the trends.',
    category: 'Investing',
    date: 'Oct 20, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2670&auto=format&fit=crop',
    author: 'Market Watch'
  }
];

const NewsFeed: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-card-light/90 backdrop-blur-md dark:bg-card-dark/90 dark:border-gray-800 shrink-0">
        <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-main-light dark:text-white">News & Insights</h2>
            <p className="text-sm md:text-base font-medium text-text-muted-light dark:text-text-muted-dark">Latest financial updates for your family</p>
          </div>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Icon name="search" className="text-text-main-light dark:text-white" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 max-w-[1200px] mx-auto w-full pb-24 md:pb-8">
        
        {/* Featured Article */}
        <section className="mb-10">
          <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4 flex items-center gap-2">
            <Icon name="star" className="text-yellow-500 filled" size={20} />
            Featured Story
          </h3>
          <div className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <img 
              src={featuredArticle.imageUrl} 
              alt={featuredArticle.title}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3">
                {featuredArticle.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-2 text-gray-300 text-xs md:text-sm">
                <span>By {featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two Columns: Latest List & Quick Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Articles */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-main-light dark:text-white">Latest Updates</h3>
              <button className="text-sm font-semibold text-primary hover:underline">View All</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {articles.map(article => (
                <div 
                  key={article.id}
                  className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors cursor-pointer shadow-sm group"
                >
                  <div className="w-full md:w-48 h-48 md:h-32 shrink-0 rounded-xl overflow-hidden relative">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">{article.category}</span>
                        <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark">• {article.date}</span>
                      </div>
                      <h4 className="text-lg font-bold text-text-main-light dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tips & Newsletter */}
          <div className="flex flex-col gap-8">
            
            {/* Quick Tips Card */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="lightbulb" className="text-yellow-500 filled" />
                <h3 className="font-bold text-text-main-light dark:text-white">Daily Tip</h3>
              </div>
              <p className="text-sm font-medium text-text-main-light dark:text-gray-200 mb-4 leading-relaxed">
                "Apply the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment."
              </p>
              <button className="w-full py-2.5 rounded-xl bg-white dark:bg-card-dark text-primary font-bold text-sm shadow-sm hover:shadow-md transition-all">
                See More Tips
              </button>
            </div>

            {/* Market Ticker (Mock) */}
            <div className="rounded-3xl bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="font-bold text-text-main-light dark:text-white mb-4">Market Watch</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600">
                      <Icon name="attach_money" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main-light dark:text-white">USD/VND</p>
                      <p className="text-xs text-text-muted-light">Currency</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-main-light dark:text-white">24,560</p>
                    <p className="text-xs font-semibold text-green-500">+0.12%</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                      <Icon name="diamond" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main-light dark:text-white">Gold (SJC)</p>
                      <p className="text-xs text-text-muted-light">Commodity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-main-light dark:text-white">70.2M</p>
                    <p className="text-xs font-semibold text-red-500">-0.45%</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;