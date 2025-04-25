import { Transaction } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

type TFunction = (key: string, params?: Record<string, string>) => string;

interface FinancialAnalysis {
  totalIncome: number;
  totalExpenses: number;
  expensesByCategory: { category: string; amount: number }[];
  currentBalance: number;
  currencySymbol: string;
  t: (key: string) => string;
}

function getRecommendationsByCategory(category: string, amount: number, totalExpenses: number, t: TFunction): string | null {
  const percentage = (amount / totalExpenses) * 100;
  const categoryName = t(`categories.${category}`);
  
  if (percentage > 50) {
    return `• ⚠️ ${t('analytics.analysis.categoryHighSpending', { category: categoryName })}`;
  } else if (percentage > 30) {
    return `• 💡 ${t('analytics.analysis.categoryModerateSpending', { category: categoryName })}`;
  }
  
  return null;
}

export function analyzeFinances({ 
  totalIncome, 
  totalExpenses, 
  expensesByCategory, 
  currentBalance,
  currencySymbol,
  t 
}: FinancialAnalysis): string {
  const savings = totalIncome - totalExpenses;
  const savingsPercentage = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  // Find top spending categories
  const sortedCategories = expensesByCategory
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  let analysis = `📊 ${t('analytics.analysis.overview')}\n\n`;
  analysis += `💰 ${t('analytics.analysis.income')}: ${currencySymbol}${totalIncome.toFixed(2)}\n`;
  analysis += `💸 ${t('analytics.analysis.expenses')}: ${currencySymbol}${totalExpenses.toFixed(2)}\n`;
  analysis += `⚖️ ${t('analytics.analysis.balance')}: ${currencySymbol}${savings.toFixed(2)} (${savingsPercentage.toFixed(1)}%)\n\n`;

  // Personalized analysis based on financial situation
  if (totalIncome === 0) {
    analysis += `🤔 ${t('analytics.analysis.noIncome')}\n`;
  } else if (savingsPercentage < 0) {
    analysis += `⚠️ ${t('analytics.analysis.negativeSavings')}\n`;
  } else if (savingsPercentage < 20) {
    analysis += `💡 ${t('analytics.analysis.lowSavings')}\n`;
  } else {
    analysis += `✅ ${t('analytics.analysis.goodSavings')}\n`;
  }

  // Expense analysis with personalized recommendations
  analysis += `\n📈 ${t('analytics.analysis.expensesByCategory')}:\n`;
  const topCategory = sortedCategories[0];
  if (topCategory) {
    const topCategoryPercentage = (topCategory.amount / totalExpenses) * 100;
    if (topCategoryPercentage > 50) {
      analysis += `⚠️ ${t('analytics.analysis.highCategorySpending').replace('{category}', t(`categories.${topCategory.category}`))}\n`;
    }
  }

  // Detailed category analysis
  if (sortedCategories.length > 0) {
    analysis += `\n🎯 ${t('analytics.analysis.recommendations')}:\n`;
    sortedCategories.forEach((category, index) => {
      const percentage = (category.amount / totalExpenses) * 100;
      const translatedCategory = t(`categories.${category.category}`);
      const categoryInfo = `${translatedCategory} (${currencySymbol}${category.amount.toFixed(2)} - ${percentage.toFixed(1)}%)`;
      
      let recommendation = '';
      if (percentage > 50) {
        recommendation = t('analytics.analysis.categoryHighSpending').replace('{category}', categoryInfo);
      } else if (percentage > 30) {
        recommendation = t('analytics.analysis.categoryModerateSpending').replace('{category}', categoryInfo);
      } else {
        recommendation = t('analytics.analysis.categoryLowSpending').replace('{category}', categoryInfo);
      }
      
      analysis += `• ${recommendation}\n`;
    });
  }

  // Balance analysis with personalized messages
  analysis += `\n💼 ${t('analytics.analysis.balance')}: ${currencySymbol}${currentBalance.toFixed(2)}\n`;
  if (currentBalance < 0) {
    analysis += `\n⚠️ ${t('analytics.analysis.balanceNegative')}\n`;
    analysis += `💡 ${t('analytics.analysis.balanceNegativeAdvice')}\n`;
  } else if (currentBalance < totalExpenses) {
    analysis += `\n⚠️ ${t('analytics.analysis.balanceLow')}\n`;
    analysis += `💡 ${t('analytics.analysis.balanceLowAdvice')}\n`;
  } else if (currentBalance >= totalExpenses * 3) {
    analysis += `\n✅ ${t('analytics.analysis.balanceGood')}\n`;
    analysis += `💡 ${t('analytics.analysis.balanceGoodAdvice')}\n`;
  }

  // Add final personalized message
  if (savingsPercentage < 0) {
    analysis += `\n🎯 ${t('analytics.analysis.immediateAction')}\n`;
  } else if (savingsPercentage < 20) {
    analysis += `\n🎯 ${t('analytics.analysis.improvementNeeded')}\n`;
  } else {
    analysis += `\n🎯 ${t('analytics.analysis.keepGoing')}\n`;
  }

  return analysis;
}

const commonResponses: Record<string, string> = {
  'привет': '👋 Привет! Рад видеть вас! Я ваш персональный финансовый ассистент. Как я могу помочь вам сегодня?',
  'как сэкономить': '💡 Вот несколько эффективных способов экономии:\n\n• 📝 Ведите учет расходов\n• 🛒 Планируйте покупки заранее\n• 🔍 Ищите скидки и акции\n• 💰 Сравнивайте цены\n• 🏦 Откладывайте часть дохода\n\nХотите, я помогу вам составить план экономии?',
  'инвестиции': '📈 Для начала инвестирования важно:\n\n• 💰 Создать финансовую подушку\n• 📚 Изучить разные инструменты\n• ⚠️ Не рисковать всеми деньгами\n• 🔄 Диверсифицировать вложения\n\nДавайте обсудим, какие инвестиционные стратегии подойдут именно вам?',
  'бюджет': '📊 Основные принципы планирования бюджета:\n\n• 🏠 50% на необходимые расходы\n• 🎮 30% на желания и развлечения\n• 💰 20% на сбережения и инвестиции\n\nХотите, я помогу вам составить персональный бюджет?',
};

export function getAIResponse(message: string, context: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for common questions
  for (const [key, response] of Object.entries(commonResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  // Parse context for personalized response
  const contextData = context.split('\n').reduce((acc, line) => {
    const [key, value] = line.split(': $');
    if (value) {
      acc[key] = parseFloat(value.replace(/,/g, ''));
    }
    return acc;
  }, {} as Record<string, number>);

  // Personalized responses based on context
  if (lowerMessage.includes('долг') || lowerMessage.includes('долги')) {
    const balance = contextData['Current Balance'] || 0;
    return balance < 0 
      ? '⚠️ Для уменьшения долга рекомендую:\n\n• 📝 Составить план погашения\n• 💰 Сократить необязательные расходы\n• 💼 Искать дополнительные источники дохода\n\nХотите, я помогу составить план погашения долга?'
      : '✅ Отлично! У вас нет долгов - это прекрасное финансовое положение! Продолжайте поддерживать положительный баланс.';
  }

  if (lowerMessage.includes('сбережения') || lowerMessage.includes('накопления')) {
    const income = contextData['Total Income'] || 0;
    const recommendedSavings = Math.round(income * 0.2);
    return `💰 Для накоплений рекомендую откладывать $${recommendedSavings} в месяц (20% от дохода).\n\nЭто поможет создать финансовую подушку безопасности.\n\nХотите, я помогу составить план накоплений?`;
  }

  if (lowerMessage.includes('анализ') || lowerMessage.includes('анализировать')) {
    return '📊 Давайте проанализируем ваши финансы! Нажмите кнопку "Запросить анализ" выше, и я предоставлю подробный разбор вашей финансовой ситуации с рекомендациями.';
  }

  // Default response
  return '🤔 Я могу помочь вам с анализом финансов и дать рекомендации по управлению бюджетом. Задайте конкретный вопрос или воспользуйтесь кнопкой "Запросить анализ" для подробного разбора.\n\nЧто именно вас интересует?';
} 